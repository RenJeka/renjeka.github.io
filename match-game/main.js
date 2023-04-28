import {MatchGrid} from "./models/MatchGrid.js";
import {GridItem} from "./models/GridItem.js";
import {Game} from "./models/Game.js";
import anime from "./libs/anime.es.js";

window.onload = () => {
    const startBtn = document.querySelector("#start_btn");
    const endBtn = document.querySelector("#end_btn");
    const replayBtn = document.querySelector("#replay_btn");
    const scoreElement = document.querySelector("#score-matches-number");

    const gridProperty = {
        width: 500,
        height: 500,
        columnsNumber: 4,
        rowsNumber: 4,
        timeLimit: 90,
        themeColor: '#d7fbac',
        themeFont: '#185a9d',
    }
    const grid = new MatchGrid(gridProperty);
    const game = new Game(grid, scoreElement);

    customElements.define('grid-item', GridItem, {extends: 'div'});

    startBtn.addEventListener('click', () => {
        game.start()
    });

    endBtn.addEventListener('click', () => {
        game.end()
    });

    replayBtn.addEventListener('click', () => {
        game.replay()
    });

    game.start();

}
