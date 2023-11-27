import "../Property/PropertySearchForm.css"

const PropertySearchForm = (props) => {

    console.log(props)
    //checking what is set into the passed down props from property

    const searchHandler = (searchCriteria) => {
         props.filter(property => 
            (searchCriteria.type === "ANY" || property.type == searchCriteria.type) &&
            (Number(property.bedroom) >= Number(searchCriteria.bedroom)) &&
            (Number(property.bathroom) >= Number(searchCriteria.bathroom)) &&
            (Number(property.garden) >= Number(searchCriteria.garden)) && 
            (Number(searchCriteria.price)===0 || Number(property.price) <= Number(searchCriteria.price))
            )
    }


    return ( 
        <>
        <form>
        <div className="head">
            <div>
                <label>Type</label>
                <select>
                    <option value="ANY">Any</option>
                    <option value="DETACHED">Detached</option>
                    <option value="SEMI">Semi</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
            </div>
        </div>
        </form>
        </>
     );
}
 
export default PropertySearchForm;