export const combinaison = <T>(array: ReadonlyArray<T>, n: number) => {
    if (array.length < n) throw Error(`You can't generate a combinaison of ${n} elements from an array of ${array.length} elements`);

    let newArray = [];
    let buffer = [...array];

    while (newArray.length < n) {
        const i = Math.floor(Math.random() * buffer.length) + 1;
        const item = buffer.splice(i, 1);
        newArray = [...newArray, ...item];
    }

    return newArray;
}