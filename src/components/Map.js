import { useTheme } from '@rneui/themed';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const INIT_CAMERA = {
  center: {
    latitude: 41.99610108037351,
    longitude: 21.431464587917905,
  },
  // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  altitude: 40000,
  // Only when using Google Maps.
  zoom: 10,
};

const Map = ({ markers = [], onMarkerPress, initCamera = INIT_CAMERA }) => {
  const mapRef = useRef();
  const { theme } = useTheme();
  return (
    <MapView
      style={styles.map}
      mapType='standard'
      ref={mapRef}
      initialCamera={initCamera}
    >
      {markers.map((marker) => (
        <Marker
          key={`${marker.coordinates.latitude},${marker.coordinates.longitude}`}
          coordinate={marker.coordinates}
          pinColor={theme.colors.red500}
          onPress={
            () => onMarkerPress && onMarkerPress(mapRef)
            // mapRef.current.animateCamera(
            //   { center: marker.coordinates, altitude: 1000, zoom 15 },
            //   1
            // )
          }
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
