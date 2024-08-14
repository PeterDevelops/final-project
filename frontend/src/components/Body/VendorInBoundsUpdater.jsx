import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet'; 

const VendorsInBoundsUpdater = (props) => {
  const { allVendors, setVendors } = props;
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      if (!map || !allVendors.length) return;

      const bounds = map.getBounds();
      if (!bounds || typeof bounds.contains !== 'function') {
        console.error('Invalid bounds');
        return;
      }

      const vendorsInBounds = allVendors.filter((vendor) => {
        const lat = parseFloat(vendor.latitude);
        const lng = parseFloat(vendor.longitude);

        if (isNaN(lat) || isNaN(lng)) {
          console.error('Invalid vendor coordinates:', vendor);
          return false;
        }

        try {
          return bounds.contains([lat, lng]);
        } catch (error) {
          console.error('Error checking bounds for vendor:', vendor, error);
          return false;
        }
      });

      setVendors(vendorsInBounds);

      // Check if vendor with id 12 is the only one in bounds
      if (vendorsInBounds.length === 1 && vendorsInBounds[0].id === 12) {
        const tileLayerUrl = `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`;
        map.eachLayer(layer => {
          if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
          }
        });
        L.tileLayer(tileLayerUrl).addTo(map);
      } else {
        const tileLayerUrl = `https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`;
        map.eachLayer(layer => {
          if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
          }
        });
        L.tileLayer(tileLayerUrl).addTo(map);
      }
    };

    map.on('moveend', handleMoveEnd);

    // Initial call to update vendors when component mounts
    handleMoveEnd();

    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, allVendors, setVendors]);

  return null;
};

export default VendorsInBoundsUpdater;




