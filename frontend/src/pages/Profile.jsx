import React, { useEffect, useState, useRef } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const timeoutRef = useRef(null); 

  // Load user data from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditableData(data);
        } else {
          const fallbackData = {
            fullName: '',
            email: user.email,
            phone: '',
            gender: '',
            address: '',
          };
          setUserData(fallbackData);
          setEditableData(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle input changes with auto-save
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...editableData, [name]: value };
    setEditableData(updatedData);

    // Debounce auto-save: only update Firestore after 1s of inactivity
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => autoSave(updatedData), 1000);
  };

  // Auto-save to Firestore
  const autoSave = async (dataToSave) => {
    if (!userData?.uid) return;
    try {
      const userRef = doc(db, 'users', userData.uid);
      await updateDoc(userRef, dataToSave);
      setUserData(dataToSave);
      console.log('Profile auto-saved!');
    } catch (error) {
      console.error('Error auto-saving profile:', error);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-page-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            {userData?.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h3>{userData?.fullName || 'User'}</h3>
          <p>{userData?.email}</p>
          <nav className="sidebar-nav">
            <a href="#" className="active">Profile</a>
            <a href="#">Security</a>
            <a href="#">Notifications</a>
            <a href="#">Travel Preferences</a>
            <a href="#">Privacy</a>
            <a href="#">Billing</a>
          </nav>
          <small>© 2026 CeyGo Inc.</small>
        </aside>

        {/* Main Profile */}
        <main className="profile-content">
          <h2>Public Profile</h2>
          <p className="subtitle">Edit your personal details below.</p>

          <div className="profile-card">
            <div className="profile-info-grid">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editableData.fullName || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editableData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editableData.phone || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={editableData.address || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={editableData.gender || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
