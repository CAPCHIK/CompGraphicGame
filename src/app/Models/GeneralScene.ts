import { Mesh, MeshBuilder, Scene, PointerInfo, EventState, Camera, FreeCamera, Vector3, SceneLoader } from 'babylonjs';
import { GUIManager } from './GUI/GUIManager';
import { BaseTower } from './Towers/BaseTower';
import { tokenReference } from '@angular/compiler';
import { Mob } from './Mobs/Mob';
import { KeyboardCameraInput } from './Stuff/CameraInputs/KeyboardCameraInput';
import { MouseCameraInput } from './Stuff/CameraInputs/MouseCameraInput';
import { GameUnit } from './Units/UnitTypes/GameUnit';
import { IceTower } from './Towers/IceTower';
import { AttackTower } from './Towers/AttackTower';
import { MobsSpawner } from './Stuff/GamePlay/MobsSpawner';
import { GamePath } from './Stuff/GamePlay/Path/GamePath';

export class GeneralScene {
    private ground: Mesh;
    public gui: GUIManager;
    private camera: Camera;
    private towers: Array<BaseTower> = [];
    private mobs: Array<Mob> = [];
    private spawner: MobsSpawner;
    constructor(
        private scene: Scene,
        canvas: HTMLElement) {
        this.ground = MeshBuilder.CreateGround('ground', { width: 160, height: 160 }, scene);
        this.gui = new GUIManager();
        this.gui.createTowerObservable.add((s, a) => {
            this.gui.off();
            const newTower = new AttackTower(scene, 5, 20, 1000);
            this.placeNewTower(newTower);
        });
        this.gui.createIceTowerObservable.add((s, a) => {
            this.gui.off();
            const newTower = new IceTower(scene, 5, 0.01, 1000);
            this.placeNewTower(newTower);
        });
        this.initCamera(canvas);
        const points = [
            new Vector3(0, 2, 0),
            new Vector3(0, 2, 10),
            new Vector3(10, 2, 10),
            new Vector3(10, 2, 20),
            new Vector3(20, 2, 20),
        ];
        const path = new GamePath(points, 0.005, scene);
        this.spawner = new MobsSpawner(
            scene,
            new Vector3(0, 2, 0),
            4000,
            () => path.createMover(),
            m => this.spawnMob(m)
        );
    }
    public setFPS(fps: number) {
        this.gui.setFPS(Math.round(fps));
    }

    public update(frameTime: number): void {
        for (let i = 0; i < this.mobs.length; i++) {
            this.mobs[i].update(frameTime);
            this.towers.filter(t => !t.target).forEach(t => t.trySetTarget(this.mobs[i]));
            if (this.mobs[i].health < 0) {
                this.mobs[i].dispose();
                this.mobs.splice(i, 1);
            }
        }
        this.towers.forEach(t => t.update(frameTime));
        this.spawner.update(frameTime);
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
