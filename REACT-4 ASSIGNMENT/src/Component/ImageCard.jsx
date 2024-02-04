import React from "react"
import {Link} from "react-router-dom"
import "../styles/ImageCard.css"

function ImageCard({id,url})
{
    return(
        <div className="photoCard">
           
         <Link to={`/${id}`}>
           
            <img src={url} alt=""/>
            <h1>{id}<br/> Click Me</h1>
            
            </Link>
        </div>
    )
}
export {ImageCard}