import { Mob } from './Mob';
import { AbstractMesh, Color3, Color4, Vector3 } from 'babylonjs';
import { SimpleMob } from './SimpleMob';

export class TankMob extends SimpleMob {
    public static mesh: AbstractMesh;
    protected setMesh(): void {
        this.baseMesh = TankMob.mesh.clone('new pig mesh', TankMob.mesh.parent);
    }
    protected _standartColor(): Color4 {
        return Color3.FromInts(7, 104, 39).toColor4();
    }
}
