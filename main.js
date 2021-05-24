import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000)
const render = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

render.setPixelRatio( window.devicePixelRatio)
render.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geomerty = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color : '#0xFF6347'})
const torus = new THREE.Mesh(geomerty, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.lightHelper(pointLight)
const greedHelper = new THREE.greedHelper(200, 50)

scene.add(lightHelper, greedHelper)

const controls = new OrbitControls(camera, render.domElement)

function addStar(){
  const geomerty = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color : 0xffffff})
  const star = new THREE.Mesh(geomerty, material)

  const [x,y,z] = Array(3).fill.map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

function animate(){
  requestAnimationFrame( animate )
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()
  render.render(scene, camera)
}

animate()
