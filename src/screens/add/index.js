import { View } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import TakeOrChoosePhoto from '../../components/TakeOrChoosePhoto';
import { makeStyles } from '@rneui/themed';

const AddScreen = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <View style={styles.wrapper}>
        <TakeOrChoosePhoto reverseColor space={20} />
      </View>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export default AddScreen;
