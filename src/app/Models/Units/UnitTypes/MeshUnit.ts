import { GameUnit } from './GameUnit';
import { Scene, AbstractMesh, MeshBuilder, Vector3 } from 'babylonjs';
import { EffectsUnit } from './EffectsUnit';

export abstract class MeshUnit extends EffectsUnit {
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
