import BuyerInputForm from "./BuyerInputForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"

import { useEffect, useReducer, useState } from "react";

const Buyer = () => {

    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading to true or false
    //by manipulating state

    const [buyers, setBuyers] = useState([]);
    // useless state that was used in the intial phases to display data

    const [saving, setSaving] = useState(false);
    //state to change the state of saving for alerts etc

    const reducedBuyersList = (state, action) => {
      switch (action.type) {
        case "ADD":
          return state.concat(action.payload);
        case "SET":
          return action.payload;
        case "REMOVE":
          return state.filter((buyer) => buyer.id !== action.payload.id);
          //checks if the buyer within the current state, that its id is not equal to any within the current list. 
        default:
          return state;
      }
    };
    
    const [listOfBuyers, dispatch] = useReducer(reducedBuyersList, []);

    //useReducer manipulates state to certian conditiosn, dispatch sets a type which is refernced in the reduced buyers list function

      const buyerAddHandler = (newBuyer) => {

        if( 
          listOfBuyers.filter(
            (buyer) => 
            buyer.firstName === newBuyer.firstName && buyer.surname === newBuyer.surname
          ).length
        ){
          alert("Buyer already in the list")
          return;
        }

        setSaving(true);
        fetch("http://localhost:8081/buyer", {
          //fetches info for buyer
          method: "POST",
          // post method (HTTP) for adding new data on 
          headers : {"Content-Type" : "application/json"},
          //what to store as 
          body: JSON.stringify(newBuyer),
          //makes the newBuyer into json so can be added to the backend
        }
        ).then((response) => {
          if (!response.ok){
            alert("error has occured, unable to add buyer")
            //error handling using if statement if the reponse is not okay then an alert is thrown
            setSaving(false);
            //manipulation of state to change saving to false 
            throw response.status;
            //throw the HTTP response to the user 
          } else return response.json();
        }
        ).then(newBuyer => {
          dispatch ({type: "ADD", payload: newBuyer})
          setSaving(false);

          //changes state to false for saving
          //dispatch typer of add is applied with the newBuyer data as the payload, used by the useReducer and reducedBuyersList function above

        });
      };

      const deleteBuyerHandler = (buyer) => {
        setSaving(true);
      
        fetch(`http://localhost:8081/buyer/${buyer.id}`, {
          method: "DELETE",
          //fetch the specific sellers id to match for deletion
        })
          .then((response) => {
            if (!response.ok) {
              alert("An error has occurred. Unable to delete buyer");
              setSaving(false);
              throw response.status;
            } else {
              dispatch({ type: "REMOVE", payload: buyer });
              setSaving(false);
               //dispatch type is set to remove with the state of seller passed to the function, this then performs the delete method within the 
               //reducer function
            }
          })
          .catch((error) => {
            setSaving(false);
            console.log(error);
            alert("Error has occurred while deleting the buyer");
          });
      };

    useEffect(()=> {
        setLoading(true)
            fetch("http://localhost:8081/buyer")
            //get the json content from the backend server to render
    
            .then((response)=> {
                if( !response.ok) {
                    alert("Error occured, could not load data of buyers")
                    throw response.status
                    //returns the status of the resonse back to the user ie 202 or 404
                } else return response.json();
                // if everything is good return the buyers json data in the response
            })
    
            .then((buyers) => {
              dispatch({type: "SET", payload: buyers});
                    //set the buyers into the dispatch with the type of set, this will return the state dependent on thea action:type
                    setLoading(false);
                    //manipulates the state to set this to false when action is complete, this started as true above in state 
                    setBuyers(buyers)
                    console.log(buyers)
                    // setBuyers(buyers)
                    //check what is contained within buyers, list of buyers displayed within the console
            })
    
            .catch(error => {
                setLoading(false)
                console.log(error)
                alert("Error has occured getting the data")
                //bring an alert if the json data doesnt load properly
            })
            
    },[])
    //this gets set into a new array to then use further down within the return

   
    return (  
        <>
        <div  className="bg-dark text-white p-4">
        <BuyerInputForm buyerAddHandler ={buyerAddHandler}/>
        <div>
                <button>
                    <Link to="/buyer-input">Buyer Form</Link>
                </button>
               </div>
        <br />
        {loading || saving ? (
        <div>
                {loading ? "Loading buyers Information" : ""}
                {saving ? "Saving buyer Information" : ""}
                {/* both of these check the state of saving and loading to know what to render depenedng on boolean condition */}
        </div>
          )  : (""
    )}
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Surname</th>
          <th scope="col">Address</th>
          <th scope="col">Postcode</th>
          <th scope="col">Phone</th>
          <th scope="col">Action</th>
        </tr>

      </thead>
      <tbody>
        {listOfBuyers.length === 0 && !loading ? (
          <tr>
            <td colSpan="5">No buyers found</td>dfsf
          </tr>
        ) : (
          listOfBuyers.map((buyer) => (
            <tr key={buyer.id}>
              <td>{buyer.firstName}</td>
              <td>{buyer.surname}</td>
              <td>{buyer.address}</td>
              <td>{buyer.postcode}</td>
              <td>{buyer.phone}</td>
              <td>
              <button class="btn btn-outline-danger" onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this buyer?")) {
                                    deleteBuyerHandler(buyer);
                                  }
                                }}>
                                  Delete &nbsp;
                                  <FontAwesomeIcon icon={faTrash}/></button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    </div>
</>
);
};
 
export default Buyer;