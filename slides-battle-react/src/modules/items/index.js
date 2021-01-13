import { useState } from "react";

const getUniqueIdentifier = (items) => {
  const uniqueIdentifier = Math.max(...items.map((item) => item.id));

  return uniqueIdentifier === -Infinity ? 1 : uniqueIdentifier + 1;
};

export const useItemsManager = (defaultItems = []) => {
  const [items, setItems] = useState([
    ...defaultItems.map((item, index) => ({ ...item, id: index + 1 })),
  ]);

  const add = (payload) =>
    setItems([...items, { ...payload, id: getUniqueIdentifier(items) }]);

  const update = (payload) =>
    setItems([
      ...items.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      ),
    ]);

  const remove = (payload) =>
    setItems([...items.filter((item) => item.id !== payload.id)]);

  return { items, add, update, remove };
};
