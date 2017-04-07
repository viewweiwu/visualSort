((window) => {
    class Util {
        swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        insert(arr, i, j) {

        }
    }

    window.Util = Util;
})(window);