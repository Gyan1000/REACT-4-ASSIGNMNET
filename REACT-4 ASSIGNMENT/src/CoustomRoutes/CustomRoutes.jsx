
import{Route,Routes} from "react-router-dom"
import {FrontPage} from "../Pages/FrontPage"
import{Followers} from "../Pages/Followers"

function CustomRoute()
{
    return(
        <Routes>
            
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/:id" element={<Followers/>}/>
            
        </Routes>
    )
}

export {CustomRoute};