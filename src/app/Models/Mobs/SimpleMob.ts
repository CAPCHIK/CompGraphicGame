import { Vector3, Scene, Mesh } from 'babylonjs';
import { Mob } from './Mob';
import { GamePath } from '../Stuff/GamePath';

export class SimpleMob extends Mob {
    private mesh: Mesh;

    constructor(scene: Scene, health: number, pathMover: GamePath) {
        super(scene, health, pathMover);
        this.mesh = BABYLON.MeshBuilder.CreateCylinder('sphere', { diameter: 1 }, scene);
        this.mesh.position = this.position;
    }

    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.mesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.mesh.uniqueId;
    }
}
