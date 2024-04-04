import { v4 as uuidv4 } from "uuid";

const safeString = (value: string): string => value.replace(/[^a-zA-Z0-9]/g, "");

const generateUUID = (): string => uuidv4();

export { safeString, generateUUID };
