import CodeStormImg from "../assets/img/codestorm.jpg";
import { useState } from "react";
import { sendUsers } from "../../services/register.service.js";
import { useNavigate } from "react-router";

let global = {};
function Errmessage() {
  const [messsage, setMessage] = useState([null,null]);
  
  global.setMessage = setMessage;
  return (
    <>
      {messsage[0] === 'done' &&   (
        <div className="text-center mt-6 py-4 px-6 bg-slate-300 rounded-md">
          <p className="text-green-600 text-2xl font-bold ">{messsage[1]}</p>
        </div>
      )}
      {messsage[0] === 'error' &&   (
        <div className="text-center mt-6 py-4 px-6 bg-slate-300 rounded-md">
          <p className="text-red-600 text-2xl font-bold ">{messsage[1]}</p>
        </div>
      )}
    </>
  );
}

function CodeStormForm() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [favHandler, setFavHandler] = useState("Codeforces");
  const [phone, setPhone] = useState();
  const [handler, setHandler] = useState();
  const [id, setID] = useState();
  const [university, setUniversity] = useState();
  const [college, setCollege] = useState();
  const navigae = useNavigate();
  let sendNew = (e) => {
    // prevent defult

    if (!name || !email || !favHandler || !phone) {
      console.log("please check all fields");
    }
    const newApplicantData = {
      name: name,
      email: email,
      favHandler: favHandler,
      handler: handler,
      phone: phone,
      id: id,
      university: university,
      college: college,
    };
    // setDone(true)
    sendUsers(newApplicantData).then((res) => {
      // setDone(true)
      global.setMessage(['done','Registered Successfully!']);
      // global.setMessage(true);
      setTimeout(() => {
        navigae("/codestorm");
      }, 1500);
    }).catch((err) => {
      global.setMessage (['error',err['response']['data'][0]['message']]);
      // global.setMessage(false);
    });
  };
  return (
    <>
      <div className="codestorm-page  absolute top-0 left-0 w-screen h-screen overflow-hidden ">
        <div className="flex justify-center items-center h-screen overflow-hidden">
          <h1 className="text-slate-200 sm:text-2xl p-4   rounded-lg  border-2 border-slate-200 lg:p-12 lg:text-[100px]">FORM CLOSED!</h1>
          {/* <div className="w-11/12 h-full  md:w-2/4 md:h-2/4 my-10 ">
            <div className=" flex flex-col min-w-0 break-words w-fullshadow-lg rounded-lg bg-transparent border-2 border-slate-500">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl font-semibold text-slate-200">
                  CodeStorm
                </h4>
                <p className="leading-relaxed mt-1 mb-4 text-slate-200">
                </p>

                <div className=" w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-slate-200 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Full Name
                  </label>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Full Name"
                    v-model="payload.name"
                  />
                </div>
                <div className=" w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-slate-200 text-xs font-bold mb-2"
                    htmlFor="id"
                  >
                    National ID
                  </label>
                  <input
                    onChange={(e) => {
                      setID(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="National ID"
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    v-model="payload.email"
                  />
                </div>
                <div className=" w-full mb-3">
                  <label className="block uppercase text-slate-200 text-xs font-bold mb-2">
                    Phone
                  </label>
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Phone number"
                    v-model="payload.phone"
                  />
                </div>
                <div className=" w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-slate-200 text-xs font-bold mb-2"
                    htmlFor="university"
                  >
                    university
                  </label>
                  <input
                    onChange={(e) => {
                      setUniversity(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="University"
                    v-model="payload.name"
                  />
                </div>
                <div className=" w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-slate-200 text-xs font-bold mb-2"
                    htmlFor="college"
                  >
                    college
                  </label>
                  <input
                    onChange={(e) => {
                      setCollege(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="college"
                    v-model="payload.name"
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
                    onChange={(e) => {
                      setFavHandler(e.target.value);
                    }}
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
                </div>
                <div className=" w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-slate-200 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    your Handler username
                  </label>
                  <input
                    onChange={(e) => {
                      setHandler(e.target.value);
                    }}
                    type="text"
                    className="border-0 px-3 placeholder-codeStormClr text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="exp: @codeforces, @codewars"
                    v-model="payload.name"
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    onClick={sendNew}
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default CodeStormForm;
