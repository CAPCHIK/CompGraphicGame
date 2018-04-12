import { GameUnit } from './GameUnit';
import { Scene, AbstractMesh, MeshBuilder, Vector3 } from 'babylonjs';

export abstract class MeshUnit extends GameUnit {
    protected baseMesh: AbstractMesh;

    constructor(scene: Scene) {
        super(scene);
        this.setMesh();
    }
    protected setMesh(): void {
        this.baseMesh = MeshBuilder.CreateBox('default box', { size: 1 }, this.scene);
    }

    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
}
