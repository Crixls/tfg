/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {a} from '@react-spring/three'
import * as THREE from 'three'; // Importa THREE


import brownScene from '../assets/sneaker2/brown_sneakers.glb';
import brownBumpTexture from '../assets/sneaker2/sneaker_brown_bump.png';
import brownDiffuseTexture from '../assets/sneaker2/sneaker_brown_diffuse.png';
import brownRoughnessTexture from '../assets/sneaker2/sneaker_brown_roughness.png';
import brownSpecularTexture from '../assets/sneaker2/sneaker_brown_spec.png';





 
function BrownSneakers(props) {
    const brownRef = useRef();
    const { nodes } = useGLTF(brownScene);
  
    // Crea los materiales
    // const redMaterial = new THREE.MeshStandardMaterial({ color: '#111111' }); // Color rojo
    // const blackMaterial = new THREE.MeshStandardMaterial({ color: '#800000' }); // Color negro

    const brownBumpTextureLoader = new THREE.TextureLoader().load(brownBumpTexture);
    const brownDiffuseTextureLoader = new THREE.TextureLoader().load(brownDiffuseTexture);
    const brownRoughnessTextureLoader = new THREE.TextureLoader().load(brownRoughnessTexture);
    const brownSpecularTextureLoader = new THREE.TextureLoader().load(brownSpecularTexture);

    const brownMaterial = new THREE.MeshStandardMaterial({
        map: brownDiffuseTextureLoader, // Textura de difusión
        bumpMap: brownBumpTextureLoader, // Textura de relieve
        roughnessMap: brownRoughnessTextureLoader, // Textura de rugosidad
        specularMap: brownSpecularTextureLoader // Textura especular
    });
  
    return (
      <a.group ref={brownRef} {...props} >
        {/* Zapatillas con material rojo */}
        <mesh
          receiveShadow
          geometry={nodes.rb1004_rb_r_0.geometry}
          material={brownMaterial} // Material rojo
          position={[-6.460196, -0.03196, 0.062389]}
          rotation={[-Math.PI / 2, 0, -1.679128]}
          scale={51.351021}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rb1000_rb_r_0.geometry}
          material={brownMaterial} // Material rojo
          position={[8.230521, -0.03196, 0.062389]}
          rotation={[-Math.PI / 2, 0, 0.466848]}
          scale={100}
        />
  
        {/* Contorno con material negro */}
        <mesh
          receiveShadow
          geometry={nodes.rb1004_rb_r_0.geometry} // Utiliza la misma geometría
          material={brownMaterial} // Material negro
          position={[-6.460196, -0.03196, 0.062389]}
          rotation={[-Math.PI / 2, 0, -1.679128]}
          scale={51.351021}
        />
        <mesh
          receiveShadow
          geometry={nodes.rb1000_rb_r_0.geometry} // Utiliza la misma geometría
          material={brownMaterial} // Material negro
          position={[8.230521, -0.03196, 0.062389]}
          rotation={[-Math.PI / 2, 0, 0.466848]}
          scale={100}
        />
      </a.group>
    )
}


export default BrownSneakers
