import React from 'react';
import './MapPage.css';
import CityMap from '../../components/map/CityMap.jsx';
import TimeFilterControls from '../../components/map/TimeFilterControls.jsx';

const MapPage = () => {
  return (
    <div className="map-dashboard">
      {/* Header with Title and Actions */}
      <header className="map-header-saas">
        <div className="header-meta">
          <h1>SafeZone Analytics Map</h1>
          <p>Real-time risk scoring and predicted safety zones</p>
        </div>
        <div className="header-options">
          <button className="btn-secondary-sm">Print Audit</button>
          <button className="btn-primary-sm">Report Zone</button>
        </div>
      </header>

      <div className="map-main-container">
        {/* Left Sidebar: Controls */}
        <aside className="map-sidebar-left">
          <div className="sidebar-group">
            <h4>Safety Parameters</h4>
            <TimeFilterControls />
          </div>

          <div className="sidebar-group">
            <h4>Risk Layers</h4>
            <div className="layer-options">
              <label className="checkbox-saas">
                <input type="checkbox" defaultChecked />
                <span>Historical Incidents</span>
              </label>
              <label className="checkbox-saas">
                <input type="checkbox" defaultChecked />
                <span>Predicted Hotspots</span>
              </label>
              <label className="checkbox-saas">
                <input type="checkbox" />
                <span>Lighting Quality</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Center: The Map */}
        <div className="map-canvas">
          <CityMap />
        </div>

        {/* Right Sidebar: Real-time Feed/Insights */}
        <aside className="map-sidebar-right">
          <div className="insight-card">
            <h4>Current Zone Index</h4>
            <div className="safety-index-score low">74.2</div>
            <p className="index-label">Standard Risk Level</p>
          </div>

          <div className="recent-reports">
            <h4>Local Feed</h4>
            <div className="report-item">
              <span className="type-badge alert">Urgent</span>
              <p>Suspicious activity reported near 5th Ave.</p>
              <span className="time">2m ago</span>
            </div>
            <div className="report-item">
              <span className="type-badge info">Resolved</span>
              <p>Police patrol confirmed in North Square.</p>
              <span className="time">14m ago</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MapPage;
