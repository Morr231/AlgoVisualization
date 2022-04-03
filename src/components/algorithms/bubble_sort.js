const Bubble_sort = async (array, numberOfItems, sortBlocksRefs) => {
    for (let i = 0; i < numberOfItems; i++) {
        let timerTime = 0;
        for (let j = 0; j < numberOfItems; j++) {
            let change = false;
            let time = ((j + 1) * (i + 1)) / 1000;
            setTimeout(() => {
                sortBlocksRefs[j].classList.add("blue");
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    [
                        sortBlocksRefs[j].style.height,
                        sortBlocksRefs[j + 1].style.height,
                    ] = [
                        sortBlocksRefs[j + 1].style.height,
                        sortBlocksRefs[j].style.height,
                    ];
                    change = true;
                }
            }, time);

            await new Promise((r) => {
                setTimeout(r, time / 1000);
            });

            if (change) {
                timerTime = time;
            }
        }

        await new Promise((r) => {
            setTimeout(r, timerTime);
        });

        for (let j = 0; j < numberOfItems; j++) {
            sortBlocksRefs[j].classList.remove("blue");
        }
    }
    return array;
};

export { Bubble_sort };
