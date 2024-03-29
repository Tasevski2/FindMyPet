import LostPetCard from '../../components/LostPetCard';
import AppLayout from '../../layouts/AppLayout';
import { ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../api';

const MyPostsScreen = () => {
  const { data: myLostPets, isLoading: isLoadingMyLostPets } = useQuery({
    placeholderData: [],
    queryKey: ['my-lost-pets'],
    queryFn: async () => (await API.getMyLostPets()).data,
  });

  return (
    <AppLayout>
      {isLoadingMyLostPets ? (
        <ActivityIndicator
          size={'large'}
          color='white'
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={myLostPets}
          keyExtractor={(lostPet) => lostPet.id}
          renderItem={({ item }) => (
            <LostPetCard {...item} shouldShowDeleteBtn />
          )}
        />
      )}
    </AppLayout>
  );
};

export default MyPostsScreen;
