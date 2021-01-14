import { useCallback, useState } from "react";

const getUniqueIdentifier = (items) => {
  const uniqueIdentifier = Math.max(...items.map((item) => item.id));

  return uniqueIdentifier === -Infinity ? 1 : uniqueIdentifier + 1;
};

export const useItemsManager = (defaultItems = []) => {
  const [items, setItems] = useState([
    ...defaultItems.map((item, index) => ({ ...item, id: index + 1 })),
  ]);

  const add = useCallback(
    (payload) =>
      setItems([...items, { ...payload, id: getUniqueIdentifier(items) }]),
    [items, setItems]
  );

  const update = useCallback(
    (payload) =>
      setItems([
        ...items.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      ]),
    [items, setItems]
  );

  const remove = useCallback(
    (payload) => setItems([...items.filter((item) => item.id !== payload.id)]),
    [items, setItems]
  );

  return { items, add, update, remove };
};
