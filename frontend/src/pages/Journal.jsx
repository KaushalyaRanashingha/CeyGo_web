import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JournalCard from "../components/JournalCard";
import ReviewCard from "../components/ReviewCard";
import AgentCard from "../components/AgentCard";
import "../styles/Journal.css";

// Sample Data
const journalEntries = [
  {
    title: "Mirissa Sunrise",
    location: "Mirissa, Sri Lanka",
    date: "Oct 12, 2023",
    category: "Coastal",
    description: "Watching the sun rise over Coconut Tree Hill was a spiritual experience...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOaIb9ydLKFAHSAKhJf65btxS3m0LgKqKLcDb-TMWuLXAXqCDnuNI2O-iETLjDCYnOaC--3jxlXk6L_TsaP5BlxEgFzE242S2ydVnPlq_mxCLcDZZS46w1d4juxz5Tss1vwQrRA9zH8MK69OdKf4mXXkRkFRl6D5_3x3AjYASeZ5iQ_OcBfnThzQqDcFJW9O9TZ7LU_pQ6uvWZy9VXD6R8ofT5DY42DXfWtl_OEj9MqlzfDT4vmr-xJdUmHal681inCv4SRdAYJtM",
    tags: ["Sunrise","Beach"]
  },
  {
    title: "Galle Fort Walk",
    location: "Galle, Sri Lanka",
    date: "Oct 15, 2023",
    category: "History",
    description: "A historical walk through the Dutch Fort. The architecture is a blend of European styles and South Asian traditions...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8yR9Hp92bHUdDZc6q0_K2dekiqADuGGxIF4T2GLsgGoM8Isg942r9XEqwgRVd-FWI2tesI_iwPc7PnIKOuhxlXdhq-BhLEyN5rJWtAgdBbplTvwiwVqWpIi69n9Nu-zC2upA6jhYkKfUfO2zU-V4Dtmjc_SYofn-A6fvuxVKd-1x2FRBIFvFP6TraqBZ5Uzy1MOUwr8mIV8EkWZQ9VNjN_nZLQ6QhOJ4GSJr5nX84wJmZU6ENj68Ru-Vj5VRDM1keEqdXArmJiY",
    tags: ["Heritage","Architecture"]
  },
  {
    title: "Mirissa Sunrise",
    location: "Mirissa, Sri Lanka",
    date: "Oct 12, 2023",
    category: "Coastal",
    description: "Watching the sun rise over Coconut Tree Hill was a spiritual experience...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOaIb9ydLKFAHSAKhJf65btxS3m0LgKqKLcDb-TMWuLXAXqCDnuNI2O-iETLjDCYnOaC--3jxlXk6L_TsaP5BlxEgFzE242S2ydVnPlq_mxCLcDZZS46w1d4juxz5Tss1vwQrRA9zH8MK69OdKf4mXXkRkFRl6D5_3x3AjYASeZ5iQ_OcBfnThzQqDcFJW9O9TZ7LU_pQ6uvWZy9VXD6R8ofT5DY42DXfWtl_OEj9MqlzfDT4vmr-xJdUmHal681inCv4SRdAYJtM",
    tags: ["Sunrise","Beach"]
  },
  {
    title: "Mirissa Sunrise",
    location: "Mirissa, Sri Lanka",
    date: "Oct 12, 2023",
    category: "Coastal",
    description: "Watching the sun rise over Coconut Tree Hill was a spiritual experience...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOaIb9ydLKFAHSAKhJf65btxS3m0LgKqKLcDb-TMWuLXAXqCDnuNI2O-iETLjDCYnOaC--3jxlXk6L_TsaP5BlxEgFzE242S2ydVnPlq_mxCLcDZZS46w1d4juxz5Tss1vwQrRA9zH8MK69OdKf4mXXkRkFRl6D5_3x3AjYASeZ5iQ_OcBfnThzQqDcFJW9O9TZ7LU_pQ6uvWZy9VXD6R8ofT5DY42DXfWtl_OEj9MqlzfDT4vmr-xJdUmHal681inCv4SRdAYJtM",
    tags: ["Sunrise","Beach"]
  },
  {
    title: "Mirissa Sunrise",
    location: "Mirissa, Sri Lanka",
    date: "Oct 12, 2023",
    category: "Coastal",
    description: "Watching the sun rise over Coconut Tree Hill was a spiritual experience...",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOaIb9ydLKFAHSAKhJf65btxS3m0LgKqKLcDb-TMWuLXAXqCDnuNI2O-iETLjDCYnOaC--3jxlXk6L_TsaP5BlxEgFzE242S2ydVnPlq_mxCLcDZZS46w1d4juxz5Tss1vwQrRA9zH8MK69OdKf4mXXkRkFRl6D5_3x3AjYASeZ5iQ_OcBfnThzQqDcFJW9O9TZ7LU_pQ6uvWZy9VXD6R8ofT5DY42DXfWtl_OEj9MqlzfDT4vmr-xJdUmHal681inCv4SRdAYJtM",
    tags: ["Sunrise","Beach"]
  },
];

