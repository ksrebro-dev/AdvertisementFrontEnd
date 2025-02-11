import React, { useState } from 'react';

const AdvertisementList = ({ advertisements, deleteAdvertisement, editAdvertisement }) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); 

  const categories = [...new Set(advertisements.map(ad => ad.category))];

  const filteredAdvertisements = filter
    ? advertisements.filter(ad => ad.category === filter)
    : advertisements; 

  const indexOfLastAdvertisement = currentPage * itemsPerPage;
  const indexOfFirstAdvertisement = indexOfLastAdvertisement - itemsPerPage;
  const currentAdvertisements = filteredAdvertisements.slice(indexOfFirstAdvertisement, indexOfLastAdvertisement);
  const totalPages = Math.ceil(filteredAdvertisements.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="advertisement-list">
      <div className="filter-container">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Wszystkie kategorie</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {currentAdvertisements.length === 0 ? (
        <p>Brak ogłoszeń w tej kategorii.</p>
      ) : (
        currentAdvertisements.map(ad => (
          <div className="advertisement" key={ad._id}>
            <h3><strong>Tytuł: </strong>{ad.title}</h3>
            <p><strong>Treść: </strong>{ad.content}</p>
            <p><strong>Kategoria: </strong>{ad.category}</p>
            <p><strong>Kontakt:</strong> {ad.contact}</p>
            <div className="buttons-container">
              <button onClick={() => deleteAdvertisement(ad._id)}>Usuń</button>
              <button onClick={() => editAdvertisement(ad)}>Edytuj</button>
            </div>
          </div>
        ))
      )}

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? 'inactive' : 'active'}
        >
          Poprzednia
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? 'inactive' : 'active'}
        >
          Następna
        </button>
      </div>
    </div>
  );
};

export default AdvertisementList;
