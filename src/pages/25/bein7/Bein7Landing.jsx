import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../../../components/bein7/Section";
import TextPressure from "../../../components/bein7/TextPressure";
import "./Bein7Landing.css";
import RotatingText from "../../../components/bein7/RotatingText";
import PixelCard from "../../../components/bein7/PixelCard";
import ieeeLogo from "../../../../public/logo-w.png";
import PixelTransition from "../../../components/bein7/PixelTransition";
import { MousePointerClick } from "lucide-react";
import flutterLogo from "../../../assets/bein7/flutter.webp";
//sponsers
import itiWhite from "../../../assets/img/itiWhite.png";
import host from "../../../assets/img/host.png";
import agha from "../../../assets/img/agha.webp";
import omhaWhite from "../../../assets/img/omhaWhite.png";
import NTI from "../../../assets/img/NTI.webp";

import engineers from "../../../assets/bein7/engineers.png";
import motionGraphics from "../../../assets/bein7/motion-graphics.png";
import solarCell from "../../../assets/bein7/solar-cell.png";
import SwiperComponent from "../../../components/bein7/SwiperComponent";
import TrueFocus from "../../../components/bein7/TrueFocus";
import FlowingMenu from "../../../components/bein7/FlowingMenu";
import Hyperspeed from "../../../components/bein7/Hyperspeed";
import SpotlightCard from "../../../components/bein7/SpotlightCard";
import SplashCursor from "../../../components/bein7/SplashCursor";

