import { useEffect } from "react";
import { useLocation } from "react-router-dom"


export default function RouteTitleSetter() {
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname==="/all-books"){
            document.title = "All Books"
        }else if(location.pathname==="/add-book"){
            document.title="Add Book"
        }
        else if(location.pathname==="/borrow-summary"){
            document.title="Borrow Summary"
        }
        else if(location.pathname.startsWith("/edit-book/")){
            document.title="Edit Book"
        }
        else if(location.pathname.startsWith("/borrow/")){
            document.title="Borrow Book"
        }
     
        else{
            document.title="CompusBooks | Smart Borrowing System"
        }
    })
  return null
}

