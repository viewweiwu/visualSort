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
            let doneArr = {};
            let markArr = {};
            let i, j, min;
            // 初始步骤
            this._addSnap({ arr, doneArr, markArr, mode: "default" });
            for (i = 0; i < arr.length; i++) {
                min = i;
                markArr[min] = true;
                this._addSnap({ arr, doneArr, markArr, mode: "mark", curr: min });
                for (j = i + 1; j < arr.length; j++) {
                    this._addSnap({ arr, doneArr, markArr, mode: "find", curr: j });
                    if (arr[min] > arr[j]) {
                        delete markArr[min];
                        min = j;
                        markArr[min] = true;
                        this._addSnap({ arr, doneArr, markArr, mode: "mark", curr: min });
                    }
                }
                if (min !== i) {
                    markArr[i] = true;
                    this._addSnap({ arr, doneArr, markArr, mode: "mark", curr: i });
                    util.swap(arr, min, i);
                    this._addSnap({ arr, doneArr, markArr, mode: "swap", curr: min, next: i });
                }
                doneArr[i] = true;
                markArr = {};
                this._addSnap({ arr, doneArr, markArr, mode: "done", curr: i });
            }
        }
    }

    window.Select = Select;
})(window);