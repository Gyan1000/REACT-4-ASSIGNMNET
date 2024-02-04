import "../styles/ImageCard.css"
function ShowFolloers({id,url})
{
   return(
    <div className="photoCard">
    
      <img src={url}/>
      <h1>{id}</h1>
    </div>
   )
}

export {ShowFolloers}