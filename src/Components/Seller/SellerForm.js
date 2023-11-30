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
            } 
    
    }
    return (
        <>
        <div>
            <label>First Name</label>
            <input type="text" id="sellerFirstName" ref={refFirstName}/>
        </div>

        <div>
            <label>Second Name</label>
            <input type="text" id="sellerSurname" ref={refSecondName}></input>
            {/* the ref is given the ref set by use ref above which is started as empty. */}
        </div>

        <div>
            <label>Address</label>
            <input type="text" id="sellerAddress" ref={refAddress}></input>
        </div>

        <div>
            <label>Postcode</label>
            <input type="text" id="sellerPostcode" ref={refPostcode}></input>
        </div>

        <div>
            <label>Phone Number</label>
            <input type="text" id="sellerPhoneNumber" ref={refPhone}></input>
        </div>

        <div>
            <button type="submit" onClick={sumbitHandler}>Add New Seller</button>
            {/* when the add new seller button is clicked the submitHandler function is called and the inputs are filled with the vlaues which were entered into the text inputs */}
        </div>
        </>
      );
}
 
export default SellerForm;