import React, { useState } from 'react';
import './RouteSafetyPage.css';
import RouteInputForm from '../../components/routes/RouteInputForm.jsx';
import RouteSummary from '../../components/routes/RouteSummary.jsx';
import RouteRiskOverlay from '../../components/routes/RouteRiskOverlay.jsx';

function RouteSafetyPage() {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="route-page">
      <section className="route-page__left">
        <h2>Check Route Safety</h2>
        <RouteInputForm onResult={setRouteData} />
        {routeData && <RouteSummary route={routeData} />}
      </section>
      <section className="route-page__right">
        <RouteRiskOverlay route={routeData} />
      </section>
    </div>
  );
}

export default RouteSafetyPage;
