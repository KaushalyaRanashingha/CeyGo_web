import { useState, useEffect, useRef } from "react";

// ─── All Images ───────────────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh8OYwJmpiuWloJ1ujbPine-fFVWKek4QvyTfqt3rdM9UI08oJDDavSd7OEv-6bjFaEtf5JQdQ7vDac6NxG5UtZj20SAgOdRwCbd_gTb9_5At2rYFHsLhne3SAwzcUtII4gRnh6Djhd6Gozg3VFOn8C0b20UqcqOqgG2KoenGKoahNHDDAtK-e17WEt7KyQv2Au8a7Ady3U7fm4d0HdJyDjotEK2DpM0p43c8ENTCjHahtOccd91P45dPw7oMpDonR7dikHrbMU1k",
  galleFort: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuYvSFuoLDQcLgPc2k1qL9jNmtiKXVU25iGeIlxsCSDYPeFkDS0PIA7CygGejerpx84k1kDxaUIG8Ll_pXoyEC13X2LBu5Q9dr3cqjQf1T8UNcqSjyYP0Wrz7XU2J_hDojaFve3UFdN-33fW7oSvGHxI6Twz9pGhbiEcgyNX7BH-9VPgHLNyJwsXvhdwJHg_bD-I6tfY5ntvNmWN-mwx19hsmTc-_BNiCbm51NHiqgxV_l_l7Yo0fyicnr_83XaPiEICaBDDog8I0",
  whale: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDiDvud2999rGEgGhwslbpPsvMSvXQfEOpPC75Qj7Brxn_3CoyR2OzOkpfmbNVXe16wPTW79IcsoZWoA_Q_6-g6A_7FUh4JgjRoTbG0PjJ0Q3wS-8wlncrveCK4jEZpuCOYWrWydxyLBF9dg7mA0GxgWuTCzKJxDN0FCDdbVNYkidFWdPcAJz_KxUZGE345C2wp9e0LILpz0AqfsBgx_vfVoSmY4IOi13cLauYrb0Ub1UQJBJ1ghfu-2qvaBxpRLA78ZgeVpqrHkU",
  yala: "https://lh3.googleusercontent.com/aida-public/AB6AXuBElLwPCO6JvgnDFWkZOjoAzNtMMuBGBqnRrwvjWxtFTHBSGb7DTPxWrrVnPVCfM3tqt0_3JowBEe9CFQWRG0EodOmVaSsDaiUAL-k-yy7srftmag3W-nnnMEbuRiY0sGAswoR6yHnJyFlVHvnmF6UZZuu8U_zBZsdpxQHpJNug6hNcSJvapMrdS0Iii4NNiJXw7TpPC9KX5uuAuHGZwFdaOvdQkThvzhG6HFrwpndsVtpW03N02Uzr1Xm11LSe5gUjW_Lt8yI3cM",
  surf: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUbXS4htMkOhsO1T7BJbuIudX2tpN1gy4dQMDKHWfICgqba2zvEXVw1kP6a9iaQxTMgCIjQ0xHlelgaEUX0tEtk_-hlwpMWXJDE1PrusUcavV7w2YTVQUdooRLXnGn-Ykc5fMIW5UPzAtCuxrWZD2to1m5Aj-DRUlT-cXKbS5p3RM04iVFLBrblro_ZOj3fyzJwiR9Oycpyk9BIQkLUL3fbkJxUy2kW3N7hSnVaavIwVNOxCE-LVN4v_njWKhyedynaSW_tS9fgfo",
  capeWeligama: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLW8f78kmm76quptJ64nzCBZjc6Wf5fpNkWm0Ul5oUVD0BWTwrGwRle4rsq3pL1quGLAdWto72_9cYBI1aAjCvr3DURMMZBN_ZHDpG774XiOeaXmJBcrExX06PFGY6NOQLwWS9DBKFpP2yPUKlb3Dyt-9og-OmSBZhL6kI1CJvP4xdOgcJsi0iQcyTlBtbu9C5do4nRyRAFaEtpehKhvdS-FdLC6mF8fWq9A1qK6d_z1fP5shHzOkIQvdv_NaNR26qyuLQ25Nxcw8",
  crabCurry: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoV6v8OseXegOlaSQz5HCE5C4_kZd8VSTxcXcXCv1aWtiwEMrCSLp9MEIa7shr8STExCGi75mvCYRRg1jhIyIPfh5rHYR-ZRkcaxV3sg4gnIJmfelm9IxGUIsScSMFTjFrkZNm8UAZMvkFEI65NV86Lij-gmnzn5_DOoOUPpyCjksEbu4lJVEwyFzI7SiewU58Eodu00UNWscTQMXHqum1ZB-4j3iPgyTyM9Q9XLAx5VKq26oerKIS-W2cg5Pz_BsxXcYL1zcsBl0",
  riceCurry: "https://lh3.googleusercontent.com/aida-public/AB6AXuCApI1rMpA_J12PXNJiEiJ-VhD_XQGGaQ0NMbThPw5ezlsYrU1R_fsxpwuCASh7OYuNiF9CT416eGwF9stSFSuRfqU-lnABSYuWck3WuU8tDMn8HDd1sOqnRp1QxLguHDTk9W6mVyBC8nftrbqni3VKXT6AmwuCUUnaJJbXfvGu6NlJhi06KrlTPWLmpmL8lr6IM9AHifqr-MFXsMnDRhfZqJya3XUIq9KDt53PXbf8dku_9rs-87Mfp9rALszaRRZRR6bACDiXKeE",
  beachCafe: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0SzDO_uBwMPiptFsAT9wNoa1fCK3iQ46RpJDw21TTF8_UToRRVKdX9zEgoRW7GkyV2hZARyhvsRx2UGeWH8ealZP8Fp74WOv69r2NmUQlWjH-lLSaansnRfvBL8uJA-ItvRDPg4kUrqwLZhq64XrAT3THpLgxFTZv27YP6ma3VbMRm5wCMZ-v6s94XQ2FwVdB3E0mq62jbCuXvVlpxAJvDdOhX6RDo7RbU-rY0aFKUhBW6crahrRJnla2dswDBhA7FjuLEMadgDM",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPRtUNCI-ESuq5k7J_Slf7rZtNbSyCeuziA4wqD1YoK88V0NRFpdSSwzFOhiLGMi1PCGzf-VIPeRLMyRW_8SOhtZbLMOk8xa3Sp-4T8K7IxGHklbjw4El5KW9J_bqvQSUugxxIlUiSWGmK0VWV1uzLtdn2mabPupQ4PicyettWL2UpsbuuxTqJjEID3Zpzh1hK96TiVOkcCIet8SEgrFyDQ_w1a7SwxMD1wgOQUVs_zC9WYc8fcHuW7fj-COYPjkABabEsdUdWEPc",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuD67Pfj34t65vcCRLh6fo0lpvMrW7FD-ZIT4TUU26BI-5EotDyvAdGcz_u526tw5Vn2S0F69ID99qY41NXqIo4BYoqvt2vZ5CpmJQIJ7N48APV7hn84866DBH-gbOCy8d2RiWR0QUYozkGlkToOA5u27IlfoLT2HTymPW3bN3aVhpRdly8W5jC78RTHFRyMIVz0AgIlmquHWYc6bbxIiL9B6rpqH0G7Uw5b6g8ac5Oi_BcG-ff5GQ10XCxQZb1qWWiVOqvrC0LtNE0",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1LtBaL3Ad6iAtyZusrav6qo4K3ELwiij_-ZoD0GRbAn-rxZfUfx-Fgv7f63GF44d6EW6ei1vUgxRn1-LfRBk7TQqeIvidAOODNlqokG1eEFBKFG2WPrCw5WqIzWRrCKkwPdDsqVYfciyMFhCeHi0OXMw1eWkl-uNTxiN2ofb0jqBTUp0LYCaPmBDrsIQhWf94sNcR80yW6vAGQjhui9xn55FLMhZf3dQK01G-rrTM4TSzQCoL9eRotQHwHwUR46SpOjVdMgHyGUM",
  gallery4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXuLrjPzIEHeTsULohcO9KySIWCGWRLEFbh0qDw8COfyMZ8aErNZuRT5KoWM1TxMKxOcZzu0-58WzBCZCD8JMwvtrAT5wN9XCmE29VLC6na6FHh0oiLOzv4v-fWBuiXoaX_kI4N-78-2rPsTMxZkQ19ZRX6xT6nGNcnLWSMkyw7FhgSDMUXZQ5CaVfeFSK0iTsTvyPaPvsgNysb6JMPbLx33pIOwGq4MXQ9xvT3Smj_mngQkWrBsgE0dim1-bn3y2eGTgElfA2_EQ",
  gallery5: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUUlXEM_f2drNAid6JwCbcwW93lXhTllRl9SGN-aMiYZBGUqBB_fclyQ869MZK2vPBwVAxe32p5UTgtuhEj9N0C4yZ0VG4Tc9RATSHW_6pTgQ5uW87G8hoLP6vOAbRcX2CsJCnzk0itj_yrlCJmYlLpSfpsRQm0OZU0xQUmw-M1aP__rgNq9Its3VhsOaeNi9Syxc6b4OyFgjtPTBnpqDzzLyCFO9hCTv2kQKHb14RTu0rR-0q_sOm2kPiLElSqI6gw8hY25V802Q",
  gallery6: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1WMgid-msVHC2PxgkT_o7Lpy79Ykh1D0inmLv2Zn9Bl_XFX9x87tdDCwSbrMW_CXQ1tgAlzykAMCOFYxChA1965uqwB6XEj5O7YInBz5ALCRRVy4ZcWKeeoZq5pWqavx--ydluzNDXvokopYRJRekI5dY_PkpOp3-zcNsHj5UOZkQRnWEiFCiUeWQtG00gYZszNfaagT5x4KKInECQ0d0GH_RVwoAXVVyKBOpxxLS-Dhhr5RHIm_ZiwYRbqloQoijl9sZYFnsoIM",
  reviewer1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHDMye_CgSew0qXqSGfnNsXJ2RTuLsn8Xl9F_fk4avw5Dl4BKItSX6RvjpGFVibyv5ZEQGfosIy1bWa8TPcXgWgRgi1WOBI8JE1GrkI1JSU3ugZ9iCWzig1Mdbb6vIREKZxVQqjA9ZYqGPmikUy8K6oRmqRcFJcmQsS_Q-lO_XRj2O33VviE100dHWxumTk2ZCNskpZP9bdJUFcy3FTz_zdk3ChTS2PeRisfGW148UszYxjfMTa3Hm067ZSvkWtJHAW0iUsVQb9Is",
  reviewer2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCot_eBYJFzkly38VKzVxYzvIi7-W9UHmdGV1rAtdjA9CQJP_CUKEhnnBYLjlJB2rrshnNrsrVK-VLaGaID1U5oRJDTL1o3q6OkJ0m_HZAmLSP7erhqbIKtECLXDIz8Tg5KGgscgKMA8FtZ5u5Jqp5cDOauHC9Swy7PwXaE77qM5dPTXJm8GneiR2R1MqLkrN9Pbfi7V_AWmYDcwD1b03tzlMfDfJBB56oyH6aiYe22yKP6hW17XBT_J4HiHrDORvveTVaiyHLOnjU",
};

