import { useRef } from "react";

const BuyerInputForm = (props) => {

const  buyerAddHandler = props.buyerAddHandler


const refFirstName = useRef();
const refSurname = useRef();
const refAddress = useRef();
const refPostcode = useRef();
const refPhone = useRef();

const sumbitHandler = (event) => {
    event.preventDefault(); 
     //sumbit handler for when the submit button is pressed and used by the user. If statement is run to check if the inputted values match those of the and then will then proceed to add these to the db json 
         
     if ( refFirstName.current.value && refSurname.current.value && refAddress.current.value && refPostcode.current.value && refPhone.current.value){
         buyerAddHandler(
             {
                 "firstName": refFirstName.current.value,
                 //adds the first name given the value of the submit provided in the text box of the form, same goes for all the others below 
                 "surname": refSurname.current.value,
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
            <input type="text" id="buyerFirstName" ref={refFirstName}/>
        </div>

        <div>
            <label>Second Name</label>
            <input type="text" id="buyerSecondName" ref={refSurname}></input>
        </div>

        <div>
            <label>Address</label>
            <input type="text" id="buyerAddress" ref={refAddress}></input>
        </div>

        <div>
            <label>Postcode</label>
            <input type="text" id="u" ref={refPostcode}></input>
        </div>

        <div>
            <label>Phone Number</label>
            <input type="text" id="buyerPhoneNumber" ref={refPhone}></input>
        </div>

        <div>
            <button type="submit" onClick={sumbitHandler}>Add New Buyer</button>
        </div>
        </>
     );
}
 
export default BuyerInputForm;