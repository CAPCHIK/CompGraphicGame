import { Component, ViewChild, OnInit, SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Engine, Scene, Vector3, PointLight, HemisphericLight, ArcRotateCamera, FreeCamera, MeshBuilder } from 'babylonjs';
import { GeneralScene } from './Models/GeneralScene';
import { SimpleMob } from './Models/Mobs/SimpleMob';
import { GamePath } from './Models/Stuff/GamePath';
import { KeyboardCameraInput } from './Models/Stuff/CameraInputs/KeyboardCameraInput';
import { MouseCameraInput } from './Models/Stuff/CameraInputs/MouseCameraInput';
import { BaseTower } from './Models/Towers/BaseTower';

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
    const path = [
      new Vector3(0, 2, 0),
      new Vector3(0, 2, 10),
      new Vector3(10, 2, 10),
      new Vector3(10, 2, 20),
      new Vector3(20, 2, 20),

      // new Vector3(0, 2, 0)
    ];
    const firstMob = new SimpleMob(scene, 100, new GamePath(path, 0.005, scene), d.gui.texture);
    setTimeout(() => {
      d.spawnMob(new SimpleMob(scene, 100, new GamePath(path, 0.01, scene), d.gui.texture));
    }, 1000);
    setTimeout(() => {
      d.spawnMob(new SimpleMob(scene, 100, new GamePath(path, 0.0005, scene), d.gui.texture));
    }, 2000);
    setTimeout(() => {
      d.spawnMob(new SimpleMob(scene, 100, new GamePath(path, 0.005, scene), d.gui.texture));
    }, 3000);
    d.spawnMob(firstMob);
    const sampleTower = new BaseTower(scene, 5,  d.gui.texture);
    sampleTower.setPosition(new Vector3(8, 1, 12));
    sampleTower.activate();
    d.spawnTower(sampleTower);
    engine.runRenderLoop(function () {
      scene.render();
      d.update(engine.getDeltaTime());
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

}
