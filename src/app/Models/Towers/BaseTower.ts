import { GameUnit } from '../GameUnit';
import { Mesh, Scene, MeshBuilder, Vector3 } from 'babylonjs';

export class BaseTower extends GameUnit {
    activate(): any {
        throw new Error("Method not implemented.");
    }
    private mesh: Mesh;
    constructor(scene: Scene) {
        super(scene);
        this.mesh = MeshBuilder.CreatePolyhedron('what the tower', {}, scene);
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
