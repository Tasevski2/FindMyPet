import { makeStyles } from '@rneui/themed';
import { Image, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import logo from '../assets/logo.png';
import AppLayout from './AppLayout';

const AuthLayout = ({ children }) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({
    insetsPaddingTop: insets.top,
    insetsPaddingBottom: insets.bottom,
  });

  return (
    <AppLayout>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.childrenWrapper}>{children}</View>
      </View>
    </AppLayout>
  );
};

const useStyles = makeStyles(
  (theme, { insetsPaddingTop, insetsPaddingBottom }) => ({
    container: {
      alignItems: 'center',
      height: '100%',
      width: '100%',
      paddingTop: insetsPaddingTop + Dimensions.get('window').height * 0.02,
      paddingBottom: insetsPaddingBottom,
    },
    childrenWrapper: {
      height: '100%',
      flex: 1,
      justifyContent: 'space-between',
      width: '80%',
    },
    logo: {
      width: Dimensions.get('window').width * 0.45,
      height: Dimensions.get('window').width * 0.45,
      marginBottom: Dimensions.get('window').height * 0.05,
    },
  })
);

export default AuthLayout;
