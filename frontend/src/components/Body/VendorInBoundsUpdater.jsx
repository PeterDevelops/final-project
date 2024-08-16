import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * VendorsInBoundsUpdater is a component that updates the list of vendors within the current map bounds.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.allVendors - The list of all vendors to check against the map bounds.
 * @param {Function} props.setVendors - Function to update the list of vendors in bounds.
 *
 * @returns {null} - This component does not render anything.
 */
const VendorsInBoundsUpdater = (props) => {
  const {
    allVendors,
    setVendors
  } = props;

  // Get the map instance from react-leaflet
  const map = useMap();

  useEffect(() => {
    /**
     * Handles the map's move end event to update vendors in bounds and change the tile layer.
     */
    const handleMoveEnd = () => {
      if (!map || !allVendors.length) return;

      const bounds = map.getBounds();
      if (!bounds || typeof bounds.contains !== 'function') {
        console.error('Invalid bounds');
        return;
      }

      // Filter vendors based on the current map bounds
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

      // Determine the tile layer URL based on the presence of vendor with ID 12

      // (⌐■_■) < IM JUDGING YOU!
      // --|--
      //  / \   But in a good way since you found me ^_^

      const isVendor12InBounds = vendorsInBounds.length === 1 && vendorsInBounds[0].id === 12;
      const tileLayerUrl = isVendor12InBounds
        ? `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`
        : `https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`;

      // Remove existing tile layers and add the new one
      map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });

      L.tileLayer(tileLayerUrl).addTo(map);
    };

    // Attach the moveend event handler to the map
    map.on('moveend', handleMoveEnd);

    // Initial call to update vendors when component mounts
    handleMoveEnd();

    // Cleanup event handler on component unmount
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, allVendors, setVendors]);

  return null;
};

export default VendorsInBoundsUpdater;
