export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const formatMoney = (n) => {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const checkUnquie = (arr, ide) => {
  let i = -1;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j].masp === ide) {
      i = j;
      break;
    }
  }
  return i;
};

export const stringToNumber = (string) => {
  const listTemp = string.split(".");
  let stringDongia = "";
  listTemp.forEach((value) => {
    stringDongia += value;
  });
  const dongia = Number.parseInt(stringDongia, 10);
  return dongia
};
