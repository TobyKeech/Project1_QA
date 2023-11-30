import { useRef } from "react";

const BuyerInputForm = (props) => {

const  buyerAddHandler = props.buyerAddHandler


const refFirstName = useRef();
const refSecondName = useRef();
const refAddress = useRef();
const refPostcode = useRef();
const refPhone = useRef();




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
 
export default BuyerInputForm;