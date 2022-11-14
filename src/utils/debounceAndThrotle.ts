export const throtle = (cb: CallableFunction, time = 300) => {
  let timer = false;
  return (...args: any) => {
    if (!timer) {
      cb(...args);
      timer = true;
      setTimeout(() => {
        timer = false;
      }, time);
    }
  };
};
