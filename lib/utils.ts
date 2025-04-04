import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single className string using clsx and tailwind-merge
 * This allows for conditional classes and proper handling of Tailwind CSS class conflicts
 * 
 * @param inputs - Class values to combine
 * @returns A string of combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a currency string
 * 
 * @param amount - The amount to format
 * @param currency - The currency code (default: INR)
 * @param locale - The locale to use for formatting (default: en-IN)
 * @returns A formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = "INR",
  locale = "en-IN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a date string or timestamp into a readable date format
 * 
 * @param date - The date to format (string, number, or Date)
 * @param options - Intl.DateTimeFormatOptions to customize format
 * @returns A formatted date string
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-IN", options).format(new Date(date))
}

/**
 * Truncates a string if it exceeds the specified length
 * 
 * @param str - The string to truncate
 * @param length - Maximum length before truncation
 * @param ending - The suffix to add when truncated (default: "...")
 * @returns The truncated string
 */
export function truncate(
  str: string,
  length: number,
  ending = "..."
): string {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  }
  return str
}

/**
 * Creates a delay using a Promise
 * 
 * @param ms - The number of milliseconds to delay
 * @returns A Promise that resolves after the specified delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generates a random integer between min and max (inclusive)
 * 
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Safely tries to parse JSON
 * 
 * @param str - The string to parse
 * @param fallback - Fallback value if parsing fails (default: null)
 * @returns The parsed object or fallback value
 */
export function safeJsonParse<T>(str: string | null | undefined, fallback: T | null = null): T | null {
  if (!str) return fallback
  try {
    return JSON.parse(str) as T
  } catch (e) {
    console.error("JSON parse error:", e)
    return fallback
  }
}

/**
 * Debounces a function call
 * 
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
