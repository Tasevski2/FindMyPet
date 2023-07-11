import { Button, useTheme } from '@rneui/themed';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const INIT_CAMERA = {
  center: {
    latitude: 41.99610108037351,
    longitude: 21.431464587917905,
  },
  // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  altitude: 40000,
  // Only when using Google Maps.
  zoom: 10,
  heading: 0,
  pitch: 0,
};

const Map = ({
  markers = [],
  onMarkerPress,
  initCamera = INIT_CAMERA,
  onMapPress,
  allowCurrentLocation = false,
  currentLocationCb,
}) => {
  const mapRef = useRef();
  const { theme } = useTheme();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    mapRef?.current?.animateCamera(
      { center: coordinates, altitude: 1000, zoom: 15 },
      1
    );
    currentLocationCb &&
      currentLocationCb({
        coordinates,
      });
  };

  return (
    <View>
      <MapView
        style={styles.map}
        mapType='standard'
        ref={mapRef}
        initialCamera={initCamera}
        onPress={(e) => onMapPress && onMapPress(e)}
      >
        {markers.map((marker, ind) => (
          <Marker
            key={ind}
            coordinate={marker.coordinates}
            pinColor={marker.color ?? theme.colors.red500}
            onPress={() =>
              onMarkerPress && onMarkerPress(marker.callbackItem, mapRef)
            }
          />
        ))}
      </MapView>
      {allowCurrentLocation && (
        <Button
          title='Моменталата локација'
          onPress={getCurrentPosition}
          titleStyle={styles.getCurrentPositionTitle}
          containerStyle={styles.getCurrentPositionContainer}
          buttonStyle={{
            borderRadius: 10,
          }}
          icon={{
            type: 'font-awesome-5',
            name: 'location-arrow',
            color: 'white',
            size: 12,
          }}
          iconPosition='left'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  getCurrentPositionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  getCurrentPositionTitle: { fontSize: 12, borderRadius: 10, color: 'white' },
});

export default Map;
