import path from 'node:path';
import { fileURLToPath } from 'node:url';

// get filename of the current module
export const __filename = fileURLToPath(import.meta.url);

// get directory name of the current module
export const __dirname = path.dirname(__filename);

// get full path to file in current module directory
export const fullPath = (file: string): string => path.join(__dirname, file);
