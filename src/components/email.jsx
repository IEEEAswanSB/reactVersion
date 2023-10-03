import {CodeStormEmail} from "../../services/register.service";

let Email = ()=>{

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
                        }

                        CodeStormEmail(payload).then(res => {    
                            
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

export default Email;