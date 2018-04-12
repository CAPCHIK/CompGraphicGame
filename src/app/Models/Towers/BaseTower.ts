import { GameUnit } from '../Units/UnitTypes/GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3, StandardMaterial, Color3, LinesMesh, ParticleSystem } from 'babylonjs';
import { Mob } from '../Mobs/Mob';
import { MeshUnit } from '../Units/UnitTypes/MeshUnit';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export class BaseTower extends MeshUnit {
    protected buildMaterial: StandardMaterial;

    private debugLine: LinesMesh;
    private timeFromLastShoot = 0;
    private particleSystem: ParticleSystem;
    public target: Mob;

    constructor(
        scene: Scene,
        protected radius: number,
        protected damage: number,
        protected firePeriod: number
    ) {
        super(scene);
        const particleSystem = new ParticleSystem('particles', 200, scene);
        particleSystem.particleTexture = new BABYLON.Texture('assets/sketch.png', scene);
        // Where the particles come from
        particleSystem.emitter = this.baseMesh; // the starting object, the emitter
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.1;
        particleSystem.maxLifeTime = 0.2;

        // Emission rate
        particleSystem.emitRate = 150000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -10, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(0, 10, -10);
        particleSystem.direction2 = new BABYLON.Vector3(0, 10, -10);
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        this.particleSystem = particleSystem;
    }

    protected setMesh(): void {
        this.buildMaterial = new StandardMaterial('build material', this.scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
        this.baseMesh = MeshBuilder.CreatePolyhedron('what the tower', {}, this.scene);
        this.baseMesh.material = this.buildMaterial;
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.White();
        this.buildMaterial.alpha = 1;
    }
    public update(frameTime: number): void {
        super.update(frameTime);
        if (!this.target) {
            return;
        }
        if (this.distanceCorrect(this.target)) {
            this.baseMesh.lookAt(this.target.position);
            this.shootWork(frameTime);
        } else {
            this.target = undefined;
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
        this.timeFromLastShoot += frameTime;
        if (this.timeFromLastShoot > this.firePeriod) {
            this.timeFromLastShoot = 0;
            this.shoot();
        }
    }

    protected shoot() {
        this.target.addDamage(this.damage);
        this.particleSystem.start();
        setTimeout(() => this.particleSystem.stop(), 50);
    }

    private distanceCorrect(mob: Mob): boolean {
        return Vector3.Distance(this.position, mob.position) < this.radius;
    }

    private drawDebug() {
        if (this.target) {
            this.debugLine = MeshBuilder.CreateLines('tower debug line', {
                points: [this.position, this.target.position],
                updatable: true,
                instance: this.debugLine,
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
