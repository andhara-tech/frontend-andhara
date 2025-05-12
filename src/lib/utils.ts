import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SortOption {
  field: string
  direction: "asc" | "desc"
}

export const formaterDate = (inputDate?: string | Date): string => {
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
  ];

  let dateObj: Date;

  if (!inputDate) {
    dateObj = new Date(); // usar fecha actual si no se da argumento
  } else if (typeof inputDate === "string") {
    const [year, month, day] = inputDate.split("-");
    if (!year || !month || !day) {
      throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    }
    dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    dateObj = inputDate;
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
