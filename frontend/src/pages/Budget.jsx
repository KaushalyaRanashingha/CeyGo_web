import React, { useState } from "react";
import { Hotel, Car, Utensils, Ticket } from "lucide-react";

const Budget = () => {
  const [hotel, setHotel] = useState(0);
  const [transport, setTransport] = useState(0);
  const [food, setFood] = useState(0);
  const [activities, setActivities] = useState(0);

  const total =
    Number(hotel) + Number(transport) + Number(food) + Number(activities);

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-14">
          Budget Planner
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hotel */}
          <div className="border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Hotel className="text-blue-600" />
              <h2 className="text-2xl font-bold">Hotel</h2>
            </div>

            <input
              type="number"
              placeholder="Hotel Cost"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setHotel(e.target.value)}
            />
          </div>

          {/* Transport */}
          <div className="border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-blue-600" />
              <h2 className="text-2xl font-bold">Transport</h2>
            </div>

            <input
              type="number"
              placeholder="Transport Cost"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setTransport(e.target.value)}
            />
          </div>

          {/* Food */}
          <div className="border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="text-blue-600" />
              <h2 className="text-2xl font-bold">Food</h2>
            </div>

            <input
              type="number"
              placeholder="Food Cost"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setFood(e.target.value)}
            />
          </div>

          {/* Activities */}
          <div className="border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Ticket className="text-blue-600" />
              <h2 className="text-2xl font-bold">Activities</h2>
            </div>

            <input
              type="number"
              placeholder="Activities Cost"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setActivities(e.target.value)}
            />
          </div>
        </div>

        {/* Total */}
        <div className="mt-14 bg-blue-600 text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Estimated Total Budget</h2>

          <p className="text-6xl font-extrabold">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default Budget;
