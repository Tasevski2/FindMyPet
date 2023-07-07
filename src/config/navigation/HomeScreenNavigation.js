import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';
import { makeStyles } from '@rneui/themed';
import PetAdditionalInfoScreen from '../../screens/home/PetAdditionalInfoScreen';
import PetLocationsScreen from '../../screens/home/PetLocationsScreen';
import ReportNewSeenLocationForPetScreen from '../../screens/home/ReportNewSeenLocationForPetScreen';
import PetSeenLocationInfoScreen from '../../screens/home/PetSeenLocationInfoScreen';

const HomeStack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
  const styles = useStyles();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name='Home'
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        component={PetAdditionalInfoScreen}
        name='PetAdditionalInfo'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
      <HomeStack.Screen
        component={PetLocationsScreen}
        name='PetLocations'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
      <HomeStack.Screen
        component={ReportNewSeenLocationForPetScreen}
        name='ReportNewSeenLocationForPet'
        options={({ route }) => ({
          headerTitle: `Нова локација: ${route.params.name}`,
          headerTitleStyle: styles.title,
        })}
      />
      <HomeStack.Screen
        component={PetSeenLocationInfoScreen}
        name='PetSeenLocationInfoScreen'
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerTitleStyle: styles.title,
        })}
      />
    </HomeStack.Navigator>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.lightBlue600,
  },
}));

export default HomeScreenNavigation;
