// spacing horizontally will be relative to card width and to width space
const spaceBetweenCards = 1;
const cardSpaceToBorder = 0.5;

// spacing on top and bottom are in pixels, since we need to place text there
const topSpace = 60;
const bottomSpace = 90;

const resultMsgTimeout = 3000;

// all sizes within Board are in percentages, this makes it easier to resize
class Board {
    constructor(width, height, x, y, cardValues) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        let nCards = 1 + cardValues.length;
        this.cardWidth = width / (nCards + cardSpaceToBorder * 2 + spaceBetweenCards);
        this.cardHeight = height - topSpace - bottomSpace;
        this.matchCard = new Card(this.cardWidth, this.cardHeight, x + this.cardWidth * cardSpaceToBorder, y + topSpace);
        this.cardValues = [];
        for (let pos in cardValues) {
            this.cardValues.push(new Card(this.cardWidth,this.cardHeight, x + this.cardWidth * cardSpaceToBorder + this.cardWidth + this.cardWidth*spaceBetweenCards + pos * this.cardWidth,
                                y + topSpace, cardValues[pos]));
        }
    }
    draw() {
        this.matchCard.draw();
        for (let card of this.cardValues) {
            card.draw();
        }
        // text
        fill(0, 0, 0);
        textAlign(CENTER,CENTER);
        text(this.x + this.cardWidth * cardSpaceToBorder + this.cardWidth / 2, this.y + topSpace / 2);
        text(valuesLabel, this.x + this.cardWidth * cardSpaceToBorder + this.cardWidth * spaceBetweenCards + this.cardWidth + (this.cardValues.length * this.cardWidth) / 2, this.y + topSpace / 2);
        text(this.msg, this.x + this.width / 2, this.y + this.height - bottomSpace / 2);
    }

    valueClicked(x, y) {
        for (let card of this.cardValues)
            if (card.clicked(x, y)) return card.getCard();
        return false;
    }    
    matchCardClicked(x, y) {
        return this.matchCard.clicked(x, y);
    }
    setMatchCard(card) {
        this.matchCard.setCard(card);
    }
    resetMsg() { this.msg = baseMsg; }
    setResult(win) {
        if (win) this.msg = winMsg;
        else this.msg = looseMsg;
        let board = this;
        setTimeout(  ()=> { board.resetMsg() },
                    resultMsgTimeout);
    }
}