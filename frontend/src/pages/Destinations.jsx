import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/home/Navbar";

// ─── GOOGLE MAPS API KEY ───────────────────────────────────────────────────────
const MAPS_API_KEY = "AIzaSyBTW4ZI3-vkrowqDGwCGG0hAQOW0ky6xHw"; 
const WEATHER_API_KEY = "7d452f92c779008680801b95476b904c"; 

// ─── All Images ───────────────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh8OYwJmpiuWloJ1ujbPine-fFVWKek4QvyTfqt3rdM9UI08oJDDavSd7OEv-6bjFaEtf5JQdQ7vDac6NxG5UtZj20SAgOdRwCbd_gTb9_5At2rYFHsLhne3SAwzcUtII4gRnh6Djhd6Gozg3VFOn8C0b20UqcqOqgG2KoenGKoahNHDDAtK-e17WEt7KyQv2Au8a7Ady3U7fm4d0HdJyDjotEK2DpM0p43c8ENTCjHahtOccd91P45dPw7oMpDonR7dikHrbMU1k",
  galleFort: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuYvSFuoLDQcLgPc2k1qL9jNmtiKXVU25iGeIlxsCSDYPeFkDS0PIA7CygGejerpx84k1kDxaUIG8Ll_pXoyEC13X2LBu5Q9dr3cqjQf1T8UNcqSjyYP0Wrz7XU2J_hDojaFve3UFdN-33fW7oSvGHxI6Twz9pGhbiEcgyNX7BH-9VPgHLNyJwsXvhdwJHg_bD-I6tfY5ntvNmWN-mwx19hsmTc-_BNiCbm51NHiqgxV_l_l7Yo0fyicnr_83XaPiEICaBDDog8I0",
  whale: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDiDvud2999rGEgGhwslbpPsvMSvXQfEOpPC75Qj7Brxn_3CoyR2OzOkpfmbNVXe16wPTW79IcsoZWoA_Q_6-g6A_7FUh4JgjRoTbG0PjJ0Q3wS-8wlncrveCK4jEZpuCOYWrWydxyLBF9dg7mA0GxgWuTCzKJxDN0FCDdbVNYkidFWdPcAJz_KxUZGE345C2wp9e0LILpz0AqfsBgx_vfVoSmY4IOi13cLauYrb0Ub1UQJBJ1ghfu-2qvaBxpRLA78ZgeVpqrHkU",
  yala: "https://tse4.mm.bing.net/th/id/OIP.OvNUwgKQJFY-jcU3Rvt4OwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  surf: "https://stokedsurfadventures.com/wp-content/uploads/2024/01/the-surfer-weligama-surf-camp-learn-to-surf-sri-lanka-stoked-surf-adventures-3.jpeg",
  capeWeligama: "https://th.bing.com/th/id/R.44fbe539ddbdd08382eb41a7ac40b62e?rik=K2Ft7cQLeStFBA&pid=ImgRaw&r=0",
  crabCurry: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoV6v8OseXegOlaSQz5HCE5C4_kZd8VSTxcXcXCv1aWtiwEMrCSLp9MEIa7shr8STExCGi75mvCYRRg1jhIyIPfh5rHYR-ZRkcaxV3sg4gnIJmfelm9IxGUIsScSMFTjFrkZNm8UAZMvkFEI65NV86Lij-gmnzn5_DOoOUPpyCjksEbu4lJVEwyFzI7SiewU58Eodu00UNWscTQMXHqum1ZB-4j3iPgyTyM9Q9XLAx5VKq26oerKIS-W2cg5Pz_BsxXcYL1zcsBl0",
  riceCurry: "https://lh3.googleusercontent.com/aida-public/AB6AXuCApI1rMpA_J12PXNJiEiJ-VhD_XQGGaQ0NMbThPw5ezlsYrU1R_fsxpwuCASh7OYuNiF9CT416eGwF9stSFSuRfqU-lnABSYuWck3WuU8tDMn8HDd1sOqnRp1QxLguHDTk9W6mVyBC8nftrbqni3VKXT6AmwuCUUnaJJbXfvGu6NlJhi06KrlTPWLmpmL8lr6IM9AHifqr-MFXsMnDRhfZqJya3XUIq9KDt53PXbf8dku_9rs-87Mfp9rALszaRRZRR6bACDiXKeE",
  beachCafe: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0SzDO_uBwMPiptFsAT9wNoa1fCK3iQ46RpJDw21TTF8_UToRRVKdX9zEgoRW7GkyV2hZARyhvsRx2UGeWH8ealZP8Fp74WOv69r2NmUQlWjH-lLSaansnRfvBL8uJA-ItvRDPg4kUrqwLZhq64XrAT3THpLgxFTZv27YP6ma3VbMRm5wCMZ-v6s94XQ2FwVdB3E0mq62jbCuXvVlpxAJvDdOhX6RDo7RbU-rY0aFKUhBW6crahrRJnla2dswDBhA7FjuLEMadgDM",
  jungle: "https://tse1.mm.bing.net/th/id/OIP.aFJCygXLFWxxCQ253FF3XQHaFF?rs=1&pid=ImgDetMain&o=7&rm=3",
  hikkaduwa: "https://pix10.agoda.net/geo/city/262/1_262_02.jpg?s=1920x822",
  hummanaya: "https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Hummanaya-768x512.jpg",
  gallery4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXuLrjPzIEHeTsULohcO9KySIWCGWRLEFbh0qDw8COfyMZ8aErNZuRT5KoWM1TxMKxOcZzu0-58WzBCZCD8JMwvtrAT5wN9XCmE29VLC6na6FHh0oiLOzv4v-fWBuiXoaX_kI4N-78-2rPsTMxZkQ19ZRX6xT6nGNcnLWSMkyw7FhgSDMUXZQ5CaVfeFSK0iTsTvyPaPvsgNysb6JMPbLx33pIOwGq4MXQ9xvT3Smj_mngQkWrBsgE0dim1-bn3y2eGTgElfA2_EQ",
  gallery5: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUUlXEM_f2drNAid6JwCbcwW93lXhTllRl9SGN-aMiYZBGUqBB_fclyQ869MZK2vPBwVAxe32p5UTgtuhEj9N0C4yZ0VG4Tc9RATSHW_6pTgQ5uW87G8hoLP6vOAbRcX2CsJCnzk0itj_yrlCJmYlLpSfpsRQm0OZU0xQUmw-M1aP__rgNq9Its3VhsOaeNi9Syxc6b4OyFgjtPTBnpqDzzLyCFO9hCTv2kQKHb14RTu0rR-0q_sOm2kPiLElSqI6gw8hY25V802Q",
  singharaja:"https://th.bing.com/th/id/R.aa065b767a48befd720952f6fdfe708c?rik=%2bODJJ3TCV6qYmg&pid=ImgRaw&r=0",
  star:"https://sharkeytours.com/wp-content/uploads/2024/12/star-fort-matara-3689.jpg",
  katharagama:"https://tse1.mm.bing.net/th/id/OIP.raeU-JqkSRlD7_x9xOr5jwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
  BrifeGarden:"https://media.licdn.com/dms/image/v2/D5612AQEAqR2Xmj9lKw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1704971758115?e=2147483647&v=beta&t=xcnqDYPEWqZE6eE0tZDVayVmxIRVjLBBqEDdZ80zybs",
  Morning:"https://tourmylanka.com/wp-content/uploads/2024/07/morning-side-deniyaya3.jpg",
  japanese: "https://th.bing.com/th/id/R.2e1477e32f8762590628e2b4832cb65c?rik=K3SoqmEKsbpgaA&pid=ImgRaw&r=0",
  bundala:"https://tse3.mm.bing.net/th/id/OIP.0vpZxIWSQOk_uHkgelHdrwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  Mirissa:"https://tse3.mm.bing.net/th/id/OIP.ONiYMSDTZYJxQulriOjjPgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
  coral:"https://th.bing.com/th/id/R.d168315697ce25b9363949b6926c72dc?rik=CG%2f92vWmIHqvpw&pid=ImgRaw&r=0",
  kosgoda:"https://lh3.googleusercontent.com/pw/ACtC-3c5fJkFpxsCahUht0WT0ZEdqTWzlB7FIiux2f0EUl0M4l2ap6EwBnBJGgixP6Cx-NmJyAGRNl5x2c4EAQVAqSj3dMZJgldFz0ATLb6gHtT0IOUvqe7ibYYek5E7dzhpI0_KSL2EQqySDACf1d_VgC2o=w496-h370-no?authuser=2",
  pituwala:"https://tse3.mm.bing.net/th/id/OIP._pWDlIgnixczQyL9HH3eAQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
