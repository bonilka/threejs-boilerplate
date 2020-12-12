import { AmbientLight, MeshLambertMaterial, Object3D, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from '../../node_modules/three/src/Three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const myCanvas = <HTMLCanvasElement>document.getElementById('myCanvas');

const renderer = new WebGLRenderer({
    canvas: myCanvas,
    antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

const scene = new Scene();

var light = new AmbientLight(0xffffff, 0.5);
scene.add(light);

const light2 = new PointLight(0xffffff, 0.5);
scene.add(light2);

const loader = new GLTFLoader();

loader.load('/assets/dog.gltf', handle_load);

let mesh;

function handle_load(gltf) {

    console.log(gltf);
    mesh = gltf.scene;
    console.log(mesh);
    //@ts-ignore
    mesh.children[0].material = new MeshLambertMaterial();
    scene.add(mesh);
}


//RENDER LOOP
render();

var delta = 0;
var prevTime = Date.now();

function render() {

    delta += 0.1;

    if (mesh) {

        mesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}