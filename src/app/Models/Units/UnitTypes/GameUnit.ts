import { Vector3, Scene, AbstractMesh, Effect } from 'babylonjs';
import { UnitEffect } from '../../Effects/UnitEffect';
import { EffectType } from '../../Effects/EffectType';
import { EffectsManager } from '../../Stuff/Effetcs/EffectsManager';
import { TotalEffect } from '../../Effects/TotalEffect';

export abstract class GameUnit {
    protected _position = Vector3.Zero();
    private effectsManager = new EffectsManager();


    constructor(protected scene: Scene) {
    }


    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }

    public update(frameTime: number): void {
        this.effectsManager.update(frameTime);
    }

    public addEffect(effect: UnitEffect): void {
        this.effectsManager.addEffect(effect);
    }

    public removeEffetc(effect: UnitEffect) {
        this.effectsManager.removeEffetc(effect);
    }

    public get totalEffect(): TotalEffect {
        return this.effectsManager.totalEffect;
    }

    public abstract isThat(mesh: AbstractMesh): boolean;
}
