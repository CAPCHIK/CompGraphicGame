import { BaseTower } from './BaseTower';
import { StandardMaterial, Color3, MeshBuilder, Scene } from 'babylonjs';

export class AttackTower extends BaseTower {

    constructor(
        scene: Scene,
        radius: number,
        damage: number,
        firePeriod: number) {
        super(scene, radius, damage, firePeriod);
        console.log('ctor');
    }
    protected setMesh(): void {
        super.setMesh();
        this.buildMaterial = new StandardMaterial('build material', this.scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
        this.baseMesh = MeshBuilder.CreatePolyhedron('what the tower', {}, this.scene);
        this.baseMesh.material = this.buildMaterial;
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.White();
        this.buildMaterial.alpha = 1;
    }
}
