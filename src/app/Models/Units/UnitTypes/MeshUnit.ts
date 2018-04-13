import { GameUnit } from './GameUnit';
import { Scene, AbstractMesh, MeshBuilder, Vector3 } from 'babylonjs';

export abstract class MeshUnit extends GameUnit {
    protected baseMesh: AbstractMesh;

    constructor(scene: Scene) {
        super(scene);
        this.setMesh();
    }
    protected abstract setMesh(): void;

    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
}
