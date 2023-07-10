import { Text, View } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import { useStyles as useReportPetStyles } from './ReportNewSeenLocationForPetScreen';
import { useStyles as userAddPetStyles } from '../add';
import { formatDateAndTime } from '../../utils/formatDate';
import MyImage from '../../components/MyImage';

const PetSeenLocationInfoScreen = (props) => {
  const styles = { ...useReportPetStyles(), ...userAddPetStyles() };
  const seenPet = props.route.params;

  return (
    <AppLayout>
      <View style={styles.card}>
        <View style={{ ...styles.row, marginBottom: 20 }}>
          <Text style={styles.key}>Виден на:</Text>
          <Text style={styles.value}>
            {formatDateAndTime(seenPet.seenAtTime)}
          </Text>
        </View>
        <View style={{ ...styles.row, marginBottom: 5 }}>
          <Text style={styles.key}>Виден од:</Text>
          <Text style={styles.value}>{seenPet.reportedBy.fullName}</Text>
        </View>
        <View style={{ ...styles.row, marginBottom: 30 }}>
          <Text style={styles.key}>Телефон:</Text>
          <Text style={styles.value}>{seenPet.reportedBy.phoneNumber}</Text>
        </View>
        <MyImage
          imagePath={seenPet.photo}
          containerStyle={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            marginBottom: 20,
          }}
          resizeMode='stretch'
        />
      </View>
    </AppLayout>
  );
};

export default PetSeenLocationInfoScreen;
