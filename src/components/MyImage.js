import { View, Image, ActivityIndicator } from 'react-native';
import useGetImage from '../hooks/useGetImage';
import { useTheme } from '@rneui/themed';

const MyImage = ({
  imagePath,
  containerStyle = {},
  imageStyle = {},
  resizeMode = 'cover',
}) => {
  const { image, isLoadingImage } = useGetImage(imagePath);
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
    >
      {isLoadingImage ? (
        <ActivityIndicator size='large' color={theme.colors.appBackground} />
      ) : (
        <Image
          style={{
            ...imageStyle,
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
          source={{ uri: image }}
          resizeMode={resizeMode}
        />
      )}
    </View>
  );
};

export default MyImage;
