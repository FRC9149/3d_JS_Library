import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/OBJLoader.js"
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/MTLLoader.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/STLLoader.js';

export function create3dObject(
  canvasObject, pathToObj = "", width = window.innerWidth, height = window.innerHeight, is_rotateable = false, cameraPosition = [0, 0, 0],
  spins = true, shadows = true, alpha = true
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  camera.position.x = cameraPosition[0];
  camera.position.y = cameraPosition[1];
  camera.position.z = cameraPosition[2];

  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvasObject,
    alpha: alpha,
    antialias: true,
  });
  renderer.setSize( width, height );
  document.body.appendChild(renderer.domElement);




  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  const ambientLight = new THREE.AmbientLight(0x333333, 10);
  topLight.position.set(100, 100, 100); //top-left-ish
  if(shadows) { 
    topLight.castShadow = true;
    ambientLight.castShadow = true;
  }
  scene.add(topLight);
  scene.add(ambientLight);


  //make allow for you to move the model around or not
  var controls;
  if(is_rotateable) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  }





//Load the 3d model
  var object;
  const matLoader = new MTLLoader();
  //load material
  matLoader.load(
    `${pathToObj}.mtl`,
    function(material) { 
      material.preload();

      //load mesh
      const loader = new STLLoader();
        loader.load(
        '${pathToObj}.stl',
        function (geometry) {
          object = new THREE.Mesh(geometry, material);
          scene.add(object);
        }
      );
      //END loading mesh
    } //end lambda
  );


  window.addEventListener("resize", function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    if(spins && object)   object.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();
};
