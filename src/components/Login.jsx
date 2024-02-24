import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, provider, setDoc } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function loginWithEmail() {
    setLoading(true);
    if (!email && password.length > 5) toast.error("All fields are mantadory");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In Successfully");
          setEmail("");
          setPassword("");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error(error.message);
          setLoading(false);
        });
    }
  }
  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success("User Logged In Successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(error.message);
      });
  }
  return (
    <>
      <div className="w-screen h-[90vh] flex items-center justify-center">
        <div
          className={
            theme === "dark"
              ? "w-[60%] shadow-5xl max-w-[450px] auto bottom-4 py-4 px-10 text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B] flex flex-col  rounded-md "
              : "w-[60%] max-w-[450px] auto shadow-4xl bottom-4 py-4 px-10 flex flex-col  rounded-md "
          }
        >
          <h2 className="text-center font-medium">
            Login on{" "}
            <span
              className={theme === "dark" ? "text-[#e6e6e6]" : "text-theme"}
            >
              FinFlow
            </span>
          </h2>
          <form
            className="gap-4"
            type="submit"
            onClick={(e) => e.preventDefault()}
          >
            <Input
              SameSite="None"
              label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              SameSite="None"
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Your Password"}
            />
            <Button
              text={loading ? "Loading.." : "Login With Email"}
              blue={false}
              onClick={loginWithEmail}
            />
          </form>
          <p className="text-center my-4">Or</p>
          <Button
            disabled={loading}
            text={loading ? "Loading.." : "Login With Google"}
            blue={true}
            onClick={handleGoogleLogin}
          />
          <p
            className="text-center text-sm my-4 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Or Don't Have An Account?{" "}
            <span
              className={
                theme === "dark"
                  ? "text-[#D8DED6] hover:text-white"
                  : "text-theme"
              }
            >
              {" "}
              Click Here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
