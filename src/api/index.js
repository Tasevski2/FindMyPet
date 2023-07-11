import axiosInstance from './axios-instance';

const getLostPets = ({ search = '', types = [], municipalities = [] }) => {
  const params = {};
  if (search) params.search = search;

  if (types.length > 0) {
    const typesJoined = types.join(',');
    params.types = typesJoined;
  }
  if (municipalities.length > 0) {
    const municipalitiesJoined = municipalities.join(',');
    params.municipalities = municipalitiesJoined;
  }
  let queryString = '?';

  for (let [key, value] of Object.entries(params)) {
    queryString += `${key}=${value}&`;
  }
  return axiosInstance.get(`/lost-pets/all${queryString}`);
};

const getMyLostPets = () => axiosInstance.get('/lost-pets/pets-by-user');

const getLostPetSeenLocations = (id) =>
  axiosInstance.get(`/seen-pets?lostPetId=${id}`);

const getPetTypes = () => axiosInstance.get('/lost-pets/pet-types');

const getMunicipalities = () =>
  axiosInstance.get('/locations/municipalities/all');

const getNotifications = () => axiosInstance.get('/notifications/all-by-user');

const getImage = (imagePath) =>
  axiosInstance.get(
    `/photos/get-photo?photoPath=${encodeURIComponent(imagePath)}`,
    {
      responseType: 'arraybuffer',
    }
  );

const registerUser = (userData) =>
  axiosInstance.post('/user/register', userData);

const loginUser = (userData) => axiosInstance.post('/user/login', userData);

const getLoggedInUser = () => axiosInstance.get('/user/me');

const validateJWT = (jwt) =>
  axiosInstance.get(`/user/validate-token?token=${jwt}`);

const updateUserDetails = (details) =>
  axiosInstance.post('/user/change-user-details', details);

const resetPassword = (email) =>
  axiosInstance.get(`/user/reset-password?email=${email}`);

const deleteProfile = () => axiosInstance.get('/user/delete');

const deteleLostPetPost = (id) => axiosInstance.get(`/lost-pets/delete/${id}`);

const createLostPetPost = (formData, fieldsToBeSend) => {
  let queryString = '?';
  for (let [key, value] of Object.entries(fieldsToBeSend)) {
    queryString += `${key}=${value}&`;
  }
  return axiosInstance.post(`/lost-pets/create${queryString}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const reportForNewLocationOfLostPet = async (formData, fieldsToBeSend) => {
  let queryString = '?';
  let headers = {};
  for (let [key, value] of Object.entries(fieldsToBeSend)) {
    queryString += `${key}=${value}&`;
  }

  if (formData['_parts'].length > 0) {
    headers = { 'Content-Type': 'multipart/form-data' };
  }

  return axiosInstance.post(`/seen-pets/create${queryString}`, formData, {
    headers: headers,
  });
};

const setUserCloudMessagingToken = (token) =>
  axiosInstance.post(`/user/set-token?deviceToken=${token}`);

const deleteNotification = (id) =>
  axiosInstance.get(`/notifications/delete/${id}`);

export const API = {
  getLostPets,
  getMunicipalities,
  getLostPetSeenLocations,
  getMyLostPets,
  getNotifications,
  getLoggedInUser,
  getPetTypes,
  getImage,
  registerUser,
  loginUser,
  validateJWT,
  updateUserDetails,
  resetPassword,
  deleteProfile,
  deteleLostPetPost,
  createLostPetPost,
  reportForNewLocationOfLostPet,
  setUserCloudMessagingToken,
  deleteNotification,
};
