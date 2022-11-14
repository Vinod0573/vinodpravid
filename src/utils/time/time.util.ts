import { dates } from "../../components/moduleComponents/popupCalenderfilter/PopupCalenderfilter.interface";

export function DateToLocalString(
  date: Date | undefined | string,
  format?: string
): string {
  if (date === undefined) {
    return " ";
  }
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export function DateStartFormat(date: Date | undefined) {
  if (date === undefined) {
    return " ";
  }
  const day = date.getDate();
  const month = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month}-${day}T00:00:00`;
}
export function DateEndFormat(date: Date | undefined) {
  if (date === undefined) {
    return " ";
  }
  const day = date.getDate();
  const month = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month}-${day}T23:59:59`;
}

export function lastUpdatedText(date: Date | undefined) {
  if (date === undefined) return;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const AMORPM = hour >= 12 ? "PM" : "AM";

  return `Last updated on ${day}/${month}/${year} , ${
    hour % 12 === 0 ? 12 : hour % 12
  }:${min}${AMORPM} `;
}
