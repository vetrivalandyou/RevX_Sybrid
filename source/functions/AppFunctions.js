import appColors from '../AppConstants/appColors';

export const generateRandomNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180; // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const returnTotal = SelectedChildServices => {
  if (SelectedChildServices?.length == 0) {
    return 0;
  } else {
    const totalPrice = SelectedChildServices?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.ServicePrice,
      0,
    );
    return parseFloat(totalPrice);
  }
};

export const barberRevenueReportGraph = data => {
  console.log(data);
  const stackData = data?.map((item, index) => ({
    label: item?.month,
    stacks: [
      {
        value: item?.total_amount == 0 ? 1000 : item?.total_amount,
        color: index % 2 !== 0 ? '#9A72F5' : appColors.Goldcolor,
      },
      {value: 20000, color: '#292929', marginBottom: 5},
    ],
  }));
  console.log("StackData", stackData)
  return stackData;
};
