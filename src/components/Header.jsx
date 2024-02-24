import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import userImg from "../assets/user.svg";
import themeImg from "../assets/theme.svg";
import ThemeContext from "../utils/ThemeContext";
const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) navigate("/dashboard");
    else navigate("/");
  }, [user, loading]);
  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("User Logout!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  return (
    <div
      className={
        theme === "dark"
          ? "z-20 bg-theme py-2 px-6 sticky top-0 left-0 w-screen flex justify-between items-center text-[#e6e6e6] bg-gradient-to-tr from-[#0b2c24] to-[#247A4D]"
          : "z-20 bg-theme py-2 px-6 sticky top-0 left-0 w-screen flex justify-between items-center"
      }
    >
      <p className="text-white font-medium ">FinFlow</p>
      <div className="flex items-center gap-4">
        <img
          className="w-6 text-transparent cursor-pointer"
          src={themeImg}
          alt="Theme"
          onClick={() => {
            if (theme === "light") setTheme("dark");
            else setTheme("light");
          }}
        />
        {user && (
          <div className="flex items-center gap-4">
            <img
              className="w-7 rounded-full"
              src={user.photoURL ? user.photoURL : userImg}
              alt="user logo"
            />
            <button
              onClick={handleLogout}
              className="text-white font-medium opacity-80 hover:opacity-100 duration-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
