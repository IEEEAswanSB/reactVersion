import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { Text3D } from '@react-three/drei'
import { Gltf } from '@react-three/drei'
import { text } from '@fortawesome/fontawesome-svg-core'
import { Overlay } from './Overlay'
import '../styles.css'
const RandColor = () =>  {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  )
}
function Cube2(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }))
  return (
    <mesh castShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
function Cube({position,text,color,scale,mass}) {
  if(!mass)
  mass = 1
  const [ref] = useBox(() => ({ mass: mass, position }))
  return (
      <Text3D castShadow scale={scale} font={'helvetiker_regular.typeface.json'} ref={ref}>
      {text}
      <meshPhysicalMaterial color={color}></meshPhysicalMaterial>
      </Text3D>
  )
}


export default function Asor() {
  const [ready, set] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => set(true), 1000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <>
   
    </>
  )
}
