import { BaseFactory } from "../baseFactory";
import * as THREE from 'three';

export class GeometryFactoryImpl implements BaseFactory<THREE.BufferGeometry> {

    public getNew(name: string): THREE.BufferGeometry {
        const geometries: { [key: string]: () => THREE.BufferGeometry } = {
            box: () => new THREE.BoxGeometry(1, 1, 1),
            sphere: () => new THREE.SphereGeometry(.5, 15, 15),
            capsule: () => new THREE.CapsuleGeometry(.5, .5, 4, 8),
            cone: () => new THREE.ConeGeometry(.5, 1, 32),
            cylinder: () => new THREE.CylinderGeometry(.5, .5, 1, 32),
            torus: () => new THREE.TorusGeometry(.5, .2, 16, 100)
        }

        if(!(name in geometries))
            throw new Error(`Unsupported geometry type: ${name}`);

        return geometries[name]();
    }

}