import { useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import HorizontalBtnCategorySelection from '../../components/HorizontalBtnCategorySelection';
import Map from '../../components/Map';
import { makeStyles, useTheme } from '@rneui/themed';
import { API } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedMunicipalities, setMunicipalities] = useState([]);
  const { data: pets, isLoading: isLoadingPets } = useQuery({
    placeholderData: [],
    queryKey: ['all-lost-pets', selectedMunicipalities],
    queryFn: async () =>
      (await API.getLostPets({ municipalities: selectedMunicipalities })).data,
  });
  const { data: municipalities, isLoading: isLoadingMunicipalities } = useQuery(
    {
      queryKey: ['municipalities'],
      queryFn: async () => {
        const _municipalities = (await API.getMunicipalities()).data;
        return _municipalities.map((m) => ({
          key: m,
          label: m,
        }));
      },
    }
  );
  const lostPetsMarkers = useMemo(
    () =>
      pets.map((p) => ({
        coordinates: p.lostAtLocation.coordinates,
        callbackItem: p,
      })),
    [pets]
  );

  const onMarkerPress = (item, mapRef) => {
    navigation.navigate('HomeTab', {
      screen: 'PetAdditionalInfo',
      params: { ...item, shouldShowReportBtn: true },
    });
  };

  return (
    <AppLayout shouldSetInsetsPaddingTop>
      {isLoadingMunicipalities ? (
        <ActivityIndicator
          color='white'
          style={{ marginTop: 10, marginBottom: 20 }}
          size={'large'}
        />
      ) : (
        <HorizontalBtnCategorySelection
          categories={municipalities}
          onChange={setMunicipalities}
        />
      )}
      <View style={styles.mapContainer}>
        {isLoadingPets && (
          <ActivityIndicator
            color={theme.colors.blue900}
            size={'large'}
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
          />
        )}
        <Map markers={lostPetsMarkers} onMarkerPress={onMarkerPress} />
      </View>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  mapContainer: { flex: 1, position: 'relative' },
}));

export default MapScreen;
