import React, { useState } from 'react';
import './RouteSafetyPage.css';
import RouteInputForm from '../../components/routes/RouteInputForm.jsx';
import RouteSummary from '../../components/routes/RouteSummary.jsx';
import RouteRiskOverlay from '../../components/routes/RouteRiskOverlay.jsx';

const RouteSafetyPage = () => {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="safe-routes-dashboard">
      <div className="route-header-saas">
        <div className="container">
          <h1>Intelligent Route Optimization</h1>
          <p>Analyze safety indices and risk zones for your intended travel path.</p>
        </div>
      </div>

      <div className="route-main-grid">
        <aside className="route-controls">
          <div className="control-card-saas">
            <div className="card-header">
              <h3>Path Parameters</h3>
            </div>
            <div className="card-body">
              <RouteInputForm onResult={setRouteData} />
            </div>
          </div>

          {routeData && (
            <div className="summary-card-saas">
              <div className="card-header">
                <h3>Safety Analysis Result</h3>
              </div>
              <div className="card-body">
                <RouteSummary route={routeData} />
              </div>
            </div>
          )}
        </aside>

        <main className="route-visualization">
          <div className="overlay-container">
            <RouteRiskOverlay route={routeData} />
            {!routeData && (
              <div className="empty-overlay">
                <div className="empty-state-content">
                  <span className="icon">📍</span>
                  <h3>No route selected</h3>
                  <p>Enter your origin and destination to begin safety analysis.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RouteSafetyPage;
