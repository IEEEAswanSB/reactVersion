
import { useState,useEffect } from 'react'
import { RegisterBein6 } from '../../services/register.service';
import ReCAPTCHA from "react-google-recaptcha";

export function Bein6() {

    const [image, setImage] = useState(null);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [response, setResponse] = useState('');




    function onFileChange(e) {
        setImage(e.target.files[0])
    }

    function onCaptchaChange(e) {
        setCaptchaValue(e);
      }


    function onFileUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "image",
            image,
        );
        formData.append(
            "Captcha",
            captchaValue,
        );
        formData.append(
            "name",
            e.target.name.value,
        );
        formData.append(
            "email",
            e.target.email.value,
        );
        formData.append(
            "phone",
            e.target.phone.value,
        );
        formData.append(
            "id",
            e.target.id.value,
        );
        formData.append(
            "certificateName",
            e.target.certificateName.value,
        );

        formData.append(
            "faculty",
            e.target.faculty.value,
        );
        formData.append(
            "university",
            e.target.university.value,
        );
        formData.append(
            "birth",
            e.target.birth.value,
        );
        formData.append(
            "otherUniversity",
            e.target.otherUniversity.value,
        );
        formData.append(
            "otherFaculties",
            e.target.otherFaculties.value,
        );
        formData.append(
            "department",
            e.target.department.value,
        );
        formData.append(
            "year",
            e.target.year.value,
        );
        formData.append(
            "track",
            e.target.track.value,
        );
            

        
        RegisterBein6(formData).then((res) => {
            setResponse(res.message);
        }).catch((err) => {
            setResponse(err.response.data.message);
        });
    }


  return (
   <div>
    <form onSubmit={onFileUpload}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="email" placeholder="email" />
        <input type="text" name="phone" placeholder="phone" />
        <input type="text" name="id" placeholder="ID" />
        <input type="text" name="certificateName" placeholder="certificateName" />
        <input type="text" name = "faculty" placeholder="faculty" />
        <input type="text" name = "university" placeholder="university" />
        <input type="date" name = "birth" placeholder="birth" />
        <input type="text" name = "otherUniversity" placeholder="otherUniversity" />
        <input type="text" name = "otherFaculties" placeholder="otherFaculties" />
        <input type="text" name = "department" placeholder="department" />
        <input type="text" name = "year" placeholder="year" />
        <input type="text" name = "track" placeholder="track" />


        <input type="file" id="file" onChange={onFileChange} />
        <ReCAPTCHA
        sitekey="6Lci-F4pAAAAAPYSkYGxHYf7-dp9PGiHkGU9Z7MG"
        onChange={onCaptchaChange}
        />
        <input type="submit" value="Upload"/>
        </form>
        <p>{response}</p>
   </div>
  )
}
