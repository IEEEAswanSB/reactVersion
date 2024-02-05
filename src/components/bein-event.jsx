
import { Environment, Float, Gltf, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Marquee from "react-fast-marquee";
import ReactLenis from "@studio-freight/react-lenis"
import SplitType from "split-type"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import AdditionalSection from "./additonalSection"
import { Loader } from "@react-three/drei"
const Bein_event = ()=>{
    const nav = useNavigate()
    let [update,setUpdate] = useState(false)
    let door = useRef()
    useEffect(()=>{
        // gsap.to('.main',{background:''})
        setTimeout(() => {
            setUpdate(true)
        }, 1000);
    },[])
   
    return(<>
    <ReactLenis root>
    <Suspense fallback={<Loader/>}>

    <div className="main overflow-x-hidden w-screen bg-[#00164B] relative ">
            <div className="w-screen h-screen absolute left-0 top-0 z-[1]">
                    <Control door={door} update={update} />
                    <Canvas style={{width:"100vw",height:'100vh'}}>
                            {/* <color attach={'background'} args={['#00164B']}/> */}
                            <Environment preset="city"/>
                            {/* <PerspectiveCamera makeDefault position={[-10,0,-5]}/> */}
                            <ambientLight/>
                            {/* <Sphere/> */}
                                <group><Model delay={1.2} position={[2,0,-6]}/></group>
                                <group><Model delay={0.9} position={[12,0,-5]}/></group>
                                <group><Model delay={0.9} position={[8,-6,-5]}/></group>
                                <group><Model delay={1.1} position={[-8,2,-3]}/></group>
                                <group><Model delay={1.7} position={[-10,-4,-7]}/></group>
                                <group><Model delay={1.7} position={[0,-7,-7]}/></group>
                                {/* <group><Model delay={1.25} position={[4,4,9]}/></group>
                                <group><Model delay={1.3} position={[0,0,-6]}/></group>
                                <group><Model delay={1.05} position={[8,-4,7]}/></group>
                            <group><Model delay={2} position={[1,-6,15]}/></group> */}
                            {/* <OrbitControls/> */}
                    </Canvas>
            </div>
            {/* <div className="flex w-full items-center justify-between px-[6vw] py-[3vh] md:px-[5vw]"> */}
                <div className="absolute left-[-20px] z-[5] top-2 w-48">
                     <img  src="/bein6logo.png" />
                </div>
                <a href="/Bein6/register">
                    <div  className="absolute cursor-pointer right-10 top-0 flex flex-row justify-center mt-[4.3rem]  p-1 items-center w-fit z-10 bg-[#E50695] h-fit">
                        <img className="w-10" src="/bein3.svg"/>
                        <div className="text-white text-xl h-full border-l-2 pl-1">Ticket</div>
                    </div>
                </a>
            {/* </div> */}
                <Marquee>
                <div className="bg-[#00164B] w-screen h-[30px] flex flex-row gap-10 overflow-hidden">
                        <span className="text-[#FFB0B0]">🎟️ Save $$$$$ on advance tickets! 🎟️</span>
                        <span className="text-[#FFB0B0]">🎟️ februry 11 - 15, 2024 🎟️</span>
                        <span className="text-[#FFB0B0] lg:block hidden">🎟️ Save $$$$$ on advance tickets! 🎟️</span>
                        <span className="text-[#FFB0B0] lg:block hidden">🎟️ februry 11 - 15, 2024 🎟️</span>
                        <span className="text-[#FFB0B0] lg:block hidden">🎟️ Save $$$$$ on advance tickets! 🎟️</span>
                </div>
                </Marquee>
            <div className="relative w-screen h-fit bg-transparent overflow-x-hidden bg-[#00164B]  ">
                <div className="fixed left-0 top-0 h-screen w-screen flex justify-center items-center z-[5]">
                         <img  className="mid-logo w-[20rem]  lg:w-[45rem] " src="/bein2.svg"/> 
                </div>  
                <div className="h-screen"></div>
                {/* <div className="hide-escape h-[100vh] bg-green-400"></div> */}
            </div>
    </div>
    <div className="relative hide-escape w-screen h-[200vh] bg-red-500 ">
            <div className="sticky h-[100vh] w-full top-0">
                <Canvas style={{width:"100vw",height:'100vh'}}>
                        <ambientLight intensity={3}/>
                        <Gltf ref={door} scale={0.5} position={[0,0,0]} src="/bein6_models/door2.glb"/>
                </Canvas>
            </div>
            <div className="section-1 h-[100vh] w-full"></div>
            <div className="section-2 h-[100vh] w-full"></div>
        </div>
        <div className="main-sections w-screen bg-red-500">
            <Section2 update={update}/>
            <Section3 update={update}/>
            {/* <Section4 update={update}/> */}
            {/* <AdditionalSection/> */}
            <Section4 update={update}/>
            <Section5/>
        </div>
        </Suspense>
    </ReactLenis>
    </>)
}
const Control = ({update,door})=>{
    useEffect(()=>{
        if(!door.current)
        return
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline()

    
    timeline.to(".mid-logo", {opacity:0,scale:0,color:'black', ease: "power1.inOut", scrollTrigger: {
        
            trigger: ".hide-escape",
            scrub: 1,
            
            start: "top bottom",
            end: "top top",

            }}) 

        timeline.to(door.current.position ,{z:10, ease: "power1.inOut", scrollTrigger: {
            
            trigger: ".section-1",
            scrub: 1,
            
            start: "top bottom",
            end: "top top",

        }})

        timeline.to(door.current.rotation ,{z:Math.PI, ease: "power1.inOut", scrollTrigger: {
            
            trigger: ".section-1",
            scrub: 1,
            
            start: "top bottom",
            end: "top top",

        }}) 
        timeline.to('.img1' ,{y:0, ease: "power1.inOut", scrollTrigger: {
            trigger: ".sec1",
            onEnter:()=>{
                // gsap.to('.img1 h1',{opacity:1,duration:0.5})
            },
            scrub: 1,
              start: "top bottom",
            end: "top top",
            // end: "top top",
        }})  
     
        timeline.to('.img2' ,{y:0, ease: "power2.inOut", scrollTrigger: {
            trigger: ".sec2",
            onEnter:()=>{
                // gsap.to('.img2 h1',{opacity:1,duration:0.5})
            },
            scrub: 1,
              start: "top bottom",
            end: "top top",
            // end: "top top",
        }})  

        timeline.to('.img3' ,{y:0, ease: "power1.inOut", scrollTrigger: {
            trigger: ".sec3",
            onScrubComplete:()=>{
                // gsap.to('.img3 h1',{opacity:1,duration:0.5})
            },
            scrub: 1,
              start: "top bottom",
            end: "top top",
            // end: "top top",
        }})  



        ScrollTrigger.create({
   
            trigger: '.sec2',
            // markers:true,
            start:"top 50%",
            end:"bottom 0%", 
          
            onEnter: () => {
              gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'orange'})
            },
            
            onLeaveBack: () => {
              gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'orange'})
            },
          
            
          })
          
          ScrollTrigger.create({
            
            trigger: '.sec1',
            // markers:true,
            start:"top 50%",
            end:"bottom 0%", 
          
            onEnter: () => {
              gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'gray'})
            },
            
            onLeaveBack: () => {
              gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'gray'})
            },
          
            
          })
        //   ScrollTrigger.create({
            
        //     trigger: '.sec3',
        //     // markers:true,
        //     start:"top 50%",
        //     end:"bottom 0%", 
          
        //     onEnter: () => {
        //       gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'yellow'})
        //     },
            
        //     onLeaveBack: () => {
        //       gsap.to('.main-sections', { duration: 1.0, backgroundColor: 'yellow'})
        //     },
          
            
        //   })
        // timeline.to('.main-sections' ,{background:'blue', ease: "power1.inOut", scrollTrigger: {
        //     trigger: ".sec3",
        //     scrub: 1,
        //      start: "top bottom",
        //     end: "top top",
        // }})  
        // timeline.to('.hide-escape' ,{background:"#FFB0B0", ease: "power1.inOut", scrollTrigger: {
            
        //     trigger: ".section-1",
        //     scrub: 1,
            
        //     start: "top bottom",
        //     end: "top top",

        // }}) 
        
    },[update,door.current])
    return(<>
    </>)
}

