import CodeStormImg from "../../assets/img/codestorm.jpg";
import { useEffect, useState } from "react";
import { sendUsers } from "../../../../services/register.service.js";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { VerifyCodeStormService } from "../../../../services/register.service.js";

function VerifyCodeStorm(props) {
  let [msg, setMsg] = useState("");
  let [done, setDone] = useState(false);
  let [error, setError] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    if (!id) {
      setMsg("Invalid Link");
      setError(true);
      setDone(false);
      return;
    }

    VerifyCodeStormService(id)
      .then((res) => {
        console.log(res[0].message);
        setMsg(res[0].message);
        setError(false);
        setDone(true);
      })
      .catch((err) => {
        setMsg(err.response["data"][0]["message"]);
        setDone(false);
        setError(true);

        // console.log(err);

        //err.response['data'][0]['message']
      });
  }, [done, error]);
  return (
    <>
      <div className="codestorm-page  absolute top-0 left-0 w-screen h-screen overflow-hidden ">
        <div className="flex justify-center items-center h-screen overflow-hidden">
          {error && (
            <h1 className="text-slate-200 sm:text-2xl p-4 bg-red-900 rounded-lg  border-2 border-slate-200 ">
              {msg}
            </h1>
          )}
          {done && (
            <h1 className="text-slate-200 sm:text-2xl p-4 bg-green-900 rounded-lg  border-2 border-slate-200 ">
              {msg}
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default VerifyCodeStorm;
