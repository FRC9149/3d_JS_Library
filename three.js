import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js"
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/OBJLoader.js"

function create3dObject(canvasObject, width = window.innerWidth, height = window.innerHeight, is_rotateable = false, pathToObj = "") {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  topLight.position.set(100, 100, 100) //top-left-ish
  topLight.castShadow = true;
  const ambientLight = new THREE.AmbientLight(0x333333, 1);
  ambientLight.castShadow = true;
  scene.add(ambientLight);
  scene.add(topLight);

  //make allow for you to move the model around or not
  var controls;
  if(is_rotateable) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  }

  //Load the 3d model
  var object;
  const loader = new OBJLoader();
  loader.load(
    pathToObj,
    function(model) {
      scene.add(mesh);
    },
    (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); },
    (error) => { console.log(error); }
  );

  window.addEventListener("resize", function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    object.rotation.y += 0.005;
    renderer.render();
  }
  animate();
};