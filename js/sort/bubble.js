((window) => {
    const util = new Util();
    class Bubble extends Sort {
        constructor() {
            super("bubble", ...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let snaps = [];
            let doneArr = [];
            let i, j;
            // 初始步骤
            snaps.push(this._createSnap(arr, doneArr, "default"));
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr.length - i - 1; j++) {
                    snaps.push(this._createSnap(arr, doneArr, "find", j, j + 1));
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        snaps.push(this._createSnap(arr, doneArr, "swap", j, j + 1));
                    }
                }
                doneArr.push(j);
                snaps.push(this._createSnap(arr, doneArr, "done", j));
            }
            return snaps;
        }
        _createSnap(arr, [...doneArr], mode, curr, next) {
            return {
                arr,
                mode,
                curr,
                next,
                doneArr
            };
        }
        draw(snap = []) {
            let currSqure = snap.curr !== undefined && this.squres[snap.curr];
            let nextSqure = snap.next !== undefined && this.squres[snap.next];
            snap.arr.forEach((obj, i) => {
                let targetSqure = this.squres[i];
                if (snap.doneArr.indexOf(i) >= 0)
                    targetSqure.setColor(this.color3);
                else
                    targetSqure.setDefaultColor();
            });
            switch (snap.mode) {
                case "find":
                    currSqure.setColor(this.color1);
                    nextSqure.setColor(this.color1);
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

    window.Bubble = Bubble;
})(window);