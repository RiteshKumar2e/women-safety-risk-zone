import React from 'react';
import './MapPage.css';
import CityMap from '../../components/map/CityMap.jsx';
import TimeFilterControls from '../../components/map/TimeFilterControls.jsx';

function MapPage() {
  return (
    <div className="map-page">
      <header className="map-page__header">
        <h1>Women Safety Risk Map</h1>
        <p>Check zone safety based on time and day.</p>
      </header>

      <div className="map-page__content">
        <aside className="map-page__controls">
          <TimeFilterControls />
        </aside>
        <section className="map-page__map-container">
          <CityMap />
        </section>
      </div>
    </div>
  );
}

export default MapPage;
