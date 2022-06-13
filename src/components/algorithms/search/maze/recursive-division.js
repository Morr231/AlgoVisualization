const recursiveDivision = ({ array, refs, width, height, orientation }) => {
    console.log("Hello");

    if (width < 2 || height < 2) {
        return;
    }
    // build line till next end
    let startCenter =
        orientation === "h"
            ? { x: 0, y: Math.floor(height / 2) }
            : { x: Math.floor(width / 2), y: 0 };
    let endCenter =
        orientation === "h"
            ? { x: Math.floor(width), y: Math.floor(height / 2) }
            : { x: Math.floor(width / 2), y: Math.floor(height) };

    console.log(array.length, array[0].length);

    let condStart = orientation === "h" ? startCenter.x : startCenter.y;
    let condEnd = orientation === "h" ? endCenter.x : endCenter.y;

    while (condStart !== condEnd + 1) {
        let wallEl = refs[startCenter.x * 35 + startCenter.y];

        if (!wallEl.classList.contains("block-wall")) {
            wallEl.classList.add("block-wall");
            array[startCenter.x][startCenter.y].state = "wall";
        }

        condStart++;
        orientation === "h" ? startCenter.x++ : startCenter.y++;
    }

    let randomWall =
        orientation === "h"
            ? Math.floor(Math.random() * endCenter.x)
            : Math.floor(Math.random() * endCenter.y);

    console.log(randomWall);

    orientation === "h"
        ? refs[randomWall * 35 + startCenter.y].classList.remove("block-wall")
        : refs[startCenter.x * 35 + randomWall].classList.remove("block-wall");

    orientation === "h"
        ? (array[randomWall][startCenter.y].state = "wall")
        : (array[startCenter.x][randomWall].state = "wall");

    if (orientation === "h") {
        // top
        recursiveDivision({
            array: array,
            refs: refs,
            width: width / 2,
            height: height,
            orientation: "v",
        });
    }

    recursiveDivision({
        array: array,
        refs: refs,
        width: width,
        height: height / 2,
        orientation: "h",
    });
};

export default recursiveDivision;
