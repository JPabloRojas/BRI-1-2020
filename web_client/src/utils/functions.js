// @ts-nocheck
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */

export const isNotANumber = value => String(value) === 'NaN';

/**
 * It will check if a value is falsy but with slightly modifications.
 * @example
 * | type    |  description                    |
 * |---------|–--------------------------------|
 * | Objects | "{}" => true. "{a: 2}" => false |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => true. "[2]" => false    |
 * |---------|---------------------------------|
 *
 * @param {Any} value Any value to be checked
 * @return Boolean
 */
export const falsy = value => {
  let isFalsy = false;

  function isPromise(object) {
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) === object;
    }
  }

  if (!isPromise(value) && !value) {
    isFalsy = true;
  } else if (!isPromise(value) && typeof value === 'object') {
    if (!(value instanceof Date)) {
      // check for dates
      isFalsy = !Object.keys(value).length;
    }
  }

  return isFalsy;
};

/**
 * It will check if a value is truthty but with slightly modifications.
 * @example
 * | type    |  description                    |
 * |---------|–--------------------------------|
 * | Objects | "{}" => false. "{a: 2}" => true |
 * |---------|---------------------------------|
 * | Arrays  | "[]" => false. "[2]" => true    |
 * |---------|---------------------------------|
 *
 * @param {Any} value Any value to be checked
 * @return Boolean
 */
export const truthty = value => {
  let isTruthy = false;

  if (/^\d+$/.test(value)) {
    value = Number(value);
  }

  if (value && !isNotANumber(value)) {
    isTruthy = true;
    if (typeof value === 'object' && Object.keys(value).length) {
      isTruthy = true;
    } else if (typeof value === 'object' && !Object.keys(value).length) {
      isTruthy = false;
    }
  }

  return isTruthy;
};

Object.defineProperty(Object, 'extractValues', {
  /**
   * It will return all the values from an Object or an alement from an specific
   * given position.
   *
   * @param {Object} element The object to extract all the values
   * @param {Number} position The position of the element we would like to get in return
   * @return Array of the object values.
   */
  value: function extractValues(element, position) {
    let el = [];

    if (truthty(element) && Object.values(element).length) {
      if (position >= 0 && position !== undefined && position !== null) {
        el = Object.values(element)[position];
      } else {
        el = Object.values(element);
      }
    }

    return el;
  },
  writable: true,
});

Object.defineProperty(Object, 'hasValues', {
  /**
   * It will check if the given object has any elements as a value
   *
   * @param {Object} element The element to check the values
   * @return Boolean
   */
  value: function hasValues(element) {
    return Boolean(Object.values(element).length);
  },
  writable: true,
});

Object.defineProperty(Object, 'findValue', {
  value: function findValue(element, fnc) {
    return truthty(element) ? Object.values(element).find(fnc) : [];
  },
  writable: true,
});

Object.defineProperty(Object, 'filterValues', {
  value: function filterValues(element, fnc) {
    return truthty(element) ? Object.values(element).filter(fnc) : [];
  },
  writable: true,
});

/**
 * It will turn out an object into an array of objects keeping the original
 * keys
 *
 * @param {object} obj the object to seek for
 * @return {array} An array of objects
 */
export const objectToArray = obj =>
  Object.keys(obj).reduce((prev, current) => [...prev, { [current]: obj[current] }], []);

/**
 * It will turn out an array of object into a new array of objects or a new object of objects, but
 * the objects in the arrays are based on the passed `key` and `value` params
 * extracted from the objects in the initial array
 *
 * @param {array} array The array to seek for
 * @param {string} key The name of the atribute to use as a key
 * @param {string} value The name of the atribute to use as a value
 * @return {array} a new array of objects
 */
export const compressObject = (array, key, value) =>
  array.reduce((prev, current) => [...prev, { [current[key]]: current[value] }], []);

export const appendToObject = (array, extraKey, extraValue, objItself = false) =>
  array.reduce(
    (prev, current) => [
      ...prev,
      {
        ...current,
        [extraKey]: objItself ? current[extraValue] : extraValue,
      },
    ],
    [],
  );

/**
 * It will turn out an array of objects to a single object
 *
 * @param {array} arr The array to seek for
 * @return {object} A new object
 */
export const flatObject = arr =>
  arr.reduce((prev, current) => {
    const [[key, value]] = Object.entries(current);

    prev[key] = value;
    return prev;
  }, {});

/**
 * HOC - It will return only one value from an object.
 * falsy values are not returned.
 * Eg: data.name - returned value is "name".
 * Useful to work with `map`
 *
 * @param {any} key The name of the chain attribute to get the value from
 * @param {any} content The content from where to extract the value
 * @return {any} The needed value
 */
export const uniqueObjValue = key => content => content[key];

