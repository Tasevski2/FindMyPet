import { Card, Icon, makeStyles } from '@rneui/themed';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Map from '../../components/Map';
import AppLayout from '../../layouts/AppLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../../api';
import { useNavigation } from '@react-navigation/native';
import MyImage from '../../components/MyImage';

const NewSeenLocationMessageScreen = ({ route }) => {
  const styles = useStyles();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { id, type, seenPetDTO } = route.params;
  const { reportedBy, seenAtTime, seenAtLocation, photo } = seenPetDTO;
  const deleteNotificationMutation = useMutation({
    mutationFn: async () => (await API.deleteNotification(id)).data,
    onSuccess: (res, userData) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      navigation.goBack();
    },
    onError: (err) => console.log(err),
  });

  return (
    <AppLayout>
      <ScrollView>
        <Card
          containerStyle={styles.cardContainer}
          wrapperStyle={styles.cardWrapper}
        >
          <Icon
            containerStyle={styles.deleteNotificationIconContainer}
            style={styles.deleteNotificationIcon}
            type='material-community'
            name='delete'
            color={'red'}
            size={35}
            onPress={() => deleteNotificationMutation.mutate()}
          />
          <Card.Title style={styles.title}>Нова локација:</Card.Title>
          <View style={styles.mapView}>
            <Map
              markers={[{ coordinates: seenAtLocation.coordinates }]}
              initCamera={{
                center: {
                  latitude: seenAtLocation.coordinates.latitude,
                  longitude: seenAtLocation.coordinates.longitude,
                },
                altitude: 1000,
                zoom: 15,
                heading: 0,
                pitch: 0,
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Виден од:</Text>
            <Text style={styles.value}>{reportedBy.fullName}</Text>
          </View>
          <View style={{ ...styles.row, marginBottom: 50 }}>
            <Text style={styles.key}>Телефон:</Text>
            <Text style={styles.value}>{reportedBy.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Локација:</Text>
            <Text style={styles.value}>
              {seenAtLocation.address}, {seenAtLocation.municipality}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Поставена слика:</Text>
          </View>
          <MyImage
            imagePath={photo}
            containerStyle={{
              width: '100%',
              height: Dimensions.get('window').height * 0.4,
            }}
            resizeMode='stretch'
          />
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
    position: 'relative',
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
  deleteNotificationIconContainer: {
    position: 'absolute',
    right: -22,
    top: -20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  deleteNotificationIcon: {},
}));

export default NewSeenLocationMessageScreen;
