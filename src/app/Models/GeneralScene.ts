import { Mesh, MeshBuilder, Scene } from 'babylonjs';

export class GeneralScene {
    private ground: Mesh;

    constructor(scene: Scene) {
        this.ground = MeshBuilder.CreateGround('ground', { width: 160, height: 160 }, scene);
    }
}
