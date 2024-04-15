import * as THREE from 'three'

const scene = document.getElementById('scene').object3D
const box = document.getElementById('box').object3D
const sphere = document.getElementById('sphere').object3D
const cylinder = document.getElementById('cylinder').object3D

console.log(cylinder)


// Normalizing speed
let lastFrame = 0;
let count = 0;

function tick() {
    requestAnimationFrame(tick)
    box.rotation.y += DeltaTime() * .2

    // Adjust the increment value to control the animation speed
    count += Math.random() * .01; // Increment count by a smaller value to slow down the animation


    const sphereMat = sphere.children[0].material;
    // Change sphere color gradually
    const hue = (count / 5) % 1; // Change color every 5 seconds
    const color = new THREE.Color().setHSL(hue, 1, 0.5); // Adjust saturation and lightness as needed
    sphereMat.color = color;
 
    


    cylinder.rotation.x += .005
    cylinder.rotation.z += .005

}

tick()

function DeltaTime() {
    // Calculating Delta Time
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrame) / 1000
    lastFrame = currentTime;

    return deltaTime
}


function AddNewObject(object, material, location) {
    const newObject = object
    const newMaterial = material
    const mesh = new THREE.Mesh(newObject, newMaterial)
    mesh.position.set(location.x, location.y, location.x)
    scene.add(mesh)
    return mesh;
}