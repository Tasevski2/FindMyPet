import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import Animated, { FadeOutLeft, SlideInRight } from 'react-native-reanimated';
import { makeStyles, useTheme } from '@rneui/themed';
import {
  ActionsBtns,
  ChooseImage,
  ChooseLocation,
} from '../home/ReportNewSeenLocationForPetScreen';
import { useStyles as useReportPetStyles } from '../home/ReportNewSeenLocationForPetScreen';
import MyInput from '../../components/inputs/MyInput';
import Map from '../../components/Map';

import DropDownPicker from 'react-native-dropdown-picker';
import { useValidation } from '../../hooks';
import useGetPetTypes from '../../hooks/useGetPetTypes';
import { capitalize } from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../../api';
import DateTimePicker from '../../components/DateTimePicker';

const formInitState = {
  location: null,
  image: null,
  name: '',
  type: '',
  description: '',
  lostAtTime: new Date(),
};

const minReportLostPetDate = new Date(
  new Date().getTime() - 1 * 24 * 60 * 60 * 1000
);

const AddScreen = () => {
  const queryClient = useQueryClient();
  const { data: petTypes, isLoading: isLoadingPetTypes } = useGetPetTypes();
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(0);
  const [formData, setFormData] = useState(formInitState);
  const createLostPetPostMutation = useMutation({
    mutationFn: async ({ formDataToBeSend, fieldsToBeSend }) =>
      (await API.createLostPetPost(formDataToBeSend, fieldsToBeSend)).data,
    onSuccess: (res, userData) => {
      queryClient.invalidateQueries({ queryKey: ['all-lost-pets'] });
      queryClient.invalidateQueries({ queryKey: ['municipalities'] });
      resetFormState();
      setActiveTab(0);
      prevTabRef.current = 0;
    },
    onError: (err) => console.log(err.message),
  });

  const resetFormState = () => setFormData(formInitState);

  const onNext = (tabId, _formData) => {
    if (tabId === 2) {
      // _formData is send only by the last tab
      const lostPetData = { ...formData, ..._formData };

      const fieldsToBeSend = {
        petType: lostPetData.type,
        name: lostPetData.name,
        additionalInformation: lostPetData.description,
        longitude: lostPetData.location.longitude,
        latitude: lostPetData.location.latitude,
        lostAtTime: lostPetData.lostAtTime.toISOString(),
      };
      const formDataToBeSend = new FormData();
      formDataToBeSend.append('photo', {
        uri: lostPetData.image.uri,
        type: 'image/' + lostPetData.image.type,
        name: 'lost-pet-' + Date.now() + '.' + lostPetData.image.type,
      });

      createLostPetPostMutation.mutate({ formDataToBeSend, fieldsToBeSend });
    } else {
      // _formData not needed
      prevTabRef.current = tabId;
      setActiveTab(tabId + 1);
    }
  };

  const onBack = (tabId) => {
    if (tabId === 0) {
      return;
    }
    prevTabRef.current = tabId;
    setActiveTab(tabId - 1);
  };

  const updateFormData = (_formData) => {
    setFormData((prevData) => ({ ...prevData, ..._formData }));
  };

  useEffect(() => {
    if (petTypes.length === 0) return;
    setFormData((prev) => ({ ...prev, type: petTypes[0]?.value }));
  }, [petTypes]);

  useEffect(() => () => resetFormState(), []);

  return (
    <AppLayout>
      {activeTab === 0 && (
        <ChooseImage
          tabId={0}
          prevTabId={prevTabRef.current}
          initImage={formData.image}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
          required
        />
      )}
      {activeTab === 1 && (
        <ChooseLocation
          tabId={1}
          prevTabId={prevTabRef.current}
          initLocation={formData.location}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
        />
      )}
      {activeTab === 2 && (
        <PetInfo
          tabId={2}
          prevTabId={prevTabRef.current}
          onNext={onNext}
          onBack={onBack}
          submitData={updateFormData}
          petTypes={petTypes}
          initName={formData.name}
          initType={formData.type}
          initDescription={formData.description}
          location={formData.location}
          disableNext={createLostPetPostMutation.isLoading}
        />
      )}
    </AppLayout>
  );
};

