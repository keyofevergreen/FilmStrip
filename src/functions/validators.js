//eslint-disable-next-line


const hasValidPhoneNumber = (value) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/.test(value);
const hasUnregisteredMail = (mail) => {
  const data = localStorage.getItem('users');
  const users = JSON.parse(data);
  return !users.find(user => user.mail === mail);
};
const hasRegisteredMail = (mail) => {
  const data = localStorage.getItem('users');
  const users = JSON.parse(data);
  return !!users.find(user => user.mail === mail);
};
const hasUnregisteredPhoneNumber = (phoneNumber) => {
  const data = localStorage.getItem('users');
  const users = JSON.parse(data);
  return !users.find(user => user.phoneNumber === phoneNumber);
};
export { hasValidPhoneNumber, hasUnregisteredMail, hasRegisteredMail, hasUnregisteredPhoneNumber };