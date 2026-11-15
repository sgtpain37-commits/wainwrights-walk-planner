/* Version 1 uses the existing audit summit IDs and exact catalogue names.
   Keep these identities stable when updating the route catalogue. */
(function(root){
'use strict';
const CATALOGUE=[
  {
    "id": "summit-d8fa37c9da008e07",
    "name": "Allen Crags"
  },
  {
    "id": "summit-438a3bf8b2e7170b",
    "name": "Angletarn Pikes (Angletarn Pikes North Top)"
  },
  {
    "id": "summit-f2bfaed057740d41",
    "name": "Ard Crags"
  },
  {
    "id": "summit-e85f719252b1b9b1",
    "name": "Armboth Fell"
  },
  {
    "id": "summit-a5484f67c57a0dad",
    "name": "Arnison Crag"
  },
  {
    "id": "summit-d9904aad7877fe67",
    "name": "Arthur's Pike"
  },
  {
    "id": "summit-87cc5e6793b0003a",
    "name": "Bakestall"
  },
  {
    "id": "summit-5c51acf6aa6d7514",
    "name": "Bannerdale Crags"
  },
  {
    "id": "summit-47aaab26be13fceb",
    "name": "Barf"
  },
  {
    "id": "summit-ebaa2b597724524b",
    "name": "Barrow"
  },
  {
    "id": "summit-88313137fa898e4d",
    "name": "Base Brown"
  },
  {
    "id": "summit-538ada5629fd04fd",
    "name": "Baystones (Wansfell)"
  },
  {
    "id": "summit-34beee9f87213715",
    "name": "Beda Fell (Beda Head)"
  },
  {
    "id": "summit-6054f863e21dc079",
    "name": "Binsey"
  },
  {
    "id": "summit-533e0fdaf537d230",
    "name": "Birkhouse Moor"
  },
  {
    "id": "summit-8e1081f14ad803d1",
    "name": "Birks"
  },
  {
    "id": "summit-5344c36d80337b9e",
    "name": "Black Fell"
  },
  {
    "id": "summit-d2ec7e83681b337b",
    "name": "Blake Fell"
  },
  {
    "id": "summit-f39440b5b2345a4e",
    "name": "Blea Rigg"
  },
  {
    "id": "summit-93651a110bc271f7",
    "name": "Bleaberry Fell"
  },
  {
    "id": "summit-e15ae104bcfebacb",
    "name": "Blencathra-Hallsfell Top"
  },
  {
    "id": "summit-412b2582237619e2",
    "name": "Bonscale Pike"
  },
  {
    "id": "summit-e56cfd6b8a41fbc0",
    "name": "Bowfell"
  },
  {
    "id": "summit-b62518834fede8da",
    "name": "Bowscale Fell"
  },
  {
    "id": "summit-99cab76135d15b05",
    "name": "Brae Fell"
  },
  {
    "id": "summit-6df39b167bf0d1f0",
    "name": "Brandreth"
  },
  {
    "id": "summit-04e4693fddded2ef",
    "name": "Branstree"
  },
  {
    "id": "summit-83c86562c8c21c40",
    "name": "Brim Fell"
  },
  {
    "id": "summit-ccb96337f756d66d",
    "name": "Brock Crags"
  },
  {
    "id": "summit-7577484bb1efcf13",
    "name": "Broom Fell"
  },
  {
    "id": "summit-9c1614cf36a97d7f",
    "name": "Buckbarrow"
  },
  {
    "id": "summit-911369610802bc9c",
    "name": "Burnbank Fell"
  },
  {
    "id": "summit-1f41bdf230e0626e",
    "name": "Calf Crag"
  },
  {
    "id": "summit-771e3a31aca3dccb",
    "name": "Carl Side"
  },
  {
    "id": "summit-1e3dddb2059b26b6",
    "name": "Carrock Fell"
  },
  {
    "id": "summit-7d5faebd9fd155ff",
    "name": "Castle Crag"
  },
  {
    "id": "summit-cafe166f25fafbfa",
    "name": "Catbells"
  },
  {
    "id": "summit-122e31d40052903b",
    "name": "Catstye Cam"
  },
  {
    "id": "summit-9cda708e4a1a1026",
    "name": "Causey Pike"
  },
  {
    "id": "summit-33ff5c1a570fd766",
    "name": "Caw Fell"
  },
  {
    "id": "summit-74263bd457af8928",
    "name": "Clough Head"
  },
  {
    "id": "summit-d2b43b07168ea625",
    "name": "Cold Pike"
  },
  {
    "id": "summit-f299964c0ef97cb0",
    "name": "Crag Fell"
  },
  {
    "id": "summit-576d14f9b40f04a4",
    "name": "Crag Hill (Eel Crag)"
  },
  {
    "id": "summit-eaa277a5d1dc8101",
    "name": "Crinkle Crags-Long Top (Second Crinkle)"
  },
  {
    "id": "summit-e6f54a373f01854e",
    "name": "Dale Head"
  },
  {
    "id": "summit-7c2cc51b0f39ed8c",
    "name": "Dodd (Skiddaw)"
  },
  {
    "id": "summit-65f813230b157629",
    "name": "Dollywaggon Pike"
  },
  {
    "id": "summit-18d9582e2c65eb84",
    "name": "Dove Crag"
  },
  {
    "id": "summit-d3172b50a5f25b4d",
    "name": "Dow Crag"
  },
  {
    "id": "summit-1133c2089f7e0b73",
    "name": "Eagle Crag"
  },
  {
    "id": "summit-52bcb6b6514d4b3b",
    "name": "Esk Pike"
  },
  {
    "id": "summit-ba719278389ad04f",
    "name": "Fairfield"
  },
  {
    "id": "summit-be9f85b5dfb8b7dd",
    "name": "Fellbarrow-Mosser Fell"
  },
  {
    "id": "summit-2ce1605ecd46e1ff",
    "name": "Fleetwith Pike"
  },
  {
    "id": "summit-0e9d3461aec3fb8b",
    "name": "Froswick"
  },
  {
    "id": "summit-10c333e355501207",
    "name": "Gavel Fell"
  },
  {
    "id": "summit-7ac438755d76eb3c",
    "name": "Gibson Knott"
  },
  {
    "id": "summit-c833941402fdbc69",
    "name": "Glaramara"
  },
  {
    "id": "summit-8f7c5650c0683d5b",
    "name": "Glenridding Dodd"
  },
  {
    "id": "summit-72608634905d91d2",
    "name": "Gowbarrow Fell (Wainwright summit)"
  },
  {
    "id": "summit-ef7c621b02d4129b",
    "name": "Grange Fell (Brund Fell)"
  },
  {
    "id": "summit-6e5d0c3fc8db4346",
    "name": "Grasmoor"
  },
  {
    "id": "summit-083608d81d9e5ae8",
    "name": "Gray Crag"
  },
  {
    "id": "summit-350c51c6fb67f801",
    "name": "Graystones"
  },
  {
    "id": "summit-3d8c4e6d2b66d408",
    "name": "Great Borne"
  },
  {
    "id": "summit-6da293443a7575a3",
    "name": "Great Calva"
  },
  {
    "id": "summit-218b964815160763",
    "name": "Great Carrs"
  },
  {
    "id": "summit-4db45549258e1001",
    "name": "Great Cockup"
  },
  {
    "id": "summit-25b3b7540776d570",
    "name": "Great Crag (Stonethwaite)"
  },
  {
    "id": "summit-f337b41da0f3fd7f",
    "name": "Great Dodd"
  },
  {
    "id": "summit-45af3826a11af93b",
    "name": "Great End"
  },
  {
    "id": "summit-248b50471c086aab",
    "name": "Great Gable"
  },
  {
    "id": "summit-3716cefad6149a13",
    "name": "Great Mell Fell"
  },
  {
    "id": "summit-a3a87019bca8172b",
    "name": "Great Rigg"
  },
  {
    "id": "summit-3b2d55a282701fea",
    "name": "Great Sca Fell"
  },
  {
    "id": "summit-fc03b5f1537c1a92",
    "name": "Green Crag"
  },
  {
    "id": "summit-151de5e0be1be782",
    "name": "Green Gable"
  },
  {
    "id": "summit-241670b4890241d8",
    "name": "Grey Crag (Sleddale Fell)"
  },
  {
    "id": "summit-2a82d3a18cec7d59",
    "name": "Grey Friar"
  },
  {
    "id": "summit-ce65d32e951e6eca",
    "name": "Grey Knotts"
  },
  {
    "id": "summit-dfcf8540a088960f",
    "name": "Grike"
  },
  {
    "id": "summit-e083baaf05df840a",
    "name": "Grisedale Pike"
  },
  {
    "id": "summit-251bc9eee39b9907",
    "name": "Hallin Fell"
  },
  {
    "id": "summit-b255f336c791a3a7",
    "name": "Hard Knott"
  },
  {
    "id": "summit-4457e2902a2df8ef",
    "name": "Harrison Stickle"
  },
  {
    "id": "summit-2b008ba2d7adf6f5",
    "name": "Hart Crag"
  },
  {
    "id": "summit-100715819d4aa3b9",
    "name": "Hart Side"
  },
  {
    "id": "summit-e0afd6bb291f1b2a",
    "name": "Harter Fell (Eskdale)"
  },
  {
    "id": "summit-46a1b6047ed64008",
    "name": "Harter Fell (Mardale)"
  },
  {
    "id": "summit-2f980bc36679267b",
    "name": "Hartsop Above How (Gill Crag-Hartsop Above How)"
  },
  {
    "id": "summit-cef8c020cc1148d7",
    "name": "Hartsop Dodd"
  },
  {
    "id": "summit-ed63abdb47e3518a",
    "name": "Haycock"
  },
  {
    "id": "summit-1430e30cfe5241fc",
    "name": "Haystacks (Buttermere)"
  },
  {
    "id": "summit-0ccce6de2acaf339",
    "name": "Helm Crag"
  },
  {
    "id": "summit-a89a098bab64b462",
    "name": "Helvellyn"
  },
  {
    "id": "summit-3e793015c7101292",
    "name": "Hen Comb"
  },
  {
    "id": "summit-5be3d4a8b88f2a22",
    "name": "Heron Pike (Rydal)"
  },
  {
    "id": "summit-fe9a5ba357e73f4c",
    "name": "High Crag (Buttermere)"
  },
  {
    "id": "summit-750444e366289808",
    "name": "High Hartsop Dodd"
  },
  {
    "id": "summit-9e39ac1d58706b41",
    "name": "High Pike (Caldbeck)"
  },
  {
    "id": "summit-2ecfad43e9a2ad23",
    "name": "High Pike (Scandale)"
  },
  {
    "id": "summit-efd09b447fbd065c",
    "name": "High Raise (High Raise (High White Stones))"
  },
  {
    "id": "summit-016fb386c2e8738b",
    "name": "High Raise (High Street)"
  },
  {
    "id": "summit-bb2cb2bc7e4129a4",
    "name": "High Rigg (Naddle Fell)"
  },
  {
    "id": "summit-1a03253ecf2d3a47",
    "name": "High Seat"
  },
  {
    "id": "summit-3baa02de970e7b63",
    "name": "High Spy"
  },
  {
    "id": "summit-2d4989e1e8c07ad7",
    "name": "High Stile"
  },
  {
    "id": "summit-c438622aff2a27d7",
    "name": "High Street"
  },
  {
    "id": "summit-76e148514f30091b",
    "name": "High Tove"
  },
  {
    "id": "summit-b3929972eead673e",
    "name": "Hindscarth"
  },
  {
    "id": "summit-7206b5b45d52d4a0",
    "name": "Holme Fell"
  },
  {
    "id": "summit-deee8a7510ee4a4b",
    "name": "Hopegill Head"
  },
  {
    "id": "summit-76c38b2f8e2d287d",
    "name": "Ill Bell"
  },
  {
    "id": "summit-d8b8c0f5c332ca33",
    "name": "Illgill Head"
  },
  {
    "id": "summit-a20a52b3aad6141e",
    "name": "Kentmere Pike"
  },
  {
    "id": "summit-38659acbcbfdc1f0",
    "name": "Kidsty Pike"
  },
  {
    "id": "summit-c567e0a4e4a754ec",
    "name": "Kirk Fell"
  },
  {
    "id": "summit-8abd251ff25c67c5",
    "name": "Knott"
  },
  {
    "id": "summit-136da1f45700db1a",
    "name": "Knott Rigg"
  },
  {
    "id": "summit-03af795c6ae11a9f",
    "name": "Lank Rigg"
  },
  {
    "id": "summit-777f01331d32ab23",
    "name": "Latrigg"
  },
  {
    "id": "summit-f3f4f0362b7baf46",
    "name": "Ling Fell"
  },
  {
    "id": "summit-65b8a867f42fec92",
    "name": "Lingmell"
  },
  {
    "id": "summit-63289474efa70e5a",
    "name": "Lingmoor Fell (Lingmoor Fell-Brown How)"
  },
  {
    "id": "summit-12d33860a6145ce2",
    "name": "Little Hart Crag (Little Hart Crag-West Top)"
  },
  {
    "id": "summit-d984884bd2e50188",
    "name": "Little Mell Fell"
  },
  {
    "id": "summit-3fd40097096aaff8",
    "name": "Loadpot Hill"
  },
  {
    "id": "summit-d505dda111141895",
    "name": "Loft Crag"
  },
  {
    "id": "summit-0ca2047e580c3a8a",
    "name": "Long Side"
  },
  {
    "id": "summit-7116f8e43dff9076",
    "name": "Longlands Fell"
  },
  {
    "id": "summit-0ec12e15c9068d21",
    "name": "Lonscale Fell"
  },
  {
    "id": "summit-8401d5873e071c4a",
    "name": "Lord's Seat"
  },
  {
    "id": "summit-d3169eadb67ab790",
    "name": "Loughrigg Fell"
  },
  {
    "id": "summit-674954d0634634d9",
    "name": "Low Fell"
  },
  {
    "id": "summit-0b9b8d4f6a248d6c",
    "name": "Low Pike"
  },
  {
    "id": "summit-50e6931cc60aa78e",
    "name": "Maiden Moor"
  },
  {
    "id": "summit-259258fb94db76ad",
    "name": "Mardale Ill Bell"
  },
  {
    "id": "summit-116c924fd51d5a98",
    "name": "Meal Fell"
  },
  {
    "id": "summit-0f1795b93dc4359d",
    "name": "Mellbreak (Mellbreak South Top)"
  },
  {
    "id": "summit-d13109e9442683da",
    "name": "Middle Dodd"
  },
  {
    "id": "summit-a0a2a9191fa18a48",
    "name": "Middle Fell"
  },
  {
    "id": "summit-fad3819bdb51dbe8",
    "name": "Mungrisdale Common"
  },
  {
    "id": "summit-0df5476a104e1aa0",
    "name": "Nab Scar"
  },
  {
    "id": "summit-6c6bf290dc738ff0",
    "name": "Nethermost Pike"
  },
  {
    "id": "summit-effed1d35c839b47",
    "name": "Outerside"
  },
  {
    "id": "summit-6fd45aea54adc143",
    "name": "Pavey Ark"
  },
  {
    "id": "summit-d9310cd3b2010ad1",
    "name": "Pike of Blisco"
  },
  {
    "id": "summit-987d58dd9e75bdca",
    "name": "Pike of Stickle"
  },
  {
    "id": "summit-7ebfe53c6d3e28f8",
    "name": "Pillar"
  },
  {
    "id": "summit-358d4ff9b83b7527",
    "name": "Place Fell"
  },
  {
    "id": "summit-0fd3685adc6350a4",
    "name": "Raise"
  },
  {
    "id": "summit-4658eb60127d1e67",
    "name": "Rampsgill Head"
  },
  {
    "id": "summit-3cb021c16efdda86",
    "name": "Rannerdale Knotts"
  },
  {
    "id": "summit-07fab25000fd6945",
    "name": "Raven Crag"
  },
  {
    "id": "summit-2016a78949938fca",
    "name": "Red Pike (Buttermere)"
  },
  {
    "id": "summit-4b2d3d2edb4577c5",
    "name": "Red Pike (Wasdale)"
  },
  {
    "id": "summit-97fd9b4e9d2df6d3",
    "name": "Red Screes"
  },
  {
    "id": "summit-2370355842468b9b",
    "name": "Rest Dodd"
  },
  {
    "id": "summit-7f36df0b525d458f",
    "name": "Robinson"
  },
  {
    "id": "summit-1b620fe54a506878",
    "name": "Rossett Pike"
  },
  {
    "id": "summit-324c021c0e90d449",
    "name": "Rosthwaite Fell-Bessyboot"
  },
  {
    "id": "summit-17e1dc94a7571083",
    "name": "Sail"
  },
  {
    "id": "summit-2a266c22c773fb2f",
    "name": "Sale Fell"
  },
  {
    "id": "summit-5908741dd251b46d",
    "name": "Sallows"
  },
  {
    "id": "summit-e703ecfd55c89350",
    "name": "Scafell"
  },
  {
    "id": "summit-70debe2c3f6aecd0",
    "name": "Scafell Pike"
  },
  {
    "id": "summit-1c61a5e2e50d9280",
    "name": "Scar Crags"
  },
  {
    "id": "summit-b93741c2dc6e289b",
    "name": "Scoat Fell"
  },
  {
    "id": "summit-4a9c89f53da25d76",
    "name": "Seat Sandal"
  },
  {
    "id": "summit-8295b4fe73bd5b4e",
    "name": "Seatallan"
  },
  {
    "id": "summit-df46b1d61fa5288b",
    "name": "Seathwaite Fell (Wainwright summit)"
  },
  {
    "id": "summit-5f5f72a31be66e35",
    "name": "Selside Pike"
  },
  {
    "id": "summit-94097e25b4c7ddfe",
    "name": "Sergeant Man"
  },
  {
    "id": "summit-0f5fd94318617b4f",
    "name": "Sergeant's Crag"
  },
  {
    "id": "summit-eb2258cb2439d73d",
    "name": "Sheffield Pike"
  },
  {
    "id": "summit-3ff2651912556d6b",
    "name": "Shipman Knotts"
  },
  {
    "id": "summit-7ac5b24834ee3b4f",
    "name": "Silver How"
  },
  {
    "id": "summit-bed4a7e63af43fc5",
    "name": "Skiddaw"
  },
  {
    "id": "summit-c8fc289b2b927f59",
    "name": "Skiddaw Little Man"
  },
  {
    "id": "summit-1a5dcdf3238a8328",
    "name": "Slight Side"
  },
  {
    "id": "summit-d8e3225044f155e3",
    "name": "Sour Howes"
  },
  {
    "id": "summit-da721a73cbab100c",
    "name": "Souther Fell"
  },
  {
    "id": "summit-0185c3f5258fa2f3",
    "name": "St Sunday Crag"
  },
  {
    "id": "summit-78e3fdbf989eb76d",
    "name": "Starling Dodd"
  },
  {
    "id": "summit-20c5fb783d396d94",
    "name": "Steel Fell (Dead Pike-Steel Fell)"
  },
  {
    "id": "summit-53d4fe773a0b2915",
    "name": "Steel Knotts (Pikeawassa-Steel Knotts)"
  },
  {
    "id": "summit-58ac0a5db186461b",
    "name": "Steeple"
  },
  {
    "id": "summit-a5097fd57e58a167",
    "name": "Stone Arthur"
  },
  {
    "id": "summit-2a5e07a55ae0c806",
    "name": "Stony Cove Pike (Caudale Moor)"
  },
  {
    "id": "summit-30ae834063f3950d",
    "name": "Stybarrow Dodd"
  },
  {
    "id": "summit-29a85b0ef3b9c87a",
    "name": "Swirl How"
  },
  {
    "id": "summit-37c56926b4f7107a",
    "name": "Tarn Crag (Easedale)"
  },
  {
    "id": "summit-33a3b72e1291ecb4",
    "name": "Tarn Crag (Sleddale)"
  },
  {
    "id": "summit-0c54bf32c33b6fa5",
    "name": "The Knott (High Street)"
  },
  {
    "id": "summit-ad2f3c40b719d5a4",
    "name": "The Nab"
  },
  {
    "id": "summit-904fadbb03cae33b",
    "name": "The Old Man of Coniston (Coniston Old Man)"
  },
  {
    "id": "summit-76c85454baab144f",
    "name": "Thornthwaite Crag"
  },
  {
    "id": "summit-695cd12aeba08c43",
    "name": "Thunacar Knott"
  },
  {
    "id": "summit-f9c6fdc37edbda35",
    "name": "Troutbeck Tongue"
  },
  {
    "id": "summit-e85bf6ed52c26a96",
    "name": "Ullock Pike"
  },
  {
    "id": "summit-3412a0415f52b944",
    "name": "Ullscarf"
  },
  {
    "id": "summit-ac6c445c3a5ae09a",
    "name": "Walla Crag"
  },
  {
    "id": "summit-3aa504b4aa800f9c",
    "name": "Wandope"
  },
  {
    "id": "summit-99bfe5d354caa2c2",
    "name": "Watson's Dodd"
  },
  {
    "id": "summit-5dc6c6ea153839a2",
    "name": "Wether Hill"
  },
  {
    "id": "summit-7ead38e4ab759760",
    "name": "Wetherlam"
  },
  {
    "id": "summit-cb3182ef03d42ee1",
    "name": "Whin Rigg (Wasdale)"
  },
  {
    "id": "summit-37e130c0456520b1",
    "name": "Whinlatter (Brown How-Whinlatter)"
  },
  {
    "id": "summit-a051be47e3625b76",
    "name": "White Side"
  },
  {
    "id": "summit-d1036506721b85b8",
    "name": "Whiteless Pike"
  },
  {
    "id": "summit-9358884e4807b9b4",
    "name": "Whiteside (Whiteside West Top)"
  },
  {
    "id": "summit-fbdd0b611aff911a",
    "name": "Yewbarrow"
  },
  {
    "id": "summit-10f07a37361f94d9",
    "name": "Yoke"
  }
];
const KEY='wainwrights-climbed', FORMAT='wainwrights-progress', VERSION=1;
const byName=new Map(CATALOGUE.map(s=>[s.name,s]));
const byId=new Map(CATALOGUE.map(s=>[s.id,s]));
function names(values){
 if(!Array.isArray(values)||values.some(n=>typeof n!=='string'||!byName.has(n)))throw new Error('Progress contains an unknown summit name. Existing progress has been left unchanged.');
 return [...new Set(values)].sort();
}
function read(storage){return names(JSON.parse(storage.getItem(KEY)||'[]'));}
function backup(values){return {format:FORMAT,version:VERSION,exportedAt:new Date().toISOString(),completed:names([...values]).map(n=>({...byName.get(n)}))};}
function parse(text){
 if(typeof text!=='string'||text.length>1000000)throw new Error('Choose a progress JSON backup smaller than 1 MB.');
 let data;try{data=JSON.parse(text);}catch{throw new Error('This file is not valid JSON.');}
 if(!data||data.format!==FORMAT||data.version!==VERSION||!Array.isArray(data.completed))throw new Error('This is not a supported version 1 Wainwrights progress backup.');
 if(data.completed.length>10000)throw new Error('Too many summit entries.');
 const values=data.completed.map(s=>{
  if(!s||typeof s.id!=='string'||typeof s.name!=='string'||byId.get(s.id)?.name!==s.name)throw new Error('Unknown or mismatched summit identity. Use an unmodified Wainwrights progress backup.');
  return s.name;
 });
 return {names:names(values),duplicates:values.length-new Set(values).size};
}
function preview(current,incoming){
 const before=names([...current]),after=names(incoming);
 return {added:after.filter(n=>!before.includes(n)),removed:before.filter(n=>!after.includes(n)),kept:after.filter(n=>before.includes(n))};
}
function save(storage,values){const next=names([...values]);storage.setItem(KEY,JSON.stringify(next));return next;}
const api={CATALOGUE,KEY,backup,parse,preview,read,save};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
else root.WainwrightProgress=api;
})(typeof window!=='undefined'?window:globalThis);
