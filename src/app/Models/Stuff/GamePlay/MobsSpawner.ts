import { GameUnit } from '../../Units/UnitTypes/GameUnit';
import { Scene, Vector3 } from 'babylonjs';
import { Timer } from '../Timer';
import { GamePath } from '../GamePath';
import { SimpleMob } from '../../Mobs/SimpleMob';

export class MobsSpawner extends GameUnit {

    private spawnTimer: Timer;
    constructor(
        scene: Scene,
        position = Vector3.Zero(),
        private spawnInterval: number,
        private pathMoverCreater: () => GamePath,
        private mobCreated: (Mob) => void
        ) {
        super(scene, position);
        this.spawnTimer = new Timer(spawnInterval, () => this.spawn());
    }

    public update(frameTime: number): void {
        super.update(frameTime);
        this.spawnTimer.update(frameTime);
    }

    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return false;
    }

    private spawn(): void {
        const pathMover = this.pathMoverCreater();
        const mob = new SimpleMob(this.scene, 100, pathMover);
        this.mobCreated(mob);
    }
}