maduganga:"https://tse3.mm.bing.net/th/id/OIP.J6RAMS-Zh44NR1_0Nh-qOAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
kanneliya:"https://tse1.mm.bing.net/th/id/OIP.TDC9IHL8h_IECYjIc_uBSQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
thalpe:"https://th.bing.com/th/id/R.150f0724a95cbe47e1311225bbecae63?rik=60x79jkmgVMwYw&pid=ImgRaw&r=0",
mihiripenna:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/74/e0/17/beach.jpg?w=1200&h=-1&s=1",
maritime:"https://tse3.mm.bing.net/th/id/OIP.U9EOAmjgoGSnzALusNvyqAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
mataraFort:"https://th.bing.com/th/id/OIP.Mc7oW9K2junjz7g8TaGyGgHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
coconut:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/10/4f/42/photo1jpg.jpg?w=1200&h=-1&s=1",
paravi:"https://tse4.mm.bing.net/th/id/OIP.KD3FaAvFLJY9w2PY6f8_cwHaFG?rs=1&pid=ImgDetMain&o=7&rm=3",
weherahena:"https://www.360view.lk/wp-content/uploads/2021/08/Weherahena_Poorwarama_Rajamaha_Viharaya_Photos_By_360viewlk-2-of-11-1024x683.jpg",
dellawa:"https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_82fc88f1ef.jpg",
ethamala:"https://tse3.mm.bing.net/th/id/OIP.G243S8X6rLnEr0aU5D3m6gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
lankagama:"https://tourmylanka.com/wp-content/uploads/2025/07/lankagama9.jpg",
kirinda:"https://tse2.mm.bing.net/th/id/OIP.scdFZT3-wVmElzg5l8VRTwHaEU?rs=1&pid=ImgDetMain&o=7&rm=3",
sithulpawwa:"https://tse1.mm.bing.net/th/id/OIP.Symfp5wnl0e4nj1IzIYR9AHaE0?rs=1&pid=ImgDetMain&o=7&rm=3",
rekawa:"https://www.wildlifewonderssrilanka.com/wp-content/uploads/2025/02/Turtle-Watching-Rekawa-2.jpg",
madunagala:"https://tse4.mm.bing.net/th/id/OIP.1bu1yzwVxSmryoE898t9oQHaDL?rs=1&pid=ImgDetMain&o=7&rm=3",
ussangoda:"https://www.visitceylon.net/wp-content/uploads/2023/04/Ussangoda-National-park-2-1024x512.jpg",
};

