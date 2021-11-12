import * as api from "../api"

export const signIn = (userData,history) => async (dispatch) =>{
    try {
        const {data} = await api.signIn(userData)
        dispatch({type:"AUTH",data})
        history.push("main")
    } catch (error) {
         console.log(error);   
    }
}
