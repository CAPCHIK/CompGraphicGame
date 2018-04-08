import { Component, ViewChild, OnInit, SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Engine, Scene, Vector3, PointLight, HemisphericLight, ArcRotateCamera, FreeCamera, MeshBuilder } from 'babylonjs';
import { GeneralScene } from './Models/GeneralScene';
import { SimpleMob } from './Models/Mobs/SimpleMob';
import { GamePath } from './Models/Stuff/GamePath';
import { KeyboardCameraInput } from './Models/Stuff/CameraInputs/KeyboardCameraInput';

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

    const camera = new FreeCamera('Camera', new Vector3(0, 24, -23), scene);
    camera.setTarget(Vector3.Zero());
    const inp = new KeyboardCameraInput(camera, 0.08);
    camera.inputs.clear();
    camera.inputs.add(inp);
    // camera.inputs.attachInput(inp);
    camera.attachControl(canvas, true);
    const d = new GeneralScene(scene);

    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);
    const path = [
      new Vector3(0, 2, 0),
      new Vector3(0, 2, 10),
      new Vector3(10, 2, 10),
      // new Vector3(0, 2, 0)
    ];
    const firstMob = new SimpleMob(scene);
    const pathDrawer = new GamePath(path, firstMob, 0.005, scene);
    firstMob.setPosition(new Vector3(0, 1, 0));
    engine.runRenderLoop(function () {
      scene.render();
      pathDrawer.move(engine.getDeltaTime());
    });


    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

}
