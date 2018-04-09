import { GameUnit } from '../GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3, StandardMaterial, Color3, LinesMesh } from 'babylonjs';
import { Mob } from '../Mobs/Mob';

export class BaseTower extends GameUnit {

    private mesh: Mesh;
    private buildMaterial: StandardMaterial;

    private debugLine: LinesMesh;
    public target: Mob;

    constructor(scene: Scene, protected radius: number) {
        super(scene);

        this.buildMaterial = new StandardMaterial('build material', scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();

        this.mesh = MeshBuilder.CreatePolyhedron('what the tower', {}, scene);
        this.mesh.material = this.buildMaterial;
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
            this.mesh.lookAt(this.target.position);
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
        position = position.add(Vector3.Up().scale(1.3));
        super.setPosition(position);
        this.mesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.mesh.uniqueId;
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
