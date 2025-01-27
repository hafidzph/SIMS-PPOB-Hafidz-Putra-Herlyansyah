export const formattedMoney = (nominal) => {
  return nominal.toLocaleString("id-ID").replace(/,/g, ".");
};
