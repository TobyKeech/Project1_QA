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
      switch (action.type){
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

        fetch("http://localhost:8081/seller", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(newSeller)
          //runa fetch to the seller backend data with a post method type and make the new seller into a json format to add
        })
        .then((response)=>{ 
          if (!response.ok){
            alert("An error has occured. Unable to create item");
            setSaving(false);
            //reset the state to false if cannot be returned and present an alert
            throw response.status;
          } else return response.json();
          //if not return the data
        })
        .then(newSeller => {
          dispatch({type: "ADD", payload: newSeller});
          //take the newSeller and we change the dispatch type to ADD this in turn will add the new seller (which is the paylaod)
          //on the current state (see reducedSellersList function)
          setSaving(false); 
        })
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
      {
        loading || saving ?
        <div>
                {loading ? "Loading Sellers Information" : ""}
                {saving ? "Saving Seller Information" : ""}
        </div>
            : ""
      }
    <ul>
        {
            listOfSellers.length === 0 && !loading ?
                <li>
                      &nbsp;No sellers found
                </li>
                :
                listOfSellers.map(seller => (
                    <li key={seller.id}>
                          {seller.firstName}&nbsp;{seller.surname}
                          {seller.address}&nbsp;{seller.postcode}
                          {seller.phone}&nbsp;
                    </li>
                ))}
    </ul>
</>);
};

    export default Seller;