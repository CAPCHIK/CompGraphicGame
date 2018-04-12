import { Mesh, MeshBuilder, Scene, PointerInfo, EventState, Camera, FreeCamera, Vector3 } from 'babylonjs';
import { GUIManager } from './GUI/GUIManager';
import { BaseTower } from './Towers/BaseTower';
import { tokenReference } from '@angular/compiler';
import { Mob } from './Mobs/Mob';
import { KeyboardCameraInput } from './Stuff/CameraInputs/KeyboardCameraInput';
import { MouseCameraInput } from './Stuff/CameraInputs/MouseCameraInput';
import { GameUnit } from './Units/GameUnit';

export class GeneralScene {
    private ground: Mesh;
    public gui: GUIManager;
    private camera: Camera;
    private towers: Array<BaseTower> = [];
    private mobs: Array<Mob> = [];

    constructor(
        private scene: Scene,
        canvas: HTMLElement) {
        this.ground = MeshBuilder.CreateGround('ground', { width: 160, height: 160 }, scene);
        this.gui = new GUIManager();
        this.gui.createTowerObservable.add((s, a) => {
            this.gui.off();
            const newTower = new BaseTower(scene, 5, this.gui.texture);
            this.placeNewTower(newTower);
        });
        this.initCamera(canvas);
    }


    public update(frameTime: number): void {
        this.mobs.forEach(element => {
            element.update(frameTime);
            this.towers.filter(t => !t.target).forEach(t => t.trySetTarget(element));
        });
        this.towers.forEach(t => t.update(frameTime));
    }


    public spawnMob(mob: Mob): void {
        this.mobs.push(mob);
    }
    public spawnTower(tower: BaseTower): void {
        this.towers.push(tower);
    }

    private initCamera(canvas: HTMLElement) {
        const camera = new FreeCamera('Camera', new Vector3(0, 24, -23), this.scene);
        camera.setTarget(Vector3.Zero());
        const mouseCameraController = new MouseCameraInput();
        const inp = new KeyboardCameraInput(camera, 0.2);
        camera.inputs.clear();
        camera.inputs.add(inp);
        camera.inputs.add(mouseCameraController);
        camera.attachControl(canvas, true);
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
                    console.log(pick.pickedPoint);
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