const reviews = [
  {
    name: "Sarah Jenkins",
    location: "Explorer from Australia",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXtjr5-phgZeEG_G_6dSqYcNIvpHim0RbOobgJvKVs6ubomSABoflYw3xsqj-GJYpaFcxhTQ_3VHX0B4meOfDYT3ov4v8KYfRVwrYqIc0UC4srJ60tCndCjprTAJiMrC-GB9Q1VIoWE3eTw_40mNSdpaSoJeJP4qkJYHRwIV4DU8zyNcJzuvz3FjSZZFKnxsVCPlqm0J5E4Uezt5WUVicW7Qq9FumsBIiYqy2T7RquArCm87MGZUd4TBPef0f_yq42Rl6qdy7LFMg",
    comment: "CeyGo made planning my trip to Sri Lanka so effortless. The journal feature is my favorite way to relive memories!",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    location: "Explorer from Australia",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXtjr5-phgZeEG_G_6dSqYcNIvpHim0RbOobgJvKVs6ubomSABoflYw3xsqj-GJYpaFcxhTQ_3VHX0B4meOfDYT3ov4v8KYfRVwrYqIc0UC4srJ60tCndCjprTAJiMrC-GB9Q1VIoWE3eTw_40mNSdpaSoJeJP4qkJYHRwIV4DU8zyNcJzuvz3FjSZZFKnxsVCPlqm0J5E4Uezt5WUVicW7Qq9FumsBIiYqy2T7RquArCm87MGZUd4TBPef0f_yq42Rl6qdy7LFMg",
    comment: "CeyGo made planning my trip to Sri Lanka so effortless. The journal feature is my favorite way to relive memories!",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    location: "Explorer from Australia",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXtjr5-phgZeEG_G_6dSqYcNIvpHim0RbOobgJvKVs6ubomSABoflYw3xsqj-GJYpaFcxhTQ_3VHX0B4meOfDYT3ov4v8KYfRVwrYqIc0UC4srJ60tCndCjprTAJiMrC-GB9Q1VIoWE3eTw_40mNSdpaSoJeJP4qkJYHRwIV4DU8zyNcJzuvz3FjSZZFKnxsVCPlqm0J5E4Uezt5WUVicW7Qq9FumsBIiYqy2T7RquArCm87MGZUd4TBPef0f_yq42Rl6qdy7LFMg",
    comment: "CeyGo made planning my trip to Sri Lanka so effortless. The journal feature is my favorite way to relive memories!",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    location: "Explorer from Australia",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXtjr5-phgZeEG_G_6dSqYcNIvpHim0RbOobgJvKVs6ubomSABoflYw3xsqj-GJYpaFcxhTQ_3VHX0B4meOfDYT3ov4v8KYfRVwrYqIc0UC4srJ60tCndCjprTAJiMrC-GB9Q1VIoWE3eTw_40mNSdpaSoJeJP4qkJYHRwIV4DU8zyNcJzuvz3FjSZZFKnxsVCPlqm0J5E4Uezt5WUVicW7Qq9FumsBIiYqy2T7RquArCm87MGZUd4TBPef0f_yq42Rl6qdy7LFMg",
    comment: "CeyGo made planning my trip to Sri Lanka so effortless. The journal feature is my favorite way to relive memories!",
    rating: 5
  }
];

