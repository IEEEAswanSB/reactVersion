import logo from "../../assets/img/logo.png";
import UEA from "../../assets/img/UEA-7.png";
import Abdelrhman from "../../assets/img/excomm/Abdelrhman.webp";
import abdallah from "../../assets/img/excomm/abdallah.webp";
import omar from "../../assets/img/excomm/omar.webp";
import olaa from "../../assets/img/excomm/olaa.webp";
import NTRA from "../../assets/img/NTRA.webp";
import vodafone from "../../assets/img/vodafone.webp";
import Valeo from "../../assets/img/Valeo.webp";
import ITI from "../../assets/img/ITI.webp";
import ITIDA from "../../assets/img/ITIDA.webp";
import TIEC from "../../assets/img/TIEC.webp";
import NTI from "../../assets/img/NTI.webp";
import Wuzzuf from "../../assets/img/Wuzzuf.webp";
import cemex from "../../assets/img/cemex.webp";
import Aghakhan from "../../assets/img/Aghakhan.webp";
import nvl from "../../assets/img/nvl.webp";
import tico from "../../assets/img/tico.webp";
import consulting from "../../assets/img/consulting.webp";
import ihub from "../../assets/img/ihub.webp";
import APEARC from "../../assets/img/APEARC.webp";

import PartnerLogo from "../../components/PartnerLogo";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import { Link } from "react-router-dom";

function Home() {
  const partners = [
    NTRA,
    vodafone,
    Valeo,
    ITI,
    ITIDA,
    TIEC,
    NTI,
    Wuzzuf,
    cemex,
    Aghakhan,
    nvl,
    tico,
    consulting,
    ihub,
    APEARC,
  ];

  return (
    <>
      <div>
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div className="absolute top-0 w-full h-full bg-center bg-cover bg-img">
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full px-4 ml-auto mr-auto text-center">
                  <h1 className="text-white font-semibold text-4xl">
                    IEEE Aswan Student Branch
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    The First IEEE Student Branch in Upper Egypt!
                  </p>
                  <p className="mt-1 text-xs text-blueGray-200">Founded 2010</p>
                </div>
              </div>
            </div>
          </div>

          <section className="pb-20 bg-blueGray-200 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-rocket"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Mission</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Foster technological innovation and excellence for the
                        benefit of humanity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Vision</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        We will be essential to the global technical community
                        and to technical professionals everywhere.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                        <i className="fas fa-gem"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Values</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Trust, Growth and nurturing, Global community building,
                        Partnership, Service to humanity, and Integrity in
                        action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center mt-24 mb-24">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-info text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Who are we?
                  </h3>
                  <p className="text-lg font-normal leading-relaxed mt-4 mb-4 text-blueGray-600">
                    IEEE Aswan Student Branch was founded in the academic year
                    (2010-2011), it is located at Aswan Faculty of Engineering
                    and serves all departments within the faculty. We believe
                    that our role is to create a better reality than the one we
                    have, defeat all obstacles and achieve a better tomorrow.
                    For the past 12 years, the branch has provided all students
                    with different technical sessions, soft skills, training,
                    inspiring events, and workshops.
                  </p>
                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="p-6 relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
                    <img
                      alt="..."
                      src={logo}
                      className="w-full align-middle rounded-t-lg main-logo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-36 pt-10 bg-[#6946ca] -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center mt-24">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="p-6 relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
                    <img
                      alt="..."
                      src={UEA}
                      style={{ filter: "brightness" }}
                      className="w-full align-middle rounded-t-lg main-logo"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="w-full md:w-5/12 text-white px-4 mr-auto ml-auto">
                  <div className="text-[#6946ca] p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-info text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    UAE 7
                  </h3>
                  <p className="text-lg font-normal leading-relaxed mt-4 mb-4 text-blueGray-300">
                    UEA is a conference that consists of a gallery for
                    projects from Upper Egypt along with several sessions about market, soft
                    and technical skills.
                  </p>
                  <Link
                    to={"/uea7"}
                    className="hover:bg-[#ff63a6] hover:text-white duration-300 font-bold text-[#6946ca] mt-8 w-40 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center bg-white"
                  >
                    Check it out
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 ">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">Meet Our Officers</h2>
                  <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                    The Executive Committee who is responsible for administering
                    our branch operations
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-5">
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="">
                    <img
                      height="120"
                      width="120"
                      alt="..."
                      src={abdallah}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      loading="lazy"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Abdullah Alshamly</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Chairman
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-social-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="mailto:ab01158128811@gmail.com"
                            target="_blank"
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-200 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://www.linkedin.com/in/abdallah-elshamly-19294422b/"
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-2/12 lg:mb-0 mb-12 px-4">
                  <div className="">
                    <img
                      height="120"
                      width="120"
                      alt="..."
                      src={Abdelrhman}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      loading="lazy"
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    />
                    <div className="pt-6 text-center">
                      <h5
                        className="text-xl font-bold 
                      whitespace-nowrap                      
                      "
                      >
                        Abdelrahman Ibrahem
                      </h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Vice-Chairman
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-social-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="mailto:abdelrahmanlatif04@gmail.com"
                            target="_blank"
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-200 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://www.linkedin.com/in/abdelrahmanlatif/"
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://github.com/abdelrahmanlatif04"
                            target="_blank"
                          >
                            <i className="fab fa-github-alt"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="">
                    <img
                      height="120"
                      width="120"
                      alt="..."
                      src={omar}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      loading="lazy"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Omar Amin</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Secretary
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-social-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a href="mailto:oamin0077@gmail.com" target="_blank">
                            <i className="fas fa-envelope"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-200 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://www.linkedin.com/in/omar-amin-6b1445261/"
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="">
                    <img
                      height="120"
                      width="120"
                      alt="..."
                      src={olaa}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      loading="lazy"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Olaa Qoutb</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        Treasurer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-social-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="mailto:olaaahmed750@gmail.com"
                            target="_blank"
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-200 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://www.linkedin.com/in/olaa-qoutb-10543426a/"
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </button>
                        <button
                          className="bg-social-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a
                            href="https://github.com/olaaqoutb"
                            target="_blank"
                          >
                            <i className="fab fa-github-alt"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 pt-20 relative bg-blueGray-200 mt-24">
            <div className="container mx-auto px-4 lg:py-8">
              <div className="w-full mx-auto lg:w-6/12 px-4 text-center">
                <h2 className="text-4xl font-semibold">
                  Our Previous Partners
                </h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  Alone we can do so little; together we can do so much
                </p>
              </div>
              <div className="flex flex-wrap justify-center">
                {partners.map((partner) => (
                  <PartnerLogo partnerImg={partner} key={partner} />
                ))}
              </div>
            </div>
          </section>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
