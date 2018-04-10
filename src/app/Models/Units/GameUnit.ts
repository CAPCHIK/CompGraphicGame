import { Vector3, Scene, AbstractMesh } from 'babylonjs';

export abstract class GameUnit {
    protected _position = Vector3.Zero();
    private currentGUIScale = 1;
    constructor(protected scene: Scene) {
    }


    public get position(): Vector3 {
        return this._position.clone();
    }

    public setPosition(position: Vector3) {
        this._position.copyFrom(position);
    }

    public scaleGUI(scale: number): void {
        this.currentGUIScale = scale;
    }

    protected getGuiParameter(parameter: number): number {
        return parameter * this.currentGUIScale;
    }

    public abstract update(frameTime: number): void;
    public abstract isThat(mesh: AbstractMesh): boolean;
}
