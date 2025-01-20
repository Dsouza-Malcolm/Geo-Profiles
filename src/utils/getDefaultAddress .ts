export const getAddressValue = (
  newValue: string | undefined,
  selectedValue: string | undefined
) => {
  console.log(!newValue || newValue === "" ? selectedValue : newValue);
  return !newValue || newValue === "" ? selectedValue : newValue;
};

export const getCoordinates = (
  newCoords: number[] | undefined,
  selectedCoords: number[] | undefined
) => {
  return !newCoords || !Array.isArray(newCoords) || newCoords.length === 0
    ? selectedCoords
    : newCoords;
};