const agents = [
  {
    name: "Amith - Galle Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0J2n9GY62UOkjUGXz9y_Or3UHLz9bw8SK8sW2eo-aVdWNiODjVdkFGkR0i1MpLwjla-EVKuhMuSBN5fy6efIAHYyPjcJNVZuBXX2pOlNojhbvirCo6zKHc3wtkE9XsezfwHPJzl5PfmojYDKtWm6Gq96rd7HRyEu1EiCKhyydVrQpeJn6zBmcOAetE7Lq2N6X83oCqeslZ1ZOv4G59TnFXaEVfGyTF6M_yKWUErg7qIkp-2LwEskVSIeU_rulo6bkWVxw4N1i4io",
    info: "120+ Tours Completed"
  },
   {
    name: "Amith - Galle Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0J2n9GY62UOkjUGXz9y_Or3UHLz9bw8SK8sW2eo-aVdWNiODjVdkFGkR0i1MpLwjla-EVKuhMuSBN5fy6efIAHYyPjcJNVZuBXX2pOlNojhbvirCo6zKHc3wtkE9XsezfwHPJzl5PfmojYDKtWm6Gq96rd7HRyEu1EiCKhyydVrQpeJn6zBmcOAetE7Lq2N6X83oCqeslZ1ZOv4G59TnFXaEVfGyTF6M_yKWUErg7qIkp-2LwEskVSIeU_rulo6bkWVxw4N1i4io",
    info: "120+ Tours Completed"
  },
   {
    name: "Amith - Galle Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0J2n9GY62UOkjUGXz9y_Or3UHLz9bw8SK8sW2eo-aVdWNiODjVdkFGkR0i1MpLwjla-EVKuhMuSBN5fy6efIAHYyPjcJNVZuBXX2pOlNojhbvirCo6zKHc3wtkE9XsezfwHPJzl5PfmojYDKtWm6Gq96rd7HRyEu1EiCKhyydVrQpeJn6zBmcOAetE7Lq2N6X83oCqeslZ1ZOv4G59TnFXaEVfGyTF6M_yKWUErg7qIkp-2LwEskVSIeU_rulo6bkWVxw4N1i4io",
    info: "120+ Tours Completed"
  },
   {
    name: "Amith - Galle Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0J2n9GY62UOkjUGXz9y_Or3UHLz9bw8SK8sW2eo-aVdWNiODjVdkFGkR0i1MpLwjla-EVKuhMuSBN5fy6efIAHYyPjcJNVZuBXX2pOlNojhbvirCo6zKHc3wtkE9XsezfwHPJzl5PfmojYDKtWm6Gq96rd7HRyEu1EiCKhyydVrQpeJn6zBmcOAetE7Lq2N6X83oCqeslZ1ZOv4G59TnFXaEVfGyTF6M_yKWUErg7qIkp-2LwEskVSIeU_rulo6bkWVxw4N1i4io",
    info: "120+ Tours Completed"
  }
];

export default function JournalPage() {
  return (
    <div className="journal-page">
      <Navbar />

      {/* Filter */}
      <div className="filter-buttons">
        <button className="active">All Entries</button>
        <button>Recent</button>
        <button className="add-entry">+ Add New Entry</button>
      </div>

      {/* Journal Grid */}
      <div className="journal-grid">
        {journalEntries.map((entry, idx) => (
          <JournalCard key={idx} entry={entry} />
        ))}
      </div>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>What Travelers Say</h2>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
      </section>

      {/* Agents */}
      <section className="agents-section">
        <h2>Local Experts</h2>
        <p>Professional guides to make your journey unforgettable</p>
        <div className="agents-grid">
          {agents.map((agent, idx) => (
            <AgentCard key={idx} agent={agent} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}