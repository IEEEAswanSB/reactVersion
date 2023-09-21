import '../App.css'

function PartnerLogo({partnerImg}){
    return(
        <div className="md:w-4/12 lg:w-3/12 sm:w-6/12 xs:w-6/12 p-8 my-4 lg:mb-20 parent">
        <img
          className="max-w-full m-auto partner-logo transition partlogo"
          loading="lazy"
          src={partnerImg}
          alt={partnerImg}
        />
      </div>
    )
}

export default PartnerLogo;