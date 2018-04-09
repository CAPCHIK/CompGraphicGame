import { AdvancedDynamicTexture, Button, Control, Vector2WithInfo } from 'babylonjs-gui';
import { Color3, Observable, Vector2 } from 'babylonjs';

export class GUIManager {
    private texture;
    private isActive = true;
    private createTowerButton: Button;
    public createTowerObservable: Observable<Vector2WithInfo>;

    constructor() {
        this.texture = AdvancedDynamicTexture.CreateFullscreenUI('frontUI');
        const b = Button.CreateSimpleButton('simple', 'Create tower');
        this.createTowerButton = b;
        b.background = 'gray';
        b.width = 0.1;
        b.height = 0.05;
        b.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        b.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        b.left = '12';
        b.top = '12';
        this.createTowerObservable = new Observable<Vector2WithInfo>();
        b.onPointerDownObservable.add((info, state) => {
            if (this.isActive) {
                this.createTowerObservable.notifyObservers(info);
            }
        });
        this.texture.addControl(b);
    }
    off(): void {
        this.isActive = false;
    }
    on(): void {
        this.isActive = true;
    }
}
