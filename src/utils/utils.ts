import { HOURS } from "./constants";

export function getHours() {
  const minHour = parseInt(import.meta.env.VITE_MIN_HOUR || HOURS[0]);
  const maxHour = parseInt(import.meta.env.VITE_MAX_HOUR || HOURS[1]);
  return Array.from({ length: maxHour - minHour }, (_, i) => i + minHour);
}

export function getHour(date: string) {
  return new Date(date).getHours();
}

export function isTheSameDay(first: string, second: string) {
  const firstDate = new Date(first);
  const secondDate = new Date(second);

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function getDays(start: string, days: number = 7) {
  const length = parseInt(import.meta.env.VITE_DAYS || days);
  return Array.from({ length }, (_, i) => addDays(start, i + 1));
}

export function getWeekday(date: string) {
  const weekdays = ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"];
  return weekdays[new Date(date).getDay()];
}

export function createDate(date: string, hour: number) {
  const dateObj = new Date(date);
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    hour,
    0,
    0,
    0
  ).toISOString();
}

function addDays(date: string, days: number = 1) {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const currentDate = new Date(date);
  const nextDate = new Date(currentDate.getTime() + oneDay * days);
  return nextDate.toISOString().slice(0, 10); // return date in YYYY-MM-DD format
}
