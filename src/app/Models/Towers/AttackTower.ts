import { BaseTower } from './BaseTower';
import { StandardMaterial, Color3, MeshBuilder, Scene, AbstractMesh } from 'babylonjs';

export class AttackTower extends BaseTower {
    public static mesh: AbstractMesh;
    constructor(
        scene: Scene,
        radius: number,
        damage: number,
        firePeriod: number) {
        super(scene, radius, damage, firePeriod);
    }
    protected setMesh(): void {
        this.baseMesh = AttackTower.mesh.clone('new attack tower mesh', AttackTower.mesh.parent);
    }

    protected setMaterial() {
        this.buildMaterial = new StandardMaterial('build material', this.scene);
        this.buildMaterial.alpha = 0.2;
        this.buildMaterial.diffuseColor = Color3.Green();
        this.baseMesh.material = this.buildMaterial;
    }

    public activate(): void {
        this.buildMaterial.diffuseColor = Color3.White();
        this.buildMaterial.alpha = 1;
    }
}
