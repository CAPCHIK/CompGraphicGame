import { SimpleMob } from './SimpleMob';
import { AbstractMesh, Scene, MeshAssetTask, Vector3, StandardMaterial, MeshBuilder, LinesMesh, Color3, Space, Color4 } from 'babylonjs';
import { PathMover } from '../Stuff/GamePlay/Path/PathMover';
import { Mob } from './Mob';
import { ColorsFuncs } from '../Stuff/Effetcs/ColorsFuncs';

export class PigMob extends SimpleMob {
    public static pigMesh: AbstractMesh;

    constructor(scene: Scene, health: number, pathMover: PathMover) {
        super(scene, health, pathMover);
    }
    protected setMesh(): void {
        this.baseMesh = PigMob.pigMesh.clone('new pig mesh', PigMob.pigMesh.parent);
    }

    protected _standartColor(): Color4 {
        return Color3.FromInts(255, 192, 203).toColor4();
    }

    public lookAt(targetPoint: Vector3): void {
        super.lookAt(targetPoint);
        this.baseMesh.rotate(Vector3.Up(), Math.PI * 1.5, Space.WORLD);
    }
}
