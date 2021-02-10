import React from 'react';
import {auth, provider} from "./App"




export const Login:React.FC = ()=>{
    
    
    return(
    <div>
        <button onClick={()=>auth
  .signInWithPopup(provider)
  .then((result:any) => {
    /** @type {firebase.auth.OAuthCredential} */
    let credential = result.credential;
    console.log(credential);
    

    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    console.log(user);
  }).catch((error:any) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  })
  }>Login with Google</button>
    </div>
    );
}