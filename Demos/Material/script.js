import * as THREE from './node_modules/three/src/Three.js'


const scene = document.getElementById('scene').object3D
const textureLoader = new THREE.TextureLoader();
const buddahTexture = textureLoader.load('images/Edit.png')
const buddahNormal = textureLoader.load('images/BuddaNormal.png')

const wallTexture = textureLoader.load('images/WallTexture.jpg')
wallTexture.encoding = THREE.SRGBColorSpace
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(10,10)
const wallNormal = textureLoader.load('images/WallNormal.png')
wallNormal.wrapS = THREE.RepeatWrapping;
wallNormal.wrapT = THREE.RepeatWrapping;
wallNormal.repeat.set(10,10)
wallNormal.encoding = THREE.LinearEncoding

document.querySelector('a-scene').addEventListener('loaded', function() {
    var scene = this;
    var renderer = scene.renderer; // Access the Three.js renderer
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use softer shadow maps

});

buddahTexture.encoding = THREE.SRGBColorSpace;
buddahNormal.encoding = THREE.LinearEncoding;
console.log(buddahNormal)

const planeGeo = new THREE.PlaneGeometry(5,5)
const planeMat = new THREE.MeshStandardMaterial({ 
    map: buddahTexture,
    normalMap: buddahNormal
})

planeMat.metalness = .1
planeMat.roughness = .8
console.log(planeMat)
planeMat.normalScale.set(.01,.01)

const planeMesh = new THREE.Mesh(planeGeo, planeMat)
planeMesh.scale.x = .675
planeMesh.position.z = -4
planeMesh.position.y = 2
planeMesh.castShadow = true;
planeMesh.receiveShadow = true;
scene.add(planeMesh)

// -----------------

const wallGeo = new THREE.PlaneGeometry(30,30)
const wallMat = new THREE.MeshStandardMaterial({ 
    color: 0xeeeeee,
    map: wallTexture,
    normalMap: wallNormal,
    roughness: 0.5, // Adjust roughness
    metalness: 0 // Typically, walls aren't metallic
})


const wallMesh = new THREE.Mesh(wallGeo, wallMat)
wallMesh.position.z = -4.3
wallMesh.position.y = 2
wallMesh.receiveShadow = true
scene.add(wallMesh)

// -----------------


const light = new THREE.DirectionalLight(0xffffff, .2)
const lightHelper = new THREE.DirectionalLightHelper(light, 1, 0x00ff00)
light.position.set(0, 5, 10); // Adjust position to fit your scene
light.castShadow = true; // Enable casting shadows
light.shadow.mapSize.width = 512; // Optional: Adjust for shadow resolution
light.shadow.mapSize.height = 512; // Optional: Adjust for shadow resolution
light.shadow.camera.near = 0.5; // Optional: Adjust for shadow frustum near plane
light.shadow.camera.far = 500; // Optional: Adjust for shadow frustum far plane
light.position.y =  5
light.rotation.x = 45
scene.add(light)
scene.add(lightHelper)

const shadowCameraHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(shadowCameraHelper);


light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.camera.top = 10;
light.shadow.camera.bottom = -10;
light.shadow.camera.updateProjectionMatrix();

const ambientlight = new THREE.AmbientLight(0xffffff,.9)
// const ambientlightHelper = new THREE.DirectionalLightHelper(light, 1, 0x00ff00)

scene.add(ambientlight)
// scene.add(ambientlightHelper)