import { capitalize } from 'lodash';

const MIN_PASSWORD_LENGTH = 8;
const STRING_MIN_LENGTH = 1;

const regexIsEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const regexAtLeastOneUppercase = new RegExp(/(?=.*[A-Z])/);
const regexAtLeastOneDigit = new RegExp(/(?=.*\d)/);
const regexAtLeastOneSymbol = new RegExp(
  /.*[\!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/
);

const useValidation = () => {
  const isEmail = (email = '') => {
    return regexIsEmail.test(String(email).toLowerCase());
  };
  const validateLength = (
    value = '',
    fieldName,
    options = { minLength: STRING_MIN_LENGTH, noWhiteSpace: false }
  ) => {
    let _value = String(value);
    _value = options.noWhiteSpace ? _value.replace(/\s+/g, '') : _value;
    if (_value.trim().length < options.minLength) {
      return {
        error: `Полето '${capitalize(fieldName)}' треба да е подолго од ${
          options.minLength
        } карактери!`,
      };
    }
    return {};
  };
  const validateEmail = (email) => {
    if (!isEmail(email)) {
      return { error: 'Невалиден емаил!' };
    }
    return {};
  };
  // min 8 chars, min 1 uppercase, min 1 symbol, min 1 number
  const validatePassword = (password = '') => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        error: `Лозинката треба да е подолга од ${MIN_PASSWORD_LENGTH} карактери!`,
      };
    }
    if (
      !(
        _atLeastOneUppercase(password) &&
        _atLeastOneSymbol(password) &&
        _atLeastOneDigit(password)
      )
    ) {
      return {
        error:
          'Лозинката треба да содржи најмалку 1 голема буква, 1 број и 1 симбол!',
      };
    }

    return {};
  };
  const checkIfFormIsValidByErrorsObj = (errors = {}) => {
    let isValid = true;
    for (let v in Object.values(errors)) {
      if (v) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const _atLeastOneUppercase = (value = '') =>
    regexAtLeastOneUppercase.test(String(value));
  const _atLeastOneSymbol = (value = '') =>
    regexAtLeastOneSymbol.test(String(value));
  const _atLeastOneDigit = (value = '') =>
    regexAtLeastOneDigit.test(String(value));

  return {
    isEmail,
    checkIfFormIsValidByErrorsObj,
    validateEmail,
    validatePassword,
    validateLength,
  };
};

export default useValidation;
