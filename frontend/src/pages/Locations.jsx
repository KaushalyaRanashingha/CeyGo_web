import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bot } from "lucide-react";
import "../styles/Locations.css";

/* ===============================
   DESTINATIONS DATA
================================= */

const destinations = [
  // --- Galle District ----
  {
    title: 'Jungle Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A secluded beach surrounded by dense greenery, offering tranquility and a stunning ocean view, popular for snorkeling.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.j0Q-bQCMx85MMgm23aIBvQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Japanese Peace Pagoda',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A serene white stupa located on Rumassala Hill, providing panoramic views of the ocean and surrounding area.',
    image: 'https://th.bing.com/th/id/OIP.76l_5HMicYbtAAViM5JESgHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Galle Fort',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A UNESCO World Heritage Site, showcasing a blend of Portuguese, Dutch, and British architecture, bustling with shops, cafes, and museums.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.FZleNk9cyMfs4Ki_IKTr0AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Koggala Martin Wickramasinghe House',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'The childhood home of renowned Sri Lankan writer Martin Wickramasinghe, now a museum displaying cultural artifacts.',
    image: 'https://th.bing.com/th/id/R.b081976c958740c5d3546546e56b681e?rik=MQOBmmF5Jyocow&pid=ImgRaw&r=0',
  },
  {
    title: 'Kosgoda Turtle Conservation Center',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A sanctuary dedicated to protecting endangered sea turtles, offering insight into their conservation efforts.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.6QYap5m2MSIrjxbg5PqJrgHaFg?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Pituwala Natural Pool',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A hidden natural pool with crystal-clear water, ideal for relaxation and photography.',
    image: 'https://tse3.mm.bing.net/th/id/OIP.YjkLoPpGkXbx2u1p28_FRQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    title: 'Ambalangoda Mask Museum',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'Exhibits traditional Sri Lankan masks used in rituals, with live mask-making demonstrations.',
    image: 'https://images.unsplash.com/photo-1599058917214-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Seenigama Devalaya',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A historic temple located on a small offshore island, accessible by boat.',
    image: 'https://images.unsplash.com/photo-1599058917215-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Gintota Thupārāma Temple',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An ancient Buddhist site with historical significance and spiritual importance.',
    image: 'https://images.unsplash.com/photo-1599058917216-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Dewol Devala',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A Hindu-Buddhist shrine known for its vibrant rituals and cultural ceremonies.',
    image: 'https://images.unsplash.com/photo-1599058917217-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kalvari Kanda',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A hill offering breathtaking views, known for its Catholic religious significance.',
    image: 'https://images.unsplash.com/photo-1599058917218-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Coral Garden, Hikkaduwa',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A marine sanctuary popular for snorkeling, showcasing vibrant coral reefs and marine life.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Paragoda Rajamaha Viharaya',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An ancient temple known for its Buddhist heritage and serene atmosphere.',
    image: 'https://images.unsplash.com/photo-1606913443589-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kanneliya Rainforest Reserve',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A lush rainforest, rich in biodiversity, ideal for hiking and birdwatching.',
    image: 'https://images.unsplash.com/photo-1599058917220-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kottawa Arboretum',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A botanical garden showcasing endemic flora and fauna of Sri Lanka.',
    image: 'https://images.unsplash.com/photo-1599058917221-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Unawatuna Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A famous beach with calm waters, ideal for swimming and water sports.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Hikkaduwa Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A lively beach known for its vibrant nightlife, surfing, and coral reefs.',
    image: 'https://images.unsplash.com/photo-1617196038825-d92f0da2f93a?fit=crop&w=2029&q=80',
  },
  {
    title: 'Madol Duwa',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An island featured in a famous Sri Lankan novel, accessible by boat, perfect for nature lovers.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=2021&q=80',
  },
  {
    title: 'Dooli Ella',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A serene waterfall hidden within the lush greenery.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?fit=crop&w=1887&q=80',
  },
  {
    title: 'Mihiripenna Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A quiet beach with shallow waters, perfect for families and relaxation.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=2021&q=80',
  },
  {
    title: 'Malamure Ella',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A picturesque waterfall surrounded by tropical vegetation.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?fit=crop&w=1887&q=80',
  },
  {
    title: 'Kande Viharaya',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A significant Buddhist temple with a massive seated Buddha statue.',
    image: 'https://images.unsplash.com/photo-1599058917222-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Boossa',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A coastal area known for its pristine beaches and laid-back atmosphere.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Brief Garden',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A beautifully landscaped garden designed by Bevis Bawa, featuring sculptures and tropical plants.',
    image: 'https://images.unsplash.com/photo-1606913443585-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Akurala Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A tranquil beach with rock formations and clear waters.',
    image: 'https://images.unsplash.com/photo-1617196038825-d92f0da2f93a?fit=crop&w=2029&q=80',
  },
  {
    title: 'Ada Hala Ella',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A small but charming waterfall amidst the wilderness.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?fit=crop&w=1887&q=80',
  },
  {
    title: 'Maduganga River',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A picturesque lagoon and mangrove ecosystem, ideal for boat safaris.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=2021&q=80',
  },
  {
    title: 'National Maritime Museum, Galle',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A museum showcasing the maritime history of Sri Lanka.',
    image: 'https://images.unsplash.com/photo-1587740896333-50aa1d45e4f5?fit=crop&w=2070&q=80',
  },
  {
    title: 'Galle National Museum',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'Exhibits artifacts highlighting Galle’s rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1606913443585-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Thalpe Beach',
    location: 'Galle District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'Known for its iconic natural rock pools.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },

  // --- Matara District ---
  {
    title: 'Mirissa Beach',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A stunning beach famous for whale watching, surfing, and a vibrant nightlife.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Paravi Duwa Temple',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A small Buddhist temple on an island, connected by a bridge.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=2021&q=80',
  },
  {
    title: 'Star Fort, Matara',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A unique star-shaped fort built by the Dutch for defense purposes.',
    image: 'https://images.unsplash.com/photo-1587740896333-50aa1d45e4f5?fit=crop&w=2070&q=80',
  },
  {
    title: 'Matara Fort',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A historical fort featuring colonial architecture and cultural landmarks.',
    image: 'https://images.unsplash.com/photo-1606913443585-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Weherahena Temple',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A Buddhist temple known for its massive Buddha statue and underground tunnels.',
    image: 'https://images.unsplash.com/photo-1606913443589-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Coconut Tree Hill',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A picturesque hill dotted with coconut trees, offering stunning ocean views.',
    image: 'https://images.unsplash.com/photo-1606913443590-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kamburugamuwa',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A quiet coastal village with scenic beauty.',
    image: 'https://images.unsplash.com/photo-1606913443591-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Devinuwara Upulwan Devalaya',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A sacred Hindu temple dedicated to Lord Vishnu.',
    image: 'https://images.unsplash.com/photo-1606913443592-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Dellawa',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A tranquil area surrounded by tea plantations and forests.',
    image: 'https://images.unsplash.com/photo-1606913443593-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Gurubeula',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A picturesque village with lush landscapes.',
    image: 'https://images.unsplash.com/photo-1606913443594-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Olu Dola',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A serene water stream perfect for picnics and nature walks.',
    image: 'https://images.unsplash.com/photo-1606913443595-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Morning Side',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A high-altitude area offering misty views and cool weather.',
    image: 'https://images.unsplash.com/photo-1606913443596-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Patna',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A scenic estate known for its tea cultivation.',
    image: 'https://images.unsplash.com/photo-1606913443597-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Gatabaru Viharaya',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A Buddhist temple with a rich history and serene ambiance.',
    image: 'https://images.unsplash.com/photo-1606913443598-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Atuwala Gorge',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A natural gorge with stunning views.',
    image: 'https://images.unsplash.com/photo-1606913443599-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Mugunumulla Ella',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A lesser-known waterfall surrounded by untouched beauty.',
    image: 'https://images.unsplash.com/photo-1606913443600-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Thunbodhiya',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A Buddhist heritage site.',
    image: 'https://images.unsplash.com/photo-1606913443601-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Elamaldeniya',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A quaint village known for its rural charm.',
    image: 'https://images.unsplash.com/photo-1606913443602-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Ethamala Ella',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A magnificent waterfall nestled in the jungle.',
    image: 'https://images.unsplash.com/photo-1606913443603-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Sathmala Ella',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A series of cascading waterfalls.',
    image: 'https://images.unsplash.com/photo-1606913443604-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Samanagala Temple',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A historic temple offering breathtaking views.',
    image: 'https://images.unsplash.com/photo-1606913443605-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kurulugala',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A rock formation known for its panoramic views.',
    image: 'https://images.unsplash.com/photo-1606913443606-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Lankagama',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A gateway to the Sinharaja rainforest.',
    image: 'https://images.unsplash.com/photo-1606913443607-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Sinharaja Rainforest',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A UNESCO World Heritage site rich in endemic species.',
    image: 'https://images.unsplash.com/photo-1606913443608-123456789def?fit=crop&w=2024&q=80',
  },
  {
    title: 'Gongala',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A high-altitude peak ideal for trekking.',
    image: 'https://images.unsplash.com/photo-1606913443609-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Olu Ella',
    location: 'Matara District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A serene waterfall surrounded by natural beauty.',
    image: 'https://images.unsplash.com/photo-1606913443610-123456789def?fit=crop&w=2024&q=80',
  },

  // --- Hambantota District ---
  {
    title: 'Kirinda Temple',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A seaside Buddhist temple with historical significance.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c1c?fit=crop&w=2024&q=80',
  },
  {
    title: 'Tissamaharama Temple',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An ancient Buddhist temple with stupas and serene surroundings.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c1d?fit=crop&w=2024&q=80',
  },
  {
    title: 'Ridiyagama Safari Park',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A wildlife park offering safari experiences with exotic animals.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?fit=crop&w=2024&q=80',
  },
  {
    title: 'Hambantota Bird Sanctuary',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A haven for birdwatchers.',
    image: 'https://images.unsplash.com/photo-1501706362039-c6e13c3b9d62?fit=crop&w=2024&q=80',
  },
  {
    title: 'Dematamal Viharaya',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A historic Buddhist temple.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c1e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Maligawila',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'Known for its massive ancient Buddha statue.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c1f?fit=crop&w=2024&q=80',
  },
  {
    title: 'Sella Kataragama',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A sacred pilgrimage site.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c20?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kirivehera',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An ancient stupa of great spiritual importance.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c21?fit=crop&w=2024&q=80',
  },
  {
    title: 'Kataragama Devalaya',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A multi-religious shrine with vibrant rituals.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c22?fit=crop&w=2024&q=80',
  },
  {
    title: 'Wedihitikanda',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A hill with religious significance, popular among pilgrims.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=2024&q=80',
  },
  {
    title: 'Bundala National Park',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A wetland sanctuary famous for birdwatching.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=2024&q=80',
  },
  {
    title: 'Weheragala Reservoir',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A scenic water reservoir.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=2024&q=80',
  },
  {
    title: 'Sithulpawwa',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'An ancient Buddhist monastery located in a tranquil forest.',
    image: 'https://images.unsplash.com/photo-1581091870627-3a5c1c1c1c23?fit=crop&w=2024&q=80',
  },
  {
    title: 'Yala Safari',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A renowned wildlife sanctuary known for its leopard sightings.',
    image: 'https://images.unsplash.com/photo-1508675801627-066ac4346a4b?fit=crop&w=2024&q=80',
  },
  {
    title: 'Adagala',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A rocky outcrop with panoramic views.',
    image: 'https://images.unsplash.com/photo-1500534314209-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Tangalle Parewella',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A scenic coastal area.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=2024&q=80',
  },
  {
    title: 'Hummanaya Blowhole',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'The second-largest blowhole in the world.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3f?fit=crop&w=2024&q=80',
  },
  {
    title: 'Bata Atha Farm',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A sustainable farming initiative open to visitors.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?fit=crop&w=2024&q=80',
  },
  {
    title: 'Rekawa Turtle Conservation',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A nesting site for sea turtles.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d30?fit=crop&w=2024&q=80',
  },
  {
    title: 'Madunagala Hot Springs',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'Natural thermal baths with healing properties.',
    image: 'https://images.unsplash.com/photo-1500530855697-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Mirijjawila Botanical Garden',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A lush garden showcasing a variety of plants.',
    image: 'https://images.unsplash.com/photo-1501004318641-123456789abc?fit=crop&w=2024&q=80',
  },
  {
    title: 'Ussangoda',
    location: 'Hambantota District',
    coordinates: { lat: 6.3610, lng: 81.4980 },
    description: 'A unique plateau with reddish soil and a fascinating history.',
    image: 'https://images.unsplash.com/photo-1501785888041-123456789abc?fit=crop&w=2024&q=80',
  },
];

