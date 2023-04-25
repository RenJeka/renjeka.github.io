import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const  renderer = new THREE.WebGLRenderer({ canvas: canvas });



const points_line_Y1 = [
    new THREE.Vector3( -2, 0, 0 ),
    new THREE.Vector3( -2, 1, 0 ),
    new THREE.Vector3( -3, 2, 0 ),
    new THREE.Vector3( -3, 3, 0 ),
];

const points_line_Y2 = [
    new THREE.Vector3( -2, 0, 0 ),
    new THREE.Vector3( -2, 1, 0 ),
    new THREE.Vector3( -1, 2, 0 ),
    new THREE.Vector3( -1, 3, 0 ),
];

const points_line_P = [
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 3, 0 ),
    new THREE.Vector3( 2, 3, 0 ),
    new THREE.Vector3( 2, 1, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
];

const geometry_line_Y1 = new THREE.BufferGeometry().setFromPoints( points_line_Y1 );
const geometry_line_Y2 = new THREE.BufferGeometry().setFromPoints( points_line_Y2 );
const geometry_line_P = new THREE.BufferGeometry().setFromPoints( points_line_P );


const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const lineY_1 = new THREE.Line(geometry_line_Y1, material);
const lineY_2 = new THREE.Line(geometry_line_Y2, material);
const lineP = new THREE.Line(geometry_line_P, material);



camera.position.z = 5;
camera.position.y = 1;

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xA5D6A7, 1 );

const group_YP = new THREE.Group();
group_YP.add( lineY_1 );
group_YP.add( lineY_2 );
group_YP.add( lineP );

scene.add(group_YP);

function render() {
    requestAnimationFrame(render);
    // group_YP.rotation.x += 0.01;
    group_YP.rotation.y += 0.01;
    // group_YP.rotation.z += 0.01;
    renderer.render(scene, camera);
}
render();
