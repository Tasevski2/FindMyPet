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
        error: `${capitalize(fieldName)} minimum length is ${
          options.minLength
        } characters!`,
      };
    }
    return {};
  };
  const validateEmail = (email) => {
    if (!isEmail(email)) {
      return { error: 'Invalid format of email!' };
    }
    return {};
  };
  // min 8 chars, min 1 uppercase, min 1 symbol, min 1 number
  const validatePassword = (password = '') => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        error: `Password minimum length is ${MIN_PASSWORD_LENGTH} characters!`,
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
        error: 'Password must have at least 1 uppercase, 1 digit and 1 symbol!',
      };
    }

    return {};
  };
  const checkIfFormIsValidByErrorsObj = (errors = {}) => {
    let isValid = true;
    for (let v in Object.values(errors)) {
      console.log(`v: ${v}`);
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
