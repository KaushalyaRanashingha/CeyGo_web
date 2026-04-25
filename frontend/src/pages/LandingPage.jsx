import { useState, useEffect } from "react";
import LoginPage  from "./Login";
import SignupPage from "./Signup";

const NAV_LINKS = ["Home", "Destinations", "Beach Stays", "AI Planner", "Events", "Contact"];

const DESTINATIONS = [
  { name: "Galle Fort", tag: "UNESCO Heritage", rating: "4.9", season: "Dec – Apr", desc: "Colonial charm meets luxury boutiques.", large: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq8_gArPJAejoHFk5rRQC8Cj6LIQKMDRJ6qMzmSJa8tcFfa6UAeAPW3KxuDfvBj0zbbHmoevkX39GpEy8xlpYGRST-1hz_-DfLLD7DjaKb70qTevWLe82yPcLVErNeYkQoNL3vH1nKqaC2Q3T12BYm-sDYetByNVpCQiPKibyAhxJrkOSWRv9vtITUxjSDCs3S9bvkZyt9VGWDuD3PE6LoZ7lPHEeo2elBekle_Zua1cIJSY9s6rHogs499dCp4OFpMHnzCP3H3oI" },
  { name: "Mirissa", tag: "Whales & Surf", season: "Oct – May", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZ5nL4WtCo8ThX5qRQZ128O6ls6fQhvsorKTtwJ-RKVr1sL-_wJ2wsxffBs9mdX5ZRW9tKAIWTM2b1scDiwbaun32UnijuYoR_gYiCed_noczCgTuPE2UFaD_PqRse4sBCQ1JyGeUACP8TL9yMH2GTj09ux-xviN3NrRU47ZEZLxR07n0erHhFo5lckKFIXEPna7cL1a5cZFCqJ1ePoKViFQHROBOnD5BFzXXC3pMLtjrKR85QKUOREne_dewB0wBPSc22Uf_4PU" },
  { name: "Unawatuna", tag: "Jungle Beach", season: "Nov – Apr", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlD81_SyBfwFRWFlTZss9sTMGJT6OM9F0mztgWWVMht0pC_WB1X4Dq00ypGyLmIS4NJstHzbhv5TtUYs2XWG8czLiu5-w_Y7g7MyenagRvKXp8EEHB0v8YEjT3ilp5srHQ5ZbcIfWF8xtB12pvkFtaDk0yTkQozWJBORBMzNzYpTKqQIWSkE-qWiW9NarH1-wrrnn8ty8mGTNGMynVZwn3n98epBTeXvFd0uN_aqHSJH52cUmKhhS0N8j1clpVvqEM8t60TRbZyZg" },
  { name: "Weligama", tag: "Beginner Surf", season: "Year-round", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAht-G4wP7_oCvyTG6A9hLfR7zd1oQbr8YhZdqnljVJY8tDFZeg6gNi5fTLKvOlup6yPUM2F5mss-4_YDGJ3Oqsa-rSA7DfTZEKJqKdJWy-yw5tIBer4rwy2XtLUDiCxHLRGpMnLjeTV-82NILKAQNc0ESGDLKMks9zApFWOC4_apsMyNAF2GwgF-9SD6oDbo8PL8Cdo1fQWOiIP0EG3SPSKrr4" },
  { name: "Yala", tag: "Wildlife Safari", season: "Feb – Jun", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpaOvSziAdDxxaGjojV3vqXeNP1kqSKRUPLpp_3rAvOiCT88W_Drk1PBWwthtDgX_ee9V7IgeFvjOLEx7oBzb94ft8Xo5A1kz7etIuWAkwZwWvM3GXkUH9hRGHHEAzsibBHmOS4d-q2yRpelCv-Q7nbCqHyL1ESHV9ntKqcutq-FO1ncRaCkk2NDkttCSelxjNT_q_T9kiHEuZ3BtrWfLukfY3R2iF5y2k4Pp9PhJcE1eZrFbVSs5qa9F7i7ZYZAr_ckIdU1wFr68" },
];

const HOTELS = [
  { name: "Cape Weligama", price: "$450+", stars: 5, desc: "Cliff-top villas with 360-degree ocean views.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARXEV6840M1bzDUNsB4b_lIockXTRUG6H1PJ5fVOV4idN9YDaaC1bfjGRq927EAyKS03ddeEa7wjCfXTmk2FTNUaq9-H4-ayqI6qGmHQynu7a-RAfCcyiN72rU4WmK3amvMGGbP4YEtkEybmhr-8uc2NAKLuEhlE5835wsxPr_Pso2Q9mAz1POCV4oLFBtFd0pVzmbqTRl1tXzOZjfNQ8ojXCC0_VjGdjXAxDoqcYzst0MaPAmUGD6bOkrMAjC0iVfOsHgj4MDsuU" },
  { name: "Jetwing Lighthouse", price: "$280+", stars: 4, desc: "Geoffrey Bawa architectural masterpiece in Galle.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGPUIbOlEUijbExF7n1XQykPTemGK0bahQCu60RC_T5-nJcaAFcxMJkhXAXV9zJuelowicICzhKWz2dP01WArH-vHDlzmHJfN3l8ISVPRte09Rs3kYvqOMtdAubLokTth8JA5Qw-Ajh3q_t3RqsVKg2zj7624PZ4medP-pfRpjdb822AmQGhjBslMkS-90FjabJXcl07jV2rFJVcjmE1BruT1-PTJ37ikIZ0GF7x7kwJNcEt0Y5hjzdGsrl19xYIr0dUdKL-a767k" },
];

const ATTRACTIONS = [
  { name: "Whale Watching", tag: "4–6 Hours", icon: "🐋", desc: "Witness majestic Blue Whales in their natural habitat at Mirissa.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA9tWBfPRngBKz0I04xpZe3lyTcAXHkkOGMS-hRu0Pb42jxKb-VdnZj6wctCY4_7SILAwIt83UhkFsOVrrB_MtUCsS3vOSsHb9Dhku23xiD6M0Gq91LC7VVFOhQ_L_2BUYE9kHHBflbhOlbIs4laJ3GVVfU5yE0ysXSunkZwQ7N7xn31nxeIYglGmk_4oFFG7pDaCYzTQh07GvArjzvSIM-fjgGaT5eZ2QqbOm2QwdM6u-iOJPLN15KkZJC0KrdzGd3IJucnEbekU" },
  { name: "Turtle Hatchery", tag: "Sustainable", icon: "🐢", desc: "Support conservation efforts and release hatchlings into the sea.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzv9zeNoiX9omF6VlrAjnMUJvQPib0B3h15IutVywphFGg5NXUpG5-oowoNttM3CxuW-kZ1TS1k_1mG1WzBv389U_89aSs1LEkJiytz8cXKTDPzms-7qonsTfM8H8EQZJsXWodoZYDVt4BoZ0_mneRxV0AG_l42Mpetb7HM6EqV0Nr-SJu3hEziB-WDgSw1fxZEUB77xRryKdblhUgNZF0TQ-ib8asP-NCVTmk0TPF5Tj1S_VK-aoTRCjvbP27558fzUYQrmjQCXU" },
];

const EVENTS = [
  { name: "Galle Literary Festival", dates: "JAN 24–28", desc: "A gathering of the world's finest writers within the historic fort walls.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFqL21W3rqR9AwDg7CWWOyAUO0KxiCQKh221R8-qrEXVcRu5x-TBpsIVmG99R_CAU4oCygok61t9JfhjH8jNA1XgxSSe6q9gegOqcA8delZ25pyV80jbVaOAJ5u4yJDixct9PGl6PMNOOUiQoxqUeFOcwGh41_wLD9kFiCeNazTR4DSx2jthqnuXuEKA9YIkF3pGc4jymZI2mqez8ubiS9_ZV9Fyb6dX4FMwNOBLxac0zSaUl0OSJRHNuHMNQmAp5CmHMiHBRVwT0" },
  { name: "Southern Music Festival", dates: "FEB 14–16", desc: "Experience world-class electronic beats on the golden sands of Mirissa.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeA508Gymuy9kPriv4hHzhNICVJ6t6QHfLQXYtpS2tVtlXbec1cXkjyPNblKF7y5CTVL2UcyrLsx1QNH5DisIqZNWecRyPZNM3Uy3fC-PfwA_vbKRRhlu9-4_ArmPR2VK8GZenj2NbmJNzviNgLfO4Xq2QqG58h8xGkpm2aabtJCvhh6hvT9e9qTvpRpFzfI3kG0_HBKSnqYXolvTD0Qjs_mY8SwuPbufABC7JOd8LmlfAEBe4g9FWXCPssJ9IQWAYc90-EESoMtU" },
  { name: "Hikkaduwa Surf Open", dates: "MAR 05–10", desc: "Watch professional surfers tackle the famous A-frame reef breaks.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKZ8T5AwJjTmNDmhvoxmVu_AQW9qs9knhym3EiyHv0MzC37JCCvaP5D-0jfA8QaAstzHfP_ZCKjYzc_4zFJV4zq2R5EFcNPt1LJg4GDQd5t1-qovPrwhOaJPO5W7NFbC7LKTHVh2EVN2OWm-HEy9VJsOXJB0kh7aDOIfHPDR2M3A3tFjK1SVbd4ZqF9wtxALnerBIQr1Nmt_bNj2RTcVuBoqa0T9G7Tw-GDrArX6vuYKW8f3o27BramfsLhDXGXJSNEE3iia3_OJs" },
];

const FEATURES = [
  { icon: "✦", title: "AI Itinerary",     desc: "Personalized plans that learn your preferences with every click.", color: "#a7c8ff" },
  { icon: "◈", title: "Smart Budgeting",  desc: "Optimize your spending for maximum luxury at the right price.",   color: "#76f3ea" },
  { icon: "◎", title: "Real-Time Weather",desc: "Microlocal forecasts for specific beach spots in real-time.",     color: "#ffb68d" },
  { icon: "◉", title: "24/7 Concierge",   desc: "AI-powered support for instant bookings and local advice.",       color: "#a7c8ff" },
];

const TESTIMONIALS = [
  { quote: "The AI planner found a secluded villa in Tangalle that wasn't even on major booking sites. Truly bespoke service.", name: "Sarah Jenkins", country: "United Kingdom 🇬🇧", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMeCRjzkxYj5f09HlSo3xHqJzmr_nkCedOfdCA6cU_s7_A4GVzu2S0qTSrAfxXqRaI47SJ-IBI-oFkT_W_xFFXrlVgboqDDqJ36A_25jIE-1_i6PWh-IHS3JVjtoOdSt5lqJH-ApRfjECPNSBm5qh7r-cuj56dqvcvnxWfOLXqfmGF_WfFam4VTnA3eSkMkB5QY7kO_cxqShK562SfxJ5XoMJwzZwT1xERbpwmi7y6CdpOpctM1xARDnz25jNMWTbq1ocrBtr1zO0" },
  { quote: "CeyGo made our honeymoon seamless. The restaurant recommendations in Galle Fort were spot on for every dinner.", name: "Marc-André", country: "France 🇫🇷", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKQqyNdLCzhtXb4JPgpQnpsn4QsNJbPQFQpO_EAn8G8CPFbN2DuVdEZU1hhXloqOrGQpNINyb-amcib1yCgQVSZV5eX2dCJ4Mh2EEVWALf521V2aGkV2xeD0iCFMob7_SWA5Zt009N4IS8FA7u0aX-tWsfJtEPPyZ3ZOn8QSzCUbEwImTYqb75mvL74mC0DM4KlyghVh-FMbJ6pVr0C57QvTlvWxr1YiGiKHOcUlFoKVhynA5uAWVSxnNsQLkpopyy0yIZkN5D0Qw" },
  { quote: "I've traveled to Sri Lanka 5 times, but this AI planner showed me hidden surf spots in Weligama I never knew existed.", name: "David Rossi", country: "Australia 🇦🇺", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdHMUznqv6nBx9QICCOgchBvCBTdmWfZbsPxiHhlM1v1IHY8zh6qBk6dz1w6UixdS-G6j3X-_Yt-jHUvywG8j-lDfF6G44zk5In_YQULeygRhELcPx-Z75Zct9qyosubXIpLhPnWDUy4QUsNr3Yrt0BSsZZWmCBLUfSm49SjhgIWvVlCGzTOseDrQ" },
];

const SECTION_IDS = {
  "Home": "section-home", "Destinations": "section-destinations",
  "Beach Stays": "section-beach-stays", "AI Planner": "section-ai-planner",
  "Events": "section-events", "Contact": "section-contact",
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --navy:#001e40; --teal:#006a65; --sand:#fdf9f1;
    --light-teal:#76f3ea; --muted:#43474f;
    --card-bg:rgba(255,255,255,0.72); --border:rgba(0,30,64,0.08);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;background:var(--sand);color:var(--navy);overflow-x:hidden}
`;

const styles = `
  ${baseStyles}
  .nav{position:sticky;top:0;z-index:100;background:rgba(253,249,241,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 40px;height:68px;display:flex;align-items:center;justify-content:space-between}
  .nav-logo{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;font-style:italic;color:var(--navy);cursor:pointer;user-select:none}
  .nav-links{display:flex;gap:36px;list-style:none}
  .nav-links a{font-size:13px;font-weight:500;color:rgba(0,30,64,0.6);text-decoration:none;letter-spacing:.02em;transition:color .2s;cursor:pointer}
  .nav-links a:hover,.nav-links a.active{color:var(--teal)}
  .nav-cta{display:flex;gap:16px;align-items:center}
  .btn-ghost{background:none;border:none;font-size:13px;font-weight:500;color:var(--navy);cursor:pointer;font-family:inherit;padding:8px 12px;border-radius:8px;transition:background .2s}
  .btn-ghost:hover{background:rgba(0,30,64,0.06)}
  .btn-primary{background:var(--navy);color:white;border:none;padding:10px 26px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .2s;letter-spacing:.03em}
  .btn-primary:hover{opacity:.88;transform:translateY(-1px)}
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.65)}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--sand) 100%)}
  .hero-content{position:relative;z-index:2;text-align:center;color:white;padding:0 24px;max-width:900px}
  .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,7vw,80px);font-weight:700;line-height:1.1;letter-spacing:-.02em;margin-bottom:20px}
  .hero-sub{font-size:17px;font-weight:300;line-height:1.7;color:rgba(255,255,255,.88);margin-bottom:36px;max-width:560px;margin-left:auto;margin-right:auto}
  .btn-hero{background:var(--teal);color:white;border:none;padding:16px 40px;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s;box-shadow:0 8px 32px rgba(0,106,101,.35);letter-spacing:.04em}
  .btn-hero:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(0,106,101,.4)}
  .search-bar{margin-top:52px;background:rgba(255,255,255,.88);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.5);border-radius:20px;padding:20px 28px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto;gap:0;max-width:860px;margin-left:auto;margin-right:auto}
  .search-field{padding:8px 24px;border-right:1px solid rgba(0,30,64,.1)}
  .search-field:last-of-type{border-right:none}
  .search-label{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(0,30,64,.45);margin-bottom:4px}
  .search-input{background:transparent;border:none;outline:none;font-size:14px;font-family:inherit;color:var(--navy);width:100%}
  .search-input::placeholder{color:rgba(0,30,64,.35)}
  .btn-search{background:var(--navy);color:white;border:none;border-radius:12px;padding:0 28px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:opacity .2s,transform .2s;display:flex;align-items:center;gap:8px}
  .btn-search:hover{opacity:.85;transform:translateY(-1px)}
  .section{max-width:1200px;margin:0 auto;padding:100px 40px}
  .section-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:52px}
  .section-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:700;color:var(--navy)}
  .section-sub{font-size:14px;color:var(--muted);margin-top:6px}
  .link-view-all{font-size:13px;font-weight:600;color:var(--teal);letter-spacing:.04em;display:flex;align-items:center;gap:6px;cursor:pointer;background:none;border:none;font-family:inherit;transition:gap .2s}
  .link-view-all:hover{gap:10px}
  .bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,288px);gap:16px}
  .dest-card{position:relative;overflow:hidden;border-radius:24px;cursor:pointer}
  .dest-card.large{grid-column:span 2;grid-row:span 2}
  .dest-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .55s cubic-bezier(.25,.46,.45,.94)}
  .dest-card:hover img{transform:scale(1.07)}
  .dest-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,20,50,.85) 0%,transparent 55%)}
  .dest-card.large .dest-overlay{background:linear-gradient(to top,rgba(0,20,50,.92) 0%,transparent 50%)}
  .dest-info{position:absolute;bottom:0;left:0;padding:28px;width:100%}
  .dest-badge{display:inline-block;background:rgba(118,243,234,.18);backdrop-filter:blur(8px);color:#59dad1;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:100px;margin-bottom:8px}
  .dest-rating{display:inline-flex;align-items:center;gap:4px;color:#fbbf24;font-size:12px;font-weight:600;margin-left:8px}
  .dest-name{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:white;line-height:1.1}
  .dest-card:not(.large) .dest-name{font-size:22px}
  .dest-season{font-size:12px;color:rgba(255,255,255,.7);margin-top:4px}
  .dest-desc{font-size:13px;color:rgba(255,255,255,.75);margin:10px 0 18px;max-width:300px}
  .btn-outline-white{background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.3);color:white;padding:10px 22px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .2s,color .2s;letter-spacing:.04em}
  .btn-outline-white:hover{background:white;color:var(--navy)}
  .bg-subtle{background:#f4f0e6}
  .curated-section{max-width:1200px;margin:0 auto;padding:100px 40px}
  .curated-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px}
  .curated-col-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--navy);margin-bottom:28px;display:flex;align-items:center;gap:12px}
  .card-row{display:flex;gap:20px;background:var(--card-bg);border-radius:20px;padding:16px;transition:box-shadow .25s,transform .25s;cursor:pointer;margin-bottom:16px}
  .card-row:hover{box-shadow:0 12px 40px rgba(0,30,64,.1);transform:translateY(-2px)}
  .card-thumb{width:108px;height:108px;border-radius:14px;overflow:hidden;flex-shrink:0}
  .card-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
  .card-row:hover .card-thumb img{transform:scale(1.08)}
  .card-body{display:flex;flex-direction:column;justify-content:center;flex:1}
  .card-name{font-weight:700;font-size:16px;color:var(--navy)}
  .card-price{font-size:14px;font-weight:700;color:var(--teal)}
  .stars{color:#f59e0b;font-size:12px;margin:4px 0}
  .card-desc{font-size:13px;color:var(--muted);margin-top:4px;line-height:1.5}
  .card-tag{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--teal);margin:4px 0}
  .events-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .event-card{background:white;border-radius:28px;overflow:hidden;box-shadow:0 4px 24px rgba(0,30,64,.07);transition:transform .25s,box-shadow .25s;cursor:pointer}
  .event-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,30,64,.13)}
  .event-img-wrap{position:relative;height:200px;overflow:hidden}
  .event-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
  .event-card:hover .event-img-wrap img{transform:scale(1.06)}
  .event-date{position:absolute;top:16px;left:16px;background:rgba(253,249,241,.92);backdrop-filter:blur(8px);color:var(--navy);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:100px}
  .event-body{padding:28px}
  .event-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--navy);margin-bottom:10px}
  .event-desc{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:20px}
  .btn-event{width:100%;border:1.5px solid rgba(0,30,64,.15);background:transparent;color:var(--navy);padding:12px;border-radius:12px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:background .2s,color .2s}
  .btn-event:hover{background:var(--navy);color:white}
  .features-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:48px}
  .feature-item{display:flex;flex-direction:column;align-items:center;text-align:center}
  .feature-icon-wrap{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px}
  .feature-title{font-weight:700;font-size:16px;color:var(--navy);margin-bottom:8px}
  .feature-desc{font-size:13px;color:var(--muted);line-height:1.6}
  .testimonials-section{background:var(--navy);color:white;padding:100px 40px}
  .testimonials-inner{max-width:1200px;margin:0 auto}
  .testimonials-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:700;color:white;text-align:center;margin-bottom:60px}
  .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .testimonial-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:28px;padding:36px;backdrop-filter:blur(8px);transition:background .25s}
  .testimonial-card:hover{background:rgba(255,255,255,.11)}
  .testimonial-quote{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;line-height:1.6;color:rgba(255,255,255,.9);margin-bottom:28px}
  .testimonial-author{display:flex;align-items:center;gap:14px}
  .testimonial-avatar{width:48px;height:48px;border-radius:100px;overflow:hidden;flex-shrink:0}
  .testimonial-avatar img{width:100%;height:100%;object-fit:cover}
  .testimonial-name{font-weight:700;font-size:14px;color:white}
  .testimonial-country{font-size:12px;color:rgba(255,255,255,.5);margin-top:2px}
  .contact-section{max-width:720px;margin:0 auto;padding:100px 40px;text-align:center}
  .contact-form{display:flex;flex-direction:column;gap:16px;margin-top:40px;text-align:left}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .form-field{display:flex;flex-direction:column;gap:6px}
  .form-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .form-input,.form-textarea{border:1.5px solid rgba(0,30,64,.12);border-radius:12px;padding:12px 16px;font-size:14px;font-family:inherit;outline:none;background:white;color:var(--navy);transition:border-color .2s}
  .form-input:focus,.form-textarea:focus{border-color:var(--teal)}
  .form-textarea{min-height:120px;resize:vertical}
  .btn-submit{background:var(--navy);color:white;border:none;padding:16px 40px;border-radius:100px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .2s;letter-spacing:.04em;align-self:center;margin-top:8px}
  .btn-submit:hover{opacity:.85;transform:translateY(-1px)}
  .contact-success{background:rgba(0,106,101,.08);border:1.5px solid rgba(0,106,101,.2);border-radius:16px;padding:24px;text-align:center;color:var(--teal);font-weight:600;margin-top:24px}
  .footer{background:#f9f5ed;border-top:1px solid rgba(0,30,64,.08);padding:64px 40px 40px}
  .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;gap:60px}
  .footer-brand{max-width:280px}
  .footer-logo{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;font-style:italic;color:var(--navy);margin-bottom:14px;cursor:pointer}
  .footer-tagline{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:24px}
  .footer-links-grid{display:grid;grid-template-columns:repeat(3,auto);gap:60px}
  .footer-col h5{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--navy);margin-bottom:16px}
  .footer-col ul{list-style:none}
  .footer-col ul li{margin-bottom:8px}
  .footer-col ul li a{font-size:13px;color:var(--muted);text-decoration:none;transition:color .2s;cursor:pointer}
  .footer-col ul li a:hover{color:var(--navy)}
  .newsletter-form{display:flex;gap:8px}
  .newsletter-input{border:1.5px solid rgba(0,30,64,.12);border-radius:10px;padding:10px 14px;font-size:13px;font-family:inherit;outline:none;flex:1;background:white;color:var(--navy);transition:border-color .2s}
  .newsletter-input:focus{border-color:var(--teal)}
  .btn-newsletter{background:var(--navy);color:white;border:none;border-radius:10px;padding:10px 16px;font-size:16px;cursor:pointer;transition:opacity .2s}
  .btn-newsletter:hover{opacity:.85}
  .footer-bottom{max-width:1200px;margin:40px auto 0;padding-top:28px;border-top:1px solid rgba(0,30,64,.08);display:flex;justify-content:space-between;align-items:center}
  .footer-copy{font-size:12px;color:var(--muted)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeUp .8s ease both}
  .fade-up-d1{animation-delay:.1s} .fade-up-d2{animation-delay:.22s}
  .fade-up-d3{animation-delay:.36s} .fade-up-d4{animation-delay:.5s}
  .center-title{text-align:center;margin-bottom:12px}
  .center-sub{text-align:center;margin-bottom:60px;font-size:13px;color:var(--teal);font-weight:600;letter-spacing:.1em;text-transform:uppercase}
  .nav-mobile-toggle{display:none;background:none;border:none;font-size:22px;cursor:pointer;color:var(--navy)}
  @media(max-width:900px){
    .bento-grid{grid-template-columns:1fr 1fr}
    .dest-card.large{grid-column:span 2}
    .curated-grid,.events-grid,.testimonials-grid,.features-grid{grid-template-columns:1fr}
    .footer-inner{flex-direction:column}
    .footer-links-grid{grid-template-columns:repeat(2,auto)}
    .search-bar{grid-template-columns:1fr 1fr;gap:8px}
    .nav-links{display:none}
    .nav-mobile-toggle{display:block}
    .form-row{grid-template-columns:1fr}
  }
  .nav-links.mobile-open{display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:rgba(253,249,241,.98);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:20px 40px;gap:20px;z-index:99}
