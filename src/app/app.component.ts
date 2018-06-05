import { Component, ViewChild, OnInit, SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ArcRotateCamera, FreeCamera, MeshBuilder, AssetsManager, SceneLoader, StandardMaterial, Color3, Mesh, Space } from 'babylonjs';
import { Engine, Scene, Vector3, PointLight, HemisphericLight } from 'babylonjs';
import { GeneralScene } from './Models/GeneralScene';
import { SimpleMob } from './Models/Mobs/SimpleMob';
import { KeyboardCameraInput } from './Models/Stuff/CameraInputs/KeyboardCameraInput';
import { MouseCameraInput } from './Models/Stuff/CameraInputs/MouseCameraInput';
import { BaseTower } from './Models/Towers/BaseTower';
import { IceTower } from './Models/Towers/IceTower';
import { AttackTower } from './Models/Towers/AttackTower';
import { PigMob } from './Models/Mobs/PigMob';
import { TankMob } from './Models/Mobs/TankMob';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('canva') canvasEl: ElementRef;


  ngOnInit(): void {
    const canvas = this.canvasEl.nativeElement;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const d = new GeneralScene(scene, canvas);

    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(30, 1, -1), scene);

    const assetManager = new AssetsManager(scene);
    const task = assetManager.addTextFileTask('json Task', 'assets/SpawnStrategyes/DefaultStrategy.json');
    task.run(scene, () => {
      console.log(task.text);
    }, e => {
      console.log(e);
    });
    SceneLoader.ImportMesh('', 'assets/', 'pig.babylon', scene, (m, p, s) => {
      m[0].scaling = m[0].scaling.scale(0.01);
      PigMob.pigMesh = m[0];
    });
    SceneLoader.ImportMesh('', 'assets/', 'tank.babylon', scene, (m, p, s) => {
      const newMesh = Mesh.MergeMeshes(m.map(am => am as Mesh), true, true);
      newMesh.rotate(Vector3.Up(), Math.PI / -4);
      newMesh.scaling = newMesh.scaling.scale(0.2);
      newMesh.setPivotPoint(newMesh.getPivotPoint().add(new Vector3(-2.5, 0, 0)), Space.LOCAL);
      TankMob.mesh = newMesh;
    });

    engine.loadingScreen.displayLoadingUI();
    engine.loadingScreen.hideLoadingUI();
    const sampleTower = new AttackTower(scene, 5, 20, 1000);
    const sampleIceTower = new IceTower(scene, 5, 20, 1000);
    sampleTower.setPosition(new Vector3(8, 1, 12));
    sampleIceTower.setPosition(new Vector3(12.5, 1, 12));
    sampleTower.activate();
    sampleIceTower.activate();
    d.spawnTower(sampleTower);
    d.spawnTower(sampleIceTower);
    engine.runRenderLoop(function () {
      scene.render();
      d.update(engine.getDeltaTime());
      d.setFPS(engine.getFps());
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

}
