export const deleteItem = (item, DELETE_ACTION) => ({
    type: DELETE_ACTION,
    item
});
export const addItem = (item, ADD_ACTION) => ({
    type: ADD_ACTION,
    item
});