`;

// ── AI Planner ─────────────────────────────────────────────────────────────────
async function callClaudeForPlan(search) {
  const prompt = `You are CeyGo, a luxury travel AI for Southern Sri Lanka.
A traveller has entered the following preferences:
- Destination: ${search.dest || "Anywhere in Southern Sri Lanka"}
- Dates: ${search.dates || "Flexible"}
- Budget: ${search.budget || "Flexible"}
- Interests: ${search.interests || "General exploration"}
Generate a beautifully structured day-by-day trip plan in JSON (no markdown, pure JSON).
Return ONLY a JSON object with this exact shape:
{"title":"string","summary":"string","days":[{"day":1,"location":"string","theme":"string","morning":"string","afternoon":"string","evening":"string","stay":"string","tip":"string"}],"budgetBreakdown":{"accommodation":"string","food":"string","activities":"string","transport":"string"},"bestTime":"string","packingTips":["string"]}
Generate 3-5 days. Be specific, luxurious, and authentic to Southern Sri Lanka.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

const plannerStyles = `
  .modal-backdrop{position:fixed;inset:0;z-index:999;background:rgba(0,20,50,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn .25s ease}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal-card{background:var(--sand);border-radius:32px;width:100%;max-width:820px;max-height:88vh;overflow-y:auto;padding:44px 48px;position:relative;animation:slideUp .35s cubic-bezier(.25,.46,.45,.94);box-shadow:0 32px 80px rgba(0,20,50,.3)}
  @keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  .modal-close{position:absolute;top:20px;right:24px;background:rgba(0,30,64,.07);border:none;border-radius:100px;width:36px;height:36px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--navy);transition:background .2s}
  .modal-close:hover{background:rgba(0,30,64,.14)}
  .plan-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--navy);margin-bottom:8px}
  .plan-summary{font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid rgba(0,30,64,.1)}
  .day-card{background:white;border-radius:20px;padding:24px 28px;margin-bottom:16px;border:1px solid rgba(0,30,64,.07);transition:box-shadow .2s}
  .day-card:hover{box-shadow:0 8px 32px rgba(0,30,64,.08)}
  .day-header{display:flex;align-items:center;gap:14px;margin-bottom:16px;flex-wrap:wrap}
  .day-badge{background:var(--navy);color:white;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 14px;border-radius:100px}
  .day-location{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--navy)}
  .day-theme{font-size:12px;color:var(--teal);font-weight:600;letter-spacing:.08em;text-transform:uppercase}
  .time-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px}
  .time-block{background:var(--sand);border-radius:12px;padding:12px 14px}
  .time-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);margin-bottom:4px}
  .time-text{font-size:13px;color:var(--navy);line-height:1.5}
  .day-stay{font-size:12px;color:var(--muted);margin-top:10px;display:flex;align-items:flex-start;gap:6px}
  .day-tip{background:rgba(118,243,234,.12);border-left:3px solid var(--teal);border-radius:0 10px 10px 0;padding:10px 14px;font-size:12px;color:var(--muted);margin-top:12px;line-height:1.5}
  .budget-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0 20px}
  .budget-cell{background:white;border-radius:14px;padding:16px;text-align:center;border:1px solid rgba(0,30,64,.07)}
  .budget-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
  .budget-val{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--navy)}
  .packing-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
  .chip{background:rgba(0,30,64,.06);border-radius:100px;padding:5px 14px;font-size:12px;color:var(--navy);font-weight:500}
  .section-mini-title{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--navy);margin-bottom:10px}
  .loading-pulse{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:260px;gap:20px}
  .spinner{width:44px;height:44px;border:3px solid rgba(0,106,101,.15);border-top-color:var(--teal);border-radius:50%;animation:spin .8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .loading-text{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--navy)}
  .loading-sub{font-size:13px;color:var(--muted)}
  .error-box{background:#fff0f0;border:1px solid #fca5a5;border-radius:16px;padding:24px;text-align:center;color:#991b1b;font-size:14px}
  @media(max-width:600px){.modal-card{padding:28px 20px}.time-row{grid-template-columns:1fr}.budget-grid{grid-template-columns:repeat(2,1fr)}}
`;

