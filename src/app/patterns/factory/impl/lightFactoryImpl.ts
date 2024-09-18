import { BaseFactory } from "../baseFactory";
import * as THREE from 'three';

export class LightFactoryImpl implements BaseFactory<THREE.Light> {
    
    public getNew(name: string): THREE.Light {
        const lights: { [key: string]: () => THREE.Light } = {
            point: () => new THREE.PointLight(0xffffff, 1, 100),
            spot: () => new THREE.SpotLight(0xffffff, 10, 100, 5),
            ambient: () => new THREE.AmbientLight(0xffffff, 1)
        }

        if(!(name in lights))
            throw new Error(`Unsupported light type: ${name}`);

        return lights[name]();
    }

}