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
        super.setMesh();
        this.buildMaterial = new StandardMaterial('build material', this.scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
        this.baseMesh = MeshBuilder.CreatePolyhedron('what the tower', {}, this.scene);
        this.baseMesh.material = this.buildMaterial;
    }

    public shoot() {
        super.shoot();
        this.target.addEffect(new UnitEffect(2000, EffectType.Freeze, 0.5   ));
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.Blue();
        this.buildMaterial.alpha = 1;
    }

    protected setStandartColor() {
        this.buildMaterial.diffuseColor = Color3.Blue();
    }
}
