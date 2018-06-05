
import { Scene, GUI, Effect, Vector3 } from 'babylonjs';
import { AdvancedDynamicTexture, Rectangle, StackPanel, Control } from 'babylonjs-gui';
import { GameUnit } from '../Units/UnitTypes/GameUnit';
import { MeshUnit } from '../Units/UnitTypes/MeshUnit';
import { HealthBar } from '../Stuff/GUI/HealthBar';
import { UnitEffect } from '../Effects/UnitEffect';
import { GamePath } from '../Stuff/GamePlay/Path/GamePath';
import { PathMover } from '../Stuff/GamePlay/Path/PathMover';

export abstract class Mob extends MeshUnit {
    private _health: number;
    protected healthBar: HealthBar;

    constructor(scene: Scene,
        protected _maxHealth: number,
        private pathMover: PathMover,
    ) {
        super(scene);
        this._health = _maxHealth;
        const bar = new HealthBar('health bar', scene);
        bar.linkToMesh(this.baseMesh);
        this.healthBar = bar;
    }

    public update(frameTime: number): void {
        super.update(frameTime);
        frameTime *= this.totalEffect.speedCoefficient;
        const moveInfo = this.pathMover.move(frameTime);
        this.setPosition(moveInfo.position);
        const currentRotation = this.baseMesh.rotationQuaternion.clone();
        this.lookAt(moveInfo.viewPointer);
        const needRotation = this.baseMesh.rotationQuaternion.subtract(currentRotation);
        // this.healthBar.plane.rotationQuaternion = currentRotation.(needRotation);
    }
    public addDamage(damage: number) {
        damage *= this.totalEffect.damageCoefficient;
        this._health -= damage;
        this.healthBar.setHealth(this._health / this._maxHealth);
    }

    public get health(): number {
        return this._health;
    }

    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.baseMesh.uniqueId;
    }
    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
}
