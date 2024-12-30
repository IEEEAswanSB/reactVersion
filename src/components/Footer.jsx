import { FaHeart, FaReact } from 'react-icons/fa';
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full lg:w-8/12 px-4">
            <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
            <h5 className="text-lg my-2 text-blueGray-600">
              <i className="fas fa-home"></i> Aswan Faculty of Engineering
            </h5>
            <h5 className="text-lg my-2 text-blueGray-600">
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
              <a href="https://www.instagram.com/ieeeaswansb/" target="_blank">
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
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full px-4 mx-auto text-center flex flex-col justify-center items-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1 w-fit flex justify-items-center items-center gap-2">
              Made with
              <FaHeart size={20} color='#ff333a' className='animate-pulse' />{" "}
              &{" "}
              <FaReact size={20} color='61DBFB' className='react-logo' />
            </div>
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © {currentYear} | IEEE Aswan SB.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
