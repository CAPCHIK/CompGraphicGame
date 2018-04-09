import { GameUnit } from '../Units/GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3, StandardMaterial, Color3, LinesMesh } from 'babylonjs';
import { Mob } from '../Mobs/Mob';
import { MeshUnit } from '../Units/MeshUnit';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export class BaseTower extends MeshUnit {
    private buildMaterial: StandardMaterial;

    private debugLine: LinesMesh;
    public target: Mob;

    constructor(
        scene: Scene,
        protected radius: number,
        guiTexture: AdvancedDynamicTexture
    ) {
        super(scene);

        this.buildMaterial = new StandardMaterial('build material', scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
    }

    protected setMesh(): void {
        this.baseMesh = MeshBuilder.CreatePolyhedron('what the tower', {}, this.scene);
        this.baseMesh.material = this.buildMaterial;
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.White();
        this.buildMaterial.alpha = 1;
    }
    public update(frameTime: number): void {
        if (!this.target) {
            return;
        }
        if (this.distanceCorrect(this.target)) {
            this.baseMesh.lookAt(this.target.position);
            this.target.addDamage(0.1);
        } else {
            this.target = undefined;
        }
        this.drawDebug();
    }

    trySetTarget(mob: Mob): void {
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
