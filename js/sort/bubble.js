((window, Util, Squre) => {
    const util = new Util();
    class Bubble {
        constructor(arr) {
            this.arr = arr;
            this.sortedArr = [].concat(arr);
            this.snaps = this._getSnaps();
        }
        _getSnaps() {
            let arr = this.sortedArr;
            let snaps = [];
            let i, j;
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr.length - i - 1; j++) {
                    snaps.push(this._createSnap(j, j + 1, arr));
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        snaps.push(this._createSnap(j, j + 1, arr, true));
                    }

                }
                snaps.push(this._createSnap(j, j, arr, false, true));
            }
            return snaps;
        }
        _createSnap(curr, next, arr, isSwap = false, isDone = false) {
            return {
                curr,
                next,
                arr,
                isSwap,
                isDone
            }
        }
    }

    window.Bubble = Bubble;
})(window, Util, Squre);