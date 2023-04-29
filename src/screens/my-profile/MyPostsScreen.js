import { useState } from 'react';
import { mockLostPets } from '../../../mockData';
import LostPetCard from '../../components/LostPetCard';
import AppLayout from '../../layouts/AppLayout';
import { FlatList } from 'react-native';

const MyPostsScreen = () => {
  const [myLostPets, setMyLostPets] = useState(mockLostPets);

  return (
    <AppLayout>
      <FlatList
        data={myLostPets}
        keyExtractor={(lostPet) => lostPet.id}
        renderItem={({ item }) => <LostPetCard {...item} shouldShowDeleteBtn />}
      />
    </AppLayout>
  );
};

export default MyPostsScreen;
