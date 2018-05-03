import { GameUnit } from './GameUnit';
import { EffectsManager } from '../../Stuff/Effetcs/EffectsManager';
import { UnitEffect } from '../../Effects/UnitEffect';
import { TotalEffect } from '../../Effects/TotalEffect';

export abstract class EffectsUnit extends GameUnit {
    private effectsManager = new EffectsManager();
    public update(frameTime: number): void {
        super.update(frameTime);
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
}
