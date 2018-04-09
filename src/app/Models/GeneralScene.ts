import { Mesh, MeshBuilder, Scene, PointerInfo, EventState } from 'babylonjs';
import { GUIManager } from './GUI/GUIManager';
import { BaseTower } from './Towers/BaseTower';
import { tokenReference } from '@angular/compiler';
import { Mob } from './Mobs/Mob';

export class GeneralScene {
    private ground: Mesh;
    private gui: GUIManager;

    private towers: Array<BaseTower> = [];
    private mobs: Array<Mob> = [];

    constructor(private scene: Scene) {
        this.ground = MeshBuilder.CreateGround('ground', { width: 160, height: 160 }, scene);
        this.gui = new GUIManager();
        this.gui.createTowerObservable.add((s, a) => {
            this.gui.off();
            const newTower = new BaseTower(scene);
            this.placeNewTower(newTower);
        });
    }


    public update(frameTime: number): void {
        this.mobs.forEach(element => {
            element.update(frameTime);
        });
        for (let i = 0; i < this.towers.length; i++) {
        }
    }


    public spawnMob(mob: Mob): void {
        this.mobs.push(mob);
    }

    private placeNewTower(tower: BaseTower) {
        const mouseCallback = (data: PointerInfo, state: EventState) => {
            switch (data.type) {
                case 4: // move
                    const pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY, m => !tower.isThat(m));
                    if (!pick.hit) {
                        return;
                    }
                    tower.setPosition(pick.pickedPoint);
                    break;
                case 1: // down
                    this.scene.onPointerObservable.removeCallback(mouseCallback);
                    tower.activate();
                    this.towers.push(tower);
                    this.gui.on();
                    break;
            }
        };
        this.scene.onPointerObservable.add(mouseCallback);
    }
}