export const setInStorage = (name, data, storeType) =>
  (storeType === 'session' ? sessionStorage : localStorage).setItem(name, JSON.stringify(data));

export const getItemInStorage = (name, storeType) =>
  JSON.parse((storeType === 'session' ? sessionStorage : localStorage).getItem(name));

export const normalizeObj = arr =>
  arr.reduce((prev, current) => {
    prev[current.id] = current;
    return prev;
  }, {});

export const getObjectByKey = element => key => ({
  [key]: element[key],
});

/**
 * It will concat and execute several functions synchronously.
 * If you add more than one value, only the first function will recive them and
 * the result of it will be passed down through the rest of the functions
 *
 * @param {function} func - Functions.
 * @return {function} - The result of passing all the values through
 *               the functions.
 */
export const pipe = (...func) =>
  func.reduce((prevFunc, currentFunc) => (...values) => currentFunc(prevFunc(...values)));

export const removeKeyByFilter = (object, keyParam) =>
  Object.keys(object)
    .filter(key => key !== String(keyParam))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});

/**
 *
 * @param {object} object
 * @param {Array} keyParams list of keys to delete
 */
export const removeManyKeysByFilter = (object, keyParams) =>
  Object.keys(object)
    .filter(key => keyParams.indexOf(Number(key)) === -1)
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});

export const formatNumber = num => {
  num = num ? num.toString().replace(/\./g, '') : 0;
  const format = num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
  return format;
};

export const formatNumberDollar = num => {
  const format = num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0;
  return format;
};

export const invertObj = obj =>
  Object.entries(obj).reduce((prev, current) => {
    const [key, value] = current;
    prev[value] = key;
    return prev;
  }, {});

// ------------------
export const clone = (objectType, ...obj) =>
  objectType === 'OBJECT'
    ? Object.assign({}, ...obj)
    : obj.reduce((prev, current) => prev.concat(current), []);

Object.defineProperty(clone, 'ARRAY', {
  value: 'ARRAY',
  writable: true,
});

Object.defineProperty(clone, 'OBJECT', {
  value: 'OBJECT',
  writable: true,
});

const regex = new RegExp('\\.\\s*\\w{1}', 'g');
export const humanizeText = (text, fullname = false) => {
  let tempText = '';
  if (truthty(text)) {
    tempText = text.toLowerCase();

    if (fullname) {
      tempText = tempText
        .split(/\s+/)
        .map(a => `${a[0].toUpperCase()}${a.slice(1)}`)
        .join(' ');
    } else {
      tempText = `${tempText[0].toUpperCase()}${tempText.slice(1)}`;

      while (regex.exec(tempText) !== null) {
        tempText = `${tempText.slice(0, regex.lastIndex - 2)}${tempText[
          regex.lastIndex - 1
        ].toUpperCase()}${tempText.slice(regex.lastIndex)}`;
      }
    }
  }

  return tempText;
};

export const cleanString = str =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n');

/**
 * HOF that will check if one of the values is equal to the given one.
 * Works only with single params.
 *
 * @example
 * [1,2,3].filter(hasValue(2));
 *
 * @param {any} value Any type of value
 * @param {function} content
 */
export const hasValue = value => content => content === value;

/**
 * HOF that will check if one of the values is different to the given one.
 * Works only with single params.
 *
 * @example
 * [1,2,3].filter(hasNotValue(2));
 *
 * @param {any} value Any type of value
 * @param {function}
 */
export const hasNotValue = value => content => content !== value;

/**
 * HOF that will check if one of the values is equal to the given one.
 *
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(hasValueByKey('id', 3));
 *
 * @param {String} key the key of the object
 * @param {Any} value the value to match against the value of the object found by the given key.
 * @return true
 */
export const hasValueByKey = (key, value) => content => content[key] === value;

/**
 * HOF that will check if within the array are not the given value.
 *
 * @example
 * [{id: 1}, {id: 2}, {id: 3}].filter(hasNotValueByKey('id', 3));
 *
 * @param {String} key the key of the object
 * @param {Any} value the value to match against the value of the object found by the given key.
 * @return false
 */
export const hasNotValueByKey = (key, value) => content => content[key] !== value;

export const hasEveryValue = (element, values) => {
  let bool = false;

  for (let index = 0, size = values.length; index < size; index += 1) {
    bool = values === element;
  }

  return bool;
};

export const hasNotEveryValue = (element, values) => {
  let bool = false;

  for (let index = 0, size = values.length; index < size; index += 1) {
    bool = values !== element;
  }

  return bool;
};

/**
 * It will check a single value against N values. If at least one value is true
 * it will stop checking and return true, otherwise false
 *
 * @param {Any} element The element to match against with.
 * @param {Array} values All the values to match
 * @return Boolean
 */
export const hasSomeValue = (element, values) => values.indexOf(element) !== -1;