const Model = (props)=>{
  
    const model = useRef()
    const models_src = [
        '/bein6_models/bein_database.glb',
        "/bein6_models/bein_globe.glb",
        "/bein6_models/bein_pc.glb",
        "/bein6_models/bein_router.glb"
    ]
    const [currentModel,setCurrentModel] = useState(models_src[Math.floor(Math.random()*4)])
    let interval
    useEffect(()=>{
        // return
        clearInterval(interval)
         interval= setInterval(() => {
        if(model.current)
           gsap.to(model.current.scale,{x:0,y:0,z:0,duration:0.4}).then(()=>{
            setCurrentModel(models_src[Math.floor(Math.random()*4)])
            gsap.to(model.current.scale,{x:1,y:1,z:1,duration:1,ease: "elastic.out(1,0.3)"})
           })
        }, 4000*props.delay );
    },[])

    return(<>
    <Float 
    {...props}
    speed={4} 
    rotationIntensity={5} 
    floatIntensity={1}
    floatingRange={[0.4, 0.4]} 
    >
                <Gltf scale={1.5} ref={model} src={currentModel}/>
    </Float>
    </>)
}


const Section2 = ({update})=>{
    const model = useRef()
    useEffect(()=>{
        
        const timeline = gsap.timeline()
        // gsap.to( ".con",
        //     {
        //     background:'#D3D3D3',
        //     scrollTrigger: {
        //         trigger: ".reveal-type",
        //         scrub: true,
        //         end: "bottom bottom",
        //     },
            
        // });
        // timeline.to('.main-sections' ,{background:'yellow', ease: "power1.inOut", scrollTrigger: {
        //     trigger: ".reveal-type",
        //     scrub: 1,
        //     end: "top top ",
        // }})  
        const splitTypes = document.querySelectorAll('.reveal-type')
        const splitTypes1 = document.querySelectorAll('.reveal-type1')
        splitTypes1.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})
            gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: char,
                        start: 'top 70%',
                        end: 'top 0%',
                        scrub: true,
                        markers: false,
                        
                    },
                    scale:1.5,
                    rotation:20,
                    opacity:0,
                    stagger:0.2
            })
            });
        splitTypes.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})
            gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: char,
                        start: '5% 90%',
                        end: '5% 0%',
                        scrub: true,
                        markers: false,
                        
                    },
                    opacity:0.2,
                    stagger:0.1
            })
        })
        if(model.current)
        gsap.to(model.current.rotation ,{y:Math.PI*2, ease: "power1.inOut", scrollTrigger: {
            
            trigger: ".spliting",
            scrub: 1,
            
            // start: "top bottom",
            end: "bottom bottom",


        }})     
    },[update,model.current])
    return(<>
    <div class="con bg-transparent w-screen">
        <style>{style}</style>
            <section></section>
            <section class="reveal-type1">
                <p class="WONDERFUL text-[#c6d800]">WHAT IS BEIN CAMP?</p>
            </section>
            <section class="spliting h-[200vh] flex flex-col lg:flex-row  justify-between relative">
                <p class="reveal-type texto left-3 text-[2rem] text-center w-[90%] lg:w-[50%] lg:text-[3.2rem] z-[20]">
                    <span> Ignite</span> your future at the Be Informed camp (Be-In) in Aswan! This transformative 5-day boot camp is a golden opportunity for tech-savvy students.
                </p>
                <div className="h-[100vh]"></div>
                <div className="absolute right-0 top-0">
                <Canvas style={{width:"100vw",height:'200vh',zIndex:0}}>
                    <Environment preset="city"/>
                    <ambientLight/>
                    {/* <PerspectiveCamera position={[0,0,0]} makeDefault/> */}
                    {/* <OrbitControls/> */}
                    <Gltf ref={model} position={[!isMobile?1.5:0,0,0]} scale={1.3} src="/bein6_models/bein_router.glb"/>
                </Canvas>
                </div>
            </section>
        </div>
    </>)
}



