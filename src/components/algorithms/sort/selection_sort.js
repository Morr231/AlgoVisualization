const Selection_sort = async (array, numberOfItems, sortBlocksRefs) => {
    for (let i = 0; i < numberOfItems; i++) {
        let min = i;
        let timerTime = 0;

        for (let j = i + 1; j < numberOfItems; j++) {
            if (array[min] > array[j]) {
                min = j;
                console.log(array[min]);
            }
            let time = ((j + 1) * (i + 1)) / 1000;
            setTimeout(() => {
                sortBlocksRefs[j].classList.add("blue");
            }, time);

            await new Promise((r) => {
                setTimeout(r, time);
            });

            timerTime = time;
        }

        [sortBlocksRefs[i].style.height, sortBlocksRefs[min].style.height] = [
            sortBlocksRefs[min].style.height,
            sortBlocksRefs[i].style.height,
        ];

        console.log("start");
        console.log(array[i]);
        console.log(array[min]);
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        console.log("end");
        console.log(array[i]);
        console.log(array[min]);

        await new Promise((r) => {
            setTimeout(r, timerTime);
        });

        for (let j = 0; j < numberOfItems; j++) {
            sortBlocksRefs[j].classList.remove("blue");
        }
    }
    console.log(array);
    return array;
};

export { Selection_sort };
