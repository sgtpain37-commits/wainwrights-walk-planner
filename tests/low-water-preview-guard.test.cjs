// Run with: node --test tests/low-water-preview-guard.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
function extract(re, label) {
  const match = html.match(re);
  assert.ok(match, label + ' exists in index.html');
  return match[0];
}
const cleanName = extract(/function cleanName\(name\)\{[^\n]+/, 'cleanName');
const routeKey = extract(/function routeKey\(name\)\{[^\n]+/, 'routeKey');
const aliases = extract(/const ROUTE_ALIASES=\{[\s\S]*?\n\};/, 'ROUTE_ALIASES');
const guard = extract(/if\(\(ROUTE_ALIASES\[routeKey\(card\.dataset\.fell\)\]\|\|routeKey\(card\.dataset\.fell\)\)===['"]Coniston Old Man['"]&&route\.route===['"]From Coniston \(fell gate\) via Low Water['"]\)\{/, 'exact Low Water preview guard');
const shouldWithhold = vm.runInNewContext(
  cleanName + '\n' + routeKey + '\n' + aliases +
  '\n(fell, ascent) => { const card={dataset:{fell}}; const route={route:ascent}; ' + guard + ' return true; } return false; }'
);
const lowWater = 'From Coniston (fell gate) via Low Water';
test('full 214-summit catalogue identity is guarded', () => {
  assert.equal(shouldWithhold('The Old Man of Coniston (Coniston Old Man)', lowWater), true);
});
test('canonical and exact aliases are guarded', () => {
  for (const fell of ['Coniston Old Man', 'Old Man of Coniston', 'The Old Man of Coniston']) {
    assert.equal(shouldWithhold(fell, lowWater), true, fell);
  }
});
test('other Coniston ascents remain available for their existing checks', () => {
  for (const ascent of ['From Coniston (fell gate) via the south ridge', 'From Coniston (fell gate) via the Diamond path']) {
    assert.equal(shouldWithhold('The Old Man of Coniston (Coniston Old Man)', ascent), false);
  }
});
test('other mountains and ambiguous names are not caught', () => {
  for (const fell of ['Harter Fell (Eskdale)', 'Harter Fell (Mardale)', 'Coniston Old Man (Other)', 'Fleetwith Pike']) {
    assert.equal(shouldWithhold(fell, lowWater), false, fell);
  }
});
test('guard blocks before any Valhalla fetch and retains warning and navigation refresh', () => {
  const start = html.indexOf('window.drawRouteFromPopup=async(btn)=>');
  const end = html.indexOf('\n};', start);
  assert.ok(start >= 0 && end > start);
  const body = html.slice(start, end);
  const guardAt = body.indexOf(guard);
  const fetchAt = body.indexOf("fetch('https://valhalla1.openstreetmap.de/route'");
  assert.ok(guardAt >= 0 && fetchAt > guardAt, 'guard precedes router request');
  const guarded = body.slice(guardAt, body.indexOf('\n  }', guardAt) + 4);
  assert.match(guarded, /clearRouteOverlay\(false\)/);
  assert.match(guarded, /Low Water generated preview withheld/);
  assert.match(guarded, /live guidance is disabled/);
  assert.match(guarded, /updateGuidanceAvailability\(card\)/);
  assert.match(guarded, /return;/);
});