// ─── Places Data with GPS Coordinates ─────────────────────────
const ALL_PLACES = [
  { id: 1, title: "Jungle Beach", district: "Galle", category: "Beaches", rating: 4.7, img: IMAGES.jungle, desc: "A secluded beach surrounded by dense greenery, offering tranquility and a stunning ocean view, popular for snorkeling.", duration: "Half Day", lat: 6.0025, lng: 80.2150, highlights: ["Snorkeling", "Secluded", "Nature"], bestTime: "Nov–Apr" },

  { id: 2, title: "Unawatuna Beach", district: "Galle", category: "Beaches", rating: 4.8, img: IMAGES.surf, desc: "A famous beach with calm waters, ideal for swimming and water sports. Crystal clear turquoise waters.", duration: "Full Day", lat: 6.0103, lng: 80.2490, highlights: ["Swimming", "Diving", "Restaurants"], bestTime: "Nov–Apr" },

  { id: 3, title: "Hikkaduwa Beach", district: "Galle", category: "Beaches", rating: 4.6, img: IMAGES.hikkaduwa, desc: "A lively beach known for its vibrant nightlife, surfing, and coral reefs.", duration: "Full Day", lat: 6.1395, lng: 80.1005, highlights: ["Surfing", "Coral Reefs", "Nightlife"], bestTime: "Nov–Apr" },

  { id: 4, title: "Mirissa Beach", district: "Matara", category: "Beaches", rating: 4.9, img: IMAGES.Mirissa, desc: "A stunning beach famous for whale watching, surfing, and a vibrant nightlife.", duration: "Full Day", lat: 5.9485, lng: 80.4579, highlights: ["Whale Watching", "Surfing", "Sunsets"], bestTime: "Nov–Apr" },

  { id: 5, title: "Galle Fort", district: "Galle", category: "Historical", rating: 4.9, img: IMAGES.galleFort, desc: "A UNESCO World Heritage Site, showcasing a blend of Portuguese, Dutch, and British architecture, bustling with shops, cafes, and museums.", duration: "Full Day", lat: 6.0278, lng: 80.2168, highlights: ["UNESCO Heritage", "Architecture", "Museums"], bestTime: "Year Round" },

  { id: 6, title: "Star Fort, Matara", district: "Matara", category: "Historical", rating: 4.6, img: IMAGES.star, desc: "A unique star-shaped fort built by the Dutch for defense purposes.", duration: "2 Hours", lat: 5.9472, lng: 80.5369, highlights: ["Dutch Colonial", "Star-Shaped", "History"], bestTime: "Year Round" },

  { id: 7, title: "Yala Safari", district: "Hambantota", category: "Wildlife", rating: 4.9, img: IMAGES.yala, desc: "Sri Lanka's premier wildlife reserve hosting leopards, elephants & exotic birdlife.", duration: "Full Day", lat: 6.3728, lng: 81.5180, highlights: ["Leopards", "Elephants", "Safari"], bestTime: "Feb–Jul" },

  { id: 8, title: "Whale Watching Mirissa", district: "Matara", category: "Wildlife", rating: 4.8, img: IMAGES.whale, desc: "Encounter blue and sperm whales on a sunrise boat tour into the Indian Ocean.", duration: "4 Hours", lat: 5.9479, lng: 80.4540, highlights: ["Blue Whales", "Dolphins", "Sunrise"], bestTime: "Nov–Apr" },

  { id: 9, title: "Sinharaja Rainforest Trek", district: "Deniyaya", category: "Adventure", rating: 4.9, img: IMAGES.singharaja, desc: "A UNESCO World Heritage site rich in endemic species — an unforgettable jungle trek.", duration: "Full Day", lat: 6.4017, lng: 80.4983, highlights: ["UNESCO Forest", "Trekking", "Endemic Species"], bestTime: "Aug–Sep" },

  { id: 10, title: "Weligama Surf", district: "Matara", category: "Adventure", rating: 4.9, img: IMAGES.surf, desc: "A beginner-friendly bay world-famous for surf schools and warm rolling waves.", duration: "3 Hours", lat: 5.9727, lng: 80.4296, highlights: ["Beginner Surfing", "Lessons", "Warm Water"], bestTime: "Nov–Apr" },

  { id: 11, title: "Hummanaya Blowhole", district: "Hambantota", category: "Adventure", rating: 4.7, img: IMAGES.hummanaya, desc: "The second-largest blowhole in the world — a spectacular natural phenomenon.", duration: "2 Hours", lat: 6.0522, lng: 80.0767, highlights: ["Natural Wonder", "Ocean Views", "Photography"], bestTime: "May–Aug" },

  { id: 12, title: "Japanese Peace Pagoda", district: "Galle", category: "Cultural", rating: 4.6, img: IMAGES.japanese, desc: "A serene white stupa located on Rumassala Hill, providing panoramic views of the ocean.", duration: "1 Hour", lat: 6.0186, lng: 80.2354, highlights: ["Peace Stupa", "Panoramic Views", "Spiritual"], bestTime: "Year Round" },

  { id: 13, title: "Kataragama Devalaya", district: "Hambantota", category: "Cultural", rating: 4.8, img: IMAGES.katharagama, desc: "A multi-religious shrine with vibrant rituals — sacred to Buddhists, Hindus and Muslims.", duration: "2 Hours", lat: 6.4138, lng: 81.3361, highlights: ["Multi-faith", "Rituals", "Ancient"], bestTime: "Year Round" },

  { id: 14, title: "Brief Garden", district: "Galle", category: "Nature", rating: 4.7, img: IMAGES.BrifeGarden, desc: "A beautifully landscaped garden designed by Bevis Bawa, featuring sculptures and tropical plants.", duration: "2 Hours", lat: 6.1987, lng: 80.0544, highlights: ["Tropical Garden", "Art", "Architecture"], bestTime: "Year Round" },

  { id: 15, title: "Morning Side Viewpoint", district: "Deniyaya", category: "Nature", rating: 4.8, img: IMAGES.Morning, desc: "A high-altitude area offering misty views and cool weather above the clouds.", duration: "Half Day", lat: 6.3324, lng: 80.5067, highlights: ["Cloud Forest", "Misty Views", "Cool Climate"], bestTime: "Year Round" },

  { id: 16, title: "Cape Weligama Resort", district: "Matara", category: "Luxury", rating: 4.9, img: IMAGES.capeWeligama, desc: "Breathtaking cliff-top luxury resort with world-class service and infinity pool.", duration: "Overnight", lat: 5.9712, lng: 80.4391, highlights: ["Infinity Pool", "Cliff-Top", "Fine Dining"], bestTime: "Year Round" },

  { id: 17, title: "Crab Curry Experience", district: "Matara", category: "Food", rating: 4.9, img: IMAGES.crabCurry, desc: "The ultimate culinary experience of the south, rich with coconut and aromatic spices.", duration: "3 Hours", lat: 5.9449, lng: 80.5463, highlights: ["Authentic Cuisine", "Seafood", "Cooking Class"], bestTime: "Year Round" },

  { id: 18, title: "Coral Garden, Hikkaduwa", district: "Galle", category: "Wildlife", rating: 4.8, img: IMAGES.coral, desc: "A marine sanctuary popular for snorkeling, showcasing vibrant coral reefs and marine life.", duration: "3 Hours", lat: 6.1421, lng: 80.0982, highlights: ["Coral Reefs", "Snorkeling", "Marine Life"], bestTime: "Nov–Apr" },

  { id: 19, title: "Kosgoda Turtle Conservation", district: "Galle", category: "Wildlife", rating: 4.7, img: IMAGES.kosgoda, desc: "A sanctuary dedicated to protecting endangered sea turtles.", duration: "2 Hours", lat: 6.1961, lng: 80.0400, highlights: ["Sea Turtles", "Conservation", "Educational"], bestTime: "Year Round" },

  { id: 20, title: "Bundala National Park", district: "Hambantota", category: "Wildlife", rating: 4.7, img: IMAGES.bundala, desc: "A wetland sanctuary famous for birdwatching with over 200 species.", duration: "Full Day", lat: 6.1536, lng: 81.1775, highlights: ["Birdwatching", "Wetlands", "Flamingos"], bestTime: "Oct–Mar" },
{ 
  id: 21,
  title: "Pituwala Natural Pool",
  district: "Galle",
  category: "Nature",
  rating: 4.7,
  img: IMAGES.pituwala,
  desc: "A hidden natural pool with crystal-clear water, ideal for relaxation and photography.",
  duration: "2 Hours",
  lat: 6.0230,
  lng: 80.2200,
  highlights: ["Natural Pool", "Photography", "Relaxing"],
  bestTime: "Year Round"
},

{
  id: 22,
  title: "Kanneliya Rainforest Reserve",
  district: "Galle",
  category: "Adventure",
  rating: 4.8,
  img: IMAGES.kanneliya,
  desc: "A lush rainforest rich in biodiversity, ideal for hiking and birdwatching.",
  duration: "Full Day",
  lat: 6.2586,
  lng: 80.3535,
  highlights: ["Rainforest", "Birdwatching", "Hiking"],
  bestTime: "Aug–Sep"
},

{
  id: 23,
  title: "Maduganga River Safari",
  district: "Galle",
  category: "Nature",
  rating: 4.8,
  img: IMAGES.maduganga,
  desc: "A picturesque lagoon and mangrove ecosystem, ideal for boat safaris.",
  duration: "3 Hours",
  lat: 6.2551,
  lng: 80.0340,
  highlights: ["Boat Safari", "Mangroves", "Nature"],
  bestTime: "Year Round"
},

{
  id: 24,
  title: "Thalpe Beach",
  district: "Galle",
  category: "Beaches",
  rating: 4.7,
  img: IMAGES.thalpe,
  desc: "Known for its iconic natural rock pools and peaceful coastline.",
  duration: "Half Day",
  lat: 5.9995,
  lng: 80.2780,
  highlights: ["Rock Pools", "Swimming", "Relaxing"],
  bestTime: "Nov–Apr"
},

{
  id: 25,
  title: "Mihiripenna Beach",
  district: "Galle",
  category: "Beaches",
  rating: 4.6,
  img: IMAGES.mihiripenna,
  desc: "A quiet beach with shallow waters, perfect for families and relaxation.",
  duration: "Half Day",
  lat: 5.9920,
  lng: 80.2665,
  highlights: ["Family Friendly", "Swimming", "Calm Waters"],
  bestTime: "Nov–Apr"
},

{
  id: 26,
  title: "National Maritime Museum",
  district: "Galle",
  category: "Historical",
  rating: 4.5,
  img: IMAGES.maritime,
  desc: "A museum showcasing the maritime history of Sri Lanka.",
  duration: "1 Hour",
  lat: 6.0268,
  lng: 80.2171,
  highlights: ["Museum", "Maritime History", "Artifacts"],
  bestTime: "Year Round"
},

{
  id: 27,
  title: "Matara Fort",
  district: "Matara",
  category: "Historical",
  rating: 4.5,
  img: IMAGES.mataraFort,
  desc: "A historical fort featuring colonial architecture and cultural landmarks.",
  duration: "2 Hours",
  lat: 5.9480,
  lng: 80.5353,
  highlights: ["Dutch Fort", "Colonial Architecture", "History"],
  bestTime: "Year Round"
},

{
  id: 28,
  title: "Coconut Tree Hill",
  district: "Matara",
  category: "Nature",
  rating: 4.9,
  img: IMAGES.coconut,
  desc: "A picturesque hill dotted with coconut trees, offering stunning ocean views.",
  duration: "1 Hour",
  lat: 5.9416,
  lng: 80.4503,
  highlights: ["Sunset Views", "Photography", "Ocean View"],
  bestTime: "Nov–Apr"
},

{
  id: 29,
  title: "Paravi Duwa Temple",
  district: "Matara",
  category: "Cultural",
  rating: 4.6,
  img: IMAGES.paravi,
  desc: "A small Buddhist temple on an island connected by a scenic bridge.",
  duration: "1 Hour",
  lat: 5.9470,
  lng: 80.5472,
  highlights: ["Island Temple", "Bridge", "Spiritual"],
  bestTime: "Year Round"
},

{
  id: 30,
  title: "Weherahena Temple",
  district: "Matara",
  category: "Cultural",
  rating: 4.7,
  img: IMAGES.weherahena,
  desc: "A Buddhist temple known for its massive Buddha statue and underground tunnels.",
  duration: "2 Hours",
  lat: 5.9947,
  lng: 80.5882,
  highlights: ["Buddha Statue", "Underground Tunnel", "Temple"],
  bestTime: "Year Round"
},

{
  id: 31,
  title: "Dellawa Tea Estate",
  district: "Deniyaya",
  category: "Nature",
  rating: 4.6,
  img: IMAGES.dellawa,
  desc: "A tranquil area surrounded by tea plantations and forests.",
  duration: "Half Day",
  lat: 6.3405,
  lng: 80.5581,
  highlights: ["Tea Estate", "Nature", "Photography"],
  bestTime: "Year Round"
},

{
  id: 32,
  title: "Ethamala Ella",
  district: "Deniyaya",
  category: "Nature",
  rating: 4.7,
  img: IMAGES.ethamala,
  desc: "A magnificent waterfall nestled in the jungle.",
  duration: "2 Hours",
  lat: 6.3482,
  lng: 80.5625,
  highlights: ["Waterfall", "Nature", "Adventure"],
  bestTime: "May–Sep"
},

{
  id: 33,
  title: "Lankagama",
  district: "Deniyaya",
  category: "Adventure",
  rating: 4.8,
  img: IMAGES.lankagama,
  desc: "A gateway village to the Sinharaja rainforest with breathtaking scenery.",
  duration: "Full Day",
  lat: 6.4064,
  lng: 80.4905,
  highlights: ["Village", "Rainforest", "Nature"],
  bestTime: "Aug–Sep"
},

{
  id: 34,
  title: "Kirinda Temple",
  district: "Hambantota",
  category: "Cultural",
  rating: 4.7,
  img: IMAGES.kirinda,
  desc: "A seaside Buddhist temple with historical significance and ocean views.",
  duration: "1 Hour",
  lat: 6.2232,
  lng: 81.3381,
  highlights: ["Temple", "Ocean View", "History"],
  bestTime: "Year Round"
},

{
  id: 35,
  title: "Sithulpawwa Rajamaha Viharaya",
  district: "Hambantota",
  category: "Historical",
  rating: 4.8,
  img: IMAGES.sithulpawwa,
  desc: "An ancient Buddhist monastery located in a tranquil forest setting.",
  duration: "3 Hours",
  lat: 6.4140,
  lng: 81.4223,
  highlights: ["Ancient Monastery", "Forest", "Spiritual"],
  bestTime: "Year Round"
},

{
  id: 36,
  title: "Rekawa Turtle Conservation",
  district: "Hambantota",
  category: "Wildlife",
  rating: 4.8,
  img: IMAGES.rekawa,
  desc: "A famous nesting site for sea turtles with guided conservation tours.",
  duration: "2 Hours",
  lat: 6.0351,
  lng: 80.8227,
  highlights: ["Sea Turtles", "Conservation", "Night Tours"],
  bestTime: "Year Round"
},

{
  id: 37,
  title: "Madunagala Hot Springs",
  district: "Hambantota",
  category: "Nature",
  rating: 4.6,
  img: IMAGES.madunagala,
  desc: "Natural thermal baths believed to have healing properties.",
  duration: "2 Hours",
  lat: 6.2921,
  lng: 80.9682,
  highlights: ["Hot Springs", "Relaxation", "Nature"],
  bestTime: "Year Round"
},

{
  id: 38,
  title: "Ussangoda National Park",
  district: "Hambantota",
  category: "Nature",
  rating: 4.7,
  img: IMAGES.ussangoda,
  desc: "A unique plateau with reddish soil and dramatic coastal scenery.",
  duration: "2 Hours",
  lat: 6.0805,
  lng: 80.9357,
  highlights: ["Red Soil", "Ocean Cliffs", "Photography"],
  bestTime: "Year Round"
},
];

