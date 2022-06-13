import { forwardRef } from "react/cjs/react.production.min";

const BlockChild = ({
    el,
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    blockState,
    forwardedRef,
}) => {
    const changeState = (e) => {
        switch (blockState) {
            case "start":
                if (startNode) {
                    startNode.currentBlock.classList.remove("block-start");
                }
                e.target.classList.add("block-start");
                setStartNode({ el: el, currentBlock: e.target });
                break;

            case "end":
                if (endNode) {
                    endNode.currentBlock.classList.remove("block-end");
                }
                e.target.classList.add("block-end");
                setEndNode({ el: el, currentBlock: e.target });
                break;
            case "wall":
                e.target.classList.add("block-wall");
                el.state = "wall";
                break;
            default:
                break;
        }
    };

    return (
        <div className="block" onClick={changeState} ref={forwardedRef}>
            {/* {el.weight} x = {el.x} y = {el.y} */}
        </div>
    );
};

export default forwardRef(BlockChild);
