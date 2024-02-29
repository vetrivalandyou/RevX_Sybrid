export const generateRandomNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber;
};

export const setInAsync = () => {
  setAsyncItem(constants.AsyncStorageKeys.userDetails, res?.data?.data?.user);
};