const DISTRICTS = ["All Districts", "Galle", "Matara", "Hambantota", "Deniyaya"];
const CATEGORIES = ["All", "Beaches", "Historical", "Wildlife", "Adventure", "Cultural", "Nature", "Luxury", "Food"];
const CAT_ICONS = { Beaches: "🏖️", Historical: "🏰", Wildlife: "🐾", Adventure: "🏄", Cultural: "🛕", Luxury: "💎", Food: "🍛", Nature: "🌿", All: "✨" };

// ─── Weather Icon Mapping ──────────────────────────────────────────────────────
const getWeatherIcon = (code) => {
  if (!code) return "🌤️";
  if (code >= 200 && code < 300) return "⛈️";
  if (code >= 300 && code < 400) return "🌧️";
  if (code >= 500 && code < 600) return "🌧️";
  if (code >= 600 && code < 700) return "❄️";
  if (code === 800) return "☀️";
  if (code > 800) return "☁️";
  return "🌤️";
};

// ─── Google Maps Loader ───────────────────────────────────────────────────────
let mapsLoaded = false;
let mapsLoadPromise = null;

function loadGoogleMaps(apiKey) {
  if (mapsLoaded) return Promise.resolve();
  if (mapsLoadPromise) return mapsLoadPromise;
  mapsLoadPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) { mapsLoaded = true; return resolve(); }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => { mapsLoaded = true; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mapsLoadPromise;
}

