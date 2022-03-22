import * as THREE from 'three'
import Experience from '../Experience'

export default class Journal {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder =this.debug.ui.addFolder('Journal')
        }
        this.currentIntersect = null
       
        this.resource = this.resources.items.journalModel
        this.setModel()
        this.setRaycaster()

        
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.55, 0.55, 0.55)
        this.model.position.set(2.79, 1.95, 2.241)
        this.model.rotation.set(0.75, 6.313, -0.325)

        this.scene.add(this.model)

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

        if (this.debug.active) {
            this.debugFolder.add(this.model.rotation, 'x').min(-10).max(10).step(0.001).name('Journal Rotation X')
            this.debugFolder.add(this.model.rotation, 'y').min(-10).max(10).step(0.001).name('Journal Rotation Y')
            this.debugFolder.add(this.model.rotation, 'z').min(-10).max(10).step(0.001).name('Journal Rotation Z')

            this.debugFolder.add(this.model.position, 'x').min(-10).max(10).step(0.001).name('Journal Position X')
            this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.001).name('Journal Position Y')
            this.debugFolder.add(this.model.position, 'z').min(-10).max(10).step(0.001).name('Journal Position Z')

        }
    }


    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        

        // window.addEventListener('mousemove', (event) => {
        //     this.mouse.x = event.clientX / this.sizes.width * 2 - 1
        //     this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        // })

        // window.addEventListener('click', (e) => {
        //     let modal
            
        //     if (this.currentIntersect) {
        //         modal = document.getElementById('journal_wrapper')
        //         modal.style.display = 'flex'
        //         modal.style.opacity = 1
        //     }
        // })

        // window.addEventListener('touchstart', () => {
        //     let modal
        //     console.log('touch')
        //     if (this.currentIntersect) {
        //         modal = document.getElementById('journal_wrapper')
        //         modal.style.display = 'flex'
        //         modal.style.opacity = 1
        //     }
        // })
        
    }

    update() {
        this.model.rotation.y += (0.0125 * 0.5)
        this.model.rotation.x += (0.0125 * 0.5)

        this.camera.instance.lookAt(this.model.position)

        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObjects([ this.model ])
        if (intersects.length) {
            this.currentIntersect = intersects[0]
        } else {
            this.currentIntersect = null
        }
    }
}