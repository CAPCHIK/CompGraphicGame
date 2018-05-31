import { GameUnit } from './GameUnit';
import { Scene, AbstractMesh, MeshBuilder, Vector3, AssetsManager } from 'babylonjs';
import { EffectsUnit } from './EffectsUnit';

export abstract class MeshUnit extends EffectsUnit {
    protected baseMesh: AbstractMesh;
    protected assetsManager: AssetsManager;
    constructor(scene: Scene) {
        super(scene);
        this.assetsManager = new AssetsManager(scene);
        this.setMesh();
    }
    protected abstract setMesh(): void;

    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }

    public dispose(): void {
        super.dispose();
        this.baseMesh.dispose();
    }

    public lookAt(targetPoint: Vector3): void {
        this.baseMesh.lookAt(targetPoint);
    }
}