// ─── All Places Data ──────────────────────────────────────────────────────────
const ALL_PLACES = [
  // GALLE DISTRICT – Beaches
  { id: 1, title: "Jungle Beach", district: "Galle", category: "Beaches", rating: 4.7, img: IMAGES.gallery1, desc: "A secluded beach surrounded by dense greenery, offering tranquility and a stunning ocean view, popular for snorkeling.", price: "$45", duration: "Half Day" },
  { id: 2, title: "Unawatuna Beach", district: "Galle", category: "Beaches", rating: 4.8, img: IMAGES.surf, desc: "A famous beach with calm waters, ideal for swimming and water sports. Crystal clear turquoise waters.", price: "$35", duration: "Full Day" },
  { id: 3, title: "Hikkaduwa Beach", district: "Galle", category: "Beaches", rating: 4.6, img: IMAGES.gallery2, desc: "A lively beach known for its vibrant nightlife, surfing, and coral reefs.", price: "$40", duration: "Full Day" },
  { id: 4, title: "Mihiripenna Beach", district: "Galle", category: "Beaches", rating: 4.4, img: IMAGES.gallery3, desc: "A quiet beach with shallow waters, perfect for families and relaxation.", price: "$25", duration: "Half Day" },
  { id: 5, title: "Akurala Beach", district: "Galle", category: "Beaches", rating: 4.3, img: IMAGES.gallery4, desc: "A tranquil beach with rock formations and clear waters.", price: "$25", duration: "Half Day" },
  { id: 6, title: "Thalpe Beach", district: "Galle", category: "Beaches", rating: 4.5, img: IMAGES.gallery5, desc: "Known for its iconic natural rock pools.", price: "$30", duration: "Half Day" },
  { id: 7, title: "Boossa Beach", district: "Galle", category: "Beaches", rating: 4.2, img: IMAGES.gallery6, desc: "A coastal area known for its pristine beaches and laid-back atmosphere.", price: "$20", duration: "Half Day" },
  { id: 8, title: "Mirissa Beach", district: "Matara", category: "Beaches", rating: 4.9, img: IMAGES.capeWeligama, desc: "A stunning beach famous for whale watching, surfing, and a vibrant nightlife.", price: "$50", duration: "Full Day" },
  { id: 9, title: "Coconut Tree Hill", district: "Matara", category: "Beaches", rating: 4.8, img: IMAGES.gallery1, desc: "A picturesque hill dotted with coconut trees, offering stunning ocean views.", price: "$15", duration: "2 Hours" },
  // GALLE DISTRICT – Historical
  { id: 10, title: "Galle Fort", district: "Galle", category: "Historical", rating: 4.9, img: IMAGES.galleFort, desc: "A UNESCO World Heritage Site, showcasing a blend of Portuguese, Dutch, and British architecture, bustling with shops, cafes, and museums.", price: "$60", duration: "Full Day" },
  { id: 11, title: "Star Fort, Matara", district: "Matara", category: "Historical", rating: 4.6, img: IMAGES.gallery2, desc: "A unique star-shaped fort built by the Dutch for defense purposes.", price: "$35", duration: "2 Hours" },
  { id: 12, title: "Matara Fort", district: "Matara", category: "Historical", rating: 4.5, img: IMAGES.gallery3, desc: "A historical fort featuring colonial architecture and cultural landmarks.", price: "$30", duration: "2 Hours" },
  { id: 13, title: "National Maritime Museum", district: "Galle", category: "Historical", rating: 4.4, img: IMAGES.gallery4, desc: "A museum showcasing the maritime history of Sri Lanka.", price: "$20", duration: "2 Hours" },
  { id: 14, title: "Galle National Museum", district: "Galle", category: "Historical", rating: 4.3, img: IMAGES.gallery5, desc: "Exhibits artifacts highlighting Galle's rich cultural heritage.", price: "$15", duration: "2 Hours" },
  // GALLE DISTRICT – Wildlife
  { id: 15, title: "Kosgoda Turtle Conservation", district: "Galle", category: "Wildlife", rating: 4.7, img: IMAGES.yala, desc: "A sanctuary dedicated to protecting endangered sea turtles, offering insight into their conservation efforts.", price: "$40", duration: "2 Hours" },
  { id: 16, title: "Coral Garden, Hikkaduwa", district: "Galle", category: "Wildlife", rating: 4.8, img: IMAGES.whale, desc: "A marine sanctuary popular for snorkeling, showcasing vibrant coral reefs and marine life.", price: "$55", duration: "3 Hours" },
  { id: 17, title: "Kanneliya Rainforest", district: "Galle", category: "Wildlife", rating: 4.6, img: IMAGES.gallery1, desc: "A lush rainforest, rich in biodiversity, ideal for hiking and birdwatching.", price: "$45", duration: "Full Day" },
  { id: 18, title: "Kottawa Arboretum", district: "Galle", category: "Wildlife", rating: 4.5, img: IMAGES.gallery2, desc: "A botanical garden showcasing endemic flora and fauna of Sri Lanka.", price: "$30", duration: "Half Day" },
  { id: 19, title: "Maduganga River Safari", district: "Galle", category: "Wildlife", rating: 4.7, img: IMAGES.gallery3, desc: "A picturesque lagoon and mangrove ecosystem, ideal for boat safaris.", price: "$50", duration: "3 Hours" },
  { id: 20, title: "Yala Safari", district: "Hambantota", category: "Wildlife", rating: 4.9, img: IMAGES.yala, desc: "Sri Lanka's premier wildlife reserve hosting leopards, elephants & exotic birdlife.", price: "$120", duration: "Full Day" },
  { id: 21, title: "Bundala National Park", district: "Hambantota", category: "Wildlife", rating: 4.7, img: IMAGES.gallery4, desc: "A wetland sanctuary famous for birdwatching.", price: "$80", duration: "Full Day" },
  { id: 22, title: "Rekawa Turtle Conservation", district: "Hambantota", category: "Wildlife", rating: 4.8, img: IMAGES.gallery5, desc: "A nesting site for sea turtles, offering nighttime turtle watching tours.", price: "$45", duration: "Evening" },
  { id: 23, title: "Ridiyagama Safari Park", district: "Hambantota", category: "Wildlife", rating: 4.6, img: IMAGES.gallery6, desc: "A wildlife park offering safari experiences with exotic animals.", price: "$90", duration: "Half Day" },
  { id: 24, title: "Hambantota Bird Sanctuary", district: "Hambantota", category: "Wildlife", rating: 4.5, img: IMAGES.gallery1, desc: "A haven for birdwatchers with diverse species.", price: "$35", duration: "3 Hours" },
  { id: 25, title: "Whale Watching Mirissa", district: "Matara", category: "Wildlife", rating: 4.8, img: IMAGES.whale, desc: "Encounter blue and sperm whales on a sunrise boat tour into the Indian Ocean.", price: "$75", duration: "4 Hours" },
  // GALLE DISTRICT – Adventure
  { id: 26, title: "Weligama Surf", district: "Matara", category: "Adventure", rating: 4.9, img: IMAGES.surf, desc: "A beginner-friendly bay world-famous for surf schools and warm rolling waves.", price: "$65", duration: "3 Hours" },
  { id: 27, title: "Sinharaja Rainforest Trek", district: "Deniyaya", category: "Adventure", rating: 4.9, img: IMAGES.gallery2, desc: "A UNESCO World Heritage site rich in endemic species — an unforgettable jungle trek.", price: "$85", duration: "Full Day" },
  { id: 28, title: "Hummanaya Blowhole", district: "Hambantota", category: "Adventure", rating: 4.7, img: IMAGES.gallery3, desc: "The second-largest blowhole in the world — a spectacular natural phenomenon.", price: "$25", duration: "2 Hours" },
  { id: 29, title: "Atuwala Gorge", district: "Deniyaya", category: "Adventure", rating: 4.5, img: IMAGES.gallery4, desc: "A natural gorge with stunning views and thrilling hiking trails.", price: "$40", duration: "Half Day" },
  { id: 30, title: "Gongala Peak Trek", district: "Deniyaya", category: "Adventure", rating: 4.6, img: IMAGES.gallery5, desc: "A high-altitude peak ideal for trekking with panoramic views.", price: "$50", duration: "Full Day" },
  // Cultural
  { id: 31, title: "Japanese Peace Pagoda", district: "Galle", category: "Cultural", rating: 4.6, img: IMAGES.gallery6, desc: "A serene white stupa located on Rumassala Hill, providing panoramic views of the ocean.", price: "$15", duration: "1 Hour" },
  { id: 32, title: "Ambalangoda Mask Museum", district: "Galle", category: "Cultural", rating: 4.5, img: IMAGES.gallery1, desc: "Exhibits traditional Sri Lankan masks used in rituals, with live mask-making demonstrations.", price: "$20", duration: "2 Hours" },
  { id: 33, title: "Seenigama Devalaya", district: "Galle", category: "Cultural", rating: 4.4, img: IMAGES.gallery2, desc: "A historic temple located on a small offshore island, accessible by boat.", price: "$25", duration: "2 Hours" },
  { id: 34, title: "Kande Viharaya", district: "Galle", category: "Cultural", rating: 4.6, img: IMAGES.gallery3, desc: "A significant Buddhist temple with a massive seated Buddha statue.", price: "$10", duration: "1 Hour" },
  { id: 35, title: "Kataragama Devalaya", district: "Hambantota", category: "Cultural", rating: 4.8, img: IMAGES.gallery4, desc: "A multi-religious shrine with vibrant rituals — sacred to Buddhists, Hindus and Muslims.", price: "$20", duration: "2 Hours" },
  { id: 36, title: "Tissamaharama Temple", district: "Hambantota", category: "Cultural", rating: 4.7, img: IMAGES.gallery5, desc: "An ancient Buddhist temple with stupas and serene surroundings.", price: "$15", duration: "2 Hours" },
  { id: 37, title: "Weherahena Temple", district: "Matara", category: "Cultural", rating: 4.6, img: IMAGES.gallery6, desc: "A Buddhist temple known for its massive Buddha statue and underground tunnels.", price: "$15", duration: "2 Hours" },
  { id: 38, title: "Sithulpawwa Monastery", district: "Hambantota", category: "Cultural", rating: 4.7, img: IMAGES.gallery1, desc: "An ancient Buddhist monastery located in a tranquil forest.", price: "$20", duration: "Half Day" },
  { id: 39, title: "Paravi Duwa Temple", district: "Matara", category: "Cultural", rating: 4.5, img: IMAGES.gallery2, desc: "A small Buddhist temple on an island, connected by a bridge.", price: "$10", duration: "1 Hour" },
  { id: 40, title: "Kirivehera Stupa", district: "Hambantota", category: "Cultural", rating: 4.6, img: IMAGES.gallery3, desc: "An ancient stupa of great spiritual importance.", price: "$15", duration: "1 Hour" },
  // Nature
  { id: 41, title: "Martin Wickramasinghe House", district: "Galle", category: "Nature", rating: 4.4, img: IMAGES.gallery4, desc: "The childhood home of renowned Sri Lankan writer, now a museum with cultural artifacts.", price: "$15", duration: "2 Hours" },
  { id: 42, title: "Pituwala Natural Pool", district: "Galle", category: "Nature", rating: 4.6, img: IMAGES.gallery5, desc: "A hidden natural pool with crystal-clear water, ideal for relaxation.", price: "$20", duration: "2 Hours" },
  { id: 43, title: "Brief Garden", district: "Galle", category: "Nature", rating: 4.7, img: IMAGES.gallery6, desc: "A beautifully landscaped garden designed by Bevis Bawa, featuring sculptures and tropical plants.", price: "$30", duration: "2 Hours" },
  { id: 44, title: "Madol Duwa Island", district: "Galle", category: "Nature", rating: 4.5, img: IMAGES.gallery1, desc: "An island featured in a famous Sri Lankan novel, accessible by boat.", price: "$35", duration: "Half Day" },
  { id: 45, title: "Morning Side Viewpoint", district: "Deniyaya", category: "Nature", rating: 4.8, img: IMAGES.gallery2, desc: "A high-altitude area offering misty views and cool weather above the clouds.", price: "$30", duration: "Half Day" },
  { id: 46, title: "Ethamala Ella Waterfall", district: "Deniyaya", category: "Nature", rating: 4.7, img: IMAGES.gallery3, desc: "A magnificent waterfall nestled in the jungle.", price: "$25", duration: "Half Day" },
  { id: 47, title: "Olu Ella Waterfall", district: "Deniyaya", category: "Nature", rating: 4.6, img: IMAGES.gallery4, desc: "A serene waterfall surrounded by natural beauty.", price: "$20", duration: "2 Hours" },
  { id: 48, title: "Madunagala Hot Springs", district: "Hambantota", category: "Nature", rating: 4.5, img: IMAGES.gallery5, desc: "Natural thermal baths with healing properties.", price: "$25", duration: "2 Hours" },
  { id: 49, title: "Mirijjawila Botanical Garden", district: "Hambantota", category: "Nature", rating: 4.4, img: IMAGES.gallery6, desc: "A lush garden showcasing a variety of plants.", price: "$20", duration: "2 Hours" },
  { id: 50, title: "Ussangoda Plateau", district: "Hambantota", category: "Nature", rating: 4.6, img: IMAGES.gallery1, desc: "A unique plateau with reddish soil and a fascinating history.", price: "$15", duration: "2 Hours" },
  // Luxury
  { id: 51, title: "Cape Weligama Resort", district: "Matara", category: "Luxury", rating: 4.9, img: IMAGES.capeWeligama, desc: "Breathtaking cliff-top luxury resort with world-class service and infinity pool.", price: "$450", duration: "Overnight" },
  { id: 52, title: "Jetwing Lighthouse", district: "Galle", category: "Luxury", rating: 4.8, img: IMAGES.gallery2, desc: "A masterpiece of colonial architecture perched right on the Galle coastline.", price: "$280", duration: "Overnight" },
  { id: 53, title: "Tamarind Hill", district: "Galle", category: "Luxury", rating: 4.7, img: IMAGES.gallery3, desc: "An 18th-century manor house turned luxury boutique hotel surrounded by gardens.", price: "$210", duration: "Overnight" },
  // Food
  { id: 54, title: "Crab Curry Experience", district: "Matara", category: "Food", rating: 4.9, img: IMAGES.crabCurry, desc: "The ultimate culinary experience of the south, rich with coconut and aromatic spices.", price: "$55", duration: "3 Hours" },
  { id: 55, title: "Rice & Curry Cooking Class", district: "Galle", category: "Food", rating: 4.8, img: IMAGES.riceCurry, desc: "Learn to cook authentic Sri Lankan rice and curry with over 10 different dishes.", price: "$70", duration: "Half Day" },
  { id: 56, title: "Beach Cafe Food Tour", district: "Galle", category: "Food", rating: 4.7, img: IMAGES.beachCafe, desc: "Vibrant atmosphere, healthy smoothie bowls, and the freshest tropical fruits.", price: "$45", duration: "3 Hours" },
  { id: 57, title: "Kataragama Food Festival", district: "Hambantota", category: "Food", rating: 4.6, img: IMAGES.crabCurry, desc: "Experience local Hambantota cuisine and street food culture.", price: "$35", duration: "Evening" },
];

