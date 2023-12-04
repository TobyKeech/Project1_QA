import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"


const PropertyAddForm = (props) => {
const propertyAddHandler = props.propertyAddHandler

    const refAddress = useRef();
    const refPostcode = useRef();
    const refGardens = useRef();
    const refBathrooms = useRef();
    const refPrice = useRef();
    const refStatus = useRef();
    const refType = useRef();

    const resetForm =() => {
        refAddress.current.value = "";
        refPostcode.current.value = "";
        refGardens.current.value = "";
        refBathrooms.current.value = "";
        refPrice.current.value = "";
        refStatus.current.value = "";
        refType.current.value = "";
    }


    const submitHandler = (event) => {
        event.preventDefault();

        if (
            refAddress.current.value &&
            refPostcode.current.value &&
            refGardens.current.value &&
            refBathrooms.current.value &&
            refPrice.current.value &&
            refStatus.current.value &&
            refType.current.value
        ) {
            propertyAddHandler({
                address: refAddress.current.value,
                postcode: refPostcode.current.value,
                gardens: refGardens.current.value,
                bathrooms: refBathrooms.current.value,
                price: refPrice.current.value,
                status: refStatus.current.value,
                type: refType.current.value,
            });
            resetForm();
        }
    };

    return ( 
    <>
     <form>
            <div class="form-row">
            <div class="col">
                <label>Address</label>
                <input type="text" placeholder="Enter address" class="form-control" id="propertyAddress" ref={refAddress} />
            </div>

            <div class="col">
                <label>Postcode</label>
                <input type="text" placeholder="Enter postcode" class="form-control" id="propertyPostcode" ref={refPostcode} />
            </div>

            <div class="col">
                <label>Gardens</label>
                <input type="text" placeholder="Enter gardens" class="form-control" id="propertyGardens" ref={refGardens} />
            </div>

            <div class="col">
                <label>Bathrooms</label>
                <input type="text" placeholder="Enter bathrooms" class="form-control" id="propertyBathrooms" ref={refBathrooms} />
            </div>

            <div class="col">
                <label>Price</label>
                <input type="text" placeholder="Enter price" class="form-control" id="propertyPrice" ref={refPrice} />
            </div>

            <div class="col">
                <label>Status</label>
                <input type="text" placeholder="Enter status" class="form-control" id="propertyStatus" ref={refStatus} />
            </div>
            <div class="col">
                <label>Type</label>
                <input type="text" placeholder="Enter type" class="form-control" id="propertyStatus" ref={refType} />
            </div>
            <br />
            <div>
               
                <button type="submit" class="btn btn-success p-2" onClick={submitHandler}>
                <FontAwesomeIcon icon={faPlus}/>&nbsp;New Property
                    <br />
                </button>
            
            </div>
            </div>
        </form>
        <br />

    </>
     );
}
 
export default PropertyAddForm;