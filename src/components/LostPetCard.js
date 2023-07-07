import { useNavigation } from '@react-navigation/native';
import { Card, Icon, makeStyles } from '@rneui/themed';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import MyImage from './MyImage';

const LostPetCard = (props) => {
  const { id, name, photo, petOwner, additionalInformation } = props;
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <Card
      wrapperStyle={styles.cardWrapper}
      containerStyle={styles.cardContainer}
    >
      <MyImage imagePath={photo} containerStyle={{ height: '100%' }} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.phoneNumber} numberOfLines={1}>
          {petOwner?.phoneNumber}
        </Text>
        <Text style={styles.additionalInformation} numberOfLines={7}>
          {additionalInformation}
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('PetAdditionalInfo', props)}
      >
        <Icon
          type='material'
          name='more-horiz'
          iconStyle={styles.dotsIconStyle}
          containerStyle={styles.dotsContainerStyle}
        />
      </TouchableWithoutFeedback>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    flexDirection: 'row',
    height: 210,
    padding: 0,
  },
  cardContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    color: 'blue',
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 900,
    textAlign: 'center',
    color: theme.colors.blue800,
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    color: theme.colors.blue900,
    marginBottom: 10,
  },
  additionalInformation: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'left',
    color: theme.colors.blue900,
  },
  dotsIconStyle: {
    fontSize: 60,
    color: theme.colors.lightBlue600,
  },
  dotsContainerStyle: {
    position: 'absolute',
    bottom: -25,
    right: -10,
  },
}));

export default LostPetCard;
