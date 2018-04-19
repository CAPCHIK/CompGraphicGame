import { EffectType } from './EffectType';

export class TotalEffect {
    constructor(
        public speedCoefficient = 1,
        public damageCoefficient = 1,
    ) {}

    public reset(): void {
        this.speedCoefficient = 1;
        this.damageCoefficient = 1;
    }
}
