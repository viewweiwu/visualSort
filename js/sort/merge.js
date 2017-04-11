((window) => {
    const util = new Util();
    class Merge extends Sort {
        constructor() {
            super("merge", ...arguments);
        }
        _getSnaps() {
            /**
             * 重写父类的获取快照方法
             */
            let arr = this.sortedArr;
            let i, j, target;
            for (i = 0; i < arr.length; i++) {

            }
        }
        mergeSort(items) {
            if (items.length <= 1) {
                return items;
            }
            let middle = Math.floor(items.length / 2);
            leftArr = items.slice(0, middle);
            rightArr = items.slice(middle);
            return this.merge(this.mergeSort(leftArr), this.mergeSort(rightArr));
        }
        merge(leftArr, rightArr) {
            let result = [];

            while (leftArr.length > 0 && rightArr.length > 0) {
                if (leftArr[0] < rightArr[0]) {

                }
            }

            leftArr.forEach((left, i) => {
                let right = rightArr[i];
                if (right === undefined) {
                    if (left < right) {
                        result.add(left);
                        result.add(right);
                    } else {
                        result.add(right);
                        result.add(left);
                    }
                } else {
                    result.add(left);
                }
            })
            return result;
        }
    }
    window.Merge = Merge;
})(window);