/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import UEALogo from "../../assets/img/UEA-7.png";
function UEA7() {
  const organizers = [
    { src: "./aswuni.png", class: "text-xl" },
    { src: "./download.webp", class: "text-xl" },
    { src: "./logo-w.png", class: "text-2xl" },
  ];

  const sponsors = [
    { src: "./EG-CERT.png", class: "text-xl" },
    { src: "./cyber-security-women.jpg", class: "text-xl" },
    { src: "./NVL-logo-white.svg", class: "text-xl" },
  ];

  const strategic_partners = [{ src: "./aswuni.png", class: "text-xl" }];

  const competitions = [
    // {
    //   imgSrc: "./hackathon.png",
    //   title: "Problem Solving",
    //   status: "Coming Soon..",
    // },
    // {
    //   imgSrc: "./capture-the-flag.png",
    //   title: "CTF",
    //   status: "Coming Soon..",
    // },

    {
      imgSrc: "./grad.webp",
      title: "Graduation Projects",
      rule: "Must be 2025 graduate",
      rulebook: "./test.pdf",
      // prizes: [
      //   { imgSrc: './gold.png', amount: '10,000EGP' },
      //   { imgSrc: './silver.png', amount: '6,000EGP' },
      //   { imgSrc: './bronze.png', amount: '3,000EGP' },
      // ],
      form: "https://forms.gle/EvHxzkUweMQ7sPJY8",
    },
    {
      imgSrc: "./pre.webp",
      title: "Pre-Graduation Projects",
      rule: "Must be 2026+ graduate",
      form: "https://forms.gle/1uSiWxcuMQatVmtt6",
      rulebook: "./test.pdf",
    },
    {
      imgSrc: "./school.webp",
      title: "School Projects",
      form: "https://forms.gle/cRDAT1ZiHxKAtwRP9",
      rule: "Must be in the school stage.",
      rulebook: "./test.pdf",
    },
    // {
    //   imgSrc: './startups.webp',
    //   title: 'Startups Contest',
    //   status: 'Coming Soon..',
    // },
    // {
    //   imgSrc: './green.webp',
    //   title: 'Green Energy Hackathon',
    //   status: 'Coming Soon..',
    // },
    // {
    //   imgSrc: './forum.png',
    //   title: 'Job Fair',
    //   prizes: [],
    //   status: 'Coming Soon..',
    // },

    {
      imgSrc: "./arc.webp",
      title: "Robotics Competition",
      form: "https://forms.gle/PVxNHYwaDm5pFjsJ6",
      rulebook: "./arc.pdf",
    },
    {
      imgSrc: "./bridge.webp",
      title: "Spaghetti Bridge",
      form: "https://forms.gle/7PX8QZnYNSCpQ2Cn8",
      rulebook: "./spaghetti.pdf",
    },
    {
      imgSrc: "./tech.webp",
      title: "Technical Projects",
      form: "https://forms.gle/LkerVu1MnGDQdh329",
      rulebook: "./test.pdf",
      rule: "Must be in the technical school.",
    },
  ];

  return (
    <>
      <div className="main">
        <section className="py-10 ">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="px-4 mx-auto">
                <div className="flex flex-col min-w-0 mx-auto break-words w-full mb-6">
                  <img
                    alt="..."
                    src={UEALogo}
                    className="w-full md:w-5/12 mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full text-white px-4 text-center mx-auto">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Upper Egypt in Action 7<sup>th</sup> edition
                </h3>
                <h3 className="text-xl my-3 font-semibold leading-normal flex justify-center items-center gap-2">
                  The Convergence of AI, Cybersecurity, and Entrepreneurship:
                  Impact on Energy, Food, and Water Nexus
                </h3>
                <h3 className="text-xl mb-2 font-semibold leading-normal flex justify-center items-center gap-2">
                  <i className="fas fa-calendar-alt"></i>
                  10 Apr 2025
                </h3>
                <h3 className="text-xl mb-2 font-semibold leading-normal flex justify-center items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  {/* <a href="https://goo.gl/maps/EdTeAhhrzhBwPJZw9" target="_blank"> */}
                  Aswan
                  {/* </a> */}
                </h3>
                <p className="text-lg w-full md:w-6/12 text-center font-light leading-relaxed my-4 mx-auto">
                  UEA is a conference that consists of a gallery for projects
                  from Upper Egypt along with several sessions about market,
                  soft and technical skills.
                </p>
              </div>
            </div>

            <CountdownTimer
              target={"2025-04-10T00:00:00"}
              message={"Time Until The Event"}
            />

            <h3 className="text-5xl mt-10 mb-5 font-semibold leading-normal text-center text-white">
              Organizers
            </h3>
            <section className="flex flex-wrap justify-center lg:items-end items-center pb-12">
              {organizers.map((sponsor, index) => (
                <div
                  key={index}
                  className="w-full container sm:w-6/12 md:w-4/12 lg:w-3/12 p-4 lg:mb-0 mb-12 px-4 text-center hover:bg-white/40 transition cursor-pointer rounded-lg"
                >
                  <div className="px-6 pb-2">
                    <div className="flex justify-center items-center">
                      <img
                        alt="..."
                        src={sponsor.src}
                        className="p-2"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h5 className={`${sponsor.class} text-black font-bold`}>
                        {sponsor.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <h3 className="text-5xl mt-10 mb-5 font-semibold leading-normal text-center text-white">
              Strategic partner
            </h3>
            <section className="flex flex-wrap justify-center lg:items-end items-center pb-12">
              <div className="w-full container sm:w-6/12 md:w-4/12 lg:w-3/12 p-4 lg:mb-0 mb-12 px-4 text-center hover:bg-white/40 transition cursor-pointer rounded-lg">
                <div className="px-6 pb-">
                  <div className="flex justify-center items-center">
                    <img
                      alt="..."
                      src={"./ntra.webp"}
                      className="p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2 text-center"></div>
                </div>
              </div>
            </section>

            <h3 className="text-5xl mt-10 mb-5 font-semibold leading-normal text-center text-white">
              Sponsors
            </h3>
            <section className="flex flex-wrap justify-center lg:items-end items-center pb-12">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="w-full container sm:w-6/12 md:w-4/12 lg:w-3/12 p-4 lg:mb-0 mb-12 px-4 text-center hover:bg-white/40 transition cursor-pointer rounded-lg"
                >
                  <div className="px-6 pb-2 flex justify-center items-center">
                    <div className="flex justify-center items-center w-52 h-52 text-center">
                      <img
                        alt="..."
                        src={sponsor.src}
                        className="p-2 rounded-xl overflow-hidden"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 
            <div className="container mx-auto px-4 pt-18 pb-10">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-5xl text-center font-bold text-social-4 mx-auto mb-7">
                    Submission Dates
                  </h2>
                  <div className="flex flex-col justify-center items-center gap-4 mb-7">
                    <p className="text-lg leading-relaxed text-white">
                      Submission opening: 1st February
                    </p>
                    <CountdownTimer
                      target={"2025-02-01T00:00:00"}
                      message={"Until Submition Opening"}
                      circle={"3rem"}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg leading-relaxed text-white">
                      Submission closing: 20th February
                    </p>
                    <CountdownTimer
                      target={"2025-02-20T00:00:00"}
                      message={"Until Submition Closing"}
                      circle={"3rem"}
                    />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="container mx-auto px-4 pt-18 pb-10">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-5xl text-center font-bold text-social-4 mx-auto my-4">
                    Competitions
                  </h2>
                  <p className="text-xl leading-relaxed my-4 text-white">
                    Enjoy free accommodation for 2 members per team!
                  </p>
                </div>
              </div>
              <section className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  py-12 items-center">
                {competitions.map((competition, index) => (
                  <div
                    key={index}
                    className="w-full lg:mb-0 mb-12 text-center relative text-white hover:bg-white/40 transition cursor-pointer rounded-lg border border-white/30"
                  >
                    <div className="p-5 overflow-hidden relative">
                      <a
                        href={competition.form}
                        className="h-40 flex py-9 items-center"
                      >
                        <img
                          className="h-36 mx-auto"
                          src={competition.imgSrc}
                          alt="card 1"
                        />
                      </a>
                      <div className="px-4 py-2">
                        <a
                          href={competition.form}
                          className="text-2xl  mb-3 truncate font-bold"
                        >
                          {competition.title}
                        </a>
                        <div className="text-center mt-2">
                          <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSe3Z430bgY1KsES8VyP-jH2RWOfXBUPN46r0AlslFkloZCTww/viewform"
                            target="_blank"
                            className="py-2 text-base tracking-wide text-white font-bold hover:underline"
                          >
                            Register now
                          </a>
                        </div>
                        {competition.rulebook && (
                          <div className="text-center mt-2">
                            <a
                              href={competition.rulebook}
                              target="_blank"
                              className="py-2 text-sm text-social-4 font-bold uppercase hover:underline"
                            >
                              Check Rule book
                            </a>
                          </div>
                        )}
                        {competition.rule && (
                          <div className="text-center mt-2">
                            <p className="py-2 text-sm text- font-bold absolute w-full text-center bg-back left-0 bottom-0 text-white/70">
                              {competition.rule}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-8 text-white">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-8/12 px-4">
              <h4 className="text-3xl font-semibold">
                Let&#39;s keep in touch!
              </h4>
              <h5 className="text-lg my-2">
                <i className="fas fa-home"></i> Aswan Faculty of Engineering
              </h5>
              <h5 className="text-lg my-2">
                <i className="fas fa-envelope"></i>{" "}
                <a href="mailto:sb.aswan@ieee.org">sb.aswan@ieee.org</a>
              </h5>
              <div className="mt-6 lg:mb-0 mb-6"></div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <h4 className="text-3xl font-semibold">Follow Us</h4>
              <div className="mt-6 lg:mb-0 mb-6">
                <a href="https://www.facebook.com/IEEEAswanSB" target="_blank">
                  <button
                    className="bg-social-100 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                </a>
                <a
                  href="https://www.linkedin.com/company/ieeeaswansb"
                  target="_blank"
                >
                  <button
                    className="bg-social-200 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </a>
                <a href="https://twitter.com/IEEEAswanSB" target="_blank">
                  <button
                    className="bg-social-300 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </a>
                <a
                  href="https://www.instagram.com/ieeeaswansb/"
                  target="_blank"
                >
                  <button
                    className="bg-gradient-to-r from-social-1 via-social-2 to-social-3 text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-instagram"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-white" />
        </div>
      </div>
    </>
  );
}

const CountdownTimer = ({ target, message, circle }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(target);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="border border-white bg-black/20 backdrop-blur-sm rounded-xl p-8">
        <h2
          className={`font-bold text-white mb-8 text-center ${
            circle ? "text-xl" : "text-3xl"
          }`}
        >
          {message}
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-white">
          <div className="flex flex-col items-center">
            <div
              style={
                circle
                  ? { width: circle, height: circle }
                  : { width: "6rem", height: "6rem" }
              }
              className="rounded-full border-2 border-white flex items-center justify-center bg-black/30 mb-3"
            >
              <div className={`font-bold ${circle ? "text-lg" : "text-4xl"}`}>
                {timeLeft.days}
              </div>
            </div>
            <div className="text-lg font-medium">Days</div>
          </div>
          <div className="flex flex-col items-center">
            <div
              style={
                circle
                  ? { width: circle, height: circle }
                  : { width: "6rem", height: "6rem" }
              }
              className="rounded-full border-2 border-white flex items-center justify-center bg-black/30 mb-3"
            >
              <div className={`font-bold ${circle ? "text-lg" : "text-4xl"}`}>
                {timeLeft.hours}
              </div>
            </div>
            <div className="text-lg font-medium">Hours</div>
          </div>
          <div className="flex flex-col items-center">
            <div
              style={
                circle
                  ? { width: circle, height: circle }
                  : { width: "6rem", height: "6rem" }
              }
              className="rounded-full border-2 border-white flex items-center justify-center bg-black/30 mb-3"
            >
              <div className={`font-bold ${circle ? "text-lg" : "text-4xl"}`}>
                {timeLeft.minutes}
              </div>
            </div>
            <div className="text-lg font-medium">Minutes</div>
          </div>
          <div className="flex flex-col items-center">
            <div
              style={
                circle
                  ? { width: circle, height: circle }
                  : { width: "6rem", height: "6rem" }
              }
              className="rounded-full border-2 border-white flex items-center justify-center bg-black/30 mb-3"
            >
              <div className={`font-bold ${circle ? "text-lg" : "text-4xl"}`}>
                {timeLeft.seconds}
              </div>
            </div>
            <div className="text-lg font-medium">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UEA7;
