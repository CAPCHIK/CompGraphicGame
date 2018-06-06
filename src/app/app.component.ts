import { Component, ViewChild, OnInit, SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SceneLoader, StandardMaterial, Color3, Mesh, Space, MeshAssetTask } from 'babylonjs';
import { ArcRotateCamera, FreeCamera, MeshBuilder, AssetsManager } from 'babylonjs';
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
    scene.debugLayer.show();
    const d = new GeneralScene(scene, canvas);

    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(30, 1, -1), scene);

    const assetManager = new AssetsManager(scene);
    assetManager.addTextFileTask('json Task', 'assets/SpawnStrategyes/DefaultStrategy.json')
      .onSuccess = t => {
        console.log(t.text);
      };
    assetManager.addMeshTask('pig task', '', 'assets/', 'pig.babylon')
      .onSuccess = p => {
        p.loadedMeshes[0].scaling = p.loadedMeshes[0].scaling.scale(0.008);
        PigMob.pigMesh = p.loadedMeshes[0];
      };
    assetManager.addMeshTask('mesh task', '', 'assets/', 'tank.babylon')
      .onSuccess = m => {
        const newMesh = Mesh.MergeMeshes(m.loadedMeshes.map(am => am as Mesh), true, true);
        newMesh.rotate(Vector3.Up(), 0);
        newMesh.scaling = newMesh.scaling.scale(0.3);
        newMesh.setPivotPoint(newMesh.getPivotPoint().add(new Vector3(-2.5, 0, 0)), Space.LOCAL);
        TankMob.mesh = newMesh;
        newMesh.position.x += 50;
      };
    assetManager.addMeshTask('tower task', '', 'assets/', 'tower.babylon')
      .onSuccess = m => {
        const newMesh = Mesh.MergeMeshes(m.loadedMeshes.map(am => am as Mesh), true, true);
        newMesh.rotate(Vector3.Up(), Math.PI / -4);
        newMesh.scaling = newMesh.scaling.scale(0.06);
        AttackTower.mesh = newMesh;
        newMesh.position.x += 50;
      };
    engine.loadingScreen.displayLoadingUI();
    assetManager.load();
    assetManager.onFinish = tasks => {
      tasks
        .map(t => t as MeshAssetTask)
        .filter(t => t.loadedMeshes)
        .forEach(t => {
          t.loadedMeshes.forEach(m => m.position.x += 200);
        });
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
      engine.loadingScreen.hideLoadingUI();
    };

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }
}
