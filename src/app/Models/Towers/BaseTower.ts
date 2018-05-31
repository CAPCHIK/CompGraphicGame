import { GameUnit } from '../Units/UnitTypes/GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3, StandardMaterial, Color3, LinesMesh, ParticleSystem } from 'babylonjs';
import { Mob } from '../Mobs/Mob';
import { MeshUnit } from '../Units/UnitTypes/MeshUnit';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export abstract class BaseTower extends MeshUnit {
    protected buildMaterial: StandardMaterial;
    protected shootMaterial: StandardMaterial;
    private debugLine: LinesMesh;
    private timeFromLastShoot = 0;
    public target: Mob;

    constructor(
        scene: Scene,
        protected radius: number,
        protected damage: number,
        protected firePeriod: number
    ) {
        super(scene);
        const particleSystem = new ParticleSystem('particles', 200, scene);

        this.shootMaterial = new StandardMaterial('shoot material', scene);
        this.shootMaterial.diffuseColor = Color3.Red();
    }

    public abstract activate(): void;


    public update(frameTime: number): void {
        super.update(frameTime);
        this.timeFromLastShoot += frameTime;
        if (!this.target) {
            return;
        }
        if (this.target.disposed) {
            this.target = null;
        } else
            if (this.distanceCorrect(this.target)) {
                this.baseMesh.lookAt(this.target.position);
                this.shootWork(frameTime);
            } else {
                this.target = null;
            }
        this.drawDebug();
    }

    public trySetTarget(mob: Mob): void {
        if (this.target) {
            return;
        }
        if (this.distanceCorrect(mob)) {
            this.target = mob;
        }
    }

    public setPosition(position: Vector3) {
        super.setPosition(position.add(Vector3.Up().scale(1.3)));
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.baseMesh.uniqueId;
    }

    private shootWork(frameTime: number) {
        if (this.timeFromLastShoot > this.firePeriod) {
            this.timeFromLastShoot = 0;
            this.shoot();
        }
    }

    protected shoot() {
        this.target.addDamage(this.damage * this.totalEffect.damageCoefficient);
        this.buildMaterial.diffuseColor = Color3.Red();
        setTimeout(() => { this.setStandartColor(); }, 50);
    }
    protected setStandartColor() {
        this.buildMaterial.diffuseColor = Color3.White();
    }
    private distanceCorrect(mob: Mob): boolean {
        return Vector3.Distance(this.position, mob.position) < this.radius;
    }

    private drawDebug() {
        if (this.target) {
            this.debugLine = MeshBuilder.CreateLines('tower debug line', {
                points: [this.position, this.target.position],
                updatable: true,
                instance: this.debugLine
            });
            this.debugLine.color = Color3.Yellow();
        } else if (this.debugLine) {
            this.debugLine = MeshBuilder.CreateLines('tower debug line', {
                points: [this.position, this.position],
                updatable: true,
                instance: this.debugLine,
            });
        }
    }
}
