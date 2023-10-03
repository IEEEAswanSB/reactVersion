import {ImportCertificates} from "../../services/register.service";

let Upload = ()=>{

    return(
        <>
            <label id="in">upload</label>
            <input for="in" type="file" onChange={

                (ev)=>{
                    const file = ev.target.files[0];
                    const reader = new FileReader(); 

                    reader.readAsText(file);
                        reader.onload = (event) => {                  

                        let payload = {
                            csv: reader['result'],
                            fileName: file.name,
                            ps:"Yas2110M2003"
                        }

                        ImportCertificates(payload).then(res => {    
                            
                            if(res['err']==0){

                            }else{

                            }           

                        })        
                    }
                }
            }/>
        </>
    )
}

export default Upload;