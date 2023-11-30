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

    const resetFormToEmpty= () => {
        refFirstName.current.value = "",
        refSecondName.current.value = "",
        refAddress.current.value = "",
        refPhone.current.value = "",
        refPostcode.current.value = ""
        //resets the value of the form when the function is called within the submit handler
    }

    const sumbitHandler = () => {

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
            } else {
                resetFormToEmpty();
            }
        }
    }




    return (
        <>
        </>
      );
}
 
export default SellerForm;