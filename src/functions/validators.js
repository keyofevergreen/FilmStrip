const hasValidPhoneNumber = val => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(val);

export {hasValidPhoneNumber}