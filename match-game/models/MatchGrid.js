import {GridItem} from "./GridItem.js";

export class MatchGrid {

    _grid = document.querySelector("#playground-grid");

    _width;
    _height;
    _columnsNumber;
    _rowsNumber;
    _timeLimit;
    _themeColor;
    _fontColor;
    _fontSize;
    _maxWidth = 1000;
    _maxHeight = 1000;
    _maxColumns = 20;
    _maxRows = 20;
    _maxTime = 1000;
    _minWidth = 100;
    _minHeight = 100;
    _minColumns = 2;
    _minRows = 2;
    _minTime = 15;
    _minFontSize = 5;
    _maxFontSize = 60;
    _defaultThemeColor = '#656565';
    _defaultFontColor = '#000000';
    _gridGap = 5;
    _gridItems = [];
    _gridItemSize = {
        height: 0,
        width: 0
    }


    get gridElement() {
        return this._grid;
    }

    get gridItems() {
        return this._gridItems;
    }

    set gridItems(value) {
        this._gridItems = value;
    }

    get timeLimit() {
        return this._timeLimit;
    }

    constructor({width, height, columnsNumber, rowsNumber, timeLimit, themeColor, fontColor, fontSize}) {

        this._columnsNumber = this._normalizeInteger(columnsNumber, this._minColumns, this._maxColumns);
        this._rowsNumber = this._normalizeInteger(rowsNumber, this._minRows, this._maxRows);
        this._timeLimit = this._normalizeInteger(timeLimit, this._minTime, this._maxTime);
        this._width = this._normalizeWidth(width, this._minWidth, this._maxWidth);
        this._height = this._normalizeHeight(height, this._minHeight, this._maxHeight);
        this._fontSize = this._normalizeInteger(fontSize, this._minFontSize, this._maxFontSize);
        this._themeColor = this._normalizeColor(themeColor, this._defaultThemeColor);
        this._fontColor = this._normalizeColor(fontColor, this._defaultFontColor);
        this._timeLimit = timeLimit;
        this._gridItemSize = this._getGridItemSize()
    }

    createGrid() {
        this._setUpGrid();
        this._putItems();
    }

    cleanGrid() {
        this._removeItems();

    }

    _normalizeWidth(width, minLimit, maxLimit) {
        const gridWidth = this._normalizeInteger(width, minLimit, maxLimit);
        return gridWidth + ((this._columnsNumber - 1) * this._gridGap);
    }

    _normalizeHeight(height, minLimit, maxLimit) {
        const gridHeight = this._normalizeInteger(height, minLimit, maxLimit);
        return gridHeight + ((this._rowsNumber - 1) * this._gridGap);
    }

    _normalizeInteger(number, limitBottom, limitTop) {
        const currentNumber = Math.abs(parseInt(number));

        if (isNaN(currentNumber)) {
            console.warn(`You passed incorrect number in Grid settings! Number ${number} changed to ${limitBottom}`);
            return limitBottom;
        }

        if (Math.abs(currentNumber) < limitBottom) {
            console.warn(`You passed too low number in Grid settings! Number ${number} changed to ${limitBottom}`);
            return limitBottom;
        }

        if (Math.abs(currentNumber) > limitTop) {
            console.warn(`You passed too high number in Grid settings! Number ${number} changed to ${limitTop}`);
            return limitTop;
        }
        return currentNumber;
    }

    _normalizeColor(strColor, defaultColor) {
        const colorHexRegex = /^#[0-9a-f]{6}/i;
        return colorHexRegex.test(strColor) ? strColor : defaultColor;
    }

    _countGridItems() {
        const userProposedItemsNumber = this._columnsNumber * this._rowsNumber;
        const maxItems = this._maxColumns * this._maxRows
        if (userProposedItemsNumber > 1 && userProposedItemsNumber < maxItems) {
            if (userProposedItemsNumber % 2 === 0) {
                return userProposedItemsNumber;
            } else {
                return userProposedItemsNumber - 1;
            }
        } else {
            return maxItems;
        }
    }

    _getGridItemSize() {
        let itemWidth = Math.round((this._width - this._gridGap * (this._columnsNumber - 1)) / this._columnsNumber);
        let itemHeight = Math.round((this._height  - this._gridGap * (this._rowsNumber - 1)) / this._rowsNumber);
        const MINIMAL_ITEM_WIDTH = 20;
        const MINIMAL_ITEM_HEIGHT = 20;

        if (itemWidth < MINIMAL_ITEM_WIDTH) {
            itemWidth = MINIMAL_ITEM_WIDTH
        }

        if (itemHeight < MINIMAL_ITEM_HEIGHT) {
            itemHeight = MINIMAL_ITEM_HEIGHT
        }

        return {
            width: itemWidth,
            height: itemHeight
        };
    }

    _setUpGrid() {
        const itemSize = this._gridItemSize;
        this.gridElement.style.width = this._width + 'px';
        this.gridElement.style.height = this._height + 'px';
        this.gridElement.style.gridTemplateColumns = `repeat(${this._columnsNumber}, ${itemSize.width}px)`;
        this.gridElement.style.gridTemplateRows = `repeat(${this._rowsNumber}, ${itemSize.height}px)`;
        this.gridElement.style.gap = `${this._gridGap}px`;
        this.gridElement.style.backgroundColor = this._themeColor;
        this.gridElement.style.color = this._fontColor;
    }

    _putItems() {
        const gridItemIdsSet = GridItem.getConsistentIdsSet(this._countGridItems());
        const idTextPairsMap = GridItem.generateRandomIdPairsMap(gridItemIdsSet)

        for (const gridItemId of gridItemIdsSet) {
            const gridItem = new GridItem(gridItemId, this._gridItemSize.width, this._gridItemSize.height);
            this._gridItems.push(gridItem);
            gridItem.setTextToItem(idTextPairsMap.get(gridItemId), this._fontSize);
            this.gridElement.appendChild(gridItem);
        }
    }

    _removeItems() {
        this.gridItems = [];
        this.gridElement.innerHTML = '';
    }
}
