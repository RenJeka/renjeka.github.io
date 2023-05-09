import anime from '../libs/anime.es.js';

export class GridItem extends HTMLDivElement {

    _id;
    _isVisible = false;
    _isGuessed = false;
    _selected = false;
    _text = '';

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get text() {
        return this._text.toUpperCase();
    }

    set text(value) {
        this._text = value;
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(value) {
        this._isVisible = value;
    }

    get isGuessed() {
        return this._isGuessed;
    }

    set isGuessed(value) {
        this._isGuessed = value;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    constructor(id, width, height, color) {
        super();
        this.id = id;
        this.setAttribute('id', id);
        this.style.width = parseInt(width) + 'px';
        this.style.height = parseInt(height) + 'px';
        // this.style.backgroundColor = color || '#ffffff';
        this.className = 'grid-item';

        this._appendItemSides();
        this._id = id;
    }

    static getConsistentIdsSet(numberOfGridItems = 0) {
        // may implement with using Array or make more unique ids
        const consistentIdsSet = new Set();
        for (let i = 0; i < numberOfGridItems; i++) {
            consistentIdsSet.add(i);
        }
        return consistentIdsSet;
    }

    static generateRandomText(textLength, characters = '0123456789') {
        characters = Array.isArray(characters) ? characters.join('') : characters.toString();
        let result = '';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < textLength) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    static getRandomTextSet(sizeOfSet = 1, idLength = 3) {
        const symbolsSet = new Set();
        for (let i = 0; i < sizeOfSet; i++) {
            let uniqText = GridItem.generateRandomText(idLength);
            while (symbolsSet.has(uniqText)) {
                uniqText = GridItem.generateRandomText(idLength);
            }
            symbolsSet.add(uniqText);
        }
        return symbolsSet;
    }

    static generateRandomIdPairsMap(idSet = new Set([0]), textLength = 3) {
        const randomIdPairs = new Map();
        // Need half as much as the number of idSet to make pairs.
        const randomTextSet = GridItem.getRandomTextSet(Math.round(idSet.size / 2), textLength);
        const randomTextSetCopy = new Set(randomTextSet);
        const shuffledTextArray = this.shuffleArray([...randomTextSet].concat([...randomTextSetCopy]));

        const idsSetIterator = idSet.values();
        shuffledTextArray.forEach((text) => {
            randomIdPairs.set(idsSetIterator.next().value, text);
        });

        return randomIdPairs;
    }

    static shuffleArray(array) {
        return array.sort(function () {
            return Math.random() - 0.5;
        });
    }

    setTextToItem(text, fontSize) {
        const backSide = this.querySelector('.grid-item_back-text');

        this._text = text.toString();
        backSide.innerText = text.toString();
        this.style.fontSize = fontSize + 'px';
    }

    toggleItem() {
        this.selected = !this.selected;
        if (this.selected) {
            this.classList.add('item-selected');
            anime({
                targets: this,
                rotateY: {value: '-0.5turn'}, //"-=180"
                duration: 350,
                easing: 'linear',
            }).play();
        } else {
            this.classList.remove('item-selected');
            anime({
                targets: this,
                rotateY: {value: '0turn'}, //"+=180"
                duration: 350,
                easing: 'linear',
            }).play();
        }
    }

    unselectItem() {
        if (this.selected && !this.isGuessed) {
            anime({
                targets: this,
                rotateY: {value: '0turn'}, // "+=180"
                duration: 350,
                easing: 'linear',
            }).play();
        }
        this.selected = false;
        this.classList.remove('item-selected');
    }

    markGuessed() {
        this.isGuessed = true;
        this.classList.add('item-guessed');
    }

    _appendItemSides() {
        const frontSide = document.createElement('div');
        const frontSideText = document.createElement('span');
        frontSide.classList.add('grid-item_front');
        frontSideText.classList.add('grid-item_front-text');
        frontSide.appendChild(frontSideText);
        this.appendChild(frontSide);


        const backSide = document.createElement('div');
        const backSideText = document.createElement('span');
        backSide.classList.add('grid-item_back');
        backSideText.classList.add('grid-item_back-text');
        backSide.appendChild(backSideText);
        this.appendChild(backSide);
    }
}
