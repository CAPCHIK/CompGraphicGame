import { Mesh, MeshBuilder, Scene, PointerInfo, EventState } from 'babylonjs';
import { GUIManager } from './GUI/GUIManager';
import { BaseTower } from './Towers/BaseTower';
import { tokenReference } from '@angular/compiler';

export class GeneralScene {
    private ground: Mesh;
    private gui: GUIManager;

    constructor(private scene: Scene) {
        this.ground = MeshBuilder.CreateGround('ground', { width: 160, height: 160 }, scene);
        this.gui = new GUIManager();
        this.gui.createTowerObservable.add((s, a) => {
            this.gui.off();
            const newTower = new BaseTower(scene);
            this.placeNewTower(newTower);
        });
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
                    break;
            }
        };
        this.scene.onPointerObservable.add(mouseCallback);
    }
}
