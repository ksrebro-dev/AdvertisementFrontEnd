import React, { useState, useEffect } from 'react';

const AdvertisementForm = ({ addAdvertisement, updateAdvertisement, editingAdvertisement}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'retail',
    author: '',
    contact: '',
    image: ''
  });
  useEffect(() => {
    if (editingAdvertisement) {
      setFormData({
        title: editingAdvertisement.title,
        content: editingAdvertisement.content,
        category: editingAdvertisement.category,
        author: editingAdvertisement.author,
        contact: editingAdvertisement.contact,
        image: editingAdvertisement.image || ''
      });
    }
  }, [editingAdvertisement]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAdvertisement) {
      updateAdvertisement(editingAdvertisement._id, formData);
    } else {
      addAdvertisement(formData);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="advertisement-form">
      <div>
        <label htmlFor="title">Tytuł:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label htmlFor="content">Treść:</label>
        <textarea 
          id="content" 
          name="content" 
          value={formData.content} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label htmlFor="category">Kategoria:</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleInputChange}
        >
          <option value="retail">Retail</option>
          <option value="fashion">Fashion</option>
          <option value="production">Production</option>
          <option value="harvester">Harvester</option>
          <option value="builder">Builder</option>
        </select>
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input 
          type="text" 
          id="author" 
          name="author" 
          value={formData.author} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label htmlFor="contact">Kontakt:</label>
        <input 
          type="text" 
          id="contact" 
          name="contact" 
          value={formData.contact} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label htmlFor="image">Obrazek (URL):</label>
        <input 
          type="text" 
          id="image" 
          name="image" 
          value={formData.image} 
          onChange={handleInputChange} 
        />
      </div>
      <button type="submit">
        {editingAdvertisement ? 'Aktualizuj Ogłoszenie' : 'Dodaj Ogłoszenie'}
      </button>
    </form>
  );
};

export default AdvertisementForm;
