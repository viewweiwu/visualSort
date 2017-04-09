((window) => {
    const util = new Util();
    class Select extends Sort {
        constructor() {
            super("select", ...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let doneArr = [];
            let markArr = [];
            let i, j, min;
            // 初始步骤
            snaps.push(this._createSnap(arr, doneArr, markArr, "default"));
            for (i = 0; i < arr.length; i++) {
                min = i;
                markArr.push(min);
                snaps.push(this._createSnap(arr, doneArr, markArr, "mark", min));
                for (j = i + 1; j < arr.length; j++) {
                    snaps.push(this._createSnap(arr, doneArr, markArr, "find", j));
                    if (arr[min] > arr[j]) {
                        min = j;
                        markArr.length = 0;
                        markArr.push(min);
                        snaps.push(this._createSnap(arr, doneArr, markArr, "mark", 200));
                    }
                }
                if (min !== i) {
                    util.swap(arr, min, i);
                    markArr.push(i);
                    snaps.push(this._createSnap(arr, doneArr, markArr, "mark2", i));
                    snaps.push(this._createSnap(arr, doneArr, markArr, "swap", min, i));
                }
                doneArr.push(i);
                markArr.length = 0;
                snaps.push(this._createSnap(arr, doneArr, markArr, "done", i));
            }
            return snaps;
        }
        _createSnap(arr, [...doneArr], [...markArr], mode, curr, next) {
            return {
                arr,
                mode,
                curr,
                next,
                doneArr,
                markArr
            }
        }
        draw(snap = []) {
            let currSqure = snap.curr !== undefined && this.squres[snap.curr];
            let nextSqure = snap.next !== undefined && this.squres[snap.next];
            snap.arr.forEach((obj, i) => {
                let targetSqure = this.squres[i];
                if (snap.markArr.indexOf(i) >= 0)
                    targetSqure.setColor(this.color2);
                else if (snap.doneArr.indexOf(i) >= 0)
                    targetSqure.setColor(this.color3);
                else
                    targetSqure.setDefaultColor();
            });
            switch (snap.mode) {
                case "find":
                    currSqure.setColor(this.color1);
                    break;
                case "swap":
                    let p = currSqure.getPosition();
                    let el = currSqure.el;
                    // 交换位置
                    currSqure.setPosition(nextSqure.getPosition()[0]);
                    nextSqure.setPosition(p[0]);
                    // 交换元素
                    currSqure.el = nextSqure.el;
                    nextSqure.el = el;

                    currSqure.setColor(this.color2);
                    nextSqure.setColor(this.color2);
                    break;
            }
        }
    }

    window.Select = Select;
})(window);