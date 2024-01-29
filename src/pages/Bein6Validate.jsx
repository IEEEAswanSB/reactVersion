import { useState,useEffect } from 'react'
import {ValidateBein6 } from '../../services/register.service';

export function Bein6Validate() {
  const [response, setResponse] = useState('');
    
  function Validate(){
    ValidateBein6({TicketID:document.getElementsByName("TicketID")[0].value})
    .then((res) => {
        setResponse(res.message);
    })
    .catch((err) => {
        setResponse(err.response.data.message);
    });
  }

  return (
   <div>
    <input type="text" name="TicketID" placeholder="Ticket ID" />
     <input type="submit" onClick={Validate} value="Validate"/>
      <p>{response}</p>
   </div>
  )
}
