
import React ,{useState,useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import{ShowFolloers} from "../Component/ShowFollowers";
import "../styles/FrontPage.css";
import {Link} from "react-router-dom";

function Followers()
{
  const {id}=useParams();
   console.log("....",id) 
  const [info,setInfo]=useState({
       followers:[],
       isLoding:true,
       total_followers:0,
       URL:`https://api.github.com/users/${id}/followers`
   })
   
   async function showFollowers()
   {
      try{
      const response=await axios.get(info.URL)
      const data=await response.data;
      console.log("response",response)
      console.log("...... response.data",data)
      setInfo({
        ...info,
        followers:data,
        total_followers:data.length,
        isLoding:false
      })
       console.log("followers.length ",data.length);
    }
     catch(error)
     { 
       console.log(error);
     }
    }
   
    useEffect(()=>{showFollowers()},[info.URL])
    return(
      <>
      <header>
      <div id="home">
         <Link to={'/'}><span>Home</span></Link> 
      </div> 

         <div id="following">
        {/* AS WE CLICK ON 'TO WHOM FOLLOW' WE WILL GET ANOTHER PAGE AND ON THAT PAGE AS WE CLICK ON 'FLOOWERS OF' WE WILL GET BACK ON THE PREVIOUS PAGE */}

         <p onClick={()=>{setInfo(()=>({...info,URL:`https://api.github.com/users/${id}/following`}))}}>

          {
          
              (info.URL===`https://api.github.com/users/${id}/followers`)? `To whom follow ${id}`:

               <p onMouseUp={()=>{setInfo (()=>({...info,URL:`https://api.github.com/users/${id}/followers`}))}}>

                Followers of {id}
          
               </p>
          } 
          </p>
        
         </div> 
         </header>
         <section>
          {/* IF IN URL= FOLLOERS URL  THEN I HAVE PRINTED HERE 'FOLLOWERS OF WITH ID' ELSE IF URL=FOLLOW URL THEN
          
          'FIRST PRINT ID WITH FOLLOW' */}

        <h2>{info.URL===`https://api.github.com/users/${id}/followers`?`Followers of ${id}`:`${id} follow`}</h2>

        {/* THIS LOGIC WILL WORK FOR BOTH FOLLOERS URL AND FOLLOWING URL IF TOTLAL_FOLLOWERS LENNGTH MORE THAN 0 THAN SHOW THE FOOLLOWRS IMAGE OTHERWISE DEPENDING ON IN URL CONTAINS WHAT 'FOLLOWRS URL' OR 'FOLLOWING URL' ELSE PART MESSAGE WILL DISPLAY */}

        <div id="imageContainer">
        
            {

            (info.isLoding)? <div className='loding_msg'>LOADING DATA......</div>: (info.total_followers>0)?  

             info.followers.map(

              (e)=>{return <ShowFolloers id={e.login} url={e.avatar_url} key={e.avatar_url}/>

             }):
          
              (info.URL===`https://api.github.com/users/${id}/followers`)?

              <div className="loding_msg">Does not have any Follower</div>:
          
              <div className='loding_msg'>Does not Follow Anyone</div>
         }   
       </div>
       </section>

      </>
    )
}

export {Followers}