import "../Property/PropertySearchForm.css"

const PropertySearchForm = (props) => {

   const searchHandlerFormInput = props.searchHandlerForForm;
   //setting the search handler function in a varibale for easier use, extracted via the prop which has been passed down containing the function

    const referenceType = useRef();
    const referenceBedroom = useRef();
    const referenceBathroom = useRef();
    const referenceGarden = useRef();
    const referencePrice = useRef();
    //these set the value to zero and are used later both in the function itself and the form to gain the data inputed by the user

    return ( 
        <>
        
        </>
     );
}
 
export default PropertySearchForm;