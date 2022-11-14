export function numberOfDays(t1: Date, t2: Date): number {
  const dateWithoutTime = (e: Date) => {
    return new Date(e.getFullYear(), e.getMonth(), e.getDate());
  };
  const oneDay = 24 * 60 * 60 * 1000; //hours*minutes*seconds*milliseconds
  const day1 = dateWithoutTime(t1);
  const day2 = dateWithoutTime(t2);
  // console.log({ day1, day2 }, "day");

  const diffDays = Math.round(
    Math.abs((day1.getTime() - day2.getTime()) / oneDay)
  );
  //console.log({ diffDays });
  return diffDays + 1;
}
