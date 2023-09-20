import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearErrors, login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [passVisible, setPassVisible] = useState(false);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading } = useSelector((state) => state.user);

  const handleEye = () => {
    if (passVisible) {
      setPassVisible(false);
      setType("password");
    } else {
      setPassVisible(true);
      setType("text");
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      } else {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    }
  };

  return (
    <div className=" mt-5 font-sans">
      <Link to="/" className="">
        <img
          className="w-24 mx-auto object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="w-[340px] p-4 mx-auto mt-5 border-2 border-slate-300 hover:shadow-xl">
        <h3 className="text-3xl py-2">Sign-In</h3>
        <form onSubmit={loginUser}>
          <div className="py-2">
            <label className="text-sm font-medium block p-1" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[15px] focus:outline-none p-1 border-2 border-gray-300"
            />
          </div>
          <div className="py-2 relative">
            <label
              className=" block font-medium p-1 text-sm"
              htmlFor="password"
            >
              Password
            </label>

            <input
              type={type}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-slate-300 text-[15px]  focus:outline-none p-1"
            />

            <span className="absolute  right-2 cursor-pointer bottom-4">
              {passVisible ? <GoEyeClosed /> : <GoEye />}
            </span>
          </div>
          <button
            type="submit"
            className="text-sm bg-yellow-400 w-full py-1.5 border-[1px] border-black mt-2"
          >
            Sign in
          </button>
        </form>
        <p className="text-right py-1 text-[15px] cursor-pointer text-blue-900">
          Forget password
        </p>
        <p className="font-sans leading-5 text-sm p-1">
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>
        <Link
          to="/signup"
          className="text-sm border-[1px] border-[#444] bg-slate-200 px-4 block text-center py-1.5 mt-2"
        >
          Create Your Amazon Account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
