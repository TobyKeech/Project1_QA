import "../Property/PropertySearchForm.css"
import React, {useRef} from "react";
const PropertySearchForm = (props) => {

   const searchHandlerFormInput = props.searchHandlerForForm;
   //setting the search handler function in a varibale for easier use, extracted via the prop which has been passed down containing the function

    const referenceType = useRef();
    const referenceBedroom = useRef();
    const referenceBathroom = useRef();
    const referenceGarden = useRef();
    const referencePrice = useRef();
    //these set the value to zero and are used later both in the function itself and the form to gain the data inputed by the user


    const doSearch = () => {
        searchHandlerFormInput(
            {
                type: referenceType.current?.value,
                bedroom: referenceBedroom.current?.value,
                bathroom: referenceBathroom.current?.value,
                garden: referenceGarden.current?.value,
                price: referencePrice.current?.value,
            }
        );
    }
    //identifies the current value of the input from the form using the typeRef and than then uses it within the searchCriteria function

    return ( 
        <form>
        <div className="row">
            <div >
                <label >Type</label>
                <select ref={referenceType}>
                    <option value="ANY">Any</option>
                    <option value="DETACHED">Detached</option>
                    <option value="SEMI">Semi</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
            </div>
            <div >
                <label >Price</label>
                <select  ref={referencePrice}>
                    <option value="0">Any</option>
                    <option value="50000">Up to 50000</option>
                    <option value="100000">Up to 100000</option>
                    <option value="200000">Up to 200000</option>
                    <option value="300000">Up to 300000</option>
                    <option value="400000">Up to 400000</option>
                </select>
            </div>
            <div >
                <label >Bedrooms</label>
                <select  ref={referenceBedroom}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                    <option value="4">Minimum 4</option>
                    <option value="5">Minimum 5</option>
                </select>
            </div>
            <div >
                <label >Bathrooms</label>
                <select  ref={referenceBathroom}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                </select>
            </div>
            <div >
                <label >Garden</label>
                <select  ref={referenceGarden}>
                    <option value="0">Any</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
        </div>
        <div className="text-end">
           
            &nbsp;
            <button type="button" className="btn btn-primary" onClick={doSearch}>
                <i className="bi bi-search"></i>&nbsp;Find Properties
            </button>
        </div>
    </form>
     );
}
 
export default PropertySearchForm;