import { useState } from "react";

function Contact() {
  const [manga, setManga] = useState(false)
  return (
    <section className="relative block pb-20 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4 pt-18 pb-10">
            <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                Contact Us
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                We will be happy to hear from you!
                </p>
            </div>
            </div>
        </div>
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4">
                
                    <div v-show="step === 1">
                        <div
                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200"
                    >
                            <div className="flex-auto p-5 lg:p-10">
                                <h4 className="text-2xl font-semibold">
                                How can we help you?
                                </h4>
                                <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                                Complete this form and we will get back very soon
                                </p>
                                {/* <div v-if="this.error && this.checkInfo" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                                    <div v-if="!$v.payload.name.required"><b>Name</b> is required</div>
                                    <div v-if="!$v.payload.phone.required"><b>Phone</b> is required</div>
                                    <div v-if="!$v.payload.email.required"><b>Email</b> is required</div>
                                    <div v-if="!$v.payload.message.required"><b>Message</b> is required</div>
                                </div> */}

                                        <div className="relative w-full mb-3 mt-8">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="full-name"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Full Name"
                                            v-model="payload.name"
                                        />
                                        </div>
                                
                                <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    v-model="payload.email"
                                />
                                </div>

                                <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Phone number"
                                    v-model="payload.phone"
                                />
                                </div>

                                <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    cols="80"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    placeholder="Type a message..."
                                    v-model="payload.message"
                                />
                                </div>
                                
                                <div className="text-center mt-6">
                                {/* <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-social-500 bg-white hover:bg-transparent hover:text-white hover:border-white font-medium" 
                                    type="button"
                                >
                                    Send Message
                                </button> */}
                                <button
                                    v-show="step === 1 && !loading"
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    
                                >Complete</button>
                                {/* <button
                                    v-show="step === 1 && loading"
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                ><span className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></span></button> */}
                                </div>

                                
                                </div>
                        </div>
                    </div>
                        { manga && <div v-show="step === 'complete'">
                            <div className="bg-blueGray-200 rounded-lg p-10 flex items-center shadow justify-between">
                                <div className="items-center mx-auto">
                                    <svg className="mb-4 h-20 w-20 text-social-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                                    <h2 className="text-2xl mb-4 text-social-5 text-center font-bold">Success</h2>
                                    <div className="text-gray-600 mb-8 font-bold">
                                        Thank you. We have received your Message.
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
            </div>
    </section>
  );
}

export default Contact;