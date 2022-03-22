import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Mood Lighting')
        }
        
        this.setSunLight()
        this.setFog()
        this.setEnvironmentMap()
    }

    setSunLight() {
        this.ambientLight = new THREE.AmbientLight('#b9d5ff', .2)
        this.scene.add(this.ambientLight)

        this.moonLight = new THREE.DirectionalLight('#b9d5ff', 1)
        this.moonLight.castShadow = true
        this.moonLight.shadow.camera.far = 15
        this.moonLight.shadow.mapSize.set(1024, 1024)
        this.moonLight.shadow.normalBias = 0.05
        this.moonLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.moonLight)

        this.moodLightOne = new THREE.PointLight('#ff00ff', 10, 230)
        // this.moodLightOne.position.set(- 8.294, 2, 3)
        // this.moodLightOne.position.set(2.625, 2, 3)
        this.scene.add(this.moodLightOne)

        this.moodLightTwo = new THREE.PointLight('#0000ff', 10, 23)
        // this.moodLightTwo.position.set(5.842, 3, 2.239)
        this.scene.add(this.moodLightTwo)

        this.moodLightThree = new THREE.PointLight('#ff5500', 20, 10)
        // this.moodLightThree.position.set(7, 4, -2.75)
        this.scene.add(this.moodLightThree)

        if (this.debug.active) {
            console.log('itsa me')
            this.debugFolder.add(this.moodLightOne.position, 'x').min(-10).max(10).step(0.001).name('Light One X')
            this.debugFolder.add(this.moodLightOne.position, 'y').min(-10).max(10).step(0.001).name('Light One Y')
            this.debugFolder.add(this.moodLightOne.position, 'z').min(-10).max(10).step(0.001).name('Light One Z')

            this.debugFolder.add(this.moodLightTwo.position, 'x').min(-10).max(10).step(0.001).name('Light Two X')
            this.debugFolder.add(this.moodLightTwo.position, 'y').min(-10).max(10).step(0.001).name('Light Two Y')
            this.debugFolder.add(this.moodLightTwo.position, 'z').min(-10).max(10).step(0.001).name('Light Two Z')

            this.debugFolder.add(this.moodLightThree.position, 'x').min(-10).max(10).step(0.001).name('Light Three X')
            this.debugFolder.add(this.moodLightThree.position, 'y').min(-10).max(10).step(0.001).name('Light Three Y')
            this.debugFolder.add(this.moodLightThree.position, 'z').min(-10).max(10).step(0.001).name('Light Three Z')
        }
    }

    setFog() {
        const fog = new THREE.Fog('#262837', 1, 15)
        this.scene.fog = fog
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.setEnvironmentMap.updateMaterial()
    }

    update() {
        const moodLightOneAngle = this.time.elapsed * 0.00025
        this.moodLightOne.position.x = Math.cos(moodLightOneAngle) * 3
        this.moodLightOne.position.z = Math.sin(moodLightOneAngle) * 4
        // this.moodLightOne.position.y = Math.sin(this.time.elapsed * 3)

        const moodLightTwoAngle = this.time.elapsed * 0.00075
        this.moodLightTwo.position.x = Math.cos(moodLightTwoAngle) * 6
        this.moodLightTwo.position.z = Math.sin(moodLightTwoAngle) * 6
        // this.moodLightTwo.position.y = Math.sin(this.time.elapsed * .005)

        const moodLightThreeAngle = this.time.elapsed * 0.00025
        this.moodLightThree.position.x = Math.cos(moodLightThreeAngle) * 5
        this.moodLightThree.position.z = Math.sin(moodLightThreeAngle) * 5
        // this.moodLightThree.position.y = Math.sin(this.time.elapsed * .0005)
    }
}