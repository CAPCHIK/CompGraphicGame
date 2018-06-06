import { Container, Measure, Rectangle, AdvancedDynamicTexture, Control } from 'babylonjs-gui';
import { MeshBuilder, Scene, AbstractMesh, Vector3, Mesh, StandardMaterial, Color3 } from 'babylonjs';

export class HealthBar {
    private greenCylinder: Mesh;
    private greenScaling: number;
    private blueCylinder: Mesh;

    constructor(name: string, scene: Scene, _width = 0.3, _height = 1) {

        this.greenCylinder = MeshBuilder.CreateCylinder('green health', { height: _height, diameter: _width }, scene);
        const greenMaterial = new StandardMaterial('green material', scene);
        greenMaterial.diffuseColor = Color3.Green();
        this.greenCylinder.material = greenMaterial;
        this.greenCylinder.setPivotPoint(new Vector3(0, -_height / 2, 0));
        this.blueCylinder = MeshBuilder.CreateCylinder('blue health', { height: _height * 1.2, diameter: _width * 1.2 }, scene);
        const blueMaterial = new StandardMaterial('red material', scene);
        blueMaterial.diffuseColor = Color3.Blue();
        blueMaterial.alpha = 0.3;
        this.blueCylinder.material = blueMaterial;
        this.blueCylinder.setPivotPoint(new Vector3(0,  -_height / 2, 0));

    }

    public linkToMesh(mesh: AbstractMesh): void {
        const bound = mesh.getBoundingInfo();

        mesh.addChild(this.greenCylinder);
        this.greenCylinder.position = Vector3.Zero();
        this.greenCylinder.position.y += bound.boundingSphere.radius;
        this.greenScaling = this.greenCylinder.scaling.y;

        mesh.addChild(this.blueCylinder);
        this.blueCylinder.position = Vector3.Zero();
        this.blueCylinder.position.y += bound.boundingSphere.radius;
    }

    public setHealth(health: number) {
        this.greenCylinder.scaling.y = this.greenScaling * health;
    }
}
