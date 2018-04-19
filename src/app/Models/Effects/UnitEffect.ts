import { EffectType } from './EffectType';
import { Material, Color3, Color4 } from 'babylonjs';
import { UniqIdObject } from '../Stuff/UniqIdObject';

export class UnitEffect extends UniqIdObject {
    constructor(
        public duration: number,
        public type: EffectType,
        public speedCoefficient = 1,
        public damageCoefficient = 1
    ) {
        super();
    }
    addedColor?: Color4;
}
