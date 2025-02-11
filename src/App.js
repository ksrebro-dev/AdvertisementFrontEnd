import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdvertisementList from './components/AdvertisementList';
import AdvertisementForm from './components/AdvertisementForm';
import './App.css';

const API_URL = 'http://localhost:5000/api/advertisements';

const App = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAdvertisement, setEditingAdvertisement] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setAdvertisements(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const addAdvertisement = (advertisement) => {
    axios.post(API_URL, advertisement)
      .then(res => {
        setAdvertisements([...advertisements, res.data]);
        setIsFormVisible(false);
      })
      .catch(err => console.error(err));
  };

  const editAdvertisement = (ad) => {
    setEditingAdvertisement(ad);
    setIsFormVisible(true);
  };

  const updateAdvertisement = (id, updatedData) => {
    axios.put(`${API_URL}/${id}`, updatedData)
      .then(res => {
        const updatedAds = advertisements.map(ad =>
          ad._id === id ? res.data : ad
        );
        setAdvertisements(updatedAds);
        setIsFormVisible(false);
        setEditingAdvertisement(null);
      })
      .catch(err => console.error(err));
  };

  const deleteAdvertisement = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(res => {
        setAdvertisements(advertisements.filter(ad => ad._id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleCancel = () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.remove('show');
    formContainer.classList.add('hide');
    

    setTimeout(() => {
      setIsFormVisible(false);
    }, 500); 
  };
  return (
    <div className="App">
      <header>
        <h1>Ogłoszenia</h1>

      </header>

      <div className={`form-container ${isFormVisible ? 'show' : ''}`}>
        {isFormVisible && (
          <AdvertisementForm
            addAdvertisement={addAdvertisement}
            updateAdvertisement={updateAdvertisement}
            editingAdvertisement={editingAdvertisement}
          />
        )}
      </div>
      
{!isFormVisible && (
  <button 
    onClick={() => setIsFormVisible(true)}
    style={{ 
      width: "100%", 
      padding: "10px", 
      marginRight: "10px",  
      backgroundColor: "#28a745", 
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Dodaj Ogłoszenie
  </button>
)}

{isFormVisible && (
  <button 
    onClick={handleCancel}
    style={{ 
      width: "100%", 
      padding: "10px", 
      marginRight: "10px",  
      backgroundColor: "#ff0000a3", 
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Anuluj
  </button>
)}


      <AdvertisementList 
        advertisements={advertisements} 
        deleteAdvertisement={deleteAdvertisement} 
        editAdvertisement={editAdvertisement} 
        
      />
      
    </div>
  );
};

export default App;
