import { useState,useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import {RecordAttendanceBein6 } from '../../services/register.service';

export function Bein6Attendance() {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (!!data) {           
            RecordAttendanceBein6({TicketID:data})
            .then((res) => {
                setResponse(res.message);
            })
            .catch((err) => {
                setResponse(err.response.data.message);
            });
        }    
      }, [data]);


  return (
   <div>
    <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{response}</p>
   </div>
  )
}
