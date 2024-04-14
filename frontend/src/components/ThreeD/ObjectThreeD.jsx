import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ObjectThreeD(props) {

    const {carpeta,file}= props;
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls;

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 900);
      camera.position.z = 5;

      const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
      light.position.set(0, 1, 0);
      scene.add(light);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const fbxLoader = new FBXLoader();

      fbxLoader.load(`/src/assets/${carpeta}/${file}`, (object) => {
        object.scale.set(0.13, 0.13, 0.13); // Ajusta el tamaño como desees

        if(carpeta === "shoe2"){
            object.scale.set(0.19, 0.19, 0.19); // Ajusta el tamaño como desees

        }

        // Recorre todos los objetos del modelo cargado y ajusta el brillo del material
        object.traverse((child) => {
          if (child.isMesh) {
            // Cambia el color del material para aumentar el brillo
            child.material.color = new THREE.Color(1, 1, 1); // Color blanco
          }
        });

        scene.add(object);
        animate();
      });
    }

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    init();

    return () => {
      renderer.domElement.remove();
      controls.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '900px', height: '700px' }}></div>;
}

export default ObjectThreeD;
