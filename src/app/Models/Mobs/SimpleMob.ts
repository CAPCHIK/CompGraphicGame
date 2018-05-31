import { Vector3, Scene, Mesh, Color3, StandardMaterial, Material, Color4, AssetsManager } from 'babylonjs';
import { Mob } from './Mob';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import { ColorsFuncs } from '../Stuff/Effetcs/ColorsFuncs';
import { PathMover } from '../Stuff/GamePlay/Path/PathMover';

export class SimpleMob extends Mob {

    private _standartColor = Color3.Black().toColor4();
    protected _material: StandardMaterial;
    constructor(scene: Scene, health: number, pathMover: PathMover) {
        super(scene, health, pathMover);
    }

    protected setMesh(): void {
        this.baseMesh = BABYLON.MeshBuilder.CreateCylinder('sphere', { diameter: 1 }, this.scene);
        this.baseMesh.position = this.position;
        this.generateMaterials();
        this.baseMesh.material = this._material;
    }

    protected generateMaterials(): void {
        this._material = new StandardMaterial('simple mob material', this.scene);
    }
    public update(frameTime: number): void {
        super.update(frameTime);
        if (this.totalEffect.materialColor) {
            // this._material.diffuseColor = ColorsFuncs.toColor3(
            //     ColorsFuncs.average(this._standartColor, this.totalEffect.materialColor));
        } else {
            // this._material.diffuseColor = ColorsFuncs.toColor3(this._standartColor);
        }
    }

    public setPosition(position: Vector3) {
        super.setPosition(position);
        this.baseMesh.position.copyFrom(position);
    }
    public isThat(mesh: BABYLON.AbstractMesh): boolean {
        return mesh.uniqueId === this.baseMesh.uniqueId;
    }
}
