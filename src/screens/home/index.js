import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { makeStyles } from '@rneui/themed';
import AppLayout from '../../layouts/AppLayout';
import SearchBarHeader from '../../components/SearchBarHeader';
import { useState } from 'react';
import LostPetCard from '../../components/LostPetCard';
import HorizontalBtnCategorySelection from '../../components/HorizontalBtnCategorySelection';
import { API } from '../../api';
import useGetPetTypes from '../../hooks/useGetPetTypes';

const HomeScreen = () => {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const { data: pets, isLoading: isLoadingPets } = useQuery({
    placeholderData: [],
    queryKey: ['all-lost-pets', search, selectedPetTypes],
    queryFn: async () =>
      (await API.getLostPets({ search: search, types: selectedPetTypes })).data,
  });
  const { data: petTypes, isLoading: isLoadingPetTypes } = useGetPetTypes();

  return (
    <AppLayout>
      <SearchBarHeader value={search} onChangeText={setSearch} />

      <FlatList
        data={pets}
        keyExtractor={(lostPet) => lostPet.id}
        renderItem={({ item }) => <LostPetCard {...item} shouldShowReportBtn />}
        style={styles.lostPetsList}
        ListHeaderComponent={
          <HorizontalBtnCategorySelection
            categories={petTypes}
            onChange={setSelectedPetTypes}
          />
        }
      />
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  lostPetsList: { marginTop: 5 },
}));

export default HomeScreen;
