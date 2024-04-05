import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ObjectThreeD() {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls;

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdddddd);

      camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
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

      fbxLoader.load('/src/assets/shoe1/sketchfab_shoe.fbx', (object) => {
        object.scale.set(0.13, 0.13, 0.13); // Aquí ajusta el tamaño como desees

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

  return <div ref={containerRef} style={{ width: '800px', height: '600px' }}></div>;
}

export default ObjectThreeD;
