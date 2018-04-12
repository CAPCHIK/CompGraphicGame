import { Vector3, Scene, AbstractMesh, Effect } from 'babylonjs';
import { UnitEffect } from '../../Effects/UnitEffect';

export abstract class GameUnit {
    protected _position = Vector3.Zero();
    private currentGUIScale = 1;
    private _effects: Array<UnitEffect> = [];
    constructor(protected scene: Scene) {
    }


    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }

    public update(frameTime: number): void {
        for (let i = 0; i < this._effects.length; i++) {
            if (!this._effects[i] || this._effects[i].forever) {
                continue;
            }
            if (!this._effects[i].forever) {
                this._effects[i].duration -= frameTime;
            }
            if (this._effects[i].duration <= 0) {
                this._effects[i] = undefined;
            }
        }
    }

    public addEffect(effect: UnitEffect): void {
        this._effects[effect.type] = effect;
    }
    public abstract isThat(mesh: AbstractMesh): boolean;

    protected get effects(): Array<UnitEffect> {
        return this._effects.filter(e => e);
    }
}
