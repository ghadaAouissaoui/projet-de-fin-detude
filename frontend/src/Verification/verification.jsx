import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";

const EmailVerifySecretaire = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams(); 
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/veto/secretaire/${param.id}/verify/${param.token}`; // Fixed the URL format
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="container mx-auto h-screen flex items-center justify-center flex-col">
      {validUrl ? (
        <div className="text-center">
          <img src={success} alt="Success" className="mb-4" />
          <h1 className="text-3xl font-bold mb-2">Email verified successfully</h1>
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1 className="text-3xl font-bold">404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerifySecretaire;
