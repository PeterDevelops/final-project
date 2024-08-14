import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const VendorsInBoundsUpdater = (props) => {
  const {
    allVendors,
    setVendors
  } = props;
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






