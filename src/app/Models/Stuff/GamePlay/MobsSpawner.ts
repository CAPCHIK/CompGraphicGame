import { GameUnit } from '../../Units/UnitTypes/GameUnit';
import { Scene, Vector3 } from 'babylonjs';
import { Timer } from '../Timer';
import { SimpleMob } from '../../Mobs/SimpleMob';
import { PathMover } from './Path/PathMover';
import { PigMob } from '../../Mobs/PigMob';
import { TankMob } from '../../Mobs/TankMob';

export class MobsSpawner extends GameUnit {

    private spawnPigTimer: Timer;
    private spawnTankTimer: Timer;
    constructor(
        scene: Scene,
        position = Vector3.Zero(),
        private spawnInterval: number,
        private pathMoverCreater: () => PathMover,
        private mobCreated: (Mob) => void
        ) {
        super(scene, position);
        this.spawnPigTimer = new Timer(spawnInterval, () => this.spawnPig());
        this.spawnTankTimer = new Timer(this.spawnInterval * 2.3, () => this.spawnTank());
    }

    public update(frameTime: number): void {
        super.update(frameTime);
        this.spawnPigTimer.update(frameTime);
        this.spawnTankTimer.update(frameTime);
    }

    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return false;
    }

    private spawnPig(): void {
        const pathMover = this.pathMoverCreater();
        const mob = new PigMob(this.scene, 400, pathMover);
        this.mobCreated(mob);
    }

    private spawnTank(): void {
        const pathMover = this.pathMoverCreater();
        const mob = new TankMob(this.scene, 500, pathMover);
        this.mobCreated(mob);
    }
}
