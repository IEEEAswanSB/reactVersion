import CodeStormImg from "../../assets/img/codestorm.jpg";
import { useState } from "react";
import { sendUsers } from "../../../services/register.service";
import { useNavigate } from "react-router";
import {
  ExportCodeStormTicket,
  validateCertificate,
  ExtractPDF,
} from "../../../services/register.service";
let global = {};
function Errmessage() {
  const [messsage, setMessage] = useState([null, null]);

  global.setMessage = setMessage;
  return (
    <>
      {messsage[0] === "done" && (
        <div
          style={{ position: "absolute", left: "0", top: "20%" }}
          className=" text-center mt-6 py-4 px-6 bg-slate-300 rounded-md"
        >
          <p className="text-green-600 text-2xl font-bold ">{messsage[1]}</p>
        </div>
      )}
      {messsage[0] === "error" && (
        <div
          style={{ position: "absolute", left: "0", top: "20%" }}
          className="text-center mt-6 py-4 px-6 bg-slate-300 rounded-md"
        >
          <p className="text-red-600 text-2xl font-bold ">{messsage[1]}</p>
        </div>
      )}
    </>
  );
}

function CiCodeStormForm() {
  const [id, setID] = useState(undefined);
  let nav = useNavigate();
  let download = async () => {
    let payload = {
      id: id,
    };

    await validateCertificate(payload)
      .then((res) => {
        payload.name = res[0]["data"][0]["name"];
        payload.additionalTexts = res[0]["data"][0]["additionalTexts"];
        payload.theme = res[0]["data"][0]["theme"];
      })
      .catch((err) => {
        console.log(err);
      });

    const SentPayload = { payload: payload, id: id };

    ExtractPDF(SentPayload).then((res) => {
      downloadBase64File(
        res,
        "Certificate " + payload.name + "-" + id + ".pdf"
      );
    });

    // ExportCodeStormTicket(id).then((res)=>{
    //   global.setMessage(['done',res])
    //   downloadBase64File(res[0]['PDF'],'CodeStormTicket.pdf')
    // }).catch((err)=>{
    //   global.setMessage(['error',err.response['data'][0]['message']])
    // })
  };
  function downloadBase64File(contentBase64, fileName) {
    const linkSource = `data:application/pdf;base64,${contentBase64}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = fileName;
    downloadLink.click();
    nav("/done", { state: { downloaded: true } });
  }
  return (
    <>
      <div className="codestorm-page  absolute top-0 left-0 w-screen h-screen overflow-hidden ">
        <div className="flex justify-center flex-col gap-6 items-center h-screen overflow-hidden">
          <Errmessage />
          <h1 className="text-slate-200 sm:text-2xl p-4 rounded-lg  border-2 border-slate-200  ">
            Enter your certificate ID
          </h1>
          {/* <div className="text-slate-200 sm:text-2xl p-4 rounded-lg border-2 border-slate-200  "> */}
          <input
            onChange={(e) => setID(e.target.value)}
            className="text-slate-200 sm:text-2xl bg-transparent p-4 rounded-lg border-2 border-slate-200  "
            placeholder="Your ID here"
          />
          {id && (
            <input
              onClick={() => {
                download();
              }}
              className="text-slate-200 sm:text-2xl bg-transparent cursor-pointer p-4 rounded-lg border-2 border-slate-200  "
              type="submit"
              value={"download"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CiCodeStormForm;
