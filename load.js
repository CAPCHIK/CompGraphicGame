var assetsManager = new BABYLON.AssetsManager(scene); 
var balloon = assetsManager.addMeshTask("balloon", "", "", "balloon-ef.babylon"); 
balloon.onSuccess = function (task) { task.loadedMeshes[0].position = new BABYLON.Vector3(0, 10, 0); }	
assetsManager.load();
