import React,{useEffect,useState} from "react";
import axios from "axios";
import useDebounce from "../CustomHooks/useDebounce";
import { ImageCard } from "../Component/ImageCard";
import "../styles/FrontPage.css";

function FrontPage()
{
    const [query,setQuery]=useState("Gyan");
    const debounceSearch=useDebounce((e)=>setQuery(e.target.value))
    const [page, setPage] = useState(1);
    const[info,setInfo]=useState({
        items:[],
        isLoding:true,
        total_id:0,
        perPage:1,
        URL:`https://api.github.com/search/users?q=${query || "Gyan"}&per_page=${5}&page=${page}`
    });
    
   async function getInfo()
    {
        try{
            const response = await axios.get(`https://api.github.com/search/users?q=${query||"Gyan"}&per_page=${100}&page=${info.perPage}`);  
             const result= response.data;
             console.log("...result",result);
             console.log("...Result.items",result.items)
              setInfo({
                ...info,
                isLoding:false,
                items:result.items,
                total_id:result.total_count
              })
             
        }
        catch(error)
        {
            console.log("URL Fetching Error",error)
        }
    }
    // getInfo() function WILL CALLED TWO TIME .FIRST TIME WHEN WE TYPE GIT_HUB ID IN INPUT BOX AND SECOND TIME WHEN PERPAGE STATE WILL BE CHANGED
   useEffect(()=>{getInfo()},[query,info.perPage])
 return(
   <div class="container">
    <div>
        <input type="text" onClick={()=>{
           setInfo({
            ...info,
            perPage:1,
            
           })
        }}onChange={debounceSearch} id="userInput" placeholder="Enter photo Id"/>
    </div>
    {/* GIT HUB MESSAGE ABOUT LODING PHOTOS */}

   <div id="git_msg"> Total Id <span id="total_id">{info.total_id} </span>But according to Github Only the first 1000 search results are available</div>

    {/* //DISPLAY BUTTTONS */}
    
     {
    <div id="display-btn">
    <button className="btn" onClick={()=>{
      const pre= (info.perPage>1)?info.perPage-1:1
      setInfo({
        ...info,
        perPage:pre
      })

    }}>prevoius</button>

    <button className="btn" onClick={()=>{
        // ON EACH CLICK WE ARE GETTING 100 PHOTOS (AS WEB PAGE LOAD 100 PHOTOS DISPLAY FIRST TIME) + 9 CLICK=1000 PHOT0S
        const newPerpage=(10>info.perPage)?info.perPage+1:1;

         setInfo({...info,perPage:newPerpage})
         
    }} >next</button>
   </div>
   }

   {
   /* DISPLAY IMAGE
     IF axious FETCHING THE URL THAN DISPLAY 'DATA IS LOADING' ELSE IF WE FIRST CHECK total_id GREATER THAN 0 THAN IMAGE CARD WILL DISPLAY ELSE 'THIS NAME_ID DOES NOT CONTAINS ANY INFO'
   */
   }
   <div id="imageContainer">
        {
            (info.isLoding)?<div className="loding_msg">DATA IS LOADING.......</div>:

            (info.total_id>0)?

            info.items.map((e)=>{
              return <ImageCard id={e.login} url={e.avatar_url} key={e.avatar_url}/>
            })

            :<div className="loding_msg">THIS NAME_ID DOES NOT CONTAINS ANY INFO</div>
        }
    </div>
    </div>
 )
}


export {FrontPage}



