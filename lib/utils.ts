import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function opbjectsToIds(objects: any[]) {
  return objects.map(object => {
    if (!!object.id) return object.id
    return Number(object)
  })
}