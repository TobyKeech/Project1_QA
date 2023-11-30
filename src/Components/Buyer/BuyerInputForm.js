import { useRef } from "react";

const BuyerInputForm = (props) => {

    const buyerAddHandler = props.buyerAddHandler;

    const refFirstName = useRef();
    const refSurname = useRef();
    const refAddress = useRef();
    const refPostcode = useRef();
    const refPhone = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        if (
            refFirstName.current.value &&
            refSurname.current.value &&
            refAddress.current.value &&
            refPostcode.current.value &&
            refPhone.current.value
        ) {
            buyerAddHandler({
                firstName: refFirstName.current.value,
                surname: refSurname.current.value,
                address: refAddress.current.value,
                postcode: refPostcode.current.value,
                phone: refPhone.current.value,
            });
        }
    };

    return (
        <>
            <div>
                <label>First Name</label>
                <input type="text" id="buyerFirstName" ref={refFirstName} />
            </div>

            <div>
                <label>Surname</label>
                <input type="text" id="buyerSurname" ref={refSurname} />
            </div>

            <div>
                <label>Address</label>
                <input type="text" id="buyerAddress" ref={refAddress} />
            </div>

            <div>
                <label>Postcode</label>
                <input type="text" id="buyerPostcode" ref={refPostcode} />
            </div>

            <div>
                <label>Phone Number</label>
                <input type="text" id="buyerPhoneNumber" ref={refPhone} />
            </div>

            <div>
                <button type="submit" onClick={submitHandler}>
                    Add New Buyer
                </button>
            </div>
        </>
    );
};

export default BuyerInputForm;