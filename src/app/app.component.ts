import { Component, ViewChild, OnInit, SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Engine, Scene, Vector3, PointLight, HemisphericLight, ArcRotateCamera, FreeCamera, MeshBuilder } from 'babylonjs';
import { GeneralScene } from './Models/GeneralScene';
import { SimpleMob } from './Models/Mobs/SimpleMob';

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

    const camera = new FreeCamera('Camera', new Vector3(0, 5, -4), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    const d = new GeneralScene(scene);

    const light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
    const light2 = new PointLight('light2', new Vector3(0, 1, -1), scene);

    const firstMob = new SimpleMob(scene);
    firstMob.setPosition(new Vector3(0, 1, 0));
    engine.runRenderLoop(function () {
      scene.render();
    });


    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

}
