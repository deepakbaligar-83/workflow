import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";


type Provider = "google" | "github";


const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const Login: React.FC = () => {

  const navigate = useNavigate();  

  const [lastUsed, setLastUsed] = useState<Provider>("google");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

   const handleSubmit = async () => {
          setEmailError("");
          setPasswordError("");

         
          if (!email.trim()) {
            setEmailError("Email is required");
            return;
          }

          
          if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid Gmail address.");
            return;
          }

          
          if (!password.trim()) {
            setPasswordError("Password is required");
            return;
          }

          
          if (!passwordRegex.test(password)) {
            setPasswordError("Invalid password. Please try again.");
            return;
          }

          try {
            const res = await fetch("http://localhost:5000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });

            const data = await res.json();

            if (!res.ok) {
              
              setPasswordError(data.message || "Login failed");
              return;
            }

            localStorage.setItem("token", data.token);

            navigate("/workflows");

            console.log("Login successful", { email });
          } catch (error) {
            console.error(error);
            setPasswordError("Server not reachable");
          }
        };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] font-roboto">
      <div className="w-full max-w-xl bg-white rounded-sm p-10 shadow-sm">
    
        <p className="text-3xl font-medium mb-6">Sign in</p>

        
        <div className="relative mb-3">
                <button
                    onClick={() => setLastUsed("google")}
                    className={`w-[90%] flex items-center justify-center gap-2 py-2 rounded-md font-medium border cursor-pointer
                    ${
                        lastUsed === "google"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                >
                    <GoogleIcon fontSize="small" />
                    Sign in with Google
                </button>

                {lastUsed === "google" && (
                    <span className="absolute left-full -ml-10 top-1/2 -translate-y-1/2 text-sm text-blue-500 whitespace-nowrap">
                    Last used
                    </span>
                )}
                </div>


        
        <div className="relative mb-6">
                <button
                    onClick={() => setLastUsed("github")}
                    className={`w-[90%] flex items-center justify-center gap-2 py-2 rounded-md font-medium border cursor-pointer
                    ${
                        lastUsed === "github"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                >
                    <GitHubIcon fontSize="small" />
                    Sign in with GitHub
                </button>

                {lastUsed === "github" && (
                    <span className="absolute left-full -ml-10 top-1/2 -translate-y-1/2 text-sm text-blue-500 whitespace-nowrap">
                    Last used
                    </span>
                )}
                </div>


       
        <div className="w-[90%] flex items-center gap-3 my-10">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        
        <div className="w-[90%]">
        <div className="mb-4">
            <label className="font-medium block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 outline-none
                ${
                  emailError
                    ? "border-red-600"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
            />
            <p
                className={`text-sm text-red-600 mt-1 transition-all duration-200 ease-out
                    ${emailError ? "opacity-100 max-h-6" : "opacity-0 max-h-0 overflow-hidden"}
                `}
                >
                {emailError}
                </p>

          </div>

          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <label className="font-medium">Password</label>
              <a href="#" className="text-sm text-gray-600 underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 outline-none
                ${
                  passwordError
                    ? "border-red-600"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
            />
            <p
                className={`text-sm text-red-600 mt-1 transition-all duration-200 ease-out
                    ${
                    passwordError
                        ? "opacity-100 max-h-6"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }
                `}
                >
                {passwordError}
                </p>

          </div>

      
        <button onClick={handleSubmit}  className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-opacity-80 cursor-pointer">
          Sign in
        </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
