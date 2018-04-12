import { AdvancedDynamicTexture, Button, Control, Vector2WithInfo, TextBlock } from 'babylonjs-gui';
import { Color3, Observable, Vector2 } from 'babylonjs';
import { IceTower } from '../Towers/IceTower';

export class GUIManager {
    public texture: AdvancedDynamicTexture;
    private isActive = true;
    public createTowerObservable: Observable<Vector2WithInfo>;
    public createIceTowerObservable: Observable<Vector2WithInfo>;

    private fpsBlock: TextBlock;
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
        this.fpsBlock = this.createFPSText();
        this.texture.addControl(this.fpsBlock);

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

    public setFPS(fps: number) {
        this.fpsBlock.text = fps.toString();
    }

    private createFPSText(): TextBlock {
        const text = new TextBlock('fps block', '0');
        // text.left = 12;
        text.top = 70;
        text.width = 0.1;
        text.height = 0.05;
        text.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        return text;
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
