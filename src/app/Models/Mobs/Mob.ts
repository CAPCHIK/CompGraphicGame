
import { Scene, GUI } from 'babylonjs';
import { GamePath } from '../Stuff/GamePath';
import { AdvancedDynamicTexture, Rectangle, StackPanel, Control } from 'babylonjs-gui';
import { GameUnit } from '../Units/GameUnit';
import { MeshUnit } from '../Units/MeshUnit';
import { HealthBar } from '../Stuff/GUI/HealthBar';

export abstract class Mob extends MeshUnit {
    private _health: number;
    private healthBar: HealthBar;

    constructor(scene: Scene,
        protected _maxHealth: number,
        private pathMover: GamePath,
        guiTexture: AdvancedDynamicTexture
    ) {
        super(scene);
        this._health = _maxHealth;

        const bar = new HealthBar();
        this.healthBar = bar;
        this.setGUISizes();
        guiTexture.addControl(bar);
        bar.linkWithMesh(this.baseMesh);
    }

    public update(frameTime: number): void {
        this.setPosition(this.pathMover.move(frameTime));
    }
    public addDamage(damage: number) {
        this._health -= damage;
        this.healthBar.setHealth(this._health / this._maxHealth);
    }

    public get health(): number {
        return this._health;
    }

    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return false;
    }
    public scaleGUI(scale: number): void {
        super.scaleGUI(scale);
        this.setGUISizes();
    }

    private setGUISizes() {
        this.healthBar.width = this.getGuiParameter(0.04);
        this.healthBar.height = this.getGuiParameter(0.01);
    }
}
