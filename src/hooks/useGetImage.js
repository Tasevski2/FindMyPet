import { useQuery } from '@tanstack/react-query';
import { fromByteArray } from 'base64-js';
import { API } from '../api';

const useGetImage = (imagePath) => {
  const { data: image, isLoading: isLoadingImage } = useQuery({
    enabled: !!imagePath,
    queryFn: async () => {
      const imageData = (await API.getImage(imagePath)).data;
      const base64Image = fromByteArray(new Uint8Array(imageData)).toString(
        'base64'
      );
      return `data:image/jpeg;base64,${base64Image}`;
    },
    queryKey: ['photo', imagePath],
  });

  return { image, isLoadingImage };
};

export default useGetImage;
