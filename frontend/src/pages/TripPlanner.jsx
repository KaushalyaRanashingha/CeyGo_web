import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { FaHotel, FaCar, FaUtensils, FaRobot } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TripPlanner.css";

const containerStyle = {
  width: "100%",
  height: "500px"
};

export default function TripPlanner() {
  const [selectedPlaces, setSelectedPlaces] = useState([
    { title: "Galle Fort", coordinates: { lat: 6.0260, lng: 80.2170 } },
    { title: "Unawatuna Beach", coordinates: { lat: 6.0105, lng: 80.2482 } },
    { title: "Mirissa Beach", coordinates: { lat: 5.9481, lng: 80.4545 } },
  ]);

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(0);
  const [itinerary, setItinerary] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const [activeScreen, setActiveScreen] = useState(""); // hotel, car, food, chatbot
  const [hotelData, setHotelData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [chatbotActive, setChatbotActive] = useState(false);

  // Google Map loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBGkT20ghTKFoXOKdjwLoeEg4c9Izw6nDE",
    libraries: ["places"]
  });

  // User location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => console.warn(err)
    );
  }, []);

  const center = userLocation || { lat: 6.9271, lng: 79.8612 };

  // Directions & distance
  useEffect(() => {
    if (!isLoaded || !userLocation || selectedPlaces.length < 1) return;

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = selectedPlaces.slice(1, -1).map(p => ({
      location: p.coordinates,
      stopover: true
    }));

    directionsService.route(
      {
        origin: userLocation,
        destination: selectedPlaces[selectedPlaces.length - 1].coordinates,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);

          let totalDistance = 0;
          result.routes[0].legs.forEach(leg => totalDistance += leg.distance.value);
          setDistance((totalDistance / 1000).toFixed(2));

          generateItinerary();
        }
      }
    );
  }, [isLoaded, selectedPlaces, userLocation]);

  const generateItinerary = () => {
    const days = Math.ceil(selectedPlaces.length / 3);
    let plan = [];
    let index = 0;

    for (let day = 1; day <= days; day++) {
      let places = [];
      for (let i = 0; i < 3 && index < selectedPlaces.length; i++) {
        places.push(selectedPlaces[index].title);
        index++;
      }
      plan.push({ day, places });
    }
    setItinerary(plan);
  };

  // Add / Remove Places
  const addPlace = () => {
    const title = prompt("Enter place name:");
    const lat = parseFloat(prompt("Enter latitude:"));
    const lng = parseFloat(prompt("Enter longitude:"));
    if (title && !isNaN(lat) && !isNaN(lng)) {
      setSelectedPlaces([...selectedPlaces, { title, coordinates: { lat, lng } }]);
    }
  };

  const removePlace = (index) => {
    const updated = [...selectedPlaces];
    updated.splice(index, 1);
    setSelectedPlaces(updated);
  };

  // Dynamic data for each icon
  useEffect(() => {
    if (activeScreen === "hotel") {
      const hotels = selectedPlaces.map(place => ({
        placeName: place.title,
        hotels: [
          { name: `${place.title} Grand Hotel`, rating: 4.5, info: "Luxury hotel with sea view.", bookingLink: "#" },
          { name: `${place.title} Budget Stay`, rating: 4.0, info: "Affordable and comfortable.", bookingLink: "#" }
        ]
      }));
      setHotelData(hotels);
    } else if (activeScreen === "car") {
      const cars = selectedPlaces.map(place => ({
        placeName: place.title,
        cars: [
          { name: `${place.title} Rent-a-Car`, info: "Sedan / SUV options.", bookingLink: "#" },
          { name: `${place.title} Economy Cars`, info: "Budget cars available.", bookingLink: "#" }
        ]
      }));
      setCarData(cars);
    } else if (activeScreen === "food") {
      const foods = selectedPlaces.map(place => ({
        placeName: place.title,
        foods: [
          { name: `${place.title} Seafood Restaurant`, info: "Fresh seafood daily.", orderLink: "#" },
          { name: `${place.title} Street Eats`, info: "Local favorites.", orderLink: "#" }
        ]
      }));
      setFoodData(foods);
    } else if (activeScreen === "chatbot") {
      setChatbotActive(true);
    } else {
      setChatbotActive(false);
    }
  }, [activeScreen, selectedPlaces]);

  if (!isLoaded) return <h2>Loading Map...</h2>;

  return (
    <div>
      <Navbar />

      <div className="trip-container">
        <h1>🧭 Your Trip Plan</h1>
        <p>Selected Places: <b>{selectedPlaces.length}</b></p>
        <p>Total Distance: <b>{distance} km</b></p>

        <button className="btn-add" onClick={addPlace}>➕ Add Place</button>

        <ul className="place-list">
          {selectedPlaces.map((place, idx) => (
            <li key={idx}>
              {place.title}{" "}
              <button className="btn-remove" onClick={() => removePlace(idx)}>❌</button>
            </li>
          ))}
        </ul>

        <div className="map-container">
          <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={10}>
            {userLocation && <Marker position={userLocation} label="You" />}
            {selectedPlaces.map((place, index) => (
              <Marker key={index} position={place.coordinates} label={(index + 1).toString()} />
            ))}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

        <div className="icons-row">
          <FaHotel size={40} color="#1976d2" title="Hotels" onClick={() => setActiveScreen("hotel")} />
          <FaCar size={40} color="#1976d2" title="Car Rental" onClick={() => setActiveScreen("car")} />
          <FaUtensils size={40} color="#1976d2" title="Food" onClick={() => setActiveScreen("food")} />
          <FaRobot size={40} color="#1976d2" title="Chatbot" onClick={() => setActiveScreen("chatbot")} />
        </div>

        {/* ================= DETAILS SECTION ================= */}
        <div className="details-section">
          {activeScreen === "hotel" && hotelData.map((placeHotels, idx) => (
            <div key={idx} className="details-card">
              <h3>🏨 Hotels near {placeHotels.placeName}</h3>
              {placeHotels.hotels.map((hotel, i) => (
                <div key={i} className="hotel-card">
                  <h4>{hotel.name} ⭐{hotel.rating}</h4>
                  <p>{hotel.info}</p>
                  <a href={hotel.bookingLink} className="btn-book">Book Now</a>
                </div>
              ))}
            </div>
          ))}

          {activeScreen === "car" && carData.map((placeCars, idx) => (
            <div key={idx} className="details-card">
              <h3>🚗 Car Rentals near {placeCars.placeName}</h3>
              {placeCars.cars.map((car, i) => (
                <div key={i} className="hotel-card">
                  <h4>{car.name}</h4>
                  <p>{car.info}</p>
                  <a href={car.bookingLink} className="btn-book">Book Now</a>
                </div>
              ))}
            </div>
          ))}

          {activeScreen === "food" && foodData.map((placeFoods, idx) => (
            <div key={idx} className="details-card">
              <h3>🍽️ Food near {placeFoods.placeName}</h3>
              {placeFoods.foods.map((food, i) => (
                <div key={i} className="hotel-card">
                  <h4>{food.name}</h4>
                  <p>{food.info}</p>
                  <a href={food.orderLink} className="btn-book">Order Now</a>
                </div>
              ))}
            </div>
          ))}

          {activeScreen === "chatbot" && chatbotActive && (
            <div className="details-card">
              <h3>🤖 Chatbot</h3>
              <p>Hello! I am your trip assistant. Ask me about hotels, food, and car rentals.</p>
            </div>
          )}
        </div>

        <div className="itinerary-section">
          <h2>🤖 AI Trip Itinerary</h2>
          {itinerary.map((day, index) => (
            <div key={index} className="itinerary-card">
              <h3>Day {day.day}</h3>
              <ul>
                {day.places.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}