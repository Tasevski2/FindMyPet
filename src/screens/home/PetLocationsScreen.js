import { Card, Icon, makeStyles, useTheme } from '@rneui/themed';
import AppLayout from '../../layouts/AppLayout';
import { Text, View } from 'react-native';
import Map from '../../components/Map';

const PetLocationsScreen = (props) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { lostAtLocation, seenAtLocations } = props.route.params;

  return (
    <AppLayout>
      <Card
        containerStyle={styles.cardContaniner}
        wrapperStyle={styles.wrapperStyle}
      >
        <View style={styles.mapWrapper}>
          <Map
            markers={[
              ...seenAtLocations,
              { ...lostAtLocation, color: theme.colors.blue900 },
            ]}
          />
        </View>
        <View style={styles.legend}>
          <View style={styles.row}>
            <Icon
              type='ionicon'
              name='location'
              color={theme.colors.blue900}
              containerStyle={styles.legendIconContainer}
            />
            <Text style={styles.legendText}>
              Локација каде е изгубен миленикот
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              type='ionicon'
              name='location'
              color={theme.colors.red500}
              containerStyle={styles.legendIconContainer}
            />
            <Text style={styles.legendText}>
              Локација каде е виден миленикот
            </Text>
          </View>
        </View>
      </Card>
    </AppLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContaniner: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  cardWrapper: {
    backgroundColor: theme.colors.whiteSmoke,
  },
  mapWrapper: {
    height: '90%',
    width: '100%',
  },
  legend: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIconContainer: {
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.lightBlue500,
  },
}));

export default PetLocationsScreen;
