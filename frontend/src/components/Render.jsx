import { Canvas } from "@react-three/fiber";
import {  Stage, PresentationControls } from "@react-three/drei";
import BrownSneakers from "../models/BrownSneakers";
import NikeSneakers from "../models/NikeSneakers";


function Render(props) {

  const {type} = props;

  return (
    <section style={{height:"60vh"}} className="w-full  relative">

        <Canvas 
            className="w-80 h-screen bg-transparent lg:m-20"
            camera={{near:0.1,far:1000}}
        >
            <PresentationControls speed={1.5} global zoom={0.3} polar={[-0.1, Math.PI / 4]}>
              {type === "nike"? 
                <Stage environment={'forest'}>
                  <NikeSneakers></NikeSneakers>
                </Stage>
              :
              <Stage environment={'forest'}>
                <BrownSneakers></BrownSneakers>
                </Stage>
              }
                
            </PresentationControls>
        </Canvas>
    </section>
  );
}

export default Render;
