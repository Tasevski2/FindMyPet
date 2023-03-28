import { makeStyles } from '@rneui/themed';
import { View, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import logoText from '../assets/logo_text.png';
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Image source={logoText} />
      <Animatable.Image
        animation='pulse'
        iterationCount='infinite'
        easing='ease-in'
        source={logo}
        style={styles.logo}
      ></Animatable.Image>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.lightBlue300,
    height: '100%',
    width: '100%',
    paddingBottom: Dimensions.get('window').height * 0.15,
  },

  logo: {
    marginTop: Dimensions.get('window').height * 0.04,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
  },
}));

export default SplashScreen;
