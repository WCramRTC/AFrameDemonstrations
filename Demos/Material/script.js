import * as THREE from './node_modules/three/src/Three.js'


const scene = document.getElementById('scene').object3D
const textureLoader = new THREE.TextureLoader();
const buddahTexture = textureLoader.load('images/Edit.png')
const buddahNormal = textureLoader.load('images/BuddaNormal.png')

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
planeMesh.position.z = -5
planeMesh.position.y = 2
scene.add(planeMesh)

const light = new THREE.DirectionalLight(0xffffff, 1,)
const lightHelper = new THREE.DirectionalLightHelper(light, 1, 0x00ff00)
light.position.y =  5
light.rotation.x = 45
scene.add(light)
scene.add(lightHelper)

const ambientlight = new THREE.AmbientLight(0xffffff,.9)
const ambientlightHelper = new THREE.DirectionalLightHelper(light, 1, 0x00ff00)

scene.add(ambientlight)
scene.add(ambientlightHelper)