const PetInfo = ({
  tabId,
  onNext,
  disableNext,
  onBack,
  submitData,
  initName,
  petTypes,
  initType,
  initDescription,
  location,
}) => {
  const { theme } = useTheme();
  const { validateLength } = useValidation();
  const styles = { ...useReportPetStyles(), ...useStyles() };
  const [name, setName] = useState(initName);
  const [type, setType] = useState(initType);
  const [description, setDescription] = useState(initDescription);
  const [dateLost, setDateLost] = useState(new Date());
  const [timeLost, setTimeLost] = useState(new Date());
  const [isDropdownOpen, setDropdownVisi] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSend = () => {
    // check validity
    const _errors = {};
    const { error: nameError } = validateLength(name, 'Име');
    if (nameError) _errors.name = nameError;

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return;
    }

    onNext(tabId, {
      name,
      type,
      description,
      lostAtTime: getLostAtDateAndTime(),
    });
  };

  const getLostAtDateAndTime = () => {
    var year = dateLost.getFullYear();
    var month = dateLost.getMonth();
    var day = dateLost.getDate();
    var hours = timeLost.getHours();
    var minutes = timeLost.getMinutes();
    var seconds = timeLost.getSeconds();

    return new Date(year, month, day, hours, minutes, seconds);
  };

  useEffect(() => {
    return () =>
      submitData({
        name,
        type,
        description,
        lostAtTime: getLostAtDateAndTime(),
      });
  }, [name, type, description, dateLost, timeLost]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View
        style={styles.card}
        entering={SlideInRight}
        exiting={FadeOutLeft}
      >
        <>
          <View style={styles.petInfo}>
            <View style={styles.row}>
              <Text style={styles.key}>Име:</Text>
              <MyInput
                value={name}
                onChangeText={setName}
                reverseColor
                fontSize={16}
                errorMessage={errors?.name}
                containerStyle={styles.inputContainer}
              />
            </View>
            <View style={{ ...styles.row, zIndex: 1 }}>
              <Text style={styles.key}>Тип:</Text>
              <DropDownPicker
                open={isDropdownOpen}
                setOpen={setDropdownVisi}
                value={type}
                setValue={setType}
                placeholder='Изери тип на миленик'
                items={petTypes.map((i) => ({
                  label: capitalize(i.label),
                  value: i.key,
                }))}
                {...styles.dropdown}
              />
            </View>
            <View style={{ ...styles.row, marginTop: 15, flexWrap: 'wrap' }}>
              <Text style={{ ...styles.key }}>Изгбен на:</Text>
              <DateTimePicker
                time={timeLost}
                date={dateLost}
                setTime={setTimeLost}
                setDate={setDateLost}
                minDate={minReportLostPetDate}
                maxDate={new Date()}
                maxTime={new Date()}
              />
            </View>
            <View style={{ ...styles.row, marginTop: 20 }}>
              <Text style={styles.key}>Опис:</Text>
              <TextInput
                editable
                multiline
                scrollEnabled
                onChangeText={setDescription}
                value={description}
                style={styles.description}
                selectionColor={theme.colors.lightBlue500}
              />
            </View>
          </View>
          <View style={styles.hr}></View>
          <Text
            style={{
              ...styles.key,
              marginBottom: 5,
              marginTop: 10,
              opacity: 0.6,
            }}
          >
            Локација:
          </Text>
          <View style={styles.mapContaiener}>
            <Map markers={location ? [{ coordinates: location }] : []} />
          </View>
          <ActionsBtns
            tabId={tabId}
            onBack={onBack}
            onNext={onSend}
            disableNext={disableNext}
          />
        </>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  hr: {
    marginLeft: -15,
    marginBottom: 10,
    width: Dimensions.get('window').width,
    height: 1.2,
    opacity: 0.3,
    backgroundColor: theme.colors.lightBlue500,
  },
  petInfo: {
    marginBottom: 15,
    zIndex: 1,
  },
  description: {
    padding: 5,
    flex: 1,
    height: 75,
    borderColor: theme.colors.lightBlue100,
    borderRadius: 5,
    borderWidth: 1,
    color: theme.colors.lightBlue500,
    fontSize: 16,
    fontWeight: '500',
  },
  dropdown: {
    containerStyle: { flex: 1 },
    style: { borderColor: theme.colors.lightBlue100 },
    labelStyle: {
      color: theme.colors.lightBlue500,
      fontSize: 16,
      fontWeight: 500,
    },
    listItemContainerStyle: {
      borderBottomColor: theme.colors.lightBlue100,
      borderBottomWidth: 1,
    },
    dropDownContainerStyle: {
      borderColor: theme.colors.lightBlue500,
    },
  },
}));

export default AddScreen;
