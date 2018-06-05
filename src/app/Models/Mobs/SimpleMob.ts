import { Vector3, Scene, Mesh, Color3, StandardMaterial, Material, Color4, AssetsManager } from 'babylonjs';
import { Mob } from './Mob';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import { ColorsFuncs } from '../Stuff/Effetcs/ColorsFuncs';
import { PathMover } from '../Stuff/GamePlay/Path/PathMover';

export abstract class SimpleMob extends Mob {

    protected _material: StandardMaterial;
    protected _standartColor(): Color4 {
        return Color3.White().toColor4();
    }
    constructor(scene: Scene, health: number, pathMover: PathMover) {
        super(scene, health, pathMover);
    }

    protected setMaterial(): void {
        this._material = new StandardMaterial('simple mob material', this.scene);
        this._material.diffuseColor = ColorsFuncs.toColor3(this._standartColor());
        this.baseMesh.material = this._material;
    }

    public update(frameTime: number): void {
        super.update(frameTime);
        if (this.totalEffect.materialColor) {
            this._material.diffuseColor = ColorsFuncs.toColor3(
                ColorsFuncs.average(this._standartColor(), this.totalEffect.materialColor));
        } else {
            this._material.diffuseColor = ColorsFuncs.toColor3(this._standartColor());
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
