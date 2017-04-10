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
            let doneArr = {};
            let markArr = {};
            let i, j, target;
            // 初始步骤
            this._addSnap({ arr, doneArr, markArr, mode: "default" });
            for (i = 0; i < arr.length; i++) {
                target = i;
                markArr[target] = true;
                this._addSnap({ arr, doneArr, markArr, mode: "mark", curr: target });
                for (j = i - 1; j >= 0; j--) {
                    if (arr[j] > arr[target]) {
                        this._addSnap({ arr, doneArr, markArr, mode: "find", curr: j });
                        util.swap(arr, target, j);
                        // util.swap(doneArr, target, j);
                        delete markArr[target];
                        target = j;
                        markArr[target] = true;
                        this._addSnap({ arr, doneArr, markArr, mode: "swap", curr: target, next: j });
                    }
                }
                doneArr[i] = true;
                this._addSnap({ arr, doneArr, markArr, mode: "done", curr: i });
                markArr = {};
            }
            this._addSnap({ arr, doneArr, markArr, mode: "default" });
        }
    }
    window.Insert = Insert;
})(window);