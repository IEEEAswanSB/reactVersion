import React, { useRef, useState } from 'react'
import Squares from '../../../components/bein7/Squares'
import { useParams } from 'react-router-dom'
import { useSnackbar } from '../../../hooks/SnackBar';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { set } from 'react-hook-form';

const hasNumbers = (str) => /\d/.test(str);
const hasLetters = (str) => /[a-zA-Z]/.test(str);
const containsOnlyNumbers = (str) => /^\d+$/.test(str);

function Bein7Form() {
  const { openSnackbar } = useSnackbar()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [id, setId] = useState('')
  const [college, setCollege] = useState('')
  const [university, setUniversity] = useState('')
  const [year, setYear] = useState('')
  const [course, setCourse] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentReceipt, setPaymentReceipt] = useState('')
  const [otherUniversity, setOtherUniversity] = useState('')
  const [loading, setLoading] = useState(false)

  const universities = ["Aswan", "AASTMT", "EELU", "other"]
  const years = ["1st", "2nd", "3rd", "4th", "5th"]
  const courses = ["Flutter", "PV (solar system)", "Technical office civil engineering", "Motion graphics"]
  const paymentMethods = ["payment on arrival", "vodafone cash"]


  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPaymentReceipt(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const errors = [];

    if (hasNumbers(fullName)) {
      openSnackbar("Full name should not contain numbers", { type: "error" });
      setLoading(false);
      return;
    }

    if (hasLetters(phoneNumber)) {
      openSnackbar("Phone number should only contain numbers", { type: "error" });
      setLoading(false);
      return;
    }

    if (hasLetters(id)) {
      openSnackbar("ID should only contain numbers", { type: "error" });
      setLoading(false);
      return;
    }

    if (university === "other" && hasNumbers(otherUniversity)) {
      openSnackbar("University name should not contain numbers", { type: "error" });
      setLoading(false);
      return;
    }

    if (phoneNumber && phoneNumber.length !== 11) {
      openSnackbar("Phone number should be 11 digits", { type: "error" });
      setLoading(false);
      return;
    }

    if (id && id.length !== 14) {
      openSnackbar("ID should be 14 digits", { type: "error" });
      setLoading(false);
      return;
    }

    if (!course) {
      openSnackbar("Please select a course", { type: "error" });
      setLoading(false);
      return;
    }

    if (paymentMethod === "vodafone cash" && !paymentReceipt) {
      openSnackbar("Please upload a payment receipt", { type: "error" });
      setLoading(false);
      return;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    validate();



    console.log({
      fullName,
      email,
      phoneNumber,
      id,
      college,
      university,
      year,
      paymentMethod,
      paymentReceipt,
      otherUniversity
    });
    const data = new FormData();
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('id', id);
    data.append('college', college);
    if (university === "other") {
      data.append('university', otherUniversity);
    } else {
      data.append('university', university);
    }
    data.append('year', year);
    data.append('paymentMethod', paymentMethod);
    data.append('paymentReceipt', paymentReceipt);
    data.append('course', course);


    axios.post("https://ieee-recruitment-production.up.railway.app/api/v1/course/register", data)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        openSnackbar("Your data has been submitted successfully", { type: "success" });
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setId('');
        setCollege('');
        setUniversity('');
        setYear('');
        setCourse('');
        setPaymentMethod('');
        setPaymentReceipt('');
        setOtherUniversity('');
        setImagePreview(null);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        openSnackbar("An error occurred, please try again later", { type: "error" });
      })
  };

  return (
    <div className='w-screen h-[130vh] bg-[#060606] relative flex items-center justify-center'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 w-11/12 bg-[#222] p-8 rounded-2xl shadow-lg text-center'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start gap-2'>
          {/* <h1 className='text-3xl font-bold text-white mb-1'>Course Name</h1> */}
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Full Name</span>
            <input
              type='text'
              name='fullName'
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Full Name'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Email</span>
            <input
              type='email'
              name='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='beincamp7@ieee.asw'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Phone</span>
            <input
              type='tel'
              name='phoneNumber'
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='01234567891'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>ID</span>
            <input
              type='text'
              name='id'
              value={id}
              required
              onChange={(e) => setId(e.target.value)}
              placeholder='ID'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>College</span>
            <input
              type='text'
              name='college'
              value={college}
              required
              onChange={(e) => setCollege(e.target.value)}
              placeholder='College'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>University</span>
            <select
              name='university'
              value={university}
              required
              onChange={(e) => setUniversity(e.target.value)}
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            >
              <option value={""}>select university</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </label>
          {university === "other" && <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Your University</span>
            <input
              type='text'
              name='otherUniversity'
              value={otherUniversity}
              onChange={(e) => otherUniversity(e.target.value)}
              placeholder='College'
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            />
          </label>}
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Year</span>
            <select
              name='year'
              value={year}
              required
              onChange={(e) => setYear(e.target.value)}
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            >
              <option value={""}>select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
            <span className='text-lg font-medium'>Course</span>
            <select
              name='course'
              value={course}
              required
              onChange={(e) => setCourse(e.target.value)}
              className='w-full !bg-[#333] p-2 rounded-lg mb-2 !focus:outline-none !outline-none'
            >
              <option value={""} >select a course</option>
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </label>
          <label className='flex flex-col justify-start items-start w-full text-white gap-0.5'>
          <span className="text-lg font-medium">Payment Method</span>
          <span className='text-lg font-medium text-right'>The ticket price is 80 Egyptian pounds for the number 0106 744 6502</span>
            <select
              name='paymentMethod'
              value={paymentMethod}
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='w-full bg-[#333] p-2 rounded-lg mb-2 focus:outline-none outline-none'
            >
              <option value={""} disabled>select payment method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </label>
          {paymentMethod === "vodafone cash" && <label className='flex flex-col justify-start items-start w-full text-white gap-1'>
            <span className='text-lg font-medium'>Payment Receipt</span>
            <div
              className={`w-full h-32 relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer
      ${dragActive ? 'border-blue-500 bg-blue-50/10' : 'border-gray-500'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              <input
                ref={fileInputRef}
                type='file'
                name='paymentReceipt'
                onChange={handleChange}
                accept='image/*'
                className='hidden'
              />
              {imagePreview ? (
                <div className='relative w-full h-full'>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className='w-full h-full object-contain'
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setPaymentReceipt('');
                    }}
                    className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6'
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <p className='text-center'>Drag and drop image here or click to select</p>
                  <p className='text-sm text-gray-400'>Only image files are allowed</p>
                </>
              )}
            </div>
          </label>}
          <button
            type='submit'
            disabled={loading}
            className='bg-[#6e6e6e] text-white rounded-lg p-2 w-full mt-2 flex justify-center items-center'
          >
            {
              loading ? <Loader2 size={24} color='white' className='animate-spin' /> : "Submit"
            }
          </button>
        </form>
      </div>



      <Squares
        speed={0.5}
        squareSize={40}
        direction='diagonal'
        borderColor='#555'
        hoverFillColor='#555'
        className='w-full h-[130vh]'
      />
    </div>
  )
}

export default Bein7Form