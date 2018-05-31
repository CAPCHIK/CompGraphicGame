import { SimpleMob } from './SimpleMob';
import { AbstractMesh, Scene, MeshAssetTask, Vector3, StandardMaterial, MeshBuilder, LinesMesh, Color3, Space } from 'babylonjs';
import { PathMover } from '../Stuff/GamePlay/Path/PathMover';
import { Mob } from './Mob';
import { ColorsFuncs } from '../Stuff/Effetcs/ColorsFuncs';

export class PigMob extends Mob {
    public static pigMesh: AbstractMesh;

    protected _material: StandardMaterial;
    private _standartColor = Color3.FromInts(255, 192, 203).toColor4();
    constructor(scene: Scene, health: number, pathMover: PathMover) {
        super(scene, health, pathMover);
    }
    protected setMesh(): void {
        this._material = new StandardMaterial('simple mob material', this.scene);
        this.baseMesh = PigMob.pigMesh.clone('new pig mesh', PigMob.pigMesh.parent);
        this.baseMesh.material = this._material;
    }

    public update(frameTime: number): void {
        super.update(frameTime);
        if (this.totalEffect.materialColor) {
            this._material.diffuseColor = ColorsFuncs.toColor3(
                ColorsFuncs.average(this._standartColor, this.totalEffect.materialColor));
        } else {
            this._material.diffuseColor = ColorsFuncs.toColor3(this._standartColor);
        }
    }
    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.baseMesh.uniqueId;
    }

    public lookAt(targetPoint: Vector3): void {
        super.lookAt(targetPoint);
        this.baseMesh.rotate(Vector3.Up(), Math.PI * 1.5, Space.WORLD);
    }
}
