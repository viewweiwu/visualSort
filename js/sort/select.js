((window) => {
    const util = new Util();
    class Select extends Sort {
        constructor(arr, el, selectedColor = "#6cf", doneColor = "#f60") {
            super(...arguments);
        }
        _getSnaps() {
            let arr = this.sortedArr;
            let snaps = [];
            let i, j, temp;
            for (i = 0; i < arr.length; i++) {
                temp = snaps[i];
                for (j = 0; j < arr.length; j++) {
                    snaps.push(this._createSnap(j, j + 1, arr));
                    if (arr[j] > arr[j + 1]) {
                        util.swap(arr, j, j + 1);
                        snaps.push(this._createSnap(j, j + 1, arr, true));
                    }
                }
            }
            return snaps;
        }
    }

    window.Select = Select;
})(window);