const Section3 = ({update})=>{
    const model2 = useRef()
    useEffect(()=>{
        
        const timeline = gsap.timeline()
        // timeline.to('.section2' ,{background:'yellow', ease: "power1.inOut", scrollTrigger: {
        //     trigger: ".texto",
        //     scrub: 1,
        //     end: "top top ",
        // }})  

        const splitTypes = document.querySelectorAll('.reveal-type')
        const splitTypes1 = document.querySelectorAll('.reveal-type1')
        splitTypes1.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})
            gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: char,
                        start: 'top 70%',
                        end: 'top 0%',
                        scrub: true,
                        markers: false,
                        
                    },
                    scale:1.5,
                    rotation:20,
                    opacity:0,
                    stagger:0.2
            })
            });
        splitTypes.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})
            gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: char,
                        start: '5% 90%',
                        end: '5% 0%',
                        scrub: true,
                        markers: false,
                        
                    },
                    opacity:0.2,
                    stagger:0.1
            })
        })
        if(model2.current){
            console.log(model2.current,'d')
            gsap.to(model2.current.rotation ,{y:Math.PI*2, ease: "power1.inOut", scrollTrigger: {
                onUpdate:({progress})=>{
                    console.log(progress)
                },
                trigger: ".newOne",
                scrub: 1,
                
                // start: "top bottom",
                end: "bottom bottom",
    
    
            }})      
            timeline.to('.main-sections' ,{background:'#FFB703', ease: "power1.inOut", scrollTrigger: {
                trigger: ".mineo",
                scrub: 1,
                end: "top top ",
            }})    
            // timeline.to('.main-sections',{background:"yellow"}) 
        }
    },[update,model2])
    return(<>
    <div class="con section2 bg-transparent w-screen">
        <style>{style}</style>
            <section></section>
            <section class="reveal-type1 mineo">
                <p class="WONDERFUL text-blue-700">NEW, BEIN & WONDERFUL</p>
            </section>
            <section class="newOne spliting h-[200vh] flex flex-col lg:flex-row-reverse justify-between relative">
                <p class="reveal-type texto left-3 text-[2rem] text-center w-[90%] lg:w-[50%] lg:text-[3.2rem] z-[20]">
                    <span> With</span> a total of 25 hours packed with cutting-edge courses, led by top-notch instructors, you'll upgrade your skills and unlock the doors to the competitive job market. 
                </p>
                <div className="h-[100vh]"></div>
                <div className="absolute left-0 top-0">
                <Canvas style={{width:"100vw",height:'100vh'}}>
                    <Environment preset="city"/>
                    <ambientLight/>
                    {/* <PerspectiveCamera position={[0,0,0]} makeDefault/> */}
                    {/* <OrbitControls/> */}
                    <Gltf name="pc" rotation={[0,-Math.PI/2,0]} ref={model2} position={[!isMobile?-3:0,0,0]} scale={1.3} src="/bein6_models/bein_pc.glb"/>
                </Canvas>
                </div>
            </section>
        </div>
    </>)
}


