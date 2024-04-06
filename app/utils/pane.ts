import { Cordinate } from "@utils/types";
import { terminal as term } from "terminal-kit";

class Pane {
    public width: number = 0;
    public height: number = 0;
    public position: Cordinate = { x: 0, y: 0 };
    public topLeft: Cordinate = { x: 0, y: 0 };
    public topRight: Cordinate = { x: 0, y: 0 };
    public bottomRight: Cordinate = { x: 0, y: 0 };
    public bottomLeft: Cordinate = { x: 0, y: 0 };
    public leftCenter: Cordinate = { x: 0, y: 0 };
    public rightCenter: Cordinate = { x: 0, y: 0 };
    public topCenter: Cordinate = { x: 0, y: 0 };
    public bottomCenter: Cordinate = { x: 0, y: 0 };
    public bottomMidCenter: Cordinate = { x: 0, y: 0 };
    public leftMidCenter: Cordinate = { x: 0, y: 0 };
    public rightMidCenter: Cordinate = { x: 0, y: 0 };
    public topMidCenter: Cordinate = { x: 0, y: 0 };
    public center: Cordinate = { x: 0, y: 0 };

    constructor(position: Cordinate, width: number, height: number) {
        this.updateValues(position, width, height);
    }

    private updateValues(newPosition: Cordinate, newWidth: number, newHeight: number) {
        this.position = newPosition;
        this.width = newWidth;
        this.height = newHeight;
        const {
            position: { x, y },
            width,
            height,
        } = this;

        this.topLeft = {
            x: x,
            y: y,
        };

        this.topRight = {
            x: x + width,
            y,
        };

        this.bottomRight = {
            x: x + width,
            y: y + height,
        };

        this.bottomLeft = {
            x,
            y: y + height,
        };

        this.leftCenter = {
            x,
            y: Math.round(this.bottomLeft.y / 2),
        };

        this.rightCenter = {
            x: x + width,
            y: Math.round(this.bottomLeft.y / 2),
        };

        this.topCenter = {
            x: Math.round(this.bottomRight.x / 2),
            y,
        };

        this.bottomCenter = {
            x: this.topCenter.x,
            y: this.bottomRight.y,
        };

        this.center = {
            x: this.bottomCenter.x,
            y: this.leftCenter.y,
        };
    }

    public clear = () => {
        term.eraseArea(this.position.x, this.position.y, this.width, this.height);
    };

    public drawCover = () => {
        this.clear();
        term.saveCursor();
        const {
            width,
            height,
            position: { x, y },
        } = this;

        // draw top line
        term.moveTo(this.topLeft.x, this.topLeft.y);
        for (let i = 0; i < width; i++) {
            term("-");
        }

        // draw bottom line
        term.moveTo(this.bottomLeft.x, this.bottomLeft.y);
        for (let i = 0; i <= width - 1; i++) {
            term("-");
        }

        // draw vertical lines
        for (let i = this.topLeft.y + 1; i < this.topLeft.y + height; i++) {
            // left
            term.moveTo(this.topLeft.x, i)("|");

            // right
            term.moveTo(this.topRight.x, i)("|");
        }

        term.restoreCursor();
    };
}

export default Pane;
