// this function create a deep copy from an existing object and removes any references
const deepCopy = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export { deepCopy };
