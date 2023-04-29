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
import { mockPetTypesDropdownChoices } from '../../../mockData';
import { useValidation } from '../../hooks';

const AddScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(0);
  const [formData, setFormData] = useState({
    location: null,
    image: null,
    name: '',
    type: mockPetTypesDropdownChoices[0].value,
    description: '',
  });

  const onNext = (tabId, _formData) => {
    if (tabId === 2) {
      // _formData is send only by the last tab
      const lostPetData = { ...formData, ..._formData };
      console.log({ lostPetData });
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
          initName={formData.name}
          initType={formData.type}
          initDescription={formData.description}
          location={formData.location}
        />
      )}
    </AppLayout>
  );
};

const PetInfo = ({
  tabId,
  onNext,
  onBack,
  submitData,
  initName,
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

    onNext(tabId, { name, type, description });
  };

  useEffect(() => {
    return () => submitData({ name, type, description });
  }, [name, type, description]);

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
                items={mockPetTypesDropdownChoices}
                {...styles.dropdown}
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
          <ActionsBtns tabId={tabId} onBack={onBack} onNext={onSend} />
        </>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeStyles((theme) => ({
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
