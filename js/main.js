((window, Bubble, Select) => {
    class Ctrl {
        constructor() {
            this.squresPnlEl = document.querySelector("#squres");
            let arr = [22, 15, 35, 23, 1, 6, 5, 48, 10];
            let bubble = new Bubble(arr, this.squresPnlEl, 'pink', 'yellowgreen');
            bubble.loop();
            this.bubble = bubble;
        }
    }
    new Ctrl();
})(window, Bubble, Select);