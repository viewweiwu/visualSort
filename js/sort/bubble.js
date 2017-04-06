((window) => {
    const util = new Util();
    class Bubble extends Sort {
        constructor() {
            super(...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let i, j;
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr.length - i - 1; j++) {
                    snaps.push(this._createSnap("find", j, j + 1));
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        snaps.push(this._createSnap("swap", j, j + 1));
                    }
                }
                snaps.push(this._createSnap("done", j));
            }
            return snaps;
        }
        draw(obj) {
            let mode = obj ? obj.mode : "";
            switch (mode) {
                case "find":
                    this.targetFindCurr && this.targetFindCurr.setDefaultColor();
                    this.targetFindNext && this.targetFindNext.setDefaultColor();
                    this.targetFindCurr = this.squres[obj.curr];
                    this.targetFindNext = this.squres[obj.next];
                    this.targetFindCurr.setColor(this.color1);
                    this.targetFindNext.setColor(this.color1);
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
                    this.targetFindCurr && this.targetFindCurr.setDefaultColor();
                    this.targetFindNext && this.targetFindNext.setDefaultColor();
                    this.targetFindCurr = null;
                    this.targetFindNext = null;
                    this.targetDone = this.squres[obj.curr];
                    this.targetDone.setColor(this.color2);
                    break;
            }
        }
    }

    window.Bubble = Bubble;
})(window);