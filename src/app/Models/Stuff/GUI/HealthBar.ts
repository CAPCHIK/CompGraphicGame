import { Container, Measure, Rectangle } from 'babylonjs-gui';

export class HealthBar extends Container {
    private green: Rectangle;
    constructor(name?: string | undefined) {
        super(name);
        const rect = this.createRectangle('red');
        const green = this.createRectangle('green');
        green.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.green = green;
        this.addControl(rect);
        this.addControl(green);
    }

    public setHealth(health: number) {
        this.green.width = health;
    }

    private createRectangle(color: string): Rectangle {
        const rect = new BABYLON.GUI.Rectangle('health rectangle');
        rect.background = color;
        rect.color = color;
        rect.linkOffsetY = -40;
        return rect;
    }
}
