import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { API } from '../api';
import { useDispatch } from 'react-redux';
import { failedToRetrieveUserAction, validJWT } from '../store/actions';

const useCheckIfLoggedIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function check() {
      const jwt = await AsyncStorage.getItem('jwt');
      if (!jwt) {
        dispatch(failedToRetrieveUserAction());
        return;
      }
      const isValid = (await API.validateJWT(jwt)).data;

      if (!isValid) {
        await AsyncStorage.removeItem('jwt');
        dispatch(failedToRetrieveUserAction());
        return;
      }
      dispatch(validJWT(jwt));
    }
    check();
  }, []);
};

export default useCheckIfLoggedIn;
