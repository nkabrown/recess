import path from 'node:path';
import { fileURLToPath } from 'node:url';

// get full platform-specific path to file in current module directory
export const fullPath = (url: URL | string, file: string): string => path.join(path.dirname(fileURLToPath(url)), file);

// sum an array of numbers
export const sum = (xs: number[]): number => xs.reduce((sum, x) => sum + x, 0);
