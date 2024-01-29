/* status 0 => lower case
 * status 1 => upper case
 * status 2 => numbers only
 * status 3 => lower case + upper case
 * status 4 => lower case + numbers
 * status 5 => upper case + numbers
 * status 6 => all
 */

exports.randomString=(len,status=0)=>{
    let characters = '';
    switch(status){
        case 0:
            characters = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 1:
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 2:
            characters = '0123456789';
            break;
        case 3:
            characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 4:
            characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            break;
        case 5:
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case 6:
        default:
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        break;


    }
    const charactersLength = characters.length;
    let randomString='';
    for(let i=0;i<len;i++){
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomString;
}