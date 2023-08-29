import context from "./Context";
import { Provider,useState} from "react";
const Notestate=(props)=>{
  const [sidebar,setSidebar]=useState(false)
  const showSidebar=()=>{
     setSidebar(!sidebar)
  }
  
    return<>
        <context.Provider value={{showSidebar,sidebar,setSidebar}}>
            {props.children}
        </context.Provider>
    </>
}
export default Notestate