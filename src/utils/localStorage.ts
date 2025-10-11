export const getData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addItem = <T extends { id: number }>(
  key: string,
  item: T
): void => {
  const data = getData<T>(key);
  data.push(item);
  saveData(key, data);
};

export const updateItem = <T extends { id: number }>(
  key: string,
  updatedItem: T
): void => {
  const data = getData<T>(key);
  const newData = data.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  saveData(key, newData);
};

export const removeItem = <T extends { id: number }>(
  key: string,
  id: number
): void => {
  const data = getData<T>(key);
  const newData = data.filter((item) => item.id !== id);
  saveData(key, newData);
};
