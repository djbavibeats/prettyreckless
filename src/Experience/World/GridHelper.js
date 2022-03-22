import * as THREE from 'three'
import Experience from '../Experience'

export default class GridHelper {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGridHelper()
    }

    setGridHelper() {
        this.gridHelper = new THREE.GridHelper(20)
        this.scene.add(this.gridHelper)
    }
}