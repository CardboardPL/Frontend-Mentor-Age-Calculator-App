export function formatValue(elem, params) {
  params = params.split('|');

  params.forEach(param => {
    let value = elem.value;
    const parts = param.split('=');
    
    if (parts[0] === 'maxLength') {
      value = formatMaxLength(value, parts[1], 'number');

    } else if (parts[0] === 'type') {
      value = formatType(value, parts[1]);
    } else {
      console.error(`Invalid or not supported parameter encountered: ${param}
        - Parameter name: ${parts[0]}`);
    }

    elem.value = value;
  });
}

function formatMaxLength(value, length, type) {
  length = Number(length);

  if (isNaN(length) || length <= 0) {
    return value;
  }

  const truncatedValue = value.slice(0, length)
  let result = value;

  if (type === 'number') {
    result = (result[0] === '0' ? value.slice(1, length + 1) : truncatedValue).padStart(length, '0');
    
    if (Number(result) === 0) {
      result = '';
    }
  } else {
    result = truncatedValue;
  }
  
  return result;
}

function formatType(value, type) {
  const types = {
    number: /[^0-9]/g,
  }
  return types[type] ? value.replace(types[type], '') : value;
}