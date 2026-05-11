import { useState, useEffect } from "react";
import { SECTION_IDS } from "../data/homeData";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Destinations from "../components/home/Destinations";
import CuratedStays from "../components/home/CuratedStays";
import AIPlanner from "../components/home/AIPlanner";
import Events from "../components/home/Events";
import Testimonials from "../components/home/Testimonials";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";
import TripPlanModal from "../components/home/TripPlanModal";
import Budget from "../pages/Budget";

import "../styles/base.css";

export default function Interface() {
  const [activeNav, setActiveNav] = useState("Home");
  const [search, setSearch] = useState({
    dest: "",
    dates: "",
    budget: "",
    interests: "",
  });
  const [showPlanner, setShowPlanner] = useState(false);

  // Scroll to section function
  const handleNavClick = (label) => {
  setActiveNav(label);

  const id = SECTION_IDS[label];
  if (!id) return;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

  // Highlight active section on scroll
  useEffect(() => {
    const observers = Object.entries(SECTION_IDS).map(([label, id]) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveNav(label);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar activeNav={activeNav} onNavClick={handleNavClick} />

      <main>
        {/* HOME */}
        <section id="home">
          <Hero
            search={search}
            onSearchChange={setSearch}
            onPlanClick={() => setShowPlanner(true)}
            onNavClick={handleNavClick}
          />
        </section>

        {/* DESTINATIONS */}
        <section id="destinations">
          <Destinations
            onSearchChange={setSearch}
            onPlanClick={() => setShowPlanner(true)}
          />
        </section>

        {/* CURATED STAYS */}
        <section id="curated-stays">
          <CuratedStays />
        </section>

        {/* AI PLANNER */}
        <section id="ai-planner">
          <AIPlanner
            search={search}
            onSearchChange={setSearch}
            onPlanClick={() => setShowPlanner(true)}
          />
        </section>

        {/* EVENTS */}
        <section id="events">
          <Events
            onSearchChange={setSearch}
            onPlanClick={() => setShowPlanner(true)}
          />
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />

      {/* MODAL */}
      {showPlanner && (
        <TripPlanModal
          search={search}
          onClose={() => setShowPlanner(false)}
        />
      )}
    </>
  );
}