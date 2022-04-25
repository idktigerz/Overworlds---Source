// spacing horizontally will be relative to card width and to width space
const spaceBetweenCards = 1;
const cardSpaceToBorder = 0.5;

// spacing on top and bottom are in pixels, since we need to place text there
const topSpace = 60;
const bottomSpace = 90;

const resultMsgTimeout = 3000;
// all sizes within Board are in percentages, this makes it easier to resize
class Board {
    constructor(width,height,x,y, playValues) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.msg = baseMsg;
        let nCards = 1+playValues.length;
        this.cardWidth = width/(nCards+cardSpaceToBorder*2+spaceBetweenCards);
        this.cardHeight = height-topSpace-bottomSpace;
        this.roomCard = new Card(this.cardWidth,this.cardHeight,
                                 x+this.cardWidth*cardSpaceToBorder,
                                 y+topSpace);
        this.cardValues = [];
        for (let pos in playValues) {
            this.cardValues.push(new Card(this.cardWidth,this.cardHeight, x+this.cardWidth*cardSpaceToBorder+this.cardWidth+this.cardWidth*spaceBetweenCards+pos*this.cardWidth, y+topSpace,playValues[pos]));
        }
    }
    draw() {
        this.roomCard.draw();
        for (let card of this.cardValues) {
            card.draw();
        }
        // text
        fill(0,0,0);
        textAlign(CENTER,CENTER);
        text(this.x+this.cardWidth*cardSpaceToBorder+this.cardWidth/2, 
            this.y+topSpace/2);
        text(this.x+this.cardWidth*cardSpaceToBorder+
                this.cardWidth*spaceBetweenCards+this.cardWidth+
                (this.cardValues.length*this.cardWidth)/2, this.y+topSpace/2);
        text(this.msg, this.x+this.width/2, this.y+this.height-bottomSpace/2);
    }

    valueClicked(x,y) {
        for (let card of this.cardValues)
            if (card.clicked(x,y)) return card.getCard();
        return false;
    }    
    roomCardClicked(x,y) {
        return this.roomCard.clicked(x,y);
    }
    setRoomCard(card) {
        this.roomCard.setCard(card);
    }
    setResult(win) {
        if (win) this.msg = winMsg;
        else this.msg = looseMsg;
        let board = this;
        setTimeout(  ()=> { board.resetMsg() },
                    resultMsgTimeout);
    }
}