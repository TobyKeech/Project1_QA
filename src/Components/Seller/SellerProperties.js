import { useEffect, useState } from 'react';

const SellerProperties = ({  }) => {
  

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch properties based on the sellerId
    fetch(`http://localhost:8081/property/sellerId`)
      .then((response) => response.json())
      .then((properties) => {
        setProperties(properties);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="display-1">Properties Associated with Seller</h1>
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              {/* Display property details */}
              {property.address}, {property.postcode}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SellerProperties;
