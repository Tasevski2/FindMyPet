import { Button, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../utils/formatDate';

const DateTimePicker = ({
  time,
  date,
  setTime,
  setDate,
  minDate,
  maxDate,
  maxTime,
}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const styles = useStyles();
  const isAndroid = Platform.OS === 'android';

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.row}>
      <View style={{ flex: 1, marginRight: 2, alignItems: 'center' }}>
        {isAndroid ? (
          <Button
            title={formatDate(date)}
            onPress={showDatepicker}
            titleStyle={styles.dateBtnsAndroidText}
            buttonStyle={styles.dateBtnsAndroid}
          />
        ) : (
          <RNDateTimePicker
            value={date}
            mode='date'
            minimumDate={minDate}
            maximumDate={new Date()}
            onChange={(e, _date) => setDate(_date)}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        {isAndroid ? (
          <Button
            title={formatTime(time)}
            onPress={showTimepicker}
            titleStyle={styles.dateBtnsAndroidText}
            buttonStyle={styles.dateBtnsAndroid}
          />
        ) : (
          <RNDateTimePicker
            value={time}
            mode='time'
            maximumDate={maxDate}
            onChange={(e, _date) => setTime(_date)}
          />
        )}
        {show && (
          <RNDateTimePicker
            value={mode === 'time' ? time : date}
            mode={mode}
            is24Hour={true}
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={(e, _date) => {
              setShow(false);
              if (mode === 'time') {
                // do not let the user to choose time in the future
                if (date.getTime() / 1000 <= maxTime.getTime() / 1000 + 120)
                  setTime(_date);
              } else {
                setDate(_date);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dateBtnsAndroid: {
    backgroundColor: theme.colors.appBackground,
  },
  dateBtnsAndroidText: {
    fontSize: 16,
  },
}));

export default DateTimePicker;
