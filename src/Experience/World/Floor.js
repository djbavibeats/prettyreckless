import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(20, 20)
        this.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
        )
    }

    setTextures() {
        this.textures = {}

        this.textures.color = this.resources.items.floorColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.floorNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping

        this.textures.ambientOcclusion = this.resources.items.floorAmbientOcclusionTexture
        this.textures.ambientOcclusion.repeat.set(1.5, 1.5)
        this.textures.ambientOcclusion.wrapS = THREE.RepeatWrapping
        this.textures.ambientOcclusion.wrapT = THREE.RepeatWrapping

        this.textures.displacement = this.resources.items.floorDisplacementTexture
        this.textures.displacement.repeat.set(1.5, 1.5)
        this.textures.displacement.wrapS = THREE.RepeatWrapping
        this.textures.displacement.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
            aoMap: this.textures.ambientOcclusion,
            displacementMap: this.textures.displacement
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}