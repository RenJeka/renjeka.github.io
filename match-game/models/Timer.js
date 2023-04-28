export class Timer{

    _seconds;
    _isCompleted = false;
    _callbackFunc = null;
    _intervalId = null;
    _timerElement = document.querySelector('#timer');
    _timerArea;
    _inProcess = false;

    get seconds() {
        return this._seconds;
    }

    set seconds(value) {
        this._seconds = value;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = value;
    }


    get callbackFunc() {
        return this._callbackFunc;
    }

    get intervalId() {
        return this._intervalId;
    }

    set intervalId(value) {
        this._intervalId = value;
    }

    get timerElement() {
        return this._timerElement;
    }

    get timerArea() {
        return this._timerArea;
    }


    get inProcess() {
        return this._inProcess;
    }

    set inProcess(value) {
        this._inProcess = value;
    }

    constructor(seconds, callbackFunc, timerArea) {
        this._seconds = Math.abs(parseInt(seconds)) || 0;
        this._callbackFunc = callbackFunc;
        this._timerElement.innerHTML = this.seconds;
        if (timerArea) {
            timerArea.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
            timerArea.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
        }
    }

    start() {
        if (this.isCompleted || this.inProcess) {
            return;
        }
        this.intervalId = setInterval(this._tick.bind(this), 1000);
        this.inProcess = true;
    }

    pause() {
        this.clear();
    }

    clear() {
        this.inProcess = false;
        clearInterval(this.intervalId);
    }

    reset() {
        this.clear();
        this.timerElement.innerText = '0';
    }


    _mouseLeaveHandler() {
        if (this.inProcess) {
            this.pause();
        }
    }

    _mouseEnterHandler() {
        if (!this.inProcess) {
            this.start();
        }
    }

    _tick() {
        if (this.seconds <= 0) {
            this.isCompleted = true;
            this.callbackFunc();
            this.clear();
            return;
        }
        this.seconds = this.seconds - 1;
        this.timerElement.innerText = this.seconds;
    }
}
