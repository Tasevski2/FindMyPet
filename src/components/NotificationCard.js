import { Card, Icon, makeStyles, useTheme } from '@rneui/themed';
import { NotificationTypeEnum } from '../../enums';
import { Text, TouchableWithoutFeedback } from 'react-native';

const NotificationCard = ({ id, type, details, onPress }) => {
  const styles = useStyles({ notificationType: type });
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress && onPress({ id, type, details })}
    >
      <Card
        wrapperStyle={styles.cardWrapper}
        containerStyle={styles.cardContainer}
      >
        {getLeftIcon(type, styles.leftIcon)}
        <Text style={styles.details} numberOfLines={4}>
          {details.description}
        </Text>
        {getRightIcon(type, styles.rightIcon)}
      </Card>
    </TouchableWithoutFeedback>
  );
};

const getLeftIcon = (notificationType, style) => {
  const {
    theme: { colors },
  } = useTheme();
  let icon = {};
  switch (notificationType) {
    case NotificationTypeEnum.NEW_SEEN_LOCATION:
      icon = {
        type: 'material-community',
        name: 'map-marker-radius',
        color: colors.red500,
      };
      break;
    case NotificationTypeEnum.INFORMATION:
      icon = {
        type: 'antdesign',
        name: 'exclamationcircle',
        color: colors.yellow500,
      };
      break;
    case NotificationTypeEnum.NEW_MESSAGE:
      icon = {
        type: 'material-community',
        name: 'chat-question',
        color: colors.greenA400,
      };
      break;
    default:
      icon = {
        type: 'material-community',
        name: 'map-marker-radius',
        color: colors.red500,
      };
  }
  return (
    <Icon
      type={icon.type}
      name={icon.name}
      color={icon.color}
      iconStyle={style}
    />
  );
};

const getRightIcon = (notificationType, style) => {
  const {
    theme: { colors },
  } = useTheme();
  let icon = {};
  switch (notificationType) {
    case NotificationTypeEnum.NEW_SEEN_LOCATION:
      icon = { type: 'antdesign', name: 'arrowright', color: colors.red500 };
      break;
    case NotificationTypeEnum.INFORMATION:
      return null;
    case NotificationTypeEnum.NEW_MESSAGE:
      icon = { type: 'ionicon', name: 'eye', color: colors.greenA400 };
      break;
    default:
      icon = { type: 'antdesign', name: 'arrowright', color: colors.red500 };
  }
  return (
    <Icon
      type={icon.type}
      name={icon.name}
      color={icon.color}
      iconStyle={style}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    flexDirection: 'row',
    height: 90,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
    backgroundColor: theme.colors.lightBlue50,
  },
  details: {
    paddingHorizontal: 10,
    textAlign: 'center',
    flex: 1,
    fontWeight: 500,
  },
  leftIcon: {
    fontSize: 65,
  },
  rightIcon: {
    fontSize: 45,
  },
}));

export default NotificationCard;
