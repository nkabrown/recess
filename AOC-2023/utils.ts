import path from 'node:path';
import { fileURLToPath } from 'node:url';

// get full path to file in current module directory
export const fullPath = (url: string, file: string): string => path.join(path.dirname(fileURLToPath(url)), file);

// sum an array of numbers
export const sum = (xs: number[]) => xs.reduce((sum, x) => sum + x, 0);
