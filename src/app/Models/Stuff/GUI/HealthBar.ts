import { Container, Measure, Rectangle, AdvancedDynamicTexture, Control } from 'babylonjs-gui';
import { MeshBuilder, Scene, AbstractMesh, Vector3, Mesh, StandardMaterial, Color3 } from 'babylonjs';

export class HealthBar {
    private static _blueMaterial: StandardMaterial;

    private _healthCylinder: Mesh;
    private _cylinderMaterial: StandardMaterial;

    private _greenScaling: number;
    private _blueCylinder: Mesh;

    constructor(name: string, scene: Scene, _width = 0.3, _height = 1) {
        if (!HealthBar._blueMaterial) {
            HealthBar._blueMaterial = new StandardMaterial('red material', scene);
            HealthBar._blueMaterial.diffuseColor = Color3.Blue();
            HealthBar._blueMaterial.alpha = 0.2;
        }
        this._healthCylinder = MeshBuilder.CreateCylinder('green health', {
            height: _height,
            diameter: _width,
            tessellation: 6
        }, scene);
        const greenMaterial = new StandardMaterial('green material', scene);
        greenMaterial.diffuseColor = Color3.Green();
        this._healthCylinder.material = greenMaterial;

        this._cylinderMaterial = greenMaterial;

        this._healthCylinder.setPivotPoint(new Vector3(0, -_height / 2, 0));
        this._blueCylinder = MeshBuilder.CreateCylinder('blue health', {
            height: _height * 1.2,
            diameter: _width * 1.2,
            tessellation: 6
        }, scene);

        this._blueCylinder.material = HealthBar._blueMaterial;
        this._blueCylinder.setPivotPoint(new Vector3(0, -_height / 2, 0));

    }

    public linkToMesh(mesh: AbstractMesh): void {
        const bound = mesh.getBoundingInfo();

        mesh.addChild(this._healthCylinder);
        this._healthCylinder.position = Vector3.Zero();
        this._healthCylinder.position.y += bound.boundingSphere.radius;
        this._greenScaling = this._healthCylinder.scaling.y;

        mesh.addChild(this._blueCylinder);
        this._blueCylinder.position = Vector3.Zero();
        this._blueCylinder.position.y += bound.boundingSphere.radius;
    }

    public setHealth(health: number) {
        this._healthCylinder.scaling.y = this._greenScaling * health;
        this._cylinderMaterial.diffuseColor.r = 1 - health;
        this._cylinderMaterial.diffuseColor.g = health;

    }
}
