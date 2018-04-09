import { Vector3, Scene, AbstractMesh } from 'babylonjs';

export abstract class GameUnit {
    protected _position = Vector3.Zero();

    constructor(private scene: Scene) {
    }


    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }

    public abstract update(frameTime: number): void;
    public abstract isThat(mesh: AbstractMesh): boolean;
}