const DISTRICTS = ["All Districts", "Galle", "Matara", "Hambantota", "Deniyaya"];
const CATEGORIES = ["All", "Beaches", "Historical", "Wildlife", "Adventure", "Cultural", "Nature", "Luxury", "Food"];
const DURATIONS = ["Any Duration", "1 Hour", "2 Hours", "3 Hours", "Half Day", "Full Day", "Evening", "Overnight"];
const SORT_OPTIONS = ["Top Rated", "Price: Low to High", "Price: High to Low", "Name A–Z"];

const CAT_ICONS = { Beaches: "🏖️", Historical: "🏰", Wildlife: "🐾", Adventure: "🏄", Cultural: "🛕", Luxury: "💎", Food: "🍛", Nature: "🌿", All: "✨" };

// ─── Booking Page ─────────────────────────────────────────────────────────────
function BookingPage({ booking, onBack, onConfirm }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    date: "", guests: "2", specialReqs: "", paymentMethod: "card",
    cardNumber: "", cardExpiry: "", cardCVV: "", agreeTerms: false
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName) e.firstName = "Required";
      if (!form.lastName) e.lastName = "Required";
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
      if (!form.phone) e.phone = "Required";
      if (!form.date) e.date = "Required";
    }
    if (step === 2 && form.paymentMethod === "card") {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Valid 16-digit card required";
      if (!form.cardExpiry || !/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "MM/YY format";
      if (!form.cardCVV || form.cardCVV.length < 3) e.cardCVV = "3-4 digits";
      if (!form.agreeTerms) e.agreeTerms = "You must agree to terms";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(2); };
  const handleConfirm = () => {
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => { onConfirm({ ...form, booking }); }, 3000);
    }
  };

  const inp = (field, placeholder, type = "text", extra = {}) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <input
        type={type} placeholder={placeholder} value={form[field]}
        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
        style={{
          padding: "14px 18px", borderRadius: 14,
          border: errors[field] ? "2px solid #ef4444" : "2px solid #e8e2d6",
          fontSize: 15, outline: "none", background: "#fdfaf5",
          color: "#1a1008", fontFamily: "'Cormorant Garamond', serif",
          transition: "border-color 0.2s", ...extra
        }}
        onFocus={e => e.target.style.borderColor = "#c8973a"}
        onBlur={e => e.target.style.borderColor = errors[field] ? "#ef4444" : "#e8e2d6"}
        {...extra}
      />
      {errors[field] && <span style={{ fontSize: 12, color: "#ef4444", paddingLeft: 4 }}>{errors[field]}</span>}
    </div>
  );

  const priceNum = parseInt((booking?.price || "$0").replace("$", ""));
  const guests = parseInt(form.guests) || 2;
  const taxes = Math.round(priceNum * guests * 0.1);
  const total = priceNum * guests + taxes;

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #1a2a3a 50%, #0d1f2d 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ fontSize: 80, marginBottom: 24, animation: "pop 0.6s ease" }}>🎉</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: "#f0c060", marginBottom: 16, fontWeight: 700 }}>Booking Confirmed!</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, marginBottom: 8 }}>Your adventure to <strong style={{ color: "#f0c060" }}>{booking?.title}</strong> is now booked.</p>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>A confirmation has been sent to <strong style={{ color: "#f0c060" }}>{form.email}</strong></p>
        <div style={{ background: "rgba(240,192,96,0.1)", border: "1px solid rgba(240,192,96,0.3)", borderRadius: 20, padding: 28, marginTop: 32, textAlign: "left" }}>
          {[["Experience", booking?.title], ["Date", form.date], ["Guests", form.guests], ["Total Paid", `$${total}`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{k}</span>
              <span style={{ color: "#f0c060", fontWeight: 700, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={onBack} style={{ marginTop: 32, background: "linear-gradient(135deg, #c8973a, #f0c060)", color: "#0a1628", padding: "16px 48px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 800, letterSpacing: "0.05em" }}>
          ← Back to Explore
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdfaf5", fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a1628, #1a2a4a)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={onBack} style={{ color: "#f0c060", background: "rgba(240,192,96,0.15)", border: "1px solid rgba(240,192,96,0.3)", padding: "8px 20px", borderRadius: 999, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>← Back</button>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#f0c060" }}>CeyGo</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.1em" }}>SECURE BOOKING</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: step >= s ? "linear-gradient(135deg, #c8973a, #f0c060)" : "rgba(255,255,255,0.1)", color: step >= s ? "#0a1628" : "rgba(255,255,255,0.4)" }}>{s}</div>
              <span style={{ color: step >= s ? "#f0c060" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600 }}>{s === 1 ? "Your Details" : "Payment"}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
        {/* Main Form */}
        <div>
          {step === 1 ? (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#1a1008", marginBottom: 8 }}>Your Details</h2>
              <p style={{ color: "#7a6a50", fontSize: 16, marginBottom: 36 }}>Tell us about yourself so we can prepare your perfect experience.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                {inp("firstName", "First Name")}
                {inp("lastName", "Last Name")}
              </div>
              {inp("email", "Email Address", "email")}
              <div style={{ marginTop: 20 }}>
                {inp("phone", "Phone Number", "tel")}
              </div>
              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    style={{ padding: "14px 18px", borderRadius: 14, border: errors.date ? "2px solid #ef4444" : "2px solid #e8e2d6", fontSize: 15, outline: "none", background: "#fdfaf5", color: "#1a1008", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = "#c8973a"} onBlur={e => e.target.style.borderColor = errors.date ? "#ef4444" : "#e8e2d6"} />
                  {errors.date && <span style={{ fontSize: 12, color: "#ef4444" }}>Required</span>}
                </div>
                <select value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                  style={{ padding: "14px 18px", borderRadius: 14, border: "2px solid #e8e2d6", fontSize: 15, outline: "none", background: "#fdfaf5", color: "#1a1008", fontFamily: "inherit" }}>
                  {["1","2","3","4","5","6+"].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 20 }}>
                <textarea placeholder="Special requests or notes (dietary needs, accessibility, etc.)" value={form.specialReqs}
                  onChange={e => setForm(p => ({ ...p, specialReqs: e.target.value }))} rows={4}
                  style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #e8e2d6", fontSize: 15, outline: "none", background: "#fdfaf5", color: "#1a1008", fontFamily: "inherit", resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#c8973a"} onBlur={e => e.target.style.borderColor = "#e8e2d6"} />
              </div>
              <button onClick={handleNext} style={{ marginTop: 32, width: "100%", background: "linear-gradient(135deg, #0a1628, #1a2a4a)", color: "#f0c060", padding: "18px 0", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 18, fontWeight: 700, letterSpacing: "0.05em" }}>
                Continue to Payment →
              </button>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#1a1008", marginBottom: 8 }}>Secure Payment</h2>
              <p style={{ color: "#7a6a50", fontSize: 16, marginBottom: 36 }}>Your payment is encrypted and fully secure.</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                {[["card", "💳 Credit Card"], ["transfer", "🏦 Bank Transfer"], ["paypal", "🅿️ PayPal"]].map(([val, label]) => (
                  <button key={val} onClick={() => setForm(p => ({ ...p, paymentMethod: val }))}
                    style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: form.paymentMethod === val ? "2px solid #c8973a" : "2px solid #e8e2d6", background: form.paymentMethod === val ? "#fff8ee" : "#fdfaf5", color: form.paymentMethod === val ? "#c8973a" : "#7a6a50", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>
                    {label}
                  </button>
                ))}
              </div>
              {form.paymentMethod === "card" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {inp("cardNumber", "Card Number (16 digits)", "text")}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {inp("cardExpiry", "MM/YY", "text")}
                    {inp("cardCVV", "CVV", "text")}
                  </div>
                </div>
              )}
              {form.paymentMethod !== "card" && (
                <div style={{ background: "#fff8ee", border: "1px solid #e8c87a", borderRadius: 16, padding: 24, textAlign: "center", color: "#7a5a20" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{form.paymentMethod === "transfer" ? "🏦" : "🅿️"}</div>
                  <p style={{ fontWeight: 700, marginBottom: 8 }}>You will receive payment instructions via email after confirmation.</p>
                </div>
              )}
              <div style={{ marginTop: 24, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <input type="checkbox" id="terms" checked={form.agreeTerms} onChange={e => setForm(p => ({ ...p, agreeTerms: e.target.checked }))} style={{ width: 18, height: 18, marginTop: 2, accentColor: "#c8973a" }} />
                <label htmlFor="terms" style={{ color: "#7a6a50", fontSize: 14, lineHeight: 1.5, cursor: "pointer" }}>
                  I agree to the <span style={{ color: "#c8973a", textDecoration: "underline" }}>Terms & Conditions</span> and <span style={{ color: "#c8973a", textDecoration: "underline" }}>Cancellation Policy</span>. I understand bookings are non-refundable within 48 hours of travel.
                </label>
              </div>
              {errors.agreeTerms && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8 }}>{errors.agreeTerms}</p>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginTop: 32 }}>
                <button onClick={() => setStep(1)} style={{ padding: "18px 0", borderRadius: 16, border: "2px solid #e8e2d6", background: "#fdfaf5", color: "#7a6a50", cursor: "pointer", fontSize: 16, fontWeight: 700, fontFamily: "inherit" }}>← Back</button>
                <button onClick={handleConfirm} style={{ background: "linear-gradient(135deg, #c8973a, #f0c060)", color: "#0a1628", padding: "18px 0", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 18, fontWeight: 800, letterSpacing: "0.05em" }}>
                  🔒 Confirm & Pay ${total}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
          <div style={{ background: "linear-gradient(135deg, #0a1628, #1a2a4a)", borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 64px rgba(10,22,40,0.25)" }}>
            <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
              <img src={booking?.img || IMAGES.hero} alt={booking?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                <span style={{ background: "rgba(240,192,96,0.2)", border: "1px solid rgba(240,192,96,0.4)", color: "#f0c060", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{booking?.category}</span>
                <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 8 }}>{booking?.title}</h3>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>📍 {booking?.district}, Sri Lanka</span>
                <span style={{ color: "#f0c060", fontWeight: 700 }}>⭐ {booking?.rating}</span>
              </div>
              {[
                ["Duration", booking?.duration || "–"],
                [`Price × ${guests} guest${guests > 1 ? "s" : ""}`, `$${priceNum * guests}`],
                ["Taxes & Fees (10%)", `$${taxes}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{k}</span>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 14 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, marginTop: 4 }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>Total</span>
                <span style={{ color: "#f0c060", fontWeight: 800, fontSize: 24 }}>${total}</span>
              </div>
              <div style={{ marginTop: 20, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6 }}>🔒 Your details are secured with 256-bit SSL encryption. Free cancellation up to 48 hours before your experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Place Card ───────────────────────────────────────────────────────────────
function PlaceCard({ place, onBook, view }) {
  const [hovered, setHovered] = useState(false);
  if (view === "list") return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 24, padding: 24, background: "#fff", borderRadius: 20, border: "1px solid #ece6d8", boxShadow: hovered ? "0 12px 36px rgba(10,22,40,0.12)" : "0 2px 8px rgba(10,22,40,0.04)", transition: "all 0.25s", cursor: "default" }}>
      <div style={{ width: 140, height: 100, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
        <img src={place.img} alt={place.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#c8973a", letterSpacing: "0.1em", textTransform: "uppercase", background: "#fff8ee", padding: "3px 10px", borderRadius: 999 }}>{CAT_ICONS[place.category]} {place.category}</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#1a1008", marginTop: 8 }}>{place.title}</h3>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0a1628", fontFamily: "'Cormorant Garamond',serif" }}>{place.price}<span style={{ fontSize: 12, color: "#9a8a6a", fontWeight: 400 }}>/person</span></div>
            <div style={{ fontSize: 12, color: "#f0a020", fontWeight: 700 }}>⭐ {place.rating}</div>
          </div>
        </div>
        <p style={{ color: "#6a5a40", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{place.desc}</p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#9a8a6a" }}>📍 {place.district}</span>
          <span style={{ fontSize: 12, color: "#9a8a6a" }}>⏱ {place.duration}</span>
          <button onClick={() => onBook(place)} style={{ marginLeft: "auto", background: "linear-gradient(135deg, #0a1628, #1a3a5a)", color: "#f0c060", padding: "9px 24px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "opacity 0.2s" }}
            onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>Book Now →</button>
        </div>
      </div>
    </div>
  );
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: hovered ? "0 20px 56px rgba(10,22,40,0.15)" : "0 4px 16px rgba(10,22,40,0.06)", transition: "all 0.3s", transform: hovered ? "translateY(-6px)" : "translateY(0)" }}>
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <img src={place.img} alt={place.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.7s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.6) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#0a1628" }}>{CAT_ICONS[place.category]} {place.category}</span>
        </div>
        <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(10,22,40,0.7)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700, color: "#f0c060" }}>⭐ {place.rating}</div>
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>📍 {place.district}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#f0c060", fontWeight: 800, fontSize: 20, fontFamily: "'Cormorant Garamond',serif" }}>{place.price}</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>per person</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#1a1008", marginBottom: 8 }}>{place.title}</h3>
        <p style={{ color: "#6a5a40", fontSize: 13, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{place.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#9a8a6a", background: "#f5f0e8", padding: "4px 10px", borderRadius: 999 }}>⏱ {place.duration}</span>
          <button onClick={() => onBook(place)}
            style={{ background: "linear-gradient(135deg, #0a1628, #1a3a5a)", color: "#f0c060", padding: "10px 22px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "linear-gradient(135deg, #c8973a, #f0c060)"; e.target.style.color = "#0a1628"; }}
            onMouseLeave={e => { e.target.style.background = "linear-gradient(135deg, #0a1628, #1a3a5a)"; e.target.style.color = "#f0c060"; }}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function CeyGo() {
  const [page, setPage] = useState("home"); // "home" | "explore" | "booking"
  const [bookingItem, setBookingItem] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [durationFilter, setDurationFilter] = useState("Any Duration");
  const [sortBy, setSortBy] = useState("Top Rated");
  const [viewMode, setViewMode] = useState("grid");
  const [scrolled, setScrolled] = useState(false);
  const [heroSearch, setHeroSearch] = useState("");
  const [heroCat, setHeroCat] = useState("All Categories");
  const [heroSeason, setHeroSeason] = useState("High Season");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleBook = (place) => {
    setBookingItem(place);
    setPage("booking");
    window.scrollTo(0, 0);
  };

  const goExplore = () => {
    if (heroSearch) setSearchQ(heroSearch);
    if (heroCat !== "All Categories") setCatFilter(heroCat);
    setPage("explore");
    window.scrollTo(0, 0);
  };

  // Filter & sort
  const filtered = ALL_PLACES.filter(p => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchDist = districtFilter === "All Districts" || p.district === districtFilter;
    const matchDur = durationFilter === "Any Duration" || p.duration === durationFilter;
    return matchQ && matchCat && matchDist && matchDur;
  }).sort((a, b) => {
    if (sortBy === "Top Rated") return b.rating - a.rating;
    if (sortBy === "Price: Low to High") return parseInt(a.price.replace("$","")) - parseInt(b.price.replace("$",""));
    if (sortBy === "Price: High to Low") return parseInt(b.price.replace("$","")) - parseInt(a.price.replace("$",""));
    return a.title.localeCompare(b.title);
  });

  if (page === "booking") return (
    <BookingPage booking={bookingItem} onBack={() => { setPage(bookingItem ? "explore" : "home"); window.scrollTo(0,0); }}
      onConfirm={() => { setTimeout(() => { setPage("home"); window.scrollTo(0,0); }, 1000); }} />
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; background: #fdfaf5; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#c8973a, #0a1628); border-radius: 3px; }
        input, select, button, textarea { font-family: inherit; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .fade-in { animation: fadeUp 0.7s ease both; }
        .fade-in-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-in-3 { animation: fadeUp 0.7s 0.3s ease both; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#fdfaf5" }}>

        {/* ── NAVBAR ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 200,
          background: scrolled || page === "explore" ? "rgba(253,250,245,0.96)" : "rgba(253,250,245,0.6)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(200,151,58,0.15)",
          boxShadow: scrolled ? "0 4px 32px rgba(10,22,40,0.08)" : "none",
          transition: "all 0.3s"
        }}>
          <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 68 }}>
            <button onClick={() => setPage("home")} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: "#0a1628", background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.02em" }}>
              Cey<span style={{ color: "#c8973a" }}>Go</span>
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              {[["🏠 Home", "home"], ["🗺 Explore All", "explore"]].map(([label, p]) => (
                <button key={p} onClick={() => { setPage(p); window.scrollTo(0,0); }}
                  style={{ padding: "9px 20px", borderRadius: 999, background: page === p ? "#0a1628" : "transparent", color: page === p ? "#f0c060" : "#4a3a20", border: page === p ? "none" : "1px solid rgba(200,151,58,0.3)", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>
            <button onClick={() => handleBook({ title: "Custom Sri Lanka Experience", img: IMAGES.hero, district: "Southern", category: "Custom", rating: "5.0", price: "$0", duration: "Flexible" })}
              style={{ background: "linear-gradient(135deg, #c8973a, #f0c060)", color: "#0a1628", padding: "10px 28px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800, letterSpacing: "0.03em" }}>
              Book Now
            </button>
          </nav>
        </header>

        {page === "home" && (
          <>
            {/* ── HERO ── */}
            <section style={{ position: "relative", height: 820, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0 }}>
                <img src={IMAGES.hero} alt="Southern Sri Lanka" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.15) 55%, #fdfaf5 100%)" }} />
              </div>
              <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 900 }}>
                <p className="fade-in" style={{ color: "rgba(240,192,96,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>✦ Pearl of the Indian Ocean ✦</p>
                <h1 className="fade-in-2" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 72, fontWeight: 700, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 24, textShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
                  Discover Southern<br /><em style={{ color: "#f0c060" }}>Sri Lanka</em>
                </h1>
                <p className="fade-in-3" style={{ fontSize: 18, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 52px" }}>
                  {ALL_PLACES.length}+ curated experiences across pristine beaches, ancient temples, wild safaris & hidden gems.
                </p>
                {/* Search Bar */}
                <div className="fade-in-3" style={{ background: "rgba(253,250,245,0.95)", backdropFilter: "blur(24px)", borderRadius: 999, padding: "8px 8px 8px 28px", maxWidth: 840, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, boxShadow: "0 20px 60px rgba(10,22,40,0.25)", border: "1px solid rgba(200,151,58,0.2)" }}>
                  <span style={{ fontSize: 18, marginRight: 12 }}>🔍</span>
                  <input value={heroSearch} onChange={e => setHeroSearch(e.target.value)} placeholder="Search Galle, Yala, whale watching…"
                    style={{ flex: 2, background: "none", border: "none", outline: "none", fontSize: 15, fontWeight: 500, color: "#1a1008" }}
                    onKeyDown={e => e.key === "Enter" && goExplore()} />
                  <div style={{ width: "1px", height: 36, background: "rgba(200,151,58,0.25)", margin: "0 16px" }} />
                  <select value={heroCat} onChange={e => setHeroCat(e.target.value)}
                    style={{ background: "none", border: "none", outline: "none", fontSize: 14, fontWeight: 500, color: "#4a3a20", cursor: "pointer" }}>
                    <option>All Categories</option>
                    {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                  <div style={{ width: "1px", height: 36, background: "rgba(200,151,58,0.25)", margin: "0 16px" }} />
                  <select value={heroSeason} onChange={e => setHeroSeason(e.target.value)}
                    style={{ background: "none", border: "none", outline: "none", fontSize: 14, fontWeight: 500, color: "#4a3a20", cursor: "pointer", marginRight: 8 }}>
                    <option>High Season</option><option>Low Season</option><option>Shoulder Season</option>
                  </select>
                  <button onClick={goExplore} style={{ background: "linear-gradient(135deg, #0a1628, #1a3a5a)", color: "#f0c060", padding: "14px 32px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap" }}>
                    Explore →
                  </button>
                </div>
              </div>
            </section>

            {/* ── STATS ── */}
            <section style={{ background: "linear-gradient(135deg, #0a1628, #1a2a4a)", padding: "56px 32px" }}>
              <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, textAlign: "center" }}>
                {[["57+", "Curated Places"], ["5", "Districts", "Covered"], ["4.7★", "Avg Rating"], ["2400+", "Happy Travelers"]].map(([n, l]) => (
                  <div key={l} style={{ padding: "0 20px", borderRight: "1px solid rgba(240,192,96,0.15)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "#f0c060", lineHeight: 1 }}>{n}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 8, fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── CATEGORY PILLS ── */}
            <section style={{ maxWidth: 1280, margin: "72px auto 0", padding: "0 32px" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 12, color: "#c8973a", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Explore By Type</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "#0a1628" }}>What's Your Adventure?</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {CATEGORIES.slice(1).map(cat => {
                  const count = ALL_PLACES.filter(p => p.category === cat).length;
                  return (
                    <button key={cat} onClick={() => { setCatFilter(cat); setPage("explore"); window.scrollTo(0,0); }}
                      style={{ padding: "32px 24px", borderRadius: 24, background: "#fff", border: "1.5px solid #ece6d8", cursor: "pointer", textAlign: "left", transition: "all 0.25s", boxShadow: "0 4px 16px rgba(10,22,40,0.04)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#0a1628"; e.currentTarget.style.borderColor = "#c8973a"; Array.from(e.currentTarget.children).forEach(c => c.style.color = c.dataset.light || c.style.color); }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#ece6d8"; }}>
                      <div style={{ fontSize: 40, marginBottom: 16 }}>{CAT_ICONS[cat]}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 700, color: "#0a1628", marginBottom: 6 }}>{cat}</div>
                      <div style={{ fontSize: 13, color: "#9a8a6a" }}>{count} experience{count !== 1 ? "s" : ""}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── FEATURED ── */}
            <section style={{ maxWidth: 1280, margin: "88px auto 0", padding: "0 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                <div>
                  <p style={{ fontSize: 12, color: "#c8973a", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Top Picks</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "#0a1628" }}>Must-Visit Experiences</h2>
                </div>
                <button onClick={() => { setPage("explore"); window.scrollTo(0,0); }} style={{ color: "#c8973a", background: "none", border: "1px solid rgba(200,151,58,0.4)", padding: "10px 24px", borderRadius: 999, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>View All {ALL_PLACES.length} →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
                {ALL_PLACES.sort((a,b) => b.rating - a.rating).slice(0,8).map(p => (
                  <PlaceCard key={p.id} place={p} onBook={handleBook} view="grid" />
                ))}
              </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ margin: "88px 32px", background: "linear-gradient(135deg, #0a1628, #1a2a4a)", borderRadius: 40, padding: "80px 64px", textAlign: "center", maxWidth: 1216, marginLeft: "auto", marginRight: "auto" }}>
              <p style={{ color: "#f0c060", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Ready to Explore?</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Your Southern Sri Lanka<br />Adventure Awaits</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 480, margin: "0 auto 40px" }}>Browse all {ALL_PLACES.length} handpicked experiences — from dawn safaris to sunset temple visits.</p>
              <button onClick={() => { setPage("explore"); window.scrollTo(0,0); }} style={{ background: "linear-gradient(135deg, #c8973a, #f0c060)", color: "#0a1628", padding: "18px 56px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 18, fontWeight: 800, letterSpacing: "0.04em" }}>
                Explore All Places →
              </button>
            </section>

            {/* ── REVIEWS ── */}
            <section style={{ maxWidth: 1280, margin: "0 auto 88px", padding: "0 32px" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "#0a1628", marginBottom: 8 }}>Voices of Travelers</h2>
                <p style={{ color: "#9a8a6a", fontSize: 14 }}>Rated 4.9 / 5 based on 2,400+ reviews</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                {[
                  { img: IMAGES.reviewer1, name: "Sarah J. — United Kingdom", quote: "CeyGo made our southern Sri Lanka trip effortless. The local recommendations for hidden beaches in Dikwella were absolutely magical." },
                  { img: IMAGES.reviewer2, name: "Marc L. — France", quote: "The curation of hotels is top-notch. Every place we stayed felt like a sanctuary. Galle Fort at sunset is something I'll never forget." }
                ].map(r => (
                  <div key={r.name} style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid #ece6d8", display: "flex", gap: 20, boxShadow: "0 4px 20px rgba(10,22,40,0.06)" }}>
                    <img src={r.img} alt={r.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    <div>
                      <div style={{ color: "#f0a020", marginBottom: 12, fontSize: 16 }}>⭐⭐⭐⭐⭐</div>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: "italic", color: "#1a1008", lineHeight: 1.6, marginBottom: 16 }}>"{r.quote}"</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{r.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "explore" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px" }}>
            {/* Page Header */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, color: "#c8973a", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>All Destinations</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 700, color: "#0a1628" }}>
                  Explore Sri Lanka
                  <span style={{ fontSize: 20, color: "#9a8a6a", fontWeight: 400, marginLeft: 16 }}>({filtered.length} places)</span>
                </h1>
                <div style={{ display: "flex", gap: 10 }}>
                  {["grid", "list"].map(v => (
                    <button key={v} onClick={() => setViewMode(v)}
                      style={{ padding: "9px 18px", borderRadius: 12, border: "1.5px solid", borderColor: viewMode === v ? "#0a1628" : "#e8e2d6", background: viewMode === v ? "#0a1628" : "transparent", color: viewMode === v ? "#f0c060" : "#6a5a40", cursor: "pointer", fontSize: 18 }}>
                      {v === "grid" ? "⊞" : "☰"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", marginBottom: 32, border: "1px solid #ece6d8", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", boxShadow: "0 4px 20px rgba(10,22,40,0.05)" }}>
              <div style={{ position: "relative", flex: 2, minWidth: 200 }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search places, districts…"
                  style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, outline: "none", background: "#fdfaf5", color: "#1a1008", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#c8973a"} onBlur={e => e.target.style.borderColor = "#e8e2d6"} />
              </div>
              {[
                { label: "Category", value: catFilter, opts: CATEGORIES.map(c => c === "All" ? "All" : c), setter: setCatFilter },
                { label: "District", value: districtFilter, opts: DISTRICTS, setter: setDistrictFilter },
                { label: "Duration", value: durationFilter, opts: DURATIONS, setter: setDurationFilter },
                { label: "Sort", value: sortBy, opts: SORT_OPTIONS, setter: setSortBy },
              ].map(({ label, value, opts, setter }) => (
                <select key={label} value={value} onChange={e => setter(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, outline: "none", background: "#fdfaf5", color: "#1a1008", cursor: "pointer", minWidth: 140 }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              ))}
              {(searchQ || catFilter !== "All" || districtFilter !== "All Districts" || durationFilter !== "Any Duration") && (
                <button onClick={() => { setSearchQ(""); setCatFilter("All"); setDistrictFilter("All Districts"); setDurationFilter("Any Duration"); }}
                  style={{ padding: "12px 20px", borderRadius: 12, border: "1.5px solid #ef4444", color: "#ef4444", background: "#fff5f5", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Category Quick Filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)}
                  style={{ padding: "8px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: catFilter === cat ? "#0a1628" : "#e8e2d6", background: catFilter === cat ? "#0a1628" : "#fff", color: catFilter === cat ? "#f0c060" : "#6a5a40", transition: "all 0.2s" }}>
                  {CAT_ICONS[cat] || "✨"} {cat} {cat !== "All" && `(${ALL_PLACES.filter(p => p.category === cat).length})`}
                </button>
              ))}
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#9a8a6a" }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "#0a1628", marginBottom: 12 }}>No results found</h3>
                <p style={{ fontSize: 16 }}>Try adjusting your filters or search terms.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                {filtered.map(p => <PlaceCard key={p.id} place={p} onBook={handleBook} view="grid" />)}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {filtered.map(p => <PlaceCard key={p.id} place={p} onBook={handleBook} view="list" />)}
              </div>
            )}
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer style={{ background: "#0a1628", marginTop: page === "explore" ? 60 : 0 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 32px 32px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#f0c060", marginBottom: 16 }}>CeyGo</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.8 }}>Premium travel curation for southern Sri Lanka. {ALL_PLACES.length}+ handpicked experiences.</p>
            </div>
            {[{ title: "Explore", links: ["Beaches", "Wildlife", "Historical", "Adventure", "Cultural", "Nature", "Luxury", "Food"] }, { title: "Districts", links: ["Galle", "Matara", "Hambantota", "Deniyaya"] }, { title: "Support", links: ["About Us", "Contact", "Privacy Policy", "FAQs"] }].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</p>
                {col.links.map(l => (
                  <button key={l} onClick={() => { if (CATEGORIES.includes(l)) { setCatFilter(l); setPage("explore"); } else if (DISTRICTS.includes(l)) { setDistrictFilter(l); setPage("explore"); } window.scrollTo(0,0); }}
                    style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 10, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#f0c060"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</button>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 32px", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>© 2025 CeyGo Luxury Travel · All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>🇱🇰 Sri Lanka · 🌐 EN · 💵 USD</p>
          </div>
        </footer>
      </div>
    </>
  );
}