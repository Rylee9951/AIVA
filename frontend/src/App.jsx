import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import './App.css'

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {!user ? (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Decoded user:", decoded);
            setUser(decoded);
            navigate("/home", { state: { user: decoded } });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold">Welcome {user.name}</h1>
          <img
            src={user.picture}
            alt="profile"
            className="w-16 h-16 rounded-full mt-2"
          />
          <p className="text-gray-600">{user.email}</p>
        </div>
      )}
    </div>
  )
}

export default App
