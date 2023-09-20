import CodeStormImg from "../assets/img/codestorm.jpg";

function CodeStormForm() {
  return (
    <>
      <div className="h-screen w-screen codestorm flex justify-center items-start">
        <form action="" className="w-11/12 h-full  md:w-2/4 md:h-2/4 my-10 overflow-hidden">
          <div className=" flex flex-col min-w-0 break-words w-fullshadow-lg rounded-lg bg-transparent border-2 border-slate-500">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold text-slate-200">
                How can we help you?
              </h4>
              <p className="leading-relaxed mt-1 mb-4 text-slate-200">
                Complete this form and we will get back very soon
              </p>

              <div className=" w-full mb-3 mt-8">
                <label
                  className="block uppercase text-slate-200 text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Full Name"
                  v-model="payload.name"
                />
              </div>
              <div className=" w-full mb-3">
                <label
                  className="block uppercase text-slate-200 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="payload.email"
                />
              </div>
              <div className=" w-full mb-3 mt-8">
                <label
                  className="block uppercase text-slate-200 text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  choose your favourite Handler
                </label>
                <select
                  name="handler"
                  id="handler"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option value="Codeforces" selected>
                    Codeforces
                  </option>
                  <option value="CodeSignal">CodeSignal</option>
                  <option value="Codewars">Codewars</option>
                  <option value="Exercism">Exercism</option>
                  <option value="GeeksforGeeks">GeeksforGeeks</option>
                  <option value="HackerRank">HackerRank</option>
                  <option value="LeetCode">LeetCode</option>
                  <option value="Project Euler">Project Euler</option>
                  <option value="TopCoder">TopCoder</option>
                </select>
                {/* <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="exp: @codeforces, @codewars"
                  v-model="payload.name"
                /> */}
              </div>
              <div className=" w-full mb-3 mt-8">
                <label
                  className="block uppercase text-slate-200 text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  your Handler username
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="exp: @codeforces, @codewars"
                  v-model="payload.name"
                />
              </div>

              <div className=" w-full mb-3">
                <label className="block uppercase text-slate-200 text-xs font-bold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Phone number"
                  v-model="payload.phone"
                />
              </div>

              <div className=" w-full mb-3">
                <label
                  className="block uppercase text-slate-200 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  rows="4"
                  cols="80"
                  className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Type a message..."
                  v-model="payload.message"
                />
              </div>

              <div className="text-center mt-6">
                <button
                  v-show="step === 1 && !loading"
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CodeStormForm;
