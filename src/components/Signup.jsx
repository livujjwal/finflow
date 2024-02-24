import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, setDoc, getDoc, provider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../utils/ThemeContext";
const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail() {
    setLoading(true);
    if (!name && !email && password.length > 5 && confirmPassword.length > 5)
      toast.error("All fields are mantadory");

    if (password !== confirmPassword) toast.error("Password must be same");
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          createDoc(user);
          toast.success("User Sign Up Successfully");
          setConfirmPassword("");
          setEmail("");
          setName("");
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
  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : photoURL,
          createdAt: new Date(),
        });
        toast.success("User Created");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("User Already Have Exist Please Login");
    }
  }

  function handleGoogleSignUp() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        createDoc(user);
        setLoading(false);
        toast.success("User Sign Up Successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(error.message);
      });
  }

  return (
    <div className="w-screen h-[90vh] flex items-center justify-center mt-4">
      <div
        className={
          theme === "dark"
            ? "w-[60%] shadow-5xl max-w-[450px] auto bottom-4 shadow-current[#247A4D] py-4 px-10 text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B] flex flex-col  rounded-md "
            : "w-[60%] max-w-[450px] shadow-4xl  bottom-4 py-4 px-10 flex flex-col  rounded-md "
        }
      >
        <h2 className="text-center font-medium">
          Sign Up on{" "}
          <span className={theme === "dark" ? "text-[#e6e6e6]" : "text-theme"}>
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
            label={"Full Name"}
            type={"text"}
            state={name}
            setState={setName}
            placeholder={"John Doe"}
          />
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
          <Input
            SameSite="None"
            label={"Confirm Password"}
            type={"password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Confirm Password"}
          />
          <Button
            text={loading ? "Loading.." : "Signup With Email"}
            blue={false}
            onClick={signupWithEmail}
          />
        </form>
        <p className="text-center mt-4">Or</p>
        <Button
          disabled={loading}
          text={loading ? "Loading.." : "Signup With Google"}
          blue={true}
          onClick={handleGoogleSignUp}
        />
        <p
          className="text-center text-sm my-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Or Have An Account Already?{" "}
          <span
            className={
              theme === "dark"
                ? "text-[#D8DED6] hover:text-white"
                : "text-theme"
            }
          >
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
