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

        this.currentIntersect = null
       
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setRaycaster()

        
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
        this.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
        )
    }

    setTextures() {

    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: 0x0000ff
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 1.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        console.log(this.camera)
        

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () => {
            let modal
            if (this.currentIntersect) {
                modal = document.getElementById('journal_wrapper')
                modal.style.display = 'flex'
                modal.style.opacity = 1
            }
        })

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
        // console.log(this.raycaster)
        this.raycaster.setFromCamera(this.mouse, this.camera.instance)
        const intersects = this.raycaster.intersectObjects([ this.mesh ])
        if (intersects.length) {
            this.currentIntersect = intersects[0]
        } else {
            this.currentIntersect = null
        }
        // console.log('update')
    }
}