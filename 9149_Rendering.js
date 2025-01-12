import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';
import { ThreeMFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/3MFLoader.js';
import * as BufferGeometryUtils from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/utils/BufferGeometryUtils.js';

export function create3dObject(
  canvasObject, pathToObj = "", width = window.innerWidth, height = window.innerHeight,
  cameraPosition = [0, 0, 0], modelPosition = [0, 0, 0], modelScale = [1, 1, 1], spins = true, rgbColor = [1, 1, 1]
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.x = cameraPosition[0];
  camera.position.y = cameraPosition[1];
  camera.position.z = cameraPosition[2];

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasObject,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.shadowMap = true;
  document.body.appendChild(renderer.domElement);

  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  topLight.position.set(5, .5, 2)
  topLight.castShadow = true;
  const ambientLight = new THREE.AmbientLight(0x333333, 1);
  ambientLight.castShadow = true;
  scene.add(ambientLight);
  scene.add(topLight);

  //make allow for you to move the model around or not
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 15;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.target.set(0, 0, 0);
  console.log(camera);


  //Load the 3d model
  let material = new THREE.MeshLambertMaterial();
  material.color = new THREE.Color(rgbColor[0], rgbColor[1], rgbColor[2]);
  console.log(material);
  var object = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), material);


  var geo;
  //load 3mf mesh
  var loader = new ThreeMFLoader();
  loader.load(
    `${pathToObj}.3mf`,
    function (geometry) {
      var result;
      geometry.traverse(function (child) {
        if (child.isMesh) {
          result = geo != null ? BufferGeometryUtils.mergeGeometries([result, child.geometry], false) : child.geometry;
          if ((geo = result) == null) {
            throw new Error("could not merge geometries");
          }
        }
      });
      //geo.castShadow = true;
      geo.computeVertexNormals();
      object = new THREE.Mesh(geo, material);
      object.scale.set(modelScale[0], modelScale[1], modelScale[2]);
      object.position.x = modelPosition[0];
      object.position.y = modelPosition[1];
      object.position.z = modelPosition[2];

      scene.add(object);
    },
    (xhr) => { },
    (error) => { console.log(error); }
  );
  //END loading mesh


  window.addEventListener("resize", function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    if (spins && object) object.rotateZ(.005);
    renderer.render(scene, camera);
  }
  animate();
};