// ─── Weather Hook ─────────────────────────────────────────────────────────────
function useWeather(lat, lng, apiKey) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lng || !apiKey || apiKey === "YOUR_OPENWEATHER_API_KEY") return;
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then(d => {
        setWeather({
          temp: Math.round(d.main.temp),
          feels: Math.round(d.main.feels_like),
          humidity: d.main.humidity,
          desc: d.weather[0].description,
          code: d.weather[0].id,
          wind: Math.round(d.wind.speed * 3.6),
          icon: d.weather[0].icon,
        });
      })
      .catch(() => {
        // Demo weather for Sri Lanka (no API key)
        setWeather({ temp: 30, feels: 33, humidity: 78, desc: "partly cloudy", code: 802, wind: 18 });
      })
      .finally(() => setLoading(false));
  }, [lat, lng, apiKey]);

  return { weather, loading };
}

// ─── WeatherWidget Component ───────────────────────────────────────────────────
function WeatherWidget({ lat, lng, locationName }) {
  const { weather, loading } = useWeather(lat, lng, WEATHER_API_KEY);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setLastUpdate(new Date()), 300000); // refresh every 5 min
    return () => clearInterval(iv);
  }, []);

  const demoWeather = { temp: 30, feels: 33, humidity: 78, desc: "partly cloudy", code: 802, wind: 18 };
  const w = weather || demoWeather;

  return (
    <div style={{ background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", borderRadius: 20, padding: "20px 24px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: -30, left: -10, width: 100, height: 100, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            🌡️ Live Weather · {locationName}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>{w.temp}°</span>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>C</span>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4, textTransform: "capitalize" }}>{w.desc}</div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1 }}>{getWeatherIcon(w.code)}</div>
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Feels</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{w.feels}°</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Humidity</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{w.humidity}%</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Wind</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{w.wind} km/h</div>
        </div>
      </div>
      {loading && (
        <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, background: "#4ade80", borderRadius: "50%", animation: "pulse 1s infinite" }} />
      )}
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 8, textAlign: "right" }}>
        Updated {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
}

