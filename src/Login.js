import React ,{useState,useReducer}from 'react'
import login from './loginFN'


function loggedInreducer(state,action){
    switch(action.type){
        case 'field':
            return {
                ...state,
                [action.field]:action.value
            }
        case 'login':
            return {
                ...state,
                isLoading:true,
                error:''
            }
        case 'success':
            return {
                ...state,
                isLoading:false,
                isLoggedIn:true,
                username:'',
                password:''
            }
        case 'error':
            return {
                ...state,
                error:'Incorrect Details',
                isLoading:false
            }
        case 'logout':
            return {
                ...state,
                isLoggedIn:false
            }
    }
    return state
}
const initialState={
    username:'',
    password:'',
    isLoading:false,
    error:'',
    isLoggedIn:false
}
function Login() {

    const [state, dispatch] = useReducer(loggedInreducer, initialState)
    const {
        username,
        password,
        isLoading,
        error,
        isLoggedIn
    }=state
    const onSubmit=async (e)=>{
        e.preventDefault()
        dispatch({type:'login'})
        console.log("submitted",e.target.value)
        try{
            await login(username,password)
            dispatch({type:'success'})
        }catch(e){
            dispatch({type:'error'})
        }
    }
    return (
        <div className="container">
            <div className="div-input">
            {error && <p className="error">{error}</p>}
                {isLoggedIn ? (<>Hello {username}!
                <button onClick={()=>dispatch({type:'logout'})} >Logout</button>
                </>):
                (
            <form onSubmit={onSubmit}>
                <p>Login here</p>
                <label htmlFor="name">name</label>
                <input type="text" placeholder="Enter Name" id="name" 
                value={username} onChange={e=>dispatch({type:'field',field:'username',value:e.target.value})}/>
                <br/>
                <label >password</label>
                <input type="password" placeholder="Enter password"
                value={password} onChange={e=>dispatch({type:'field',field:'password',value:e.target.value})}/>
                <button type="submit" disabled={isLoading}>
                    {isLoading?'Loggin in..':'Login'}
            </button>
            </form>)}
            </div>
        </div>
    )
}

export default Login
