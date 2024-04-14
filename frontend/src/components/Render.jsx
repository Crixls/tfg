import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import BrownSneakers from "../models/BrownSneakers";


function Render() {
  return (
    <section className="w-full h-screen relative">

        <Canvas 
            className="w-80 h-screen bg-transparent m-20"
            camera={{near:0.1,far:1000}}
        >
            <PresentationControls speed={1.5} global zoom={0.3} polar={[-0.1, Math.PI / 4]}>
            <Stage environment={'night'}>
                <BrownSneakers></BrownSneakers>
            </Stage>
            </PresentationControls>
        </Canvas>
    </section>
  );
}

export default Render;
