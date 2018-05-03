import { Vector3, Scene, AbstractMesh, Effect } from 'babylonjs';
import { UnitEffect } from '../../Effects/UnitEffect';
import { EffectType } from '../../Effects/EffectType';
import { EffectsManager } from '../../Stuff/Effetcs/EffectsManager';
import { TotalEffect } from '../../Effects/TotalEffect';

export abstract class GameUnit {
    protected _position = Vector3.Zero();

    constructor(protected scene: Scene, startPosition = Vector3.Zero()) {
        this._position = startPosition;
    }

    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }

    public update(frameTime: number) {

    }

    public abstract isThat(mesh: AbstractMesh): boolean;

}
