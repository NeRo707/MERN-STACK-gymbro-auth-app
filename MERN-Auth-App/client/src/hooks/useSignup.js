import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  // sign up user with email and password
  const signup = async (email, password) => {  
    setIsLoading(true); // set isLoading to true
    setError(null); // reset error state
    const response = await fetch("/api/user/signup", { // 
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); //convert response to json

    if (!response.ok) { // if response is not ok
      setIsLoading(false); // set loading state to false
      setError(json.error); // set error state to json.error
    }
    if (response.ok) { // if response is ok
      // save the user to localStorage
      localStorage.setItem("user", JSON.stringify(json)); // set user in local storage

      dispatch({ type: "LOGIN", payload: json }); // dispatch login action
      
      setIsLoading(false); // stop loading
    }
  };

  return { signup, isLoading, error };
};