const areas = [
  "Galle District",
  "Matara District",
  "Hambantota District",
];

/* ===============================
   COMPONENT
================================= */

export default function Locations() {
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState("Galle District");
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  /* Filter by district */
  const filteredDestinations = destinations.filter(
    (dest) => dest.location === selectedArea
  );

  /* Toggle multi select */
  const togglePlaceSelection = (place) => {
    const exists = selectedPlaces.find((p) => p.title === place.title);

    if (exists) {
      setSelectedPlaces(
        selectedPlaces.filter((p) => p.title !== place.title)
      );
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  return (
    <div className="locations-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <header className="locations-hero">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=1600&q=80"
          alt="Down South Sri Lanka"
          className="locations-hero-image"
        />
        <div className="locations-hero-overlay"></div>

        <div className="locations-hero-content">
          <h1>
            Explore <span>Down South Sri Lanka</span>
          </h1>
          <p>
            Select your favorite destinations and create your own custom trip.
          </p>
        </div>
      </header>

      {/* ================= AREA SELECTION ================= */}
      <section className="area-selection-section">
        <div className="area-buttons-wrapper">
          {areas.map((area) => (
            <button
              key={area}
              className={`area-button ${
                area === selectedArea ? "active" : ""
              }`}
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="destinations-section">
        <h2 className="section-title">
          Top Picks in {selectedArea}
        </h2>

        <div className="destinations-grid">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest, index) => {
              const isSelected = selectedPlaces.find(
                (p) => p.title === dest.title
              );

              return (
                <motion.div
                  key={index}
                  className="destination-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="destination-image-wrapper">
                    <motion.img
                      src={dest.image}
                      alt={dest.title}
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>

                  <div className="destination-content">
                    <span className="destination-location">
                      {dest.location}
                    </span>
                    <h3>{dest.title}</h3>
                    <p>{dest.description}</p>

                    <button
                      className={`destination-btn ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => togglePlaceSelection(dest)}
                    >
                      {isSelected
                        ? "Selected ✓"
                        : "Select Place"}
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p>No destinations found.</p>
          )}
        </div>
      </section>

      {/* ================= PLAN TRIP BUTTON ================= */}
      {selectedPlaces.length > 0 && (
        <div className="plan-trip-container">
          <button
            className="plan-trip-btn"
            onClick={() =>
              navigate("/TripPlanner", {
                state: { places: selectedPlaces },
              })
            }
          >
            Plan My Trip ({selectedPlaces.length})
          </button>
        </div>
      )}

      <Footer />

      {/* ================= CHATBOT BUTTON ================= */}
      <div className="chatbot-btn">
        <button>
          <Bot size={22} />
          <div className="tooltip">
            Need help planning?
          </div>
        </button>
      </div>
    </div>
  );
}