const Section4 = ({update})=>{
//   useEffect(()=>{

        
//     },[update])
    return(<>
        <div className="h-fit w-screen bg-transparent relative">
                <div className="sticky top-0 z-[100] left-0 h-[130vh] lg:h-[100vh] w-screen flex flex-col gap-10 lg:gap-0 lg:flex-row justify-around items-center overflow-hidden">
                <a href="/Bein6/register">
                <div className="img1 relative w-80 h-80 translate-y-[100vh]">
                        <div className="  overflow-hidden h-80 w-80 ">
                            <img  className="" src="/inst1.jpg"/>
                        </div>
                            <div className="absolute left-0 top-0 h-full cursor-pointer w-full z-[100]  flex justify-center items-center">
                                <motion.h1
                                whileHover={{scale:1.2,opacity:1}}
                                transition={{ type: "spring", stiffness: 500 }}
                                className=" font-sans text-white font-extrabold text-[4rem] opacity-[1] text-center  ">Graphic design</motion.h1>
                            </div>
                     </div>
                    </a>
                <a href="/Bein6/register">

                    <div className="img2 relative w-80 h-80 translate-y-[100vh]">
                        <div className="  overflow-hidden h-80 w-80 ">
                            <img  className="" src="/inst2.jpg"/>
                        </div>
                            <div className="absolute left-0 top-0 h-full cursor-pointer w-full z-[100] flex justify-center items-center">
                                <motion.h1
                                // initial={{opacity:0}}
                                // whileInView={{opacity:0,transition:{delay:0.5}}}
                                whileHover={{scale:1.2,opacity:1}}
                                transition={{ type: "spring", stiffness: 500 }}
                                className=" font-sans text-white font-extrabold text-[4rem] opacity-[1] text-center  ">Data analysis</motion.h1>
                            </div>
                     </div>
                     </a>
                <a href="/Bein6/register">

                     <div className="img3 relative w-80 h-80 translate-y-[100vh]">
                        <div className="  overflow-hidden h-80 w-80 ">
                            <img  className="" src="/inst3.jpg"/>
                        </div>
                            <div className="absolute left-0 top-0 h-full cursor-pointer w-full z-[100] flex justify-center items-center">
                                <motion.h1
                                whileHover={{scale:1.2,opacity:1}}
                                transition={{ type: "spring", stiffness: 500 }}
                                className=" font-sans text-white font-extrabold text-[4rem] opacity-[1] text-center  ">Business development</motion.h1>
                            </div>
                     </div>
                     </a>
                </div>
                <div className="sec0 h-screen text-white text-6xl font-extrabold font-sans text-center">
                    Our instructors
                </div>
                <div className="sec1 h-screen"></div>
                <div className="sec2 h-screen"></div>
                <div className="sec3 h-screen"></div>
                <div className="sec4 h-screen"></div>
        </div>
    </>)
}

