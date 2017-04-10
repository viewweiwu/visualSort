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
            let doneArr = {};
            let i, j;
            // 初始步骤
            this._addSnap({ arr, doneArr, mode: "default" });
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr.length - i - 1; j++) {
                    this._addSnap({ arr, doneArr, mode: "find", curr: j, next: j + 1 });
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        this._addSnap({ arr, doneArr, mode: "swap", curr: j, next: j + 1 });
                    }
                }
                doneArr[j] = true;
                this._addSnap({ arr, doneArr, mode: "done", curr: j });
            }
        }
    }

    window.Bubble = Bubble;
})(window);