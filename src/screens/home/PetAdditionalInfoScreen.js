import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import { Button, Card, makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const PetAdditionalInfoScreen = (props) => {
  const {
    id,
    name,
    photo,
    petOwner,
    description,
    lostAtTime,
    lostAtLocation,
    lastSeenAtTime,
    seenAtLocations,
    lastSeenAtLocation,
  } = props.route.params;
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={{ uri: photo }}
            style={styles.image}
            resizeMode='stretch'
          />
          <View style={styles.info}>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.ownerInfo}>
              <Row keyName='Сопственик' value={petOwner.fullName} />
              <Row keyName='Телефон' value={petOwner.phoneNumber} />
            </View>
            <View style={styles.petInfo}>
              <Row keyName='Изгубен на' value={lostAtTime} />
              <Row keyName='Последно виден на' value={lastSeenAtTime} />
              <Row
                keyName='Последно видена локација'
                value={lastSeenAtLocation}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              title='Види локации'
              containerStyle={styles.seeLocationsBtnContainer}
              buttonStyle={styles.seeLocationsBtn}
              titleStyle={styles.btnTitle}
              onPress={() =>
                navigation.navigate('PetLocations', {
                  name,
                  lostAtLocation,
                  seenAtLocations,
                })
              }
            />
            <Button
              title='Извести за нова локација'
              containerStyle={styles.reportLocationBtnContainer}
              buttonStyle={styles.reportLocationBtn}
              titleStyle={styles.btnTitle}
              onPress={() =>
                navigation.navigate('ReportNewSeenLocationForPet', {
                  name,
                  lostAtLocation,
                  seenAtLocations,
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const Row = ({ keyName, value }) => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{keyName}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    marginBottom: 0,
  },
  wrapper: {
    backgroundColor: theme.colors.whiteSmoke,
    borderRadius: 10,
    padding: 15,
    paddingBottom: 25,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 10,
  },
  info: {
    marginVertical: 15,
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.lightBlue500,
  },
  ownerInfo: {
    marginBottom: 30,
  },
  petInfo: {},
  row: {
    flexDirection: 'row',
    marginBottom: 7,
    flexWrap: 'wrap',
  },
  key: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.lightBlue600,
    marginRight: 7,
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.lightBlue500,
  },
  buttons: {},
  seeLocationsBtnContainer: {
    marginBottom: 20,
    borderRadius: 10,
  },
  seeLocationsBtn: {
    backgroundColor: theme.colors.blue900,
    paddingVertical: 10,
  },
  reportLocationBtnContainer: {
    borderRadius: 10,
  },
  reportLocationBtn: {
    backgroundColor: theme.colors.red500,
    paddingVertical: 10,
  },
  btnTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
}));

export default PetAdditionalInfoScreen;
