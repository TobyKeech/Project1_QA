import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useRef } from "react";


const SellerForm = (props) => {

    const addSellerHandler = props.addSellerHandler;
    // passing the seller handler function down which has been defined in the Seller
    //extracting this from props

    const refFirstName = useRef();
    const refSecondName = useRef();
    const refAddress = useRef();
    const refPhone = useRef();
    const refPostcode = useRef();

    //setting the refernce to start as empty will assign below for use later

    const resetForm =() => {
        refFirstName.current.value = "";
        refSecondName.current.value = "";
        refAddress.current.value = "";
        refPhone.current.value = "";
        refPostcode.current.value = "";
    }

    const sumbitHandler = (event) => {
       event.preventDefault(); 
        //sumbit handler for when the submit button is pressed and used by the user. If statement is run to check if the inputted values match those of the and then will then proceed to add these to the db json 
            
        if ( refFirstName.current.value && refSecondName.current.value && refAddress.current.value && refPostcode.current.value && refPhone.current.value){
            addSellerHandler(
                {
                    "firstName": refFirstName.current.value,
                    //adds the first name given the value of the submit provided in the text box of the form, same goes for all the others below 
                    "secondName": refSecondName.current.value,
                    "address": refAddress.current.value,
                    "postcode": refPostcode.current.value,
                    "phone": refPhone.current.value
                }
            )
            resetForm();
            } 
    
    }

   
    return (
        <>
        <form>
            <div class="form-row">
        <div class="col">
            <label>First Name</label>
            <input type="text"  placeholder="Enter first name" class="form-control" id="sellerFirstName" ref={refFirstName}/>
        </div>

        <div>
            <label>Surname</label>
            <input type="text"  placeholder="Enter surname name" class="form-control" id="sellerSurname" ref={refSecondName}></input>
            {/* the ref is given the ref set by use ref above which is started as empty. */}
        </div>

        <div>
            <label>Address</label>
            <input type="text" placeholder="Enter address" class="form-control" id="sellerAddress" ref={refAddress}></input>
        </div>

        <div>
            <label>Postcode</label>
            <input type="text"  placeholder="Enter postcode" class="form-control" id="sellerPostcode" ref={refPostcode}></input>
        </div>

        <div>
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number" class="form-control" id="sellerPhoneNumber" ref={refPhone}></input>
        </div>

        <div>
            <button type="submit" class="btn btn-success p-2" onClick={sumbitHandler}><FontAwesomeIcon icon={faPlus}/>&nbsp;New Seller </button>
            {/* when the add new seller button is clicked the submitHandler function is called and the inputs are filled with the vlaues which were entered into the text inputs */}
        </div>
        </div>
        </form>
        </>
      );
}
 
export default SellerForm;