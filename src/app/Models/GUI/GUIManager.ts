import { AdvancedDynamicTexture, Button, Control, Vector2WithInfo } from 'babylonjs-gui';
import { Color3, Observable, Vector2 } from 'babylonjs';
import { IceTower } from '../Towers/IceTower';

export class GUIManager {
    public texture: AdvancedDynamicTexture;
    private isActive = true;
    public createTowerObservable: Observable<Vector2WithInfo>;
    public createIceTowerObservable: Observable<Vector2WithInfo>;

    constructor() {
        this.texture = AdvancedDynamicTexture.CreateFullscreenUI('frontUI');
        const b = this.createButton('simple', 'Create tower');
        b.left = 12; b.top = 12;
        this.createTowerObservable = new Observable<Vector2WithInfo>();
        b.onPointerDownObservable.add((info, state) => {
            if (this.isActive) {
                this.createTowerObservable.notifyObservers(info);
            }
        });
        this.texture.addControl(b);

        const iceButton = this.createButton('ice tower', 'Create Ice Tower');
        iceButton.left = 300;
        iceButton.top = 12;
        this.texture.addControl(iceButton);

        this.createIceTowerObservable = new Observable<Vector2WithInfo>();
        iceButton.onPointerDownObservable.add((info, state) => {
            if (this.isActive) {
                this.createIceTowerObservable.notifyObservers(info);
            }
        });
    }

    private createButton(name: string, text: string): Button {
        const b = Button.CreateSimpleButton(name, text);
        b.background = 'gray';
        b.width = 0.1;
        b.height = 0.05;
        b.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        b.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        return b;
    }


    off(): void {
        this.isActive = false;
    }
    on(): void {
        this.isActive = true;
    }
}
