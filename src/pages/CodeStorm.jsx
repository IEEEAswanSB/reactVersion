// import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { useState,useEffect } from 'react'
import '../styles.css'
import { Link } from "react-router-dom";
export function CodeStorm() {
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
            <div className="section--container flex justify-center items-center flex-col py-40 px-5 ">
              <motion.div
                key="title"
                initial={{ x: 100,y:10, opacity: 0 }}
                animate={{ x: 0,y:-80, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h1 className={`strokeme1 ${fill?'strokeme1-active':''}`}>codestorm programming competition!</h1>
              </motion.div>
              <style>{style}</style>
              <div className="lg:w-[600px] lg:pb-10">
                <motion.div
                style={{marginTop:'-60px '}}
                  key="p"
                  initial={{ y: 130, x:80, opacity: 0 }}
                  animate={{ y: 50,x:0, opacity: 1 }}
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
                  <div style={{textDecoration:'none',display:'flex',flexDirection:"row",gap:'0px'}}>
                    <Link to={'/form'}>
                    <button style={{ color:'white',filter: `brightness(0.85)`,background:'gray',fontWeight:'699',padding:'20px',fontSize:'20px !important' }}>
                      Enter the gate
                    </button>
                    </Link>
                    </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        
      </AnimatePresence>
    </div>
  )
}
