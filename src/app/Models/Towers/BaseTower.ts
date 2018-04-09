import { GameUnit } from '../GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3, StandardMaterial, Color3 } from 'babylonjs';

export class BaseTower extends GameUnit {
    private mesh: Mesh;
    private buildMaterial: StandardMaterial;



    constructor(scene: Scene) {
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
        throw new Error('Method not implemented.');
    }
    public setPosition(position: Vector3) {
        position = position.add(Vector3.Up().scale(1.3));
        super.setPosition(position);
        this.mesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.mesh.uniqueId;
    }
}
