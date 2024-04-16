/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'
// import * as THREE from 'three'; // Importa THREE

import nike from '../assets/sneaker1/air_jordan.glb';

function NikeSneakers(props) {
    const brownRef = useRef();
    const { nodes, materials } = useGLTF(nike)

    // Carga las texturas
   

    return (
        <a.group ref={brownRef} {...props} >
            {/* Zapatillas con material marrón */}
            <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.shoe}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={90}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.shoelace}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={90}
      />
        </a.group>
    )
}

export default NikeSneakers
