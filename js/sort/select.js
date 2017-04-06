((window) => {
    const util = new Util();
    class Select extends Sort {
        constructor() {
            super(...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let i, j, min;
            for (i = 0; i < arr.length; i++) {
                min = i;
                snaps.push(this._createSnap("find", i));
                snaps.push(this._createSnap("mark", min));
                for (j = i + 1; j < arr.length; j++) {
                    snaps.push(this._createSnap("find", j));
                    if (arr[min] > arr[j]) {
                        min = j;
                        snaps.push(this._createSnap("mark", min));
                    }
                }
                if (min !== i) {
                    util.swap(arr, min, i);
                    snaps.push(this._createSnap("mark2", i));
                    snaps.push(this._createSnap("swap", min, i));
                }
                snaps.push(this._createSnap("done", i));
            }
            return snaps;
        }
        draw(obj) {
            let mode = obj ? obj.mode : "";
            switch (mode) {
                case "mark":
                    this.targetMark && this.targetMark.setDefaultColor();
                    this.targetMark = this.squres[obj.curr];
                    this.targetMark.setColor(this.color3);
                    break;
                case "mark2":
                    this.targetFind && this.targetFind.setDefaultColor();
                    this.targetMark2 = this.squres[obj.curr];
                    this.targetMark2.setColor(this.color3);
                    break;
                case "find":
                    if (this.targetFind && this.targetFind.el === this.targetMark.el) {
                        this.targetFind.setColor(this.color3);
                    } else if (this.targetFind) {
                        this.targetFind && this.targetFind.setDefaultColor();
                    }
                    this.targetFind = this.squres[obj.curr];
                    this.targetFind.setColor(this.color1);
                    break;
                case "swap":
                    let curr = this.squres[obj.curr];
                    let next = this.squres[obj.next];
                    let p = curr.getPosition();
                    let el = curr.el;
                    // 交换位置
                    curr.setPosition(next.getPosition()[0]);
                    next.setPosition(p[0]);
                    // 交换元素
                    curr.el = next.el;
                    next.el = el;
                    break;
                case "done":
                    this.targetMark && this.targetMark.setDefaultColor();
                    this.targetDone = this.squres[obj.curr];
                    this.targetDone.setColor(this.color2);
                    break;
            }
        }
    }

    window.Select = Select;
})(window);