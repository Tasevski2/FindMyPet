import {
  Avatar,
  Card,
  Divider,
  Icon,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import AppLayout from '../../layouts/AppLayout';
import defaultAvatar from '../../assets/avatar.png';

const formatPhoneNumber = (number = '') => {
  let res = [];
  let i = 0;
  const _number = String(number);
  while (i < number?.length) {
    let t = '';
    for (let j = 0; j < 3; j++) {
      if (i + j < number.length) {
        t += _number[i + j];
      }
    }
    res.push(t);
    i += 3;
  }
  return res.join(' ');
};

const bottomNavigation = [
  // {
  //   getIconData: (colors) => ({
  //     type: 'material',
  //     name: 'chat',
  //     color: colors.greenA400,
  //   }),
  //   label: 'Пораки',
  //   navigateTo: 'Messages',
  // },
  {
    getIconData: (colors) => ({
      type: 'material-community',
      name: 'file-document-multiple-outline',
      color: colors.lightBlue500,
    }),
    label: 'Мои Објави',
    navigateTo: 'MyPosts',
  },
  {
    getIconData: (colors) => ({
      type: 'ionicon',
      name: 'settings-outline',
      color: colors.grey3,
    }),
    label: 'Налогодувања',
    navigateTo: 'Settings',
  },
];

const MyProfileScreen = ({ navigation }) => {
  const user = useSelector((store) => store.user.user);
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <AppLayout shouldSetInsetsPaddingTop>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          source={user.photo ?? defaultAvatar}
          size={200}
          rounded
          containerStyle={styles.avatarContainer}
        />
        <Text style={styles.fullname}>{user.fullName}</Text>
        <Divider
          style={styles.divider}
          color={theme.colors.white}
          width={1}
          orientation='horizontal'
        />
        <View style={styles.detailsRow}>
          <Text style={styles.detailsKey}>Телефонски број</Text>
          <Text style={styles.detailsValue}>
            {formatPhoneNumber(user.phoneNumber)}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsKey}>Е-маил</Text>
          <Text style={styles.detailsValue}>{user.email}</Text>
        </View>
        <View style={styles.navWrapper}>
          {bottomNavigation.map(({ getIconData, label, navigateTo }, ind) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.push(navigateTo)}
              key={ind}
            >
              <Card
                containerStyle={styles.navRowContainer}
                wrapperStyle={styles.navRowWrapper}
              >
                <Icon
                  {...getIconData(theme.colors)}
                  iconStyle={styles.navLeftIconStyle}
                />
                <Text style={styles.navLabel}>{label}</Text>
                <Icon
                  type='antdesign'
                  name='arrowright'
                  color={theme.colors.grey2}
                  iconStyle={styles.navRightIconStyle}
                />
              </Card>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.05,
  },
  avatarContainer: {
    backgroundColor: theme.colors.white,
  },
  fullname: {
    fontWeight: '800',
    fontSize: 25,
    color: theme.colors.white,
    marginTop: 10,
  },
  divider: {
    width: '90%',
    marginVertical: 20,
  },
  detailsRow: { alignItems: 'center', flex: 1, marginBottom: 15 },
  detailsKey: {
    marginBottom: 3,
    fontWeight: 700,
    fontSize: 16,
    color: theme.colors.white,
  },
  detailsValue: {
    flex: 1,
    fontWeight: 500,
    fontSize: 16,
    color: theme.colors.white,
  },
  navWrapper: {
    width: '100%',
    marginTop: Dimensions.get('window').height * 0.05,
  },
  navRowContainer: {
    width: '90%',
    borderRadius: 10,
    paddingVertical: 5,
  },
  navRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 500,
    color: theme.colors.grey3,
  },
  navLeftIconStyle: { marginRight: 20, fontSize: 35 },
  navRightIconStyle: { fontSize: 45 },
}));

export default MyProfileScreen;