function Bein7Landing() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform the Y position based on scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const slideKeyframes = `
  @keyframes slideAnimation {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

  const courses = [
    {
      title: "Flutter",
      description: "Learn Flutter from scratch",
      image: flutterLogo,
    },
    {
      title: "PV (solar energy)",
      description: "Learn how to design and install PV energy",
      image: solarCell,
    },
    {
      title: "Motion Graphics",
      description: "Learn how to create motion graphics",
      image: motionGraphics,
    },
    {
      title: "Technical office civil engineering ",
      description: "Learn how to work in a technical office",
      image: engineers,
    },
  ];

  const sponsers = [
    {
      title: "Offical Partner",
      image: omhaWhite,
      className: "w-10/12 object-cover",
    },
    {
      title: "Host",
      image: host,
      className: "w-10/12 object-cover",
    },
    {
      title: "Golden",
      image: itiWhite,
      className: "w-5/12 object-cover",
    },
    {
      title: "Silver",
      image: NTI,
      className: "w-10/12 object-cover",
    },
  ];

  return (
    <>
      <style>{slideKeyframes}</style>
      <div className="w-screen min-h-screen bg-[#060606] flex flex-col items-center justify-center">
        <Section className="min-h-screen flex flex-col w-full items-center justify-center p-4 lg:px-10 lg:py-32">
          <TextPressure
            text="Bein 7"
            flex={false}
            stroke={true}
            alpha={false}
            italic={true}
            weight={false}
            width={true}
            textColor="#000"
            strokeColor="#fff"
          />
        </Section>

        <Section
          ref={containerRef}
          className="p-4 lg:p-10  flex flex-col lg:flex-row items-center lg:items-start justify-between min-h-[500px] xl:h-[700px] text-white relative lg:h-screen"
        >
          {/* <SplashCursor /> */}
          <motion.div
            className="flex lg:sticky top-[10%]  justify-center items-center gap-2 text-2xl md:text-5xl lg:text-5xl font-normal md:font-medium lg:font-bold w-full lg:w-1/2 mb-8 lg:mb-0"
            // style={{
            //   position: '',
            //   top: '10%',
            // }}
          >
            Bein
            <RotatingText
              texts={["Courses", "Talks", "Activites", "And More"]}
              mainClassName="w-fit px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-1 md:py-2 rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </motion.div>
          <div className="w-1/2">
            <div className="h-[400px] lg:h-[700px] overflow-y-auto">
              <PixelCard variant="cyan" className="w-full h-full">
                <img
                  src={ieeeLogo}
                  alt=""
                  className="absolute max-w-[150px] lg:max-w-[350px]"
                />
              </PixelCard>
            </div>
          </div>
        </Section>

        <Section className="min-h-screen flex flex-col items-center justify-center p-4 lg:px-10 lg:py-32">
          <TextPressure
            text="courses"
            flex={false}
            stroke={true}
            alpha={false}
            italic={true}
            weight={false}
            width={true}
            textColor="#000"
            strokeColor="#fff"
          />
        </Section>

        <Section className="p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-4 text-white min-h-screen">
          {courses.map((course, index) => (
            <div key={index} className="flex justify-center items-center">
              <PixelTransition
                className="w-full max-w-[300px] lg:w-[400px] lg:h-[400px]"
                secondContent={
                  <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-[#060606] p-2">
                    <img
                      src={course.image}
                      alt="flutter"
                      className="w-1/2 h-1/2 object-cover"
                    />
                    <p className="text-white text-2xl font-bold">
                      {course.title}
                    </p>
                    <span className="text-white text-lg font-medium text-center">
                      {course.description}
                    </span>
                  </div>
                }
                firstContent={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#111",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                      <MousePointerClick size={50} color="#fff" className="" />
                      <p className="text-white text-xl font-semibold">
                        Click me
                      </p>
                    </div>
                  </div>
                }
                gridSize={26}
                pixelColor="#fff"
                animationStepDuration={0.6}
                className="custom-pixel-card lg:w-[400px] lg:h-[400px]"
              />
            </div>
          ))}
        </Section>

        <Section className="p-4 lg:p-10 mt-20 flex flex-col gap-10 items-center justify-start min-h-[500px] lg:h-[700px] text-white relative mb-20 lg:mb-80">
          <span className="text-4xl  lg:text-6xl font-bold text-center">
            Last Bein
          </span>
          <div className="w-full max-w-[1000px]">
            <SwiperComponent />
          </div>
        </Section>
        <Section className="flex flex-col gap-2">
          <h1 className="col-span-1 lg:col-span-2 xl:col-span-4 text-white text-4xl lg:text-6xl font-bold text-center mb-8">
            Our Sponsors
          </h1>
          <Section className="p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-4  text-white min-h-screen">
            {sponsers.map((sponser, index) => (
              <div key={index} className="flex justify-center items-center">
                <PixelTransition
                  className="w-full max-w-[300px] lg:w-[400px] lg:h-[400px]"
                  secondContent={
                    <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-[#060606] p-2">
                      <img
                        src={sponser.image}
                        className={`${sponser.className} object-cover`}
                      />
                    </div>
                  }
                  firstContent={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#111",
                        flexDirection: "column",
                        position: "relative",
                      }}
                    >
                      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                        <MousePointerClick
                          size={50}
                          color="#fff"
                          className=""
                        />
                        <p className="text-white text-xl font-semibold">
                          {sponser.title}
                        </p>
                      </div>
                    </div>
                  }
                  gridSize={26}
                  pixelColor="#fff"
                  animationStepDuration={0.6}
                  className="custom-pixel-card lg:w-[400px] lg:h-[400px]"
                />
              </div>
            ))}
          </Section>
        </Section>

        <Section className="w-screen min-h-screen flex flex-col justify-start items-center p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-4 p-4 lg:p-10 text-white">
            {courses.map((course, index) => (
              <SpotlightCard
                key={index}
                spotlightColor="#67e8f9"
                className="h-[350px] lg:h-[400px]"
              >
                <div className="w-full h-full flex flex-col gap-4 items-center justify-between">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="">
                      <img width={200} src={course.image} alt={course.title} />
                    </div>
                    <p className="text-xl font-semibold">
                      {course.title} course
                    </p>
                  </div>
                  <button className="w-full bg-[#67e8f977] text-white p-2 rounded-lg">
                    Join
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
          {/* <div className='w-full h-1/2 flex justify-center items-end max-lg:hidden'>
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => { },
                onSlowDown: () => { },
                distortion: 'turbulentDistortion',
                length: 400,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 4,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 20,
                lightPairsPerRoadWay: 40,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [60, 80],
                movingCloserSpeed: [-120, -160],
                carLightsLength: [400 * 0.03, 400 * 0.2],
                carLightsRadius: [0.05, 0.14],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.8, 0.8],
                carFloorSeparation: [0, 5],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0xFFFFFF,
                  brokenLines: 0xFFFFFF,
                  leftCars: [0x67e8f9, 0x23D1DC, 0x2BD488],
                  rightCars: [0x03B3C3, 0x0E5EA5, 0x009EFF],
                  sticks: 0x03B3C3,
                }
              }}
            />
          </div> */}
        </Section>
      </div>
    </>
  );
}

export default Bein7Landing;
