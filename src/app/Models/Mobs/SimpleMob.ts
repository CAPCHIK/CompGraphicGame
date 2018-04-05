import { Mob } from './Mob';
import { Vector3, Scene } from 'babylonjs';

export class SimpleMob extends Mob {

    constructor(scene: Scene) {
        super(Vector3.Zero(), scene);
        this.mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    }
}
