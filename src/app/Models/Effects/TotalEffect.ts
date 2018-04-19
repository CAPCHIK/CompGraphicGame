import { EffectType } from './EffectType';
import { Color4 } from 'babylonjs';

export class TotalEffect {
    constructor(
        public speedCoefficient = 1,
        public damageCoefficient = 1,
        public materialColor: Color4 = null
    ) {}
}
