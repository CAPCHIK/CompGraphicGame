import { Container, Measure, Rectangle, AdvancedDynamicTexture, Control } from 'babylonjs-gui';
import { MeshBuilder, Scene, AbstractMesh } from 'babylonjs';

export class HealthBar {
    private green: Rectangle;
    private container: Container;
    private plane: AbstractMesh;

    constructor(name: string, scene: Scene, _width = 1, _height = 0.2) {
        this.container = new Container();
        const rect = this.createRectangle('red');
        const green = this.createRectangle('green');
        green.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.green = green;
        this.container.addControl(rect);
        this.container.addControl(green);
        this.plane = MeshBuilder.CreatePlane(name + 'plane', { width: _width, height: _height }, scene);

        const texture = AdvancedDynamicTexture.CreateForMesh(this.plane);
        texture.addControl(this.container);
    }

    public linkToMesh(mesh: AbstractMesh): void {
        this.plane.position.y += mesh.getBoundingInfo().boundingSphere.radius * 1.3;
        mesh.addChild(this.plane);
    }

    public setHealth(health: number) {
        this.green.width = health;
    }

    public set width(width: number) {

    }

    public set height(height: number) {

    }

    private createRectangle(color: string): Rectangle {
        const rect = new BABYLON.GUI.Rectangle('health rectangle');
        rect.background = color;
        rect.color = color;
        rect.linkOffsetY = -40;
        return rect;
    }
}
