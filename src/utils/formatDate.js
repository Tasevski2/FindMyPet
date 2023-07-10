import moment from 'moment';

export const formatDateAndTime = (date) =>
  moment(date).format('DD.MM.YYYY, HH:mm:ss');

export const formatDate = (date) => moment(date).format('DD.MM.YYYY');

export const formatTime = (date) => moment(date).format('HH:mm:ss');
