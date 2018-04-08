import { Vector3, Scene, Mesh } from 'babylonjs';
import { GameUnit } from '../GameUnit';

export class SimpleMob extends GameUnit {
    private mesh: Mesh;

    constructor(scene: Scene) {
        super(scene);
        this.mesh = BABYLON.MeshBuilder.CreateCylinder('sphere', { diameter: 1 }, scene);
        this.mesh.position = this.position;
    }

    public setPosition(position: Vector3) {
        this.mesh.position.copyFrom(position);
    }
}
