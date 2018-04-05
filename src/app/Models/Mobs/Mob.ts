import { Vector2, Vector3, AbstractMesh, Scene } from 'babylonjs';

export abstract class Mob {
    private _position = Vector3.Zero();
    protected mesh: AbstractMesh;

    constructor(position: Vector3, private scene: Scene) {
        this._position = position.clone();
    }
    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: BABYLON.Vector3) {
        this._position.copyFrom(position);
        this.mesh.position = this._position;
    }
}
