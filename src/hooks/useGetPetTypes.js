import { useQuery } from '@tanstack/react-query';
import { API } from '../api';

const petTypesMapping = {
  DOG: 'Куче',
  CAT: 'Маче',
  BIRD: 'Птица',
  REPTILE: 'Влекач',
  HAMSTER: 'Хрчак',
  GUINEA_PIG: 'Морско Прасе',
  OTHER: 'Друго',
};

const useGetPetTypes = () => {
  const { data, isLoading } = useQuery({
    placeholderData: [],
    queryKey: ['pet-types'],
    queryFn: async () => {
      const _petTypes = (await API.getPetTypes()).data;
      return _petTypes.map((type) => ({
        key: type,
        label: petTypesMapping[type],
      }));
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useGetPetTypes;
