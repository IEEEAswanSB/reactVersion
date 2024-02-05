import { useRef, useEffect, useState } from "react";
import {
	motion,
	useMotionValue,
	useTransform,
	useScroll,
	useAnimation,
	useInView,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
// import EventSection from "./EventSection";
// import event1 from "./assets/event1.jpeg";
// import event2 from "./assets/event2.avif";
// import event3 from "./assets/event3.avif";
// import event4 from "./assets/event4.avif";
// import event5 from "./assets/event5.jpeg";
// import event6 from "./assets/event6.avif";

function AdditionalSection() {

	const events = [
		{
			date: "02/15",
			title: "Hello, World!",
			speaker: "python",
			eventImg: "",
		},
		{
			date: "02/16",
			title: "React science Street",
			speaker: "Chad The Man",
			eventImg: "",
		},
		{
			date: "02/17",
			title: "Vue lovers meet up",
			speaker: "Evan You",
			eventImg: "",
		},
		{
			date: "02/18",
			title: "Elctron is the future",
			speaker: "Github",
			eventImg: "",
		},
		{
			date: "02/19",
			title: "Next.js is awesome",
			speaker: "Vercel",
			eventImg: "",
		},
		{
			date: "02/20",
			title: "Azure is the best",
			speaker: "Amazon Enjoyer PRO",
			eventImg: "",
		},
	];

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			"#container",
			{
				backgroundColor: "#5406E2",
			},
			{
				scrollTrigger: {
					trigger: ".reveal-type",
					scrub: true,
					end: "bottom bottom",
				},
				backgroundColor: "#002060",
			}
		);
	}, []);

	const lenis = new Lenis();

	lenis.on("scroll", (e) => {
		console.log(e);
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		let splited = new SplitType(".firstSplit", { type: "chars" });
		let splited2 = new SplitType(".secondSplit", { type: "chars" });
		let chars = splited.chars;
		let chars2 = splited2.chars;

		gsap.fromTo(
			chars,
			{ rotation: 5, opacity: 0, scale: 1.2, y: -2 },
			{
				rotation: 0,
				opacity: 1,
				scale: 1,
				y: 0,
				stagger: 0.05,
				scrollTrigger: {
					trigger: chars,
					start: "top center",
					end: "bottom center",
					scrub: 5,
				},
				onComplete: () => {
					gsap.fromTo(
						chars2,
						{ rotation: 5, opacity: 0, scale: 1.5, y: -2, delay: 0.2 },
						{
							rotation: 0,
							opacity: 1,
							scale: 1,
							y: 0,
							stagger: 0.05,
							scrollTrigger: {
								trigger: chars[3],
								start: "top center",
								end: "bottom center",
								scrub: 5,
							},
						}
					);
				},
			}
		);
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		let splited = new SplitType(".thirdSplit", { type: "chars, lines" });
		let chars = splited.chars;

		gsap.from(chars, {
			scrollTrigger: {
				trigger: chars,
				start: "5% 90%",
				end: "5% 0%",
				scrub: true,
				markers: false,
			},
			opacity: 0.6,
			stagger: 0.05,
		});
	}, []);

	return (
		<>
        <div className="h-screen w-screen">
				<div className=" ml-20 w-full flex flex-col justify-center items-start gap-10 self-start">
					{events.map( (event, index) => (
						<EventSection event={event} index={index} key={index}  />
					))}
				</div>
			</div>
		</>
	);
}




function EventSection({event, index}) {

	const shakeAnimation = {
		x: [0, -10, 10, -10, 10, 0],
		transition: { duration: 0.5, ease: [0.36, 0.07, 0.19, 0.97] },
	};

	const [showCursorImg, setShowCursorImg] = useState(null);

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
		scale: 0.5
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
}

const ref = useRef(null);
const { scrollYProgress } = useScroll({
	target: ref,
	offset: ["start start", "start start"]
});


	return (
		<div
			ref={ref}
			className=""
		>
				<motion.div
				
					// whileHover={{ scale: 1.05, ...shakeAnimation, zIndex: 999999 }}
					variants={fadeInAnimationVariants}
					initial="initial"
					whileInView="animate"
					onMouseEnter={() => setShowCursorImg(index + 1)}
					onMouseLeave={() => setShowCursorImg(null)}
					style={{ position: "relative", zIndex: 9999999,pathLength: scrollYProgress }}
					className="w-full flex justify-center lg:justify-start items-center gap-4 text-[4vw] font-bold justify-self-start cursor-default leading-none"
				>
					<h1 className="text-[#E50695] leading-none">{event.date}</h1>
					<p className="text-blue-600 flex just items-center gap-1">
						<span className="mr-4">{event.title}</span>
						<span className="text-white text-[2.75vw] leading-none">
							{event.speaker}
						</span>
					</p>
					{/* {showCursorImg === index + 1 && (
						<CursorImg eventImg={event.eventImg} />
					)} */}
				</motion.div>
		</div>
	);
}

const CursorImg = ({ eventImg }) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springConfig = { damping: 30, stiffness: 500 };

	useEffect(() => {
		const updatePosition = (e) => {
			const rect = e.target.getBoundingClientRect();
			x.set(e.clientX - rect.left - 850);
			y.set(e.clientY - rect.top - 200);
		};

		window.addEventListener("mousemove", updatePosition);

		return () => {
			window.removeEventListener("mousemove", updatePosition);
		};
	}, [x, y]);

	return (
		<motion.img
			src={eventImg}
			style={{
				translateX: useTransform(x, (value) => value, springConfig),
				translateY: useTransform(y, (value) => value, springConfig),
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: 100,
			}}
			className="pointer-events-none w-[400px] h-[400px] bg-white"
		/>
	);
};

export default AdditionalSection;