/**
 * It will check a single value against N values. If at least one value is false
 * it will stop checking and return true, otherwise false
 *
 * @param {Any} element The element to match against with.
 * @param {Array} values All the values to match
 * @return Boolean
 */
export const hasNotSomeValue = (element, values) => values.indexOf(element) === -1;

export const hasSomeValues = (arr, values) => {
  let bool = false;

  for (let index = 0, size = arr.length; index < size; index += 1) {
    if (values.indexOf(arr[index]) !== -1) {
      bool = true;
      break;
    }
  }

  return bool;
};

export const someValuesByKey = (key, values) => content => values.indexOf(content[key]) !== -1;

export const notEveryValueByKey = (key, values) => {
  let bool = false;
  return content => {
    for (let index = 0, size = values.length; index < size; index += 1) {
      bool = values[index] !== content[key];
    }

    return bool;
  };
};

/**
 * It will cancel the bubble execution.
 *
 * @param {Object} event the event object from any synthetic event
 * @return false
 */
export const cancelEvent = event => {
  event.stopPropagation();
  event.preventDefault();
  event.returnValue = false;
  event.cancelBubble = true;
  return false;
};

/**
 * It will create a single string of valid classes
 *
 * @example
 * appendClasses(['px-0 border-0', props.className, props.anotherClass && 'text-right']);
 *
 * @param {array} classes A list of string classes.
 * @return The joined classes. Eg.'px-0 border-0'
 */
export const appendClasses = classes =>
  classes.filter(cls => typeof cls === 'string' && cls).join(' ');

/**
 * Object with amount of objects with each month
 *
 */
export const amountLinesOfDate = object =>
  object !== undefined
    ? Object.values(object)
        .map(uniqueObjValue('date'))
        .reduce((prev, current) => {
          const year = current.split('-')[0];
          return {
            ...prev,
            [year]: {
              amount: Number(prev[year] ? prev[year].amount : 0) + 1,
              date: year,
            },
          };
        }, {})
    : [];

export const amountLinesOfYear = object => {
  const years = [...new Set(Object.values(object).map(item => item.year))];
  const values = Object.values(object);

  return years.reduce(
    (prev, current, index) => ({
      ...prev,
      [index * 2]: {
        amount: values.filter(item => item.year === current && item.origin === 'USA').length,
        origin: 'USA',
        date: current,
      },
      [index * 2 + 1]: {
        amount: values.filter(item => item.year === current && item.origin === 'Chile').length,
        origin: 'Chile',
        date: current,
      },
    }),
    {},
  );
};

export const harvestsByYear = object => {
  const years = [...new Set(Object.values(object).map(item => item.year))];
  const values = Object.values(object);

  return years.reduce(
    (prev, current, index) => ({
      ...prev,
      [index * 2]: {
        amount: getAmountKg(values.filter(item => item.year === current && item.origin === 'USA')),
        origin: 'USA',
        date: current,
      },
      [index * 2 + 1]: {
        amount: getAmountKg(
          values.filter(item => item.year === current && item.origin === 'Chile'),
        ),
        origin: 'Chile',
        date: current,
      },
    }),
    {},
  );
};

export const formatRut = (Rut, digitoVerificador) => {
  var sRut = Rut.toString();
  var sRutFormateado = '';

  sRut = unformat(sRut);
  if (digitoVerificador) {
    var sDV = sRut.charAt(sRut.length - 1);
    sRut = sRut.substring(0, sRut.length - 1);
  }
  while (sRut.length > 3) {
    sRutFormateado = '.' + sRut.substr(sRut.length - 3) + sRutFormateado;
    sRut = sRut.substring(0, sRut.length - 3);
  }
  sRutFormateado = sRut + sRutFormateado;
  if (sRutFormateado !== '' && digitoVerificador) {
    sRutFormateado += '-' + sDV;
  } else if (digitoVerificador) {
    sRutFormateado += sDV;
  }

  return sRutFormateado;
};

export const unformat = rut => {
  var strRut = rut.toString();

  while (strRut.indexOf('.') !== -1) {
    strRut = strRut.replace('.', '');
  }
  while (strRut.indexOf('-') !== -1) {
    strRut = strRut.replace('-', '');
  }

  return strRut;
};

export const fCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const fNumericDate = new Intl.DateTimeFormat('es-CL', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
});
export const formatDate = date =>
  date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const onChangeFnc = (onChange, event, date, withModule) => {
  event.persist();
  const value =
    event.target.type === 'date' || event.target.type === 'time' ? date : event.target.value;
  const id = event.target.type ? event.target.id : event.currentTarget.id;
  if (withModule) {
    onChange(event.currentTarget.dataset.module, { [id]: value }, { [id]: false });
  } else {
    onChange({ [id]: value }, { [id]: false });
  }
};

export const getParameterByName = (name, url) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
