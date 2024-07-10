import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function checkCharLength(str: string, min: number, max: number) {
    return str.length >= min && str.length <= max;
}