import { EffectType } from './EffectType';
import { Material, Color3 } from 'babylonjs';

export class UnitEffect {
    constructor(
        public duration: number,
        public type: EffectType,
        public speedCoefficient = 1,
        public damageCoefficient = 1,
        public forever = false
    ) { }
    addedColor?: Color3;
}
