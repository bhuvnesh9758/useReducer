export default function loginFN(username,password){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(username==='abc' && password==='abc')
            resolve()
            else
            reject()
        },1000)
    })
}