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
        <label htmlFor="address" className="form-label text-black">
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
        <label htmlFor="postcode" className="form-label text-black">
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
        <label htmlFor="bedroom" className="form-label text-black">
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
        <label htmlFor="garden" className="form-label text-black">
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
        <label htmlFor="type" className="form-label text-black">
          Type
        </label>
        <select
          className="form-select"
          id="type"
          name="type"
          value={editedProperty.type || ""}
          onChange={handleChange}
          required
        >
           <option value="">Select Type</option>
          <option value="APARTMENT">APARTMENT</option>
          <option value="SEMI">SEMI</option>
          <option value="SEMI-DETACHED">SEMI-DETACHED</option>
          </select>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label text-black">
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
        <label htmlFor="status" className="form-label text-black">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          value={editedProperty.status || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="FOR SALE">FOR SALE</option>
          <option value="SOLD">SOLD</option>
        </select>
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