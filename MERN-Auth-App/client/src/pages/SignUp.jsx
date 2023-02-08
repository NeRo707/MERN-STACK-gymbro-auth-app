import React from "react";
import { useState } from "react";
import { useSignUp } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignUp();


  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);

  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label htmlFor="">Email:</label>

      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <label htmlFor="">Password:</label>

      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">
        {error}
      </div>}
    </form>
  );
};

export default SignUp;
