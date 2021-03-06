import { BaseTower } from './BaseTower';
import { Color3, Scene, StandardMaterial, MeshBuilder } from 'babylonjs';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { EffectType } from '../Effects/EffectType';
import { UnitEffect } from '../Effects/UnitEffect';

export class IceTower extends BaseTower {
    constructor(
        scene: Scene,
        radius: number,
        damage: number,
        fireSpeed: number
    ) {
        super(scene, radius, damage, fireSpeed);
    }

    protected setMesh(): void {
        this.baseMesh = MeshBuilder.CreatePolyhedron('what the tower', {}, this.scene);
    }

    protected setMaterial(): void {
        this.buildMaterial = new StandardMaterial('build material', this.scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
        this.baseMesh.material = this.buildMaterial;
    }

    public shoot() {
        super.shoot();
        const effect = new UnitEffect(2000, EffectType.Freeze, 0.5);
        effect.addedColor = Color3.Blue().toColor4();
        this.target.addEffect(effect);
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.Blue();
        this.buildMaterial.alpha = 1;
    }

    protected setStandartColor() {
        this.buildMaterial.diffuseColor = Color3.Blue();
    }
}
