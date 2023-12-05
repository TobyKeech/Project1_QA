import { useState, useEffect } from "react";
const SellerEditForm = ({seller, editSellerHandler, onClose}) => {

    const [editedSeller, setEditedSeller] = useState({...seller})
    const [formVisible, setFormVisible] = useState(true);


    useEffect(() => {
        setEditedSeller({...seller})
    }, [seller]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedSeller(( previousSeller) => ({
            ...previousSeller,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editSellerHandler(editedSeller);
        setFormVisible(false);
        onClose();
      };


    return ( 
        <>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label text-black">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={editedSeller.firstName || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="surname" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="surname"
          name="surname"
          value={editedSeller.surname || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label text-black">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={editedSeller.address || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          name="postcode"
          value={editedSeller.postcode || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={editedSeller.phone || ""}
          onChange={handleChange}
          required
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
 
export default SellerEditForm;