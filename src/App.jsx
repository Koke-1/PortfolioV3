import { useState,useEffect } from 'react'
import {PerspectiveCamera, useGLTF} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import {animated,useSprings} from "@react-spring/three"
import Room from "./Room"
import "./CSS/CSS.css"
import Git from "./Assets/GitHub.png"
import Linked from "./Assets/LinkedIn.png"
import Email from "./Assets/Email.png"

function App() {
  const Villa = useGLTF("./Villa.glb")
  const [Cycle, setCycle] = useState(false)
  const positions = [[0, -10, -22.5], [-4.5,-20.5,-1.75]];
  const [springProps, setSpringProps] = useSprings(positions.length, () => ({
    position: [0, -120.5, -22.5]  ,
    delay:1000
  }));
 
  const animateToPosition = (i) => {
    setTimeout(() => {
      setSpringProps(index => ({
        position: positions[i],
        config: { mass: 1, tension: 120, friction: 30, damping: 10, precision: 0.0001 },
        onRest: () => {
          if (i < positions.length - 1) {
            animateToPosition(i + 1);
            if (i == 0) {
              setTimeout(()=>{
                setCycle(true)
              },2000)
            }
          }
        }
      }));
    }, 1000);
  }
  useEffect(() => {
  setTimeout(() => {
      animateToPosition(0)
    }, 1000); 
  }, [])


  return (
    <>
    {
      Cycle && <div className='Welcome'>
      <div className='Holder' >
       <div className='Text'>Click the posters to see my projects!</div>
       <div className='Buttons' >
       <button className='Git'   > <a href='https://github.com/Koke-1'  target='_blank'/> <img src={Git} alt="" /> </button>
       <button className='Linked' > <a href='https://www.linkedin.com/in/kokesanjuan/' target='_blank'/>  <img src={Linked} alt="" srcset="" /> </button>
       <button className='Email' > <a href='mailto:sanjuangeorge@gmail.com' target='_blank'/> <img src={Email} alt="" srcset="" /> </button>
      </div>
       
       
      </div>
      
    </div>
    }
    
     <Canvas style={{backgroundColor:"#87CEEB",height:"100vh",width:"100vw"}}>
      <animated.perspectiveCamera position={springProps[0].position} rotation={Cycle ? [0,4.25,0 ] : [0,3.765,0] }>
        {Cycle ? <Room/> : <primitive object={Villa.scene} /> }  
      </animated.perspectiveCamera>
      <ambientLight castShadow={true} />
      <pointLight castShadow={true} intensity={.1}/>
     </Canvas>
    </>
    
  )
}

export default App
