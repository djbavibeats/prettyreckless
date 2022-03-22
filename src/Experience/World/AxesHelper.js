import * as THREE from 'three'
import Experience from '../Experience'

export default class AxesHelper {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setAxesHelper()
    }

    setAxesHelper() {
        this.axesHelper = new THREE.AxesHelper(10)
        this.scene.add(this.axesHelper)
    }
}