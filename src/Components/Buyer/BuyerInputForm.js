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
        <form>
            <div class="form-row">
            <div class="col">
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" class="form-control" id="buyerFirstName" ref={refFirstName} />
            </div>

            <div class="col">
                <label>Surname</label>
                <input type="text" placeholder="Enter surname name" class="form-control" id="buyerSurname" ref={refSurname} />
            </div>

            <div class="col">
                <label>Address</label>
                <input type="text" placeholder="Enter address" class="form-control" id="buyerAddress" ref={refAddress} />
            </div>

            <div class="col">
                <label>Postcode</label>
                <input type="text" placeholder="Enter postcode" class="form-control" id="buyerPostcode" ref={refPostcode} />
            </div>

            <div class="col">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" class="form-control" id="buyerPhoneNumber" ref={refPhone} />
            </div>

            <div>
                <button type="submit" class="btn btn-success p-2" onClick={submitHandler}>
                    Add New Buyer
                    <br />
                </button>
               
            </div>
            </div>
        </form>
        </>
    );
};

export default BuyerInputForm;