function TripPlanModal({ search, onClose }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    callClaudeForPlan(search)
      .then(p => { setPlan(p); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{plannerStyles}</style>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✕</button>
        {loading && (
          <div className="loading-pulse">
            <div className="spinner" />
            <div className="loading-text">Crafting your bespoke itinerary…</div>
            <div className="loading-sub">Our AI is exploring Southern Sri Lanka for you ✦</div>
          </div>
        )}
        {error && <div className="error-box"><p style={{ fontWeight: 700, marginBottom: 8 }}>Could not generate plan</p><p>{error}</p></div>}
        {plan && !loading && (<>
          <h2 className="plan-title">✦ {plan.title}</h2>
          <p className="plan-summary">{plan.summary}</p>
          {plan.days?.map(d => (
            <div key={d.day} className="day-card">
              <div className="day-header">
                <span className="day-badge">Day {d.day}</span>
                <span className="day-location">{d.location}</span>
                <span className="day-theme">{d.theme}</span>
              </div>
              <div className="time-row">
                <div className="time-block"><div className="time-label">🌅 Morning</div><div className="time-text">{d.morning}</div></div>
                <div className="time-block"><div className="time-label">☀️ Afternoon</div><div className="time-text">{d.afternoon}</div></div>
                <div className="time-block"><div className="time-label">🌙 Evening</div><div className="time-text">{d.evening}</div></div>
              </div>
              <div className="day-stay">🏨 <span><strong>Stay:</strong> {d.stay}</span></div>
              {d.tip && <div className="day-tip">💡 <strong>Insider tip:</strong> {d.tip}</div>}
            </div>
          ))}
          {plan.budgetBreakdown && (<>
            <div className="section-mini-title" style={{ marginTop: 28 }}>Budget Breakdown</div>
            <div className="budget-grid">
              {Object.entries(plan.budgetBreakdown).map(([k, v]) => (
                <div key={k} className="budget-cell"><div className="budget-label">{k}</div><div className="budget-val">{v}</div></div>
              ))}
            </div>
          </>)}
          {plan.bestTime && <div className="day-tip" style={{ marginBottom: 16 }}>🗓️ <strong>Best time to visit:</strong> {plan.bestTime}</div>}
          {plan.packingTips?.length > 0 && (<>
            <div className="section-mini-title">Packing Tips</div>
            <div className="packing-chips">{plan.packingTips.map((tip, i) => <span key={i} className="chip">{tip}</span>)}</div>
          </>)}
        </>)}
      </div>
    </div>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState({ dest: "", dates: "", budget: "", interests: "" });
  const [showPlanner, setShowPlanner] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const entries = Object.entries(SECTION_IDS);
    const observers = entries.map(([label, id]) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveNav(label); }, { threshold: 0.3 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const handleNavClick = (label) => { setActiveNav(label); setMobileNavOpen(false); scrollToSection(SECTION_IDS[label]); };
  const handleContactSubmit = () => { if (contactForm.name && contactForm.email && contactForm.message) setContactSent(true); };

  return (
    <>
      <style>{styles}</style>
      <header className="nav">
        <div className="nav-logo" onClick={() => handleNavClick("Home")}>CeyGo</div>
        <nav style={{ position: "relative" }}>
          <ul className={`nav-links${mobileNavOpen ? " mobile-open" : ""}`}>
            {NAV_LINKS.map(l => (
              <li key={l}><a className={activeNav === l ? "active" : ""} onClick={() => handleNavClick(l)}>{l}</a></li>
            ))}
          </ul>
          <button className="nav-mobile-toggle" onClick={() => setMobileNavOpen(o => !o)}>{mobileNavOpen ? "✕" : "☰"}</button>
        </nav>
        <div className="nav-cta">
          {/* Click Login → goes to LoginPage.jsx */}
          <button type="button" className="btn-ghost" onClick={() => onNavigate("login")}>Login</button>
          {/* Click Sign Up → goes to SignupPage.jsx */}
          <button type="button" className="btn-primary" onClick={() => onNavigate("signup")}>Sign Up</button>
        </div>
      </header>

      <main>
        <section id="section-home" className="hero">
          <img className="hero-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5w5yNOOET57GYfoJxg6F6-EqanWRfh8Svkio0siIU4nzOzQEW7T1oRGfM6v0OCVFA8MoqLiIoyDvb8w9orfFd9JdjaZ5pyYDXMtideU3FvosyCLe8LB5XGtmd5B0o5SnJ3koI5yYgvO4ZxGu_0MY-HX-FIawWCQIyjAnJGVg-BKYyWRam3V5EYLq-0iufWjZxoLjQcuJoXthHIxFYhjpjEb1Nv9MhhPHCtTV2MHLLAuMNQ4p2FasS5X1dpKqKcGDniF4BNVZydU" alt="Southern Sri Lanka beach aerial view" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title fade-up">Discover Down South Sri Lanka, Smarter with AI</h1>
            <p className="hero-sub fade-up fade-up-d1">Your personal gateway to luxury coastal living. We curate bespoke experiences from Tangalle to Bentota using cutting-edge intelligence.</p>
            <button className="btn-hero fade-up fade-up-d2" onClick={() => handleNavClick("AI Planner")}>Start Your Journey</button>
            <div className="search-bar fade-up fade-up-d3" style={{ color: "#001e40" }}>
              {[
                { label: "Destination", key: "dest", placeholder: "Where to?" },
                { label: "Dates", key: "dates", placeholder: "Add dates" },
                { label: "Budget", key: "budget", placeholder: "Set range" },
                { label: "Interests", key: "interests", placeholder: "Surf, Food…" },
              ].map(f => (
                <div key={f.key} className="search-field">
                  <div className="search-label">{f.label}</div>
                  <input className="search-input" placeholder={f.placeholder} value={search[f.key]} onChange={e => setSearch(s => ({ ...s, [f.key]: e.target.value }))} />
                </div>
              ))}
              <button className="btn-search" onClick={() => setShowPlanner(true)}>✦ Plan Now</button>
            </div>
          </div>
        </section>

        <section id="section-destinations" className="section">
          <div className="section-header">
            <div><h2 className="section-title">Iconic Coastal Escapes</h2><p className="section-sub">Voted most luxurious by our global community</p></div>
            <button className="link-view-all" onClick={() => handleNavClick("Destinations")}>View All →</button>
          </div>
          <div className="bento-grid">
            {DESTINATIONS.map(d => (
              <div key={d.name} className={`dest-card${d.large ? " large" : ""}`}>
                <img src={d.img} alt={d.name} />
                <div className="dest-overlay" />
                <div className="dest-info">
                  {d.large ? (<>
                    <div><span className="dest-badge">{d.tag}</span><span className="dest-rating">★ {d.rating}</span></div>
                    <h3 className="dest-name">{d.name}</h3>
                    <p className="dest-desc">{d.desc} Best season: {d.season}.</p>
                    <button className="btn-outline-white" onClick={() => { setSearch(s => ({ ...s, dest: d.name })); setShowPlanner(true); }}>Quick Explore</button>
                  </>) : (<>
                    <h4 className="dest-name">{d.name}</h4>
                    <p className="dest-season">{d.tag} • {d.season}</p>
                  </>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div id="section-beach-stays" className="bg-subtle">
          <div className="curated-section">
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p className="center-sub">Handpicked Selections</p>
              <h2 className="section-title">Curated Stays &amp; Local Gems</h2>
            </div>
            <div className="curated-grid">
              <div>
                <h3 className="curated-col-title"><span>🏨</span> Premium Beach Stays</h3>
                {HOTELS.map(h => (
                  <div key={h.name} className="card-row">
                    <div className="card-thumb"><img src={h.img} alt={h.name} /></div>
                    <div className="card-body">
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span className="card-name">{h.name}</span><span className="card-price">{h.price}</span></div>
                      <div className="stars">{"★".repeat(h.stars)}{"☆".repeat(5 - h.stars)}</div>
                      <p className="card-desc">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="curated-col-title"><span>🧭</span> Unmissable Experiences</h3>
                {ATTRACTIONS.map(a => (
                  <div key={a.name} className="card-row">
                    <div className="card-thumb"><img src={a.img} alt={a.name} /></div>
                    <div className="card-body"><span className="card-name">{a.name}</span><p className="card-tag">{a.icon} {a.tag}</p><p className="card-desc">{a.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="section-ai-planner" className="section" style={{ borderTop: "1px solid rgba(0,30,64,0.07)" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <p className="center-sub" style={{ marginBottom: 12 }}>Powered by Claude AI</p>
            <h2 className="section-title center-title" style={{ marginBottom: 16 }}>Plan Your Dream Trip</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>Tell us where you want to go, when, and what you love — our AI crafts a bespoke itinerary just for you in seconds.</p>
          </div>
          <div style={{ background: "white", borderRadius: 28, padding: "44px 48px", border: "1px solid rgba(0,30,64,0.07)", boxShadow: "0 8px 40px rgba(0,30,64,0.06)", maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              {[
                { label: "🌴 Destination", key: "dest", placeholder: "e.g. Galle Fort, Mirissa…" },
                { label: "📅 Travel Dates", key: "dates", placeholder: "e.g. Dec 15 – Dec 22" },
                { label: "💰 Budget Range", key: "budget", placeholder: "e.g. $200–$500/night" },
                { label: "🎯 Interests", key: "interests", placeholder: "e.g. Surf, Wildlife, Food…" },
              ].map(f => (
                <div key={f.key} className="form-field">
                  <label className="form-label">{f.label}</label>
                  <input className="form-input" placeholder={f.placeholder} value={search[f.key]} onChange={e => setSearch(s => ({ ...s, [f.key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn-hero" style={{ marginTop: 8 }} onClick={() => setShowPlanner(true)}>✦ Generate My Itinerary</button>
            </div>
          </div>
          <div className="features-grid" style={{ marginTop: 80 }}>
            {FEATURES.map(f => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon-wrap" style={{ background: f.color + "22" }}>
                  <span style={{ color: f.color === "#a7c8ff" ? "#1f477b" : f.color === "#76f3ea" ? "#006a65" : "#763300", fontSize: 28 }}>{f.icon}</span>
                </div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="section-events" style={{ background: "#f4f0e6", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 className="section-title center-title" style={{ marginBottom: 48 }}>The Pulse of the South</h2>
            <div className="events-grid">
              {EVENTS.map(ev => (
                <div key={ev.name} className="event-card">
                  <div className="event-img-wrap"><img src={ev.img} alt={ev.name} /><span className="event-date">{ev.dates}</span></div>
                  <div className="event-body">
                    <h3 className="event-name">{ev.name}</h3>
                    <p className="event-desc">{ev.desc}</p>
                    <button className="btn-event" onClick={() => { setSearch(s => ({ ...s, interests: ev.name })); setShowPlanner(true); }}>Plan Around This Event</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="testimonials-section">
          <div className="testimonials-inner">
            <h2 className="testimonials-title">Loved by Explorers</h2>
            <div className="testimonials-grid">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="testimonial-card">
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar"><img src={t.img} alt={t.name} /></div>
                    <div><p className="testimonial-name">{t.name}</p><p className="testimonial-country">{t.country}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="section-contact" className="contact-section">
          <p className="center-sub" style={{ marginBottom: 12 }}>Get In Touch</p>
          <h2 className="section-title center-title" style={{ marginBottom: 16 }}>Let's Plan Together</h2>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>Have a special request or want a fully customised experience? Our team is ready to help.</p>
          <div className="contact-form">
            <div className="form-row">
              <div className="form-field"><label className="form-label">Full Name</label><input className="form-input" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="form-field"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="you@example.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div className="form-field"><label className="form-label">Subject</label><input className="form-input" placeholder="How can we help?" value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))} /></div>
            <div className="form-field"><label className="form-label">Message</label><textarea className="form-textarea" placeholder="Tell us about your dream trip…" value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} /></div>
            <button className="btn-submit" onClick={handleContactSubmit}>Send Message →</button>
            {contactSent && <div className="contact-success">✦ Thank you! We'll be in touch within 24 hours.</div>}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => handleNavClick("Home")}>CeyGo</div>
            <p className="footer-tagline">The ultimate AI travel companion for discovering the hidden gems of Southern Sri Lanka's coastline.</p>
            <div style={{ display: "flex", gap: 16 }}>
              {["f", "📷", "@"].map((icon, i) => (
                <a key={i} href="#" style={{ color: "var(--muted)", fontSize: 18, textDecoration: "none" }}>{icon}</a>
              ))}
            </div>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>{["Destinations", "Beach Stays", "AI Planner", "Events"].map(l => <li key={l}><a onClick={() => handleNavClick(l)}>{l}</a></li>)}</ul>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <ul><li><a href="#">Careers</a></li><li><a href="#">Media Kit</a></li><li><a href="#">Partner Login</a></li><li><a onClick={() => handleNavClick("Contact")}>Contact Us</a></li></ul>
            </div>
            <div className="footer-col">
              <h5>Newsletter</h5>
              <div className="newsletter-form">
                <input className="newsletter-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="btn-newsletter">→</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 CeyGo Luxury Travel. Southern Sri Lanka's Premier Retreat Specialist.</p>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>🌐 English (US)</span>
        </div>
      </footer>

      {showPlanner && <TripPlanModal search={search} onClose={() => setShowPlanner(false)} />}
    </>
  );
}

// ── App Router ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // "home" | "login" | "signup"

  if (page === "login")  return <LoginPage  onNavigate={setPage} />;
  if (page === "signup") return <SignupPage onNavigate={setPage} />;
  return <HomePage onNavigate={setPage} />;
}