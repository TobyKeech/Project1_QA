import { useEffect, useState } from "react";

const Buyer = () => {
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8081/buyer")
        //fetching content from backend
        .then((response)=>{
            if(!response.ok){
                alert("Error has occured cannot load response. Unable to laod buyers")
                setLoading(false)
                throw response.status;
                //show the http status of the response    
            } else return response.json;
        })

        
    })



   
    return (  

        <div>
            this is the buyers page
        </div>
    );
}
 
export default Buyer;