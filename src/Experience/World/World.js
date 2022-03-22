import * as THREE from 'three'

import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import AxesHelper from './AxesHelper.js'
import GridHelper from './GridHelper.js'
import Journal from './Journal.js'

export default class World {
    constructor() {
        this.experience = new Experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        if (this.debug.active) {
            console.log('debug active')
        }

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            if (this.debug.active) {
                this.axesHelper = new AxesHelper()
                this.gridHelper = new GridHelper()
            }
            this.floor = new Floor()
            this.journal = new Journal()
            this.environment = new Environment()
        })
    }

    update() {
        if (this.journal) {
            this.journal.update()
            this.environment.update()
        }
    }
}