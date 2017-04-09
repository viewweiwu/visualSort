((window) => {
    const util = new Util();
    class Insert extends Sort {
        constructor() {
            super("insert", ...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let doneArr = [];
            let markArr = [];
            let i, j, target;
            // 初始步骤
            snaps.push(this._createSnap(arr, doneArr, markArr, "default"));
            for (i = 0; i < arr.length; i++) {
                target = i;
                markArr[0] = target;
                snaps.push(this._createSnap(arr, doneArr, markArr, "mark", target));
                for (j = i - 1; j >= 0; j--) {
                    if (arr[j] > arr[target]) {
                        snaps.push(this._createSnap(arr, doneArr, markArr, "find", j));
                        util.swap(arr, target, j);
                        util.swap(doneArr, target, j);
                        markArr[0] = j;
                        snaps.push(this._createSnap(arr, doneArr, markArr, "swap", target, j));
                        target = j;
                    }
                }
                doneArr.push(i);
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
            console.log(snap.mode);
            snap.arr.forEach((obj, i) => {
                let targetSqure = this.squres[i];
                if (snap.markArr.indexOf(i) >= 0)
                    targetSqure.setColor(this.color3);
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

                    currSqure.setColor(this.color3);
                    nextSqure.setColor(this.color3);
                    break;
            }
        }
    }
    window.Insert = Insert;
})(window);