import { View, Text } from 'react-native';
import { Button, Icon, makeStyles, useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import ExpoConstants from 'expo-constants';

const TakeOrChoosePhoto = ({ reverseColor = false, setImage, space = 10 }) => {
  const { theme } = useTheme();
  const styles = useStyles({ reverseColor, space });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;
    const uri = result.assets[0].uri;
    const type = uri.split('.').at(-1);
    setImage({ uri, type });
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  useEffect(() => {
    (async () => {
      if (ExpoConstants.platform.ios) {
        let cameraStatus = await ImagePicker.getCameraPermissionsAsync();
        console.log({ cameraStatus });
        if (cameraStatus.status !== 'granted') {
          cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
          if (cameraStatus.status !== 'granted') {
            alert('Извинете, но ни треба ваша дозвола за камерата да работи!');
          }
        }
      }
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Button
        title='Сликни'
        onPress={takeImage}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
        icon={
          <Icon
            type='material'
            name='photo-camera'
            color={
              reverseColor ? theme.colors.lightBlue200 : theme.colors.white
            }
          />
        }
      />
      <Text style={styles.orText}>или</Text>
      <Button
        title='Избери од Галерија'
        onPress={pickImage}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
        icon={
          <Icon
            type='material'
            name='photo-library'
            color={
              reverseColor ? theme.colors.lightBlue200 : theme.colors.white
            }
          />
        }
      />
    </View>
  );
};

const useStyles = makeStyles((theme, { reverseColor, space }) => ({
  wrapper: {
    alignItems: 'center',
  },
  btnContainer: {},
  btn: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: !reverseColor
      ? theme.colors.lightBlue200
      : theme.colors.white,
  },
  btnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: reverseColor ? theme.colors.lightBlue200 : theme.colors.white,
    marginLeft: 7,
  },
  btnIconContainerStyle: {
    marginRight: 5,
    backgroundColor: 'red',
  },
  orText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: !reverseColor ? theme.colors.lightBlue200 : theme.colors.white,
    marginVertical: space,
  },
}));

export default TakeOrChoosePhoto;
