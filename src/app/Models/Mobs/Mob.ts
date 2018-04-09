import { GameUnit } from '../GameUnit';
import { Scene } from 'babylonjs';
import { GamePath } from '../Stuff/GamePath';

export class Mob extends GameUnit {

    constructor(scene: Scene,
        protected _health: number,
        private pathMover: GamePath
    ) {
        super(scene);
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
