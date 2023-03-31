import { useState } from 'react';
import { View } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import { mockLostPetsMarkers, mockMunicipalities } from '../../../mockData';
import HorizontalBtnCategorySelection from '../../components/HorizontalBtnCategorySelection';
import Map from '../../components/Map';
import { makeStyles } from '@rneui/themed';

const MapScreen = () => {
  const styles = useStyles();
  const [municipalities, setMunicipalities] = useState([]);
  const [filteredLostPetsMarkers, setFilteredLostPetsMarkers] =
    useState(mockLostPetsMarkers);

  const onMunicipalitiesChange = (_municipalities) => {
    const markers = !_municipalities.length
      ? mockLostPetsMarkers
      : mockLostPetsMarkers.filter((m) =>
          _municipalities.includes(m.municipality)
        );

    setMunicipalities(_municipalities);
    setFilteredLostPetsMarkers(markers);
  };

  return (
    <AppLayout shouldSetInsetsPaddingTop>
      <HorizontalBtnCategorySelection
        categories={mockMunicipalities}
        onChange={onMunicipalitiesChange}
      />
      <View style={styles.mapContainer}>
        <Map markers={filteredLostPetsMarkers} />
      </View>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  mapContainer: { flex: 1 },
}));

export default MapScreen;
