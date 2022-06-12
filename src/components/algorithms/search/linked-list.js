class Node {
    constructor(block) {
        this.block = block;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(block) {
        let newNode = new Node(block);

        if (!this.length) {
            this.tail = this.head = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }

        this.length++;
    }

    remove(vertice) {
        let tempNodeFast = this.head;
        let tempNodeSlow = null;

        while (tempNodeFast != null) {
            if (tempNodeFast.block.vertice == vertice) {
                this.length--;

                let removed = tempNodeFast.block.vertice;
                if (tempNodeFast == this.head) {
                    this.head = this.head.next;
                    return removed;
                }

                console.log(tempNodeSlow.next, tempNodeFast.next);
                tempNodeSlow.next = tempNodeFast.next;
                return removed;
            }
            tempNodeSlow = tempNodeFast;
            tempNodeFast = tempNodeFast.next;
        }
        return -1;
    }

    find(NNode) {
        let tempNode = this.head;

        while (tempNode) {
            if (tempNode.block == NNode) {
                return true;
            }
            tempNode = tempNode.next;
        }

        return false;
    }

    print() {
        let tempNode = this.head;
        while (tempNode) {
            console.log(tempNode.block.weight);
            tempNode = tempNode.next;
        }
    }

    size() {
        return this.length;
    }
}

const arrayOfLL = (length) => {
    const resultArray = [];
    for (let i = 0; i < length; i++) {
        resultArray.push(new LinkedList());
    }
    return resultArray;
};

export default LinkedList;
