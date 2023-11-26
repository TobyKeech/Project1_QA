import { useEffect, useReducer, useState } from "react";


const Seller = () => {

    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading to true or false
    //by manipulating state

    const [sellers, setSellers] = useState([]);
    //same as used to get data for storing propertes but used with seller instead

    const [saving, setSaving] = useState(false);

    const reducedSellersList = (state, action) => {
      //current state is passed in and the action set below in the fetch line 42
      switch ( action.type){
        //switch statement to execut dependent on the action.type 
        case "ADD":
          return state.concat(action.payload);
          //if action type is ADD new state is added to the current state and returned
          case "SET":
            return action.payload;
            //if action type is SET then the current state is returned
          default:
            return state;
      }
    };

    const [listOfSellers, dispatch] = useReducer(reducedSellersList, [])
    // we use the dispatch function here to update the state depending on actions defiend in the reducedSellersList function
    
    const addSellerHandler = (newSeller) => {
      // declared a function and passed in a newSeller parameter
        if ( listOfSellers.fillter(seller => seller.firstName === newSeller.firstName && seller.surname === newSeller.surname).length){
          // if statement that takes the listOfSellers we have declared in state above and used the useReducer function to change the return depending (see above)
          // checks the new seller against the seller in the list using filter
          alert("Seller already exists in the list")
          //will show if the seller name and surname match will return an alert
          return
        }
        setSaving(true)
        //if true we set the state of setSaving to true 

    }

    useEffect(()=> {
        setLoading(true)
            fetch("http://localhost:8081/seller")
            //get the json content from the backend server to render
    
            .then((response)=> {
                if( !response.ok) {
                    alert("Error occured, could not load data of sellers")
                    throw response.status
                    //returns the status of the resonse back to the user ie 202 or 404
                } else return response.json();
                // if everything is good return the sellers json data in the response
            })
    
            .then(sellers => {
                    dispatch({type: "SET", payload : sellers})
                      //set the action type to SET and the payload (our seller data is stored in here) 
                      // we can then change the state with this action type which we will use above
                    setLoading(false);
                    //manipulates the state to set this to false whena ction is complete, this started as true above in state 
                    console.log(sellers)
                    setSellers(sellers)
                    //check what is contained within sellers, list of sellers displayed within the console
            })
    
            .catch(error => {
                setLoading(false)
                console.log(error)
                alert("Error has occured getting the data")
                //bring an alert if the json data doesnt load properly
            })
            
    },[])
    //this gets set into a new array to then use further down



    return (
        <>
       <div>
        <h2>List of Sellers</h2>

       {loading ? (
        <div>Loading...</div>
        // turnery statement to allow for a loading if the condition is true else it will render the infromation on to the webpage
      ) : (
        sellers.map((seller) => (
          <div key={seller.id}>
            
            <p>{seller.firstName} &nbsp; {seller.surname}</p>
          </div>
        ))
      )}
       </div>
    </>
    );
    }

    export default Seller;