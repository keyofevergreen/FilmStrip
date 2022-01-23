//eslint-disable-next-line


const hasValidPhoneNumber = (value) => {
  console.log(value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/));
  return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/.test(value)
};
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
  return !users.find(user => user.phoneNumber === phoneNumber.replace(/[^0-9]/g, ''));
};
export { hasValidPhoneNumber, hasUnregisteredMail, hasRegisteredMail, hasUnregisteredPhoneNumber };