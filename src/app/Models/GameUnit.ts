import { Vector3, Scene } from 'babylonjs';

export class GameUnit {
    protected _position = Vector3.Zero();

    constructor(private scene: Scene) {
    }

    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }
}
