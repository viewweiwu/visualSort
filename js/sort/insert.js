((window) => {
    const util = new Util();
    class Insert extends Sort {
        constructor() {
            super(...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let doneArr = [];
            let i, j, target, mark;
            // 初始步骤
            snaps.push(this._createSnap(arr, [...doneArr], mark, "default"));
            for (i = 0; i < arr.length; i++) {
                target = i;
                mark = target;
                snaps.push(this._createSnap(arr, [...doneArr], mark, "mark", target));
                for (j = i; j >= 0; j--) {
                    if (arr[j] > arr[target]) {
                        util.swap(arr, j, target);
                        snaps.push(this._createSnap(arr, [...doneArr], mark, "swap", j, target));
                        target = j;
                        mark = target;
                        snaps.push(this._createSnap(arr, [...doneArr], mark, "mark", target));
                    }
                }
                mark = null;
                doneArr.push(this.squres(target).id);
                snaps.push(this._createSnap(arr, [...doneArr], mark, "done", target));
            }
            return snaps;
        }
        _createSnap(arr, doneArr, mark, mode, curr, next) {
            return {
                arr,
                mode,
                curr,
                next,
                doneArr,
                mark
            }
        }
        draw(snap = []) {
            console.log(snap);
            let currSqure = snap.curr !== undefined && this.squres[snap.curr];
            let nextSqure = snap.next !== undefined && this.squres[snap.next];
            snap.arr.forEach((obj, i) => {
                let targetSqure = this.squres[i];
                if (snap.mark === i) {
                    targetSqure.setColor(this.color2);
                    targetSqure.moveDown();
                } else if (snap.doneArr.indexOf(i) >= 0) {
                    targetSqure.setColor(this.color3);
                    targetSqure.resetPostion();
                } else {
                    targetSqure.setDefaultColor();
                    targetSqure.resetPostion();
                }
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

                    nextSqure.setColor(this.color2);
                    break;
            }
        }
    }

    window.Insert = Insert;
})(window);