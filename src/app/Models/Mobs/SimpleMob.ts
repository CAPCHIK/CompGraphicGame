import { Vector3, Scene, Mesh } from 'babylonjs';
import { Mob } from './Mob';
import { GamePath } from '../Stuff/GamePath';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export class SimpleMob extends Mob {

    constructor(scene: Scene, health: number, pathMover: GamePath, gui: AdvancedDynamicTexture) {
        super(scene, health, pathMover);
    }
    protected setMesh(): void {
        this.baseMesh = BABYLON.MeshBuilder.CreateCylinder('sphere', { diameter: 1 }, this.scene);
        this.baseMesh.position = this.position;
    }
    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.baseMesh.uniqueId;
    }
}
