import React, { useState, useEffect } from "react";
import './App.css';
import Action from './images/Action.jpg';
import Drama from './images/Drama.jpg';
import Fantasy from './images/Fantasy.jpg';
import Fiction from './images/Fiction.jpg';
import Horror from './images/Horror.jpg';
import Music from './images/Music.jpg';
import Romance from './images/Romance.jpg';
import Thriller from './images/Thriller.jpg';
import Western from './images/Western.jpg';
import Vector from './images/Vector.jpg'


function Category() {

  const containers = [
    { id: 1, label: 'Action', image: Action, color: "#FF5209" },
    { id: 2, label: 'Drama', image: Drama, color: "#D7A4FF" },
    { id: 3, label: 'Romance', image: Romance, color: "#148A08" },
    { id: 4, label: 'Thriller', image: Thriller, color: "#84C2FF" },
    { id: 5, label: 'Western', image: Western, color: "#902500" },
    { id: 6, label: 'Horror', image: Horror, color: "#7358FF" },
    { id: 7, label: 'Fantasy', image: Fantasy, color: "#FF4ADE" },
    { id: 8, label: 'Music', image: Music, color: "#E61E32" },
    { id: 9, label: 'Fiction', image: Fiction, color: "#6CD061" },
  ];

  const [selectedContainers, setSelectedContainers] = useState(new Set());
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('selectedCategories');
    if (storedCategories) {
      setSelectedLabels(JSON.parse(storedCategories));
    }
  }, []);

  const handleContainerClick = (id, label) => {
    const updatedSelection = new Set(selectedContainers);

    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
      const updatedLabels = selectedLabels.filter((selectedLabel) => selectedLabel !== label);
      setSelectedLabels(updatedLabels);
    } else {
      updatedSelection.add(id);
      const updatedLabels = [...selectedLabels, label];
      setSelectedLabels(updatedLabels);
    }

    setSelectedContainers(updatedSelection);
    localStorage.setItem('selectedCategories', JSON.stringify(selectedLabels));
  };

  const removeLabel = (index, label) => {
    const updatedLabels = selectedLabels.filter((_, idx) => idx !== index);
    setSelectedLabels(updatedLabels);

    const containerToRemove = Array.from(selectedContainers).find(
      (containerId) => containers.find((container) => container.id === containerId)?.label === label
    );
    if (containerToRemove) {
      selectedContainers.delete(containerToRemove);
      setSelectedContainers(new Set(selectedContainers));
    }
  };

  const[required, setRequired] = useState('');

  const handleProceed = () => {
    if (selectedLabels.length < 3) {
      setRequired('Minimum 3 category required');
    } 
  }

  

  return (
    <div className="category_container">
      <div className="left">
        <p className="heading_cat">Super app</p>
        <p className="choose">Choose your entertainment category</p>
        <div className="selected-labels">
          {selectedLabels.map((label, index) => (
            <div key={index} className="selected-label">
              <span className="label">{label}</span>
              <span className="cross" onClick={() => removeLabel(index, label)}>
                X
              </span>
            </div>
          ))}
        </div>
        <p className="required">
          {required && (
            <span>
              <img
                src={Vector} 
                alt="warning"
                className="warning-icon"
              />
              {required}
            </span>
          )}
        </p>
      </div>
      <div className="right">
        <div className="container-grid">
          {containers.map((container) => (
            <div
              key={container.id}
              className={`container ${
                selectedContainers.has(container.id) ? 'highlighted' : ''
              }`}
              style={{ backgroundColor: container.color }}
              onClick={() => handleContainerClick(container.id, container.label)}
            >
              <p>{container.label}</p>
              <img src={container.image} alt={container.label} />
            </div>
          ))}
        </div>
        <button className="nextPage" onClick={handleProceed}>Next Page</button>
      </div>
    </div>
  );
}

export default Category;