export default (user = {userData:null},action)=>{
    switch(action.type){
        case "AUTH":
            localStorage.setItem("user",JSON.stringify({...action?.data}))
            return {...user, userData:action?.data}
        default:
            return user
    }
}