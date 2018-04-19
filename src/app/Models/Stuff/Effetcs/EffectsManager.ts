import { UnitEffect } from '../../Effects/UnitEffect';
import { TotalEffect } from '../../Effects/TotalEffect';

export class EffectsManager {
    private _effects: Array<Array<UnitEffect>> = [];
    private _totalEffect = new TotalEffect();
    private needCalculate = false;


    public update(frameTime: number): void {
        for (let i = 0; i < this._effects.length; i++) {
            if (!this._effects[i]) { continue; }

            for (let j = 0; j < this._effects[i].length; j++) {
                if (!this._effects[i][j]) { continue; }

                this._effects[i][j].duration -= frameTime;
                if (this._effects[i][j].duration <= 0) {
                    this._effects[i].splice(j, 1);
                    this.needCalculate = true;
                }
            }
        }
        if (this.needCalculate) {
            this._totalEffect = this.calculateTotalEffect();
            this.needCalculate = false;
        }
    }

    public get totalEffect(): TotalEffect {
        return this._totalEffect;
    }
    public addEffect(effect: UnitEffect): void {
        if (!this._effects[effect.type]) {
            this._effects[effect.type] = [];
        }
        this._effects[effect.type].push(effect);
        this.needCalculate = true;
    }

    public removeEffetc(effect: UnitEffect) {
        this._effects[effect.type] = null;
        for (let i = 0; i < this._effects.length; i++) {
            if (!this._effects[i]) { continue; }
            for (let j = 0; j < this._effects[i].length; j++) {
                if (this._effects[i][j] && this._effects[i][j].id === effect.id) {
                    this._effects[i][j] = null;
                }
            }
        }
        this.needCalculate = true;
    }


    private calculateTotalEffect(): TotalEffect {
        return this.aggregate(
            this._effects
                .filter(effList => effList)
                .map(list => this.getBest(list)));
    }

    private aggregate(totalEffects: Array<TotalEffect>): TotalEffect {
        const total = new TotalEffect();
        totalEffects.forEach(effect => {
            total.damageCoefficient *= effect.damageCoefficient;
            total.speedCoefficient *= effect.speedCoefficient;
        });
        return total;
    }
    private getBest(effetsList: Array<UnitEffect>): TotalEffect {
        const best = new TotalEffect();
        effetsList.filter(eff => eff).forEach(element => {
            best.speedCoefficient = Math.min(best.speedCoefficient, element.speedCoefficient);
            best.damageCoefficient = Math.min(best.damageCoefficient, element.damageCoefficient);
            if (element.addedColor) {
                best.materialColor = element.addedColor.toColor4();
            }
        });
        return best;
    }
}
