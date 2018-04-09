
import { Scene, GUI } from 'babylonjs';
import { GamePath } from '../Stuff/GamePath';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import { GameUnit } from '../Units/GameUnit';
import { MeshUnit } from '../Units/MeshUnit';

export class Mob extends MeshUnit {

    constructor(scene: Scene,
        protected _health: number,
        private pathMover: GamePath,
        private guiTexture: AdvancedDynamicTexture
    ) {
        super(scene);
        const rect = new GUI.Rectangle('asd');
        rect.width = '0.1';
        rect.height = '0.02';
        // rect.linkWithMesh
        guiTexture.addControl(rect);
    }

    public update(frameTime: number): void {
        this.setPosition(this.pathMover.move(frameTime));
    }
    public addDamage(damage: number) {
        this._health += damage;
    }

    public get health(): number {
        return this._health;
    }

    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return false;
    }
}