// ─── Place Detail Map ──────────────────────────────────────────────────────────
function PlaceDetailMap({ place }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !place) return;
    loadGoogleMaps(MAPS_API_KEY).then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: place.lat, lng: place.lng },
        zoom: 14,
        mapTypeId: "hybrid",
        styles: [{ featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] }],
      });
      new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map,
        title: place.title,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: "#f0c060",
          fillOpacity: 1,
          strokeColor: "#0a1628",
          strokeWeight: 3,
        },
      });
      mapInstanceRef.current = map;
    }).catch(() => {
      // Maps not available — show placeholder
    });
  }, [place]);

  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 300 }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {/* Fallback when Maps API not loaded */}
      <div id="map-fallback" style={{ display: "none", position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a2a4a, #0a1628)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "#f0c060" }}>
        <div style={{ fontSize: 40 }}>📍</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{place?.title}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>📍 {place?.lat?.toFixed(4)}°N, {Math.abs(place?.lng)?.toFixed(4)}°E</div>
        <a href={`https://maps.google.com/?q=${place?.lat},${place?.lng}`} target="_blank" rel="noopener noreferrer"
          style={{ background: "#f0c060", color: "#0a1628", padding: "8px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, textDecoration: "none", marginTop: 8 }}>
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
}

// ─── Route Map Component ───────────────────────────────────────────────────────
function RouteMap({ selectedPlaces, userLocation, onClose }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildRoute = useCallback(() => {
    if (!window.google || selectedPlaces.length === 0) return;
    const google = window.google;

    const map = new google.maps.Map(mapRef.current, {
      center: userLocation
        ? { lat: userLocation.lat, lng: userLocation.lng }
        : { lat: selectedPlaces[0].lat, lng: selectedPlaces[0].lng },
      zoom: 10,
      mapTypeId: "roadmap",
      styles: [
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#193341" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#2c5a1b" }] },
      ],
    });
    mapInstanceRef.current = map;

    const renderer = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: { strokeColor: "#f0c060", strokeWeight: 5, strokeOpacity: 0.9 },
    });
    renderer.setMap(map);
    directionsRendererRef.current = renderer;

    const service = new google.maps.DirectionsService();

    const origin = userLocation
      ? new google.maps.LatLng(userLocation.lat, userLocation.lng)
      : new google.maps.LatLng(selectedPlaces[0].lat, selectedPlaces[0].lng);

    const destination = selectedPlaces[selectedPlaces.length - 1];
    const waypoints = selectedPlaces.slice(0, -1).map(p => ({
      location: new google.maps.LatLng(p.lat, p.lng),
      stopover: true,
    }));

    if (userLocation) {
      // First place is also a waypoint
      waypoints.unshift({
        location: new google.maps.LatLng(selectedPlaces[0].lat, selectedPlaces[0].lng),
        stopover: true,
      });
    }

    service.route({
      origin,
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: userLocation ? waypoints.slice(0, -1) : waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false,
    }, (result, status) => {
      if (status === "OK") {
        renderer.setDirections(result);
        const legs = result.routes[0].legs;
        const totalDist = legs.reduce((acc, l) => acc + l.distance.value, 0);
        const totalDur = legs.reduce((acc, l) => acc + l.duration.value, 0);
        setRouteInfo({
          totalKm: (totalDist / 1000).toFixed(1),
          totalTime: Math.round(totalDur / 60),
          legs: legs.map((l, i) => ({
            from: i === 0 && userLocation ? "📍 Your Location" : selectedPlaces[i - (userLocation ? 0 : 0)].title,
            to: selectedPlaces[userLocation ? i : i + 1]?.title || destination.title,
            distance: (l.distance.value / 1000).toFixed(1),
            duration: Math.round(l.duration.value / 60),
          })),
        });
      } else {
        setError("Could not calculate route. Check your API key or connection.");
      }
      setLoading(false);
    });
  }, [selectedPlaces, userLocation]);

  useEffect(() => {
    setLoading(true);
    loadGoogleMaps(MAPS_API_KEY).then(buildRoute).catch(() => {
      setError("Google Maps failed to load. Please check your API key.");
      setLoading(false);
    });
  }, [buildRoute]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.95)", zIndex: 10000, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#0a1628", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(240,192,96,0.2)" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#f0c060", margin: 0 }}>🗺️ Your Route</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>{selectedPlaces.length} destination{selectedPlaces.length > 1 ? "s" : ""} · {userLocation ? "From your location" : "Custom route"}</p>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Map */}
        <div style={{ flex: 1, position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          {loading && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.8)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 48, height: 48, border: "4px solid rgba(240,192,96,0.3)", borderTop: "4px solid #f0c060", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <div style={{ color: "#f0c060", fontSize: 16 }}>Calculating route...</div>
            </div>
          )}
          {error && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.9)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 24 }}>
              <div style={{ fontSize: 40 }}>⚠️</div>
              <div style={{ color: "#f0c060", fontSize: 16, fontWeight: 700 }}>Maps Unavailable</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center" }}>{error}</div>
              <a href={`https://www.google.com/maps/dir/${userLocation ? `${userLocation.lat},${userLocation.lng}/` : ""}${selectedPlaces.map(p => `${p.lat},${p.lng}`).join("/")}`}
                target="_blank" rel="noopener noreferrer"
                style={{ background: "#f0c060", color: "#0a1628", padding: "10px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", marginTop: 8 }}>
                Open in Google Maps ↗
              </a>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ width: 340, background: "#0d1f3c", overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Summary */}
          {routeInfo && (
            <div style={{ background: "linear-gradient(135deg, rgba(240,192,96,0.15), rgba(240,192,96,0.05))", border: "1px solid rgba(240,192,96,0.3)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#f0c060" }}>{routeInfo.totalKm}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Total KM</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#f0c060" }}>{routeInfo.totalTime}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Minutes</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#f0c060" }}>{selectedPlaces.length}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Stops</div>
                </div>
              </div>
            </div>
          )}

          {/* Leg Details */}
          {routeInfo && (
            <div>
              <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Route Breakdown</h3>
              {routeInfo.legs.map((leg, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, background: "#f0c060", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#0a1628", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 2 }}>{leg.to}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{leg.distance} km · ~{leg.duration} min</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Places */}
          <div>
            <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Selected Destinations</h3>
            {selectedPlaces.map((p, i) => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={p.img} alt={p.title} style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.district} · {p.category}</div>
                </div>
                <div style={{ fontSize: 11, color: "#f0c060", background: "rgba(240,192,96,0.1)", padding: "2px 8px", borderRadius: 999 }}>#{i + 1}</div>
              </div>
            ))}
          </div>

          {/* Open External */}
          <a href={`https://www.google.com/maps/dir/${userLocation ? `${userLocation.lat},${userLocation.lng}/` : ""}${selectedPlaces.map(p => `${p.lat},${p.lng}`).join("/")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ background: "linear-gradient(135deg, #f0c060, #c8973a)", color: "#0a1628", padding: "14px 0", borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "block", textAlign: "center", marginTop: "auto" }}>
            Open in Google Maps ↗
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
      `}</style>
    </div>
  );
}

// ─── Place Detail Modal ───────────────────────────────────────────────────────
function PlaceDetailModal({ place, onClose, onSelect, isSelected }) {
  const { weather } = useWeather(place?.lat, place?.lng, WEATHER_API_KEY);
  if (!place) return null;
  const demoWeather = { temp: 29 + Math.floor(Math.random() * 5), feels: 32, humidity: 75, desc: "partly cloudy", code: 802, wind: 15 };
  const w = weather || demoWeather;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.96)", zIndex: 9000, overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 900, background: "#fff", borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.5)" }}>
        {/* Hero Image */}
        <div style={{ position: "relative", height: 350, overflow: "hidden" }}>
          <img src={place.img} alt={place.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 50%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>✕</button>
          <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(240,192,96,0.25)", border: "1px solid rgba(240,192,96,0.5)", color: "#f0c060", padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{CAT_ICONS[place.category]} {place.category}</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 14px", borderRadius: 999, fontSize: 12 }}>📍 {place.district}</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "4px 14px", borderRadius: 999, fontSize: 12 }}>⭐ {place.rating}/5.0</span>
            </div>
            <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, fontFamily: "'Cormorant Garamond',serif", margin: 0 }}>{place.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Left Column */}
          <div>
            <p style={{ fontSize: 16, color: "#5a4a30", lineHeight: 1.8, marginBottom: 24 }}>{place.desc}</p>

            {/* Highlights */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#0a1628", marginBottom: 12 }}>Highlights</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {place.highlights?.map(h => (
                  <span key={h} style={{ background: "#f5f0e8", color: "#6a5a40", padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>✓ {h}</span>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "💰 Price", value: place.price },
                { label: "⏱️ Duration", value: place.duration },
                { label: "📅 Best Time", value: place.bestTime || "Year Round" },
                { label: "📍 Location", value: place.district + ", Sri Lanka" },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#fdfaf5", border: "1px solid #e8e2d6", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ fontSize: 12, color: "#9a8a6a", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0a1628" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button onClick={() => { onSelect(place); onClose(); }}
                style={{ flex: 1, background: isSelected ? "#e8f5e9" : "linear-gradient(135deg, #0a1628, #1a2a4a)", color: isSelected ? "#2e7d32" : "#f0c060", padding: "14px 0", borderRadius: 14, border: isSelected ? "2px solid #4caf50" : "none", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "inherit" }}>
                {isSelected ? "✓ Selected" : "➕ Select for Route"}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Live Weather */}
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#0a1628", marginBottom: 12 }}>Live Weather</h3>
              <WeatherWidget lat={place.lat} lng={place.lng} locationName={place.title} />
            </div>

            {/* Map */}
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#0a1628", marginBottom: 12 }}>Location</h3>
              <PlaceDetailMap place={place} />
              <a href={`https://maps.google.com/?q=${place.lat},${place.lng}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", marginTop: 10, fontSize: 13, color: "#c8973a", textDecoration: "none", fontWeight: 600 }}>
                View on Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Place Card ───────────────────────────────────────────────────────────────
function PlaceCard({ place, onView, onSelect, isSelected }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: isSelected ? "2.5px solid #f0c060" : "1.5px solid #e8e2d6", boxShadow: hovered ? "0 20px 60px rgba(10,22,40,0.15)" : "0 4px 20px rgba(0,0,0,0.06)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateY(-4px)" : "none", position: "relative" }}>

      {isSelected && (
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, background: "#f0c060", color: "#0a1628", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, boxShadow: "0 4px 12px rgba(240,192,96,0.5)" }}>✓</div>
      )}

      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={place.img} alt={place.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(10,22,40,0.7)", backdropFilter: "blur(8px)", color: "#f0c060", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>⭐ {place.rating}</div>
        <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "3px 10px", borderRadius: 999, fontSize: 11 }}>{CAT_ICONS[place.category]} {place.category}</span>
        </div>
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, fontWeight: 700, color: "#0a1628", marginBottom: 4, lineHeight: 1.2 }}>{place.title}</h3>
        <p style={{ fontSize: 12, color: "#9a8a6a", marginBottom: 10 }}>📍 {place.district}, Sri Lanka</p>
        <p style={{ fontSize: 13, color: "#6a5a40", lineHeight: 1.6, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{place.desc}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#0a1628" }}>{place.price}</span>
          <span style={{ fontSize: 12, color: "#9a8a6a", background: "#f5f0e8", padding: "3px 10px", borderRadius: 999 }}>⏱ {place.duration}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button onClick={() => onView(place)}
            style={{ background: "linear-gradient(135deg, #0a1628, #1a2a4a)", color: "#f0c060", padding: "10px 0", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", transition: "opacity 0.2s" }}>
            👁️ View
          </button>
          <button onClick={() => onSelect(place)}
            style={{ background: isSelected ? "#fff8e1" : "#fdfaf5", color: isSelected ? "#c8973a" : "#6a5a40", padding: "10px 0", borderRadius: 12, border: `1.5px solid ${isSelected ? "#f0c060" : "#e8e2d6"}`, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s" }}>
            {isSelected ? "✓ Selected" : "➕ Select"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Selected Bar ─────────────────────────────────────────────────────────────
function SelectedBar({ selectedPlaces, onRemove, onShowMap, onClear, userLocation, requestLocation }) {
  if (selectedPlaces.length === 0) return null;

  return (
    <div style={{ position: "sticky", bottom: 0, zIndex: 500, background: "linear-gradient(135deg, #0a1628, #1a3a5c)", borderTop: "2px solid rgba(240,192,96,0.3)", padding: "16px 32px", boxShadow: "0 -8px 40px rgba(10,22,40,0.4)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ color: "#f0c060", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>
          🗺️ {selectedPlaces.length} Selected
        </div>

        {/* Place Pills */}
        <div style={{ flex: 1, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {selectedPlaces.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(240,192,96,0.15)", border: "1px solid rgba(240,192,96,0.3)", borderRadius: 999, padding: "4px 6px 4px 10px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: "#f0c060", fontWeight: 600 }}>#{i + 1}</span>
              <img src={p.img} alt={p.title} style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ fontSize: 12, color: "#fff" }}>{p.title}</span>
              <button onClick={() => onRemove(p.id)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.5)", width: 20, height: 20, borderRadius: "50%", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
          ))}
        </div>

        {/* Location Status */}
        {!userLocation ? (
          <button onClick={requestLocation}
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 16px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontFamily: "inherit", whiteSpace: "nowrap" }}>
            📍 Use My Location
          </button>
        ) : (
          <span style={{ fontSize: 12, color: "#4ade80", whiteSpace: "nowrap" }}>📍 Location Ready</span>
        )}

        <button onClick={onClear}
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "8px 16px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          Clear
        </button>

        <button onClick={onShowMap}
          style={{ background: "linear-gradient(135deg, #f0c060, #c8973a)", color: "#0a1628", padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800, fontFamily: "inherit", boxShadow: "0 4px 20px rgba(240,192,96,0.4)", whiteSpace: "nowrap" }}>
          🗺️ Show Route Map
        </button>
      </div>
    </div>
  );
}

// ─── Main Destinations Page ───────────────────────────────────────────────────
export default function Destinations() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [catFilter, setCatFilter] = useState("All");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [viewingPlace, setViewingPlace] = useState(null);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [sortBy, setSortBy] = useState("Top Rated");
  const [mapReady, setMapReady] = useState(false);

  // Pre-load Google Maps
  useEffect(() => {
    loadGoogleMaps(MAPS_API_KEY).then(() => setMapReady(true)).catch(() => {});
  }, []);

  // Request user location
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => setLocationError("Location access denied. You can still plan your route.")
    );
  };

  // Auto-request location on mount
  useEffect(() => { requestLocation(); }, []);

  // Filter & sort
  const filtered = ALL_PLACES
    .filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
      const matchDistrict = districtFilter === "All Districts" || p.district === districtFilter;
      const matchCat = catFilter === "All" || p.category === catFilter;
      return matchSearch && matchDistrict && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "Top Rated") return b.rating - a.rating;
      if (sortBy === "Price: Low") return parseFloat(a.price.replace(/\$/g, "")) - parseFloat(b.price.replace(/\$/g, ""));
      if (sortBy === "Price: High") return parseFloat(b.price.replace(/\$/g, "")) - parseFloat(a.price.replace(/\$/g, ""));
      if (sortBy === "Name A–Z") return a.title.localeCompare(b.title);
      return 0;
    });

  const handleSelect = (place) => {
    setSelectedPlaces(prev => {
      const exists = prev.find(p => p.id === place.id);
      if (exists) return prev.filter(p => p.id !== place.id);
      return [...prev, place];
    });
  };

  const handleRemove = (id) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== id));
  };

  const isSelected = (place) => selectedPlaces.some(p => p.id === place.id);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f0e8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(10,22,40,0.2); border-radius: 3px; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
        @keyframes spin { to { transform:rotate(360deg); } }
        .place-card { animation: fadeInUp 0.4s ease forwards; }
        .place-card:nth-child(2) { animation-delay: 0.05s; }
        .place-card:nth-child(3) { animation-delay: 0.1s; }
        .place-card:nth-child(4) { animation-delay: 0.15s; }
        .place-card:nth-child(5) { animation-delay: 0.2s; }
        .place-card:nth-child(6) { animation-delay: 0.25s; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
        {/* ── HERO ── */}
        <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
          <img src={IMAGES.hero} alt="Southern Sri Lanka" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.7) 60%, rgba(10,22,40,0.95) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ background: "rgba(240,192,96,0.15)", border: "1px solid rgba(240,192,96,0.3)", color: "#f0c060", padding: "6px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              🌴 Down South Sri Lanka
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Explore Paradise<br />
              <span style={{ color: "#f0c060" }}>Destinations</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 540, lineHeight: 1.7, marginBottom: 36 }}>
              {ALL_PLACES.length} handpicked destinations across Galle, Matara, Hambantota & Deniyaya. Select multiple places, then map your perfect route.
            </p>

            {/* Search Bar */}
            <div style={{ width: "100%", maxWidth: 640, position: "relative" }}>
              <div style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "rgba(0,0,0,0.4)", pointerEvents: "none" }}>🔍</div>
              <input
                type="text"
                placeholder="Search beaches, wildlife, cultural sites..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "18px 20px 18px 52px", borderRadius: 999, fontSize: 16, border: "none", outline: "none", background: "rgba(255,255,255,0.97)", color: "#0a1628", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", fontFamily: "inherit" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9a8a6a" }}>✕</button>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
              {[["20+", "Destinations"], ["5", "Districts"], ["9", "Categories"], ["Live", "Weather"]].map(([val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#f0c060" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LOCATION STATUS BANNER ── */}
        {userLocation && (
          <div style={{ background: "linear-gradient(90deg, #0a1628, #0f3460)", padding: "12px 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 10, height: 10, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px rgba(74,222,128,0.6)", flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>📍 Your location detected — Route planning is active. Select destinations and click "Show Route Map".</span>
              <span style={{ marginLeft: "auto", color: "#4ade80", fontSize: 12 }}>{userLocation.lat.toFixed(4)}°N, {Math.abs(userLocation.lng).toFixed(4)}°E</span>
            </div>
          </div>
        )}
        {locationError && (
          <div style={{ background: "rgba(239,68,68,0.1)", borderBottom: "1px solid rgba(239,68,68,0.2)", padding: "10px 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "rgba(255,100,100,0.9)" }}>⚠️ {locationError} — You can still select destinations and view the route.</div>
          </div>
        )}

        {/* ── FILTERS ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e2d6", padding: "16px 32px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}
              style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px solid #e8e2d6", fontSize: 13, color: "#0a1628", background: "#fdfaf5", cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px solid #e8e2d6", fontSize: 13, color: "#0a1628", background: "#fdfaf5", cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
              {["Top Rated", "Price: Low", "Price: High", "Name A–Z"].map(s => <option key={s}>{s}</option>)}
            </select>

            <div style={{ flex: 1, display: "flex", gap: 8, overflowX: "auto" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)}
                  style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: catFilter === cat ? "#0a1628" : "#e8e2d6", background: catFilter === cat ? "#0a1628" : "#fff", color: catFilter === cat ? "#f0c060" : "#6a5a40", whiteSpace: "nowrap", transition: "all 0.2s", fontFamily: "inherit" }}>
                  {CAT_ICONS[cat] || "✨"} {cat}
                </button>
              ))}
            </div>

            <span style={{ fontSize: 13, color: "#9a8a6a", whiteSpace: "nowrap" }}>{filtered.length} results</span>

            {selectedPlaces.length > 0 && (
              <button onClick={() => setShowRouteMap(true)}
                style={{ background: "linear-gradient(135deg, #f0c060, #c8973a)", color: "#0a1628", padding: "8px 20px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800, fontFamily: "inherit" }}>
                🗺️ Route ({selectedPlaces.length})
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 120px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9a8a6a" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#0a1628", marginBottom: 12 }}>No results found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              {filtered.map(place => (
                <div key={place.id} className="place-card">
                  <PlaceCard
                    place={place}
                    onView={setViewingPlace}
                    onSelect={handleSelect}
                    isSelected={isSelected(place)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SELECTED BAR (sticky bottom) ── */}
        <SelectedBar
          selectedPlaces={selectedPlaces}
          onRemove={handleRemove}
          onShowMap={() => setShowRouteMap(true)}
          onClear={() => setSelectedPlaces([])}
          userLocation={userLocation}
          requestLocation={requestLocation}
        />

        {/* ── PLACE DETAIL MODAL ── */}
        {viewingPlace && (
          <PlaceDetailModal
            place={viewingPlace}
            onClose={() => setViewingPlace(null)}
            onSelect={handleSelect}
            isSelected={isSelected(viewingPlace)}
          />
        )}

        {/* ── ROUTE MAP FULLSCREEN ── */}
        {showRouteMap && selectedPlaces.length > 0 && (
          <RouteMap
            selectedPlaces={selectedPlaces}
            userLocation={userLocation}
            onClose={() => setShowRouteMap(false)}
          />
        )}
      </div>
    </>
  );
}