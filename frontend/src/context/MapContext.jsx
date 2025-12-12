import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext(null);

export function MapProvider({ children }) {
  const [selectedTime, setSelectedTime] = useState({ hour: 21, dayOfWeek: 5 });

  return (
    <MapContext.Provider
      value={{
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapFilters() {
  return useContext(MapContext);
}
