import { Text, TouchableWithoutFeedback, View } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import { Button, Card, Icon, makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <AppLayout>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MyProfileEdit')}
        >
          <Card
            wrapperStyle={styles.cardWrapper}
            containerStyle={styles.cardContainer}
          >
            <Text style={styles.label}>Профил</Text>
            <Icon
              type='material'
              name='arrow-forward-ios'
              iconStyle={styles.icon}
            />
          </Card>
        </TouchableWithoutFeedback>
        <Button
          containerStyle={styles.signOutContainer}
          buttonStyle={styles.signOutButton}
          titleStyle={styles.signOutTitle}
          title='Одјави се'
        />
      </View>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  cardContainer: {
    margin: 0,
  },
  label: {
    fontSize: 18,
  },
  icon: {},
  signOutContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '80%',
  },
  signOutButton: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.red500,
  },
  signOutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}));

export default SettingsScreen;
