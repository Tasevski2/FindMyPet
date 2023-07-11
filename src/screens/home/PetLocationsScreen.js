import { Card, Icon, makeStyles, useTheme } from '@rneui/themed';
import AppLayout from '../../layouts/AppLayout';
import { ActivityIndicator, Text, View } from 'react-native';
import Map from '../../components/Map';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';

const PetLocationsScreen = (props) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { id, lostAtLocation, name } = props.route.params;
  const { data: seenPetLocations, isLoading: isLoadingSeenPetLocations } =
    useQuery({
      placeholderData: [],
      queryKey: ['all-pet-locations', id],
      queryFn: async () => (await API.getLostPetSeenLocations(id)).data,
    });
  const seenPetsMarkers = useMemo(
    () =>
      seenPetLocations.map((s) => ({
        coordinates: s.seenAtLocation.coordinates,
        callbackItem: s,
      })),
    [seenPetLocations]
  );

  const onMarkerPress = (item) => {
    if (!item?.id) return;
    navigation.navigate('PetSeenLocationInfoScreen', { ...item, name });
  };

  return (
    <AppLayout>
      <Card
        containerStyle={styles.cardContaniner}
        wrapperStyle={styles.wrapperStyle}
      >
        <View style={styles.mapWrapper}>
          {isLoadingSeenPetLocations && (
            <ActivityIndicator
              color={theme.colors.blue900}
              size={'large'}
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
            />
          )}
          <Map
            markers={[
              ...seenPetsMarkers,
              { ...lostAtLocation, color: theme.colors.blue900 },
            ]}
            onMarkerPress={onMarkerPress}
          />
        </View>
        <View style={styles.legend}>
          <View style={styles.row}>
            <Icon
              type='ionicon'
              name='location'
              color={theme.colors.blue900}
              containerStyle={styles.legendIconContainer}
            />
            <Text style={styles.legendText}>
              Локација каде е изгубен миленикот
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              type='ionicon'
              name='location'
              color={theme.colors.red500}
              containerStyle={styles.legendIconContainer}
            />
            <Text style={styles.legendText}>
              Локација каде е виден миленикот
            </Text>
          </View>
        </View>
      </Card>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContaniner: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  cardWrapper: {
    backgroundColor: theme.colors.whiteSmoke,
  },
  mapWrapper: {
    height: '90%',
    width: '100%',
    position: 'relative',
  },
  legend: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIconContainer: {
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.lightBlue500,
  },
}));

export default PetLocationsScreen;
