import { Card, makeStyles } from '@rneui/themed';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Map from '../../components/Map';
import AppLayout from '../../layouts/AppLayout';
const NewSeenLocationMessageScreen = ({ route }) => {
  const styles = useStyles();

  const { id, type, details } = route.params;
  return (
    <AppLayout>
      <ScrollView>
        <Card
          containerStyle={styles.cardContainer}
          wrapperStyle={styles.cardWrapper}
        >
          <Card.Title style={styles.title}>Нова локација:</Card.Title>
          <View style={styles.mapView}>
            <Map
              markers={[{ coordinates: details.coordinates }]}
              initCamera={{
                center: {
                  latitude: details.coordinates.latitude,
                  longitude: details.coordinates.longitude,
                },
                altitude: 1000,
                zoom: 15,
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Виден од:</Text>
            <Text style={styles.value}>{details.seenBy}</Text>
          </View>
          <View style={{ ...styles.row, marginBottom: 50 }}>
            <Text style={styles.key}>Телефон:</Text>
            <Text style={styles.value}>{details.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Локација:</Text>
            <Text style={styles.value}>{details.location}</Text>
          </View>
        </Card>
      </ScrollView>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    padding: 0,
  },
  cardContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.lightBlue600,
  },
  mapView: {
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    flex: 1,
  },
  key: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.lightBlue600,
    marginRight: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.lightBlue400,
    flex: 1,
  },
}));

export default NewSeenLocationMessageScreen;
