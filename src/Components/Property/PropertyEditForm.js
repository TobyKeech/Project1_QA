import { useState, useEffect } from "react";

const PropertyEditForm = ({property, editPropertyHandler, onClose}) => {

    const [editedProperty, setEditedProperty] = useState({...property})
    //state to manage the edited property, the inital state is set with the current ata of the orinigal property using spread
    const [formVisible, setFormVisible] = useState(true);


    useEffect(() => {
        setEditedProperty({...property})
    }, [property]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedProperty(( previousProperty) => ({
            ...previousProperty,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editPropertyHandler(editedProperty);
        setFormVisible(false);
        onClose();
      };

    return ( 
        <>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={editedProperty.address || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label">
          Postcode
        </label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          name="postcode"
          value={editedProperty.postcode || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bedroom" className="form-label">
          No of Bedrooms
        </label>
        <input
          type="number"
          className="form-control"
          id="bedroom"
          name="bedroom"
          value={editedProperty.bedroom || ""}
          min="1"
          max="10"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="garden" className="form-label">
          No of Gardens
        </label>
        <input
          type="number"
          className="form-control"
          id="garden"
          name="garden"
          value={editedProperty.garden || ""}
          min="0"
          max="5"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          name="type"
          value={editedProperty.type || ""}
          onChange={handleChange}
          required
          pattern="SEMI|DETACHED|APARTMENT"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={editedProperty.price || ""}
          min="25000"
          max="100000000"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Status
        </label>
        <input
          type="text"
          className="form-control"
          id="status"
          name="status"
          value={editedProperty.status || ""}
          onChange={handleChange}
          required
          pattern="FOR SALE|SOLD"
        />
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onClose()}>
          Cancel
        </button>
       
      </div>
    </form>
        </>
     );
}
 
export default PropertyEditForm;