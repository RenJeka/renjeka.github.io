import {Timer} from './Timer.js';
import anime from '../libs/anime.es.js';

export class Game {

    _grid;
    _scoreHtmlElement;
    _gameInProcess = false;
    _selectedFirstItem = null;
    _selectedSecondItem = null;
    _isMatch = false;
    _allPairs = 0;
    _allMatched = 0;
    _timer;

    get grid() {
        return this._grid;
    }

    set grid(value) {
        this._grid = value;
    }

    get scoreElement() {
        return this._scoreElement;
    }

    set scoreElement(value) {
        this._scoreElement = value;
    }

    get gameInProcess() {
        return this._gameInProcess;
    }

    set gameInProcess(value) {
        this._gameInProcess = value;
    }


    get selectedFirstItem() {
        return this._selectedFirstItem;
    }

    set selectedFirstItem(value) {
        this._selectedFirstItem = value;
    }

    get selectedSecondItem() {
        return this._selectedSecondItem;
    }

    set selectedSecondItem(value) {
        this._selectedSecondItem = value;
    }

    get isMatch() {
        return this._isMatch;
    }

    set isMatch(value) {
        this._isMatch = value;
    }

    get allPairs() {
        return this._allPairs;
    }

    set allPairs(value) {
        this._allPairs = value;
    }

    get allMatched() {
        return this._allMatched;
    }

    set allMatched(value) {
        this._allMatched = value;
    }

    get timer() {
        return this._timer;
    }

    constructor(grid, scoreElement) {
        this._grid = grid;
        this._scoreElement = scoreElement;
        window.Game = this;
    }

    start() {
        // if finished — new grid
        if (this.gameInProcess) {
            const needRestartGame = confirm('Game in Process, would You like to restart the game?');
            if (needRestartGame) {
                setTimeout(this.replay.bind(this), 100);
                return;
            } else {
                return;
            }
        }
        this.grid.createGrid();
        this._timer = new Timer(this.grid.timeLimit, this.timerFinished.bind(this), this.grid.gridElement);
        this.grid.gridItems.forEach((gridItem) => {
            gridItem.addEventListener('click', (event) => {
                this._selectItemHandler(event)

            });
        });
        anime({
            targets: '.grid-item',
            rotateZ: '1turn',
            duration: 1000,
            easing: 'linear'
        }).play();
        this.allPairs = this.grid.gridItems.length / 2;
        this.gameInProcess = true;
        this.timer.start();
    }

    end(additionalText = '') {
        if (this.gameInProcess) {
            alert(`${additionalText} Your score is: ${this.allMatched} pair(s) from ${this.allPairs} pairs!`);
            this.timer.reset();
            this.grid.cleanGrid();
            this._setScoreToDefault();
            this.gameInProcess = false;
        }
    }

    replay() {
        this.end();
        this.start();
    }

    timerFinished() {
        this.end('Times is finished! ');
    }

    _selectItemHandler(event) {
        const currentItem = event.target;

        if (currentItem.isGuessed) {
            return;
        }

        if (!this.selectedFirstItem) {
            currentItem.selectItem();
            this.selectedFirstItem = currentItem;
        } else if (!this.selectedSecondItem) {
            if (this.selectedFirstItem && this.selectedFirstItem.id !== currentItem.id) {
                currentItem.selectItem();
                this.selectedSecondItem = currentItem;
                this._handleMatches();
                this._checkGameOver();
            }
        } else {
            this._clearItems();
            this.selectedFirstItem = currentItem;
            setTimeout(() => {
                currentItem.selectItem()
            }, 600)
        }
    }

    _handleMatches() {
        if (this._checkMatchItems()) {
            this.selectedFirstItem.markGuessed();
            this.selectedSecondItem.markGuessed();
            this.allMatched = this.allMatched + 1;
            this.scoreElement.innerText = this.allMatched;
        }
    }

    _checkMatchItems() {
        return this.selectedFirstItem?.text === this.selectedSecondItem?.text;
    }

    _clearItems() {
        this.grid.gridItems.forEach((gridItem) => {

            gridItem.unselectItem();
        });
        this.selectedFirstItem = null;
        this.selectedSecondItem = null;
    };

    _setScoreToDefault() {
        this.selectedFirstItem = null;
        this.selectedSecondItem = null;
        this.isMatch = false;
        this.allPairs = 0;
        this.allMatched = 0;
        this.scoreElement.innerText = this.allMatched;
    }

    _checkGameOver() {
        if (this.allPairs === this.allMatched) {
            setTimeout(() => {
                this.end('Congratulation! ');
            }, 1000)
        }
    }

};
