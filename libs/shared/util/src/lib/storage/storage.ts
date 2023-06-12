const get = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key) ?? '';
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const set = <T>(key: string, value: T): void => {
  const strValue = JSON.stringify(value);
  localStorage.setItem(key, strValue);
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};
export const isInStorage = (key: string): boolean => {
  return key in localStorage;
};

export default {
  get,
  set,
  remove,
  isInStorage,
};
