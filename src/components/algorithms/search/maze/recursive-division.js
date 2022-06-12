const chooseOrientation = (width, height) => {
    if (width > height) {
        return "v";
    } else if (height > width) {
        return "h";
    }
    return Math.floor(Math.random(2)) === 0 ? "h" : "v";
};

const recursiveDivision = ({ array, refs, width, height, orientation }) => {
    if (width < 2 || height < 2) {
        return;
    }
    // build line till next end
    let startCenter =
        orientation === "h" ? { x: 0, y: height / 2 } : { x: width / 2, y: 0 };
    let endCenter =
        orientation === "h"
            ? { x: width, y: height / 2 }
            : { x: width / 2, y: height };

    console.log(startCenter.x, endCenter.x);

    while (startCenter.x !== endCenter.x + 1) {
        console.log(refs[startCenter.x * 35 + startCenter.y]);
        refs[startCenter.x * 35 + startCenter.y].classList.toggle("block-wall");
        console.log(startCenter.x, startCenter.y);

        array[startCenter.x][startCenter.y].state = "wall";

        orientation === "h" ? startCenter.x++ : startCenter.y++;
    }

    let randomWall =
        orientation === "h"
            ? Math.floor(Math.random() * endCenter.x)
            : Math.floor(Math.random() * endCenter.y);

    orientation === "h"
        ? refs[randomWall * 35 + startCenter.y].classList.toggle("block-wall")
        : refs[startCenter * 35 + randomWall].classList.toggle("block-wall");

    orientation === "h"
        ? (array[randomWall][startCenter.y].state = "wall")
        : (array[startCenter.x][randomWall].state = "wall");

    if (orientation === "h") {
        // top
        recursiveDivision({ array: array, refs: refs, width: width / 2, height: height, orientation: chooseOrientation(width / 2, height) });
        // bottom
        recursiveDivision({ array: array, refs: refs, width:, height:, orientation(width, height) });
    }

    recursiveDivision({ array: array, refs: refs });
    recursiveDivision({ array: array, refs: refs });
};

export default recursiveDivision;
