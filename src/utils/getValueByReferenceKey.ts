export const getValueByReferenceKey = (value: any, referenceKey: string) => {
  try {
    const referenceKeyArr: Array<string> = referenceKey.split(".");
    referenceKeyArr.forEach((item) => {
      value = value?.[item];
    });
    return value;
  } catch (err) {
    return "-";
  }
};
