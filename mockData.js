import avatarPhoto from './src/assets/avatar.png';

export const mockUser = {
  id: 1,
  fullName: 'Viktor Tasevski',
  email: 'viktor@gmail.com',
  phoneNumber: '123456789',
  password: 'Test123!',
  photo: avatarPhoto,
};

export const mockLostPets = [
  {
    id: 1,
    photo:
      'https://katu.com/resources/media/e006eac4-c008-4197-9d15-6ebec74aa06a-large9x16_RoseCityClassicday219.jpg?1518460184979',
    name: 'Niki',
    petOwner: {
      phoneNumber: '123123123',
      fullName: 'Jana',
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    type: 'dog',
    lostAtTime: new Date().toISOString(),
    lostAtLocation: {
      coordinates: {
        latitude: 41.987617,
        longitude: 21.442179,
      },
      municipality: 'Aerodrom',
    },
    seenAtLocations: [
      {
        coordinates: {
          latitude: 41.990159,
          longitude: 21.431591,
        },
        municipality: 'Centar',
      },
      {
        coordinates: {
          latitude: 41.987816,
          longitude: 21.452648,
        },
        municipality: 'Aerodrom',
      },
      {
        coordinates: {
          latitude: 41.986027,
          longitude: 21.437685,
        },
        municipality: 'Kisela Voda',
      },
      {
        coordinates: {
          latitude: 41.994381,
          longitude: 21.436587,
        },
        municipality: 'Centar',
      },
    ],
    lastSeenAtTime: new Date(Date.now() - 84000).toISOString(),
    lastSeenAtLocation: 'bul. Partizanski Odredi br.0',
  },
  {
    id: 2,
    photo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArtNvfXmXPL3m2NUPQYsze8TP_rJpeYMTxA&usqp=CAU',
    name: 'Diego',
    petOwner: {
      phoneNumber: '123123123',
    },
    description: 'Ve molam dokoku zabelezite...',
    type: 'parrot',
  },
  {
    id: 3,
    photo:
      'https://thumbs.dreamstime.com/b/adult-male-golden-retriever-17782827.jpg',
    name: 'Fifi',
    petOwner: {
      phoneNumber: '123123123',
    },
    description: 'Ve molam dokoku zabelezite...',
    type: 'dog',
  },
  {
    id: 4,
    photo: 'https://static.toiimg.com/photo/msid-92750074/92750074.jpg?1590657',
    name: 'Jana',
    petOwner: {
      phoneNumber: '123123123',
    },
    description: 'Ve molam dokoku zabelezite...',
    type: 'cat',
  },
];

export const mockPetTypes = [
  'dog',
  'cat',
  'parrot',
  'spider',
  'bee',
  'snake',
  'lion',
  'tiger',
];

export const mockMunicipalities = [
  'Aerodrom',
  'Centar',
  'Karpos 1',
  'Karpos 2',
  'Kisela Voda',
  'Cair',
  'Gazi Baba',
];

export const mockLostPetsMarkers = [
  {
    coordinates: {
      latitude: 41.986027,
      longitude: 21.437685,
    },
    municipality: 'Kisela Voda',
  },
  {
    coordinates: {
      latitude: 41.994381,
      longitude: 21.436587,
    },
    municipality: 'Centar',
  },
  {
    coordinates: {
      latitude: 41.987617,
      longitude: 21.442179,
    },
    municipality: 'Aerodrom',
  },
  {
    coordinates: {
      latitude: 41.990159,
      longitude: 21.431591,
    },
    municipality: 'Centar',
  },
  {
    coordinates: {
      latitude: 41.987816,
      longitude: 21.452648,
    },
    municipality: 'Aerodrom',
  },
];

export const mockNotifications = [
  {
    id: 1,
    type: 'NEW_SEEN_LOCATION',
    details: {
      description: 'Vasiot milenik e zabelezan na nova lokacija!',
      petName: 'Niki',
      seenBy: 'Viktor',
      phoneNumber: '123123123',
      location: 'bul. Jane Sandanski',
      coordinates: { latitude: 41.988972, longitude: 21.456844 },
    },
  },
  {
    id: 2,
    type: 'INFORMATION',
    details: { description: 'Vasiot milenik e zabelezan na nova lokacija!' },
  },
  {
    id: 3,
    type: 'NEW_MESSAGE',
    details: { description: 'Vasiot milenik e zabelezan na nova lokacija!' },
  },
  {
    id: 4,
    type: 'INFORMATION',
    details: { description: 'Vasiot milenik e zabelezan na nova lokacija!' },
  },
  {
    id: 5,
    type: 'NEW_SEEN_LOCATION',
    details: {
      description: 'Vasiot milenik e zabelezan na nova lokacija!',
      petName: 'Fifi',
      seenBy: 'Jana',
      phoneNumber: '321321321',
      location: 'ul. Rumena Hadzipanzova',
      coordinates: {
        latitude: 41.93820461311482,
        longitude: 21.512321673610032,
      },
    },
  },
  {
    id: 6,
    type: 'NEW_MESSAGE',
    details: { description: 'Vasiot milenik e zabelezan na nova lokacija!' },
  },
  {
    id: 7,
    type: 'NEW_MESSAGE',
    details: { description: 'Vasiot milenik e zabelezan na nova lokacija!' },
  },
];

export const mockMessages = [
  {
    id: 1,
    photo: avatarPhoto,
    fullName: 'Viktor',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 2,
    photo: avatarPhoto,
    fullName: 'Jana',
    message:
      'Go vidov nikii pred 5 min,Go vidov nikii pred 5 min,Go vidov nikii pred 5 min',
  },
  {
    id: 3,
    photo: avatarPhoto,
    fullName: 'Viktor',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 4,
    photo: avatarPhoto,
    fullName: 'Viktor',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 5,
    photo: avatarPhoto,
    fullName: 'Viktor',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 6,
    photo: avatarPhoto,
    fullName: 'Helow',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 7,
    photo: avatarPhoto,
    fullName: '1234',
    message: 'Go vidov nikii pred 5 min',
  },
  {
    id: 8,
    photo: avatarPhoto,
    fullName: 'Test',
    message: 'Go vidov nikii pred 5 min',
  },
];
