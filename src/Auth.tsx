import { FormEvent, useEffect, useState } from "react";
import App from "./App";
import { remult } from "remult";


export default function Auth(){
    const [username,setUsername]=useState("");
    const [signedIn,setSignedIn]=useState(false);

    useEffect(()=>{//when refreshing user still connected 
        fetch("/api/currentUser").then(async(result)=>{
            remult.user=await result.json();
            if(remult.user) setSignedIn(true);
        });

    },[]);

    if(!signedIn) {
    async function signInUserFunc(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();                            //stop refreshing at rebbot page
    const result = await fetch("api/signIn",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({username}),
    });
    if(result.ok)//check if sign-in success,and update user in remult
    {
     remult.user=await result.json();
    setUsername("");//Initialize input window,erase input window after sign-out
     setSignedIn(true);//Once find user in DB setsignedin=true
    }
    else{
        console.log("Invalid user",result.json());
        alert("please enter user name");
        alert(await result.json());
    }
    }

return <>
        <h1>To do list</h1>;
        <main>
            <form onSubmit={(e)=>signInUserFunc(e)}>
            <input
            value={username} onChange={(e)=>setUsername(e.target.value)}
            placeholder="Please type in your user name" />
            <button>Sign in</button>
            </form>
        </main>
    </>;
    }
    else{
        async function signOutUser() {
        await fetch("/api/signOut");
        remult.user=undefined;
        setSignedIn(false);

        }

    return(
    <>
    <header>
        Hello {remult.user!.name}{""}
        <button onClick={()=>signOutUser()}>Sign out</button>
    </header>
        <App/>   
        </>);
    
    
  }     
}


