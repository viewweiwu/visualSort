((window) => {
    class Util {
        swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    window.Util = Util;
})(window);