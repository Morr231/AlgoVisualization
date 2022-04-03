const Selection_sort = async (array, numberOfItems, sortBlocksRefs) => {
    for (let i = 0; i < numberOfItems; i++) {
        let min = i;
        let timerTime = 0;

        for (let j = i + 1; j < numberOfItems; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }
        let change = false;
        let time = ((j + 1) * (i + 1)) / 1000;
        setTimeout(() => {
            sortBlocksRefs[j].classList.add("blue");
            [array[i], array[min]] = [array[min], array[i]];
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            [
                sortBlocksRefs[j].style.height,
                sortBlocksRefs[j + 1].style.height,
            ] = [
                sortBlocksRefs[j + 1].style.height,
                sortBlocksRefs[j].style.height,
            ];
            change = true;
        }, time);
    }
    return array;
};

export { Selection_sort };
