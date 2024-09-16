export function formatValue(elem, params) {
  params = params.split('|');

  params.forEach(param => {
    let value = elem.value;
    const parts = param.split('=');
    
    if (parts[0] === 'maxLength') {
      value = formatMaxLength(value, parts[1]);

    } else if (parts[0] === 'type') {
      value = formatType(value, parts[1]);
    } else {
      console.error(`Invalid or not supported parameter encountered: ${param}
        - Parameter name: ${parts[0]}`);
    }

    elem.value = value;
  });
}

function formatMaxLength(value, length) {
  length = Number(length);
  return !isNaN(length) && length > 0 ? value.slice(0, length) : value;
}

function formatType(value, type) {
  const types = {
    number: /[^0-9]/g,
  }
  return types[type] ? value.replace(types[type], '') : value;
}