const Section5 = ()=>{

    return(<>
    <div className="mt-32 lg:mt-0 overflow-visible"></div>

        <Marquee>
                <motion.div whileHover={{scale:1.4}} className="bg-[#FFB703] w-screen h-[100px] flex flex-row justify-center items-center gap-10 overflow-hidden">
                        <img width={200} src="/bein6logo.png"/>
                        <span className="text-[white] text-4xl font-sans py-4 font-extrabold"> IEEE </span>
                        <span className="text-[white] text-4xl font-sans py-4 font-extrabold"> BEIN6 </span>
                        <img width={200} src="/bein6logo.png"/>
                        <span className="text-[white] text-4xl font-sans py-4 font-extrabold lg:block hidden"> Let it go </span>
                        <img width={200} src="/bein6logo.png"/>
                        {/* <span className="text-[white] text-2xl font-sans py-4 font-extrabold lg:block hidden"> februry 11 - 30, 2024 </span> */}
                        <span className="text-[white] text-4xl font-sans py-4 font-extrabold lg:block hidden"> 11 February </span>
                </motion.div>
        </Marquee>
        <Marquee speed={200} direction="left">
                <motion.div whileHover={{scale:1.4}} className="bg-[#50B984] w-screen h-[100px] flex flex-row justify-center items-center gap-10 overflow-hidden">
                        <img width={50} src="/iti-logo.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold"> IEEE </span>
                        <img width={200} src="/omh.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold"> BEIN6 </span>
                        <img width={200} src="/omh.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold"> GOLDEN  </span>
                        <img width={50} src="/iti-logo.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold lg:block hidden"> PARTNER </span>
                        {/* <img width={200} src="/omh.png"/> */}
                        {/* <span className="text-[yellow] text-2xl font-sans py-4 font-extrabold lg:block hidden"> februry 11 - 30, 2024 </span> */}
                        {/* <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold lg:block hidden"> 11 February </span> */}
                </motion.div>
        </Marquee>
        <Marquee speed={200} direction="right">
                <motion.div whileHover={{scale:1.4}} className="bg-blue-800 w-screen h-[100px] flex flex-row justify-center items-center gap-10 overflow-hidden">
                        <span className="text-[#C0C0C0] text-4xl font-sans py-4 font-extrabold"> IEEE </span>
                        <img width={150} src="/nti.png"/>
                        <span className="text-[#C0C0C0] text-4xl font-sans py-4 font-extrabold"> BEIN6 </span>
                        <img width={150} src="/nti.png"/>
                        <span className="text-[#C0C0C0] text-4xl font-sans py-4 font-extrabold lg:block hidden"> SILVER </span>
                        <img width={150} src="/nti.png"/>
                        <span className="text-[#C0C0C0] text-4xl font-sans py-4 font-extrabold lg:block hidden"> PARTNER </span>

                        {/* <span className="text-[#C0C0C0] text-2xl font-sans py-4 font-extrabold lg:block hidden"> februry 11 - 30, 2024 </span> */}
                </motion.div>
        </Marquee>
      <Marquee speed={100} direction="right">
                <motion.div whileHover={{scale:1.4}} className="bg-[orange] w-screen h-[100px] flex flex-row justify-center items-center gap-10 overflow-hidden">
                        <img width={130} src="/host.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold"> IEEE </span>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold"> BEIN6 </span>
                        <img width={130} src="/host.png"/>
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold lg:block hidden">HOST </span>
                        <img width={130} src="/host.png"/>
                        {/* <span className="text-[yellow] text-2xl font-sans py-4 font-extrabold lg:block hidden"> februry 11 - 30, 2024 </span> */}
                        <span className="text-[yellow] text-4xl font-sans py-4 font-extrabold lg:block hidden"> PARTNER </span>
                </motion.div>
        </Marquee>
        

    {/* </div> */}
    </>)
}
const style = `
.reveal-type1 {
    display: flex;
    align-items: center;
   
}
.WONDERFUL {
    place-content: center;
    // color:#c6d800;
    font-weight: bold;
    font-size: 12vw;
    line-height: 0.9;
    margin: auto;
    height: 100vh;
    max-width: 12ch;
    letter-spacing: -10px;
    align-self: center;
}
@media (min-width 768px){
    .WONDERFUL{
        font-size: 12vw;
    letter-spacing: -1px;

    }
}
.spliting {
    
    padding-bottom: 25vh;
    padding-left: 6vw;
    padding-right: 6vw;
    gap:4rem;
    
    
}
.spliting p {
    // width: 50%;
    // font-size: 4.2rem;
    color: white;
    font-weight: bold;
    // line-height: 4.2rem;
    // letter-spacing: 0.1px;
}
.spliting p span {
    font-size: 51px;
}`
export default Bein_event