import { FlatList } from 'react-native';
import { makeStyles } from '@rneui/themed';
import AppLayout from '../../layouts/AppLayout';
import SearchBarHeader from '../../components/SearchBarHeader';
import { useEffect, useState } from 'react';
import { mockLostPets, mockPetTypes } from '../../../mockData';
import LostPetCard from '../../components/LostPetCard';
import HorizontalBtnCategorySelection from '../../components/HorizontalBtnCategorySelection';

const HomeScreen = () => {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const [petTypes, setPetTypes] = useState([]);
  const [filteredLostPets, setFilteredLostPets] = useState(mockLostPets || []);

  const onSearchOrTypeChange = () => {
    const _search = search.trim().toLowerCase();
    const isInPetTypes = petTypes.length
      ? (type) => petTypes.includes(type)
      : () => true;
    const _filtered = mockLostPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(_search) && isInPetTypes(pet.type)
    );
    setFilteredLostPets(_filtered);
  };

  useEffect(() => {
    onSearchOrTypeChange();
  }, [search, petTypes]);

  return (
    <AppLayout>
      <SearchBarHeader value={search} onChangeText={setSearch} />

      <FlatList
        data={filteredLostPets}
        keyExtractor={(lostPet) => lostPet.id}
        renderItem={({ item }) => <LostPetCard {...item} />}
        style={styles.lostPetsList}
        ListHeaderComponent={
          <HorizontalBtnCategorySelection
            categories={mockPetTypes}
            onChange={setPetTypes}
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
