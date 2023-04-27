import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, makeStyles } from '@rneui/themed';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

const MessageCard = ({ photo, fullName, message }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Chat', { fullName })}
    >
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
      >
        <Avatar
          source={photo}
          rounded
          size={60}
          containerStyle={styles.avatarContainer}
        />
        <View style={styles.msgAndNameContainer}>
          <Text style={styles.fullName} numberOfLines={1}>
            {fullName}
          </Text>
          <Text style={styles.msg} numberOfLines={1}>
            {message}
          </Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    flexDirection: 'row',
  },
  cardContainer: {
    borderRadius: 15,
    marginTop: 7,
    marginHorizontal: 5,
  },
  avatarContainer: {
    backgroundColor: theme.colors.lightBlue100,
    marginRight: 20,
  },
  msgAndNameContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  fullName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.grey3,
  },
  msg: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.grey3,
  },
}));

export default MessageCard;
