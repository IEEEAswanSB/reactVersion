// import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { useState,useEffect } from 'react'
import codestormLogo from "../assets/img/codeStormLogo2.png";
import itiWhite from "../assets/img/itiWhite.png";
import luxorIeeeLogo from "../assets/img/logo-luxor-ieee.png";
import PartnerLogo from '../components/PartnerLogo';
import '../styles.css'
import { Link } from "react-router-dom";
import { Countdown } from '../components/counterDown';
import { Popup } from '../components/popup';
import TypeIt from 'typeit-react';
export function CodeStorm() {
  const [instance, setInstance] = useState(null);
  let logos = [itiWhite,luxorIeeeLogo]
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  let [fill ,setFill] = useState(false)
  useEffect(()=>{

    setTimeout(() => {
        setFill(true)
    }, 3500);
  })

  let style = `
    .strokeme1 {
      font: 500 20px ;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 2px;
    }
    .strokeme1 {
      /* background: radial-gradient( rgb(129, 3, 3),#000000) left no-repeat, #d1d2de00 ; */
      background-size: 0% 100% !important;
      background-clip: text !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: #004B82 !important;
      transition: 1s ease-in-out !important;
      animation: fill 1s ease-in-out forwards !important;
    }
    
    .strokeme1-active {
      background-size: 100% 100% !important;
    }

  `
  return (
    <div className='codestorm-page' style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' ,zIndex:1000,'overflow':'scroll',overflowX:'hidden'}}>
      <AnimatePresence>
          <motion.section key="main" {...config}>
            <div className="section--container  flex justify-center items-center flex-col lg:pt-[1rem]  pt-[26rem] px-5 ">
              <motion.div
              className='lg:mt-64'
                key="title"
                initial={{ x: 100,y:10, opacity: 0 }}
                animate={{ x: 0,y:180, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                {/* < className={`strokeme1 ${fill?'strokeme1-active':''}`}>codestorm programming competition!</> */}
                <img width={350} height={350} src={codestormLogo} />
                      <motion.div  
                      initial={{ x: -100,y:-30, opacity: 0 ,zIndex:-1}}
                      animate={{ x: 280,y:-200, opacity: 1,zIndex:-1 }}
                      transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: .6}}>

                    </motion.div>
              </motion.div> 
              <style>{style}</style>
             <motion.div
                   initial={{ x: -100,y:10, opacity: 0 }}
                   animate={{ x: 0,y:100, opacity: 1 }}
                   transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}
             >
               <Countdown/>
             </motion.div>
              <div className="my-10 lg:w-[600px] lg:pb-10 pb-10 ">
                <motion.div
                className='border-2 border-slate-400 p-5 lg:p-10 rounded-lg'
                style={{marginTop:'-60px '}}
                  key="p"
                  initial={{ y: 130, x:80, opacity: 0 }}
                  animate={{ y: 200,x:0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}>
                  <p className='mb-5' style={{color:'white',lineHeight:'30px',letterSpacing:'2px',fontSize:'20px'}}>
                  CodeStorm is and individual contest that fosters to simulate one of the biggest competitive programming hackathons "IEEEXtreme".
                  In the journey of CodeStorm you can pass from CodeStorm scoreboard to IEEEXtreme scoreboard.There you will know what IEEEXtreme , test a demo and and win the IEEE membership, your ticket to participate in IEEEXtreme! 
                  </p>
                 
                  <div  style={{textDecoration:'none',display:'flex',flexDirection:"row",gap:'0px'}}>
                    <Link to={'/form'}>
                    <button style={{ color:'white',filter: `brightness(0.85)`,background:'gray',fontWeight:'699',padding:'20px',fontSize:'20px !important' }}>
                      Enter the gate
                    </button>
                    </Link>
                    </div>
                </motion.div>
              </div>
              <motion.h2
               initial={{ y: 130, x:80, opacity: 0 }}
               animate={{ y: 180,x:0, opacity: 1 }}
              className="text-4xl font-semibold text-white">
                    Our Partners
              </motion.h2>
              <motion.div 
                initial={{ y: 130, x:80, opacity: 0 }}
                  animate={{ y: 220,x:0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}
              className="flex flex-wrap items-center justify-center gap-10 pb-10 sm:flex-row">
                 <div style={{width:'200px',height:'200px'}} className='itiLogo gap-9 hover:bg-[#ffffff1a] transition-all duration-1000 border-2 border-slate-400 rounded-lg flex items-center flex-col justify-center '>
                   <img style={{width:'42%',marginTop:'25px'}} src={itiWhite} />
                   <span style={{marginTop:'-20px'}} className='text-white animate-bounce text-lg pb-[10px]'>HOST</span>
                   </div>
                 <div style={{width:'200px',height:'200px'}} className='border-2  hover:bg-[#ffffff1a] transition-all duration-1000 border-slate-400 flex items-center flex-col  justify-center rounded-lg text-center'> 
                 <img style={{width:'80%'}} src={luxorIeeeLogo} />
                 <span className='text-white animate-bounce text-lg '>TECH PARTNER</span>
                 </div>
            </motion.div>
            </div>
          </motion.section>
      </AnimatePresence>
    </div>
  )
}
