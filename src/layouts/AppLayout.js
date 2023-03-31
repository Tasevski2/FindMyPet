import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppLayout = ({ children, shouldSetInsetsPaddingTop = false }) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets, shouldSetInsetsPaddingTop });
  return <View style={styles.container}>{children}</View>;
};

const useStyles = makeStyles(
  (theme, { insets, shouldSetInsetsPaddingTop }) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.appBackground,
      paddingTop: shouldSetInsetsPaddingTop ? insets.top : 0,
    },
  })
);

export default AppLayout;
