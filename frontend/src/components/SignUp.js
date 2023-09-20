import React, { useState } from "react";
import "./SignUp.css";
import { register } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/favicon.png");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        };
      } else {
        setAvatar("");
      }
    } else {
      let name = e.target.name;
      setProfile({ ...profile, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = profile;
    if (name && email && password) {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("avatar", avatar);
      dispatch(register(myForm));
      console.log("Form submited", avatar);
    }
  };
  return (
    <div class="w-full  h-auto overflow-scroll block h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex flex-col items-center justify-center">
      <Link to="/" className="block pt-[50px]">
        <img
          className="w-24 py-6 mx-auto object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div class="bg-white py-6 px-10 sm:max-w-md w-full ">
        <div class="sm:text-3xl text-2xl font-semibold text-center text-yellow-600  mb-12">
          Registration Form
        </div>

        <div class="">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                required
                value={profile.name}
                onChange={handleChange}
                class="focus:outline-none border-b w-full pb-2 border-yellow-400 placeholder-gray-500"
                placeholder="Name "
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                value={profile.email}
                onChange={handleChange}
                class="focus:outline-none border-b w-full pb-2 border-yellow-400 placeholder-gray-500 my-8"
                placeholder="Eamil Adress "
              />
            </div>
            <div class="">
              <input
                type="password"
                name="password"
                required
                value={profile.password}
                onChange={handleChange}
                class="focus:outline-none border-b w-full pb-2 border-yellow-400 placeholder-gray-500 mb-8"
                placeholder="Password "
              />
            </div>
            <div className="flex">
              <BsPersonCircle className="text-3xl text-[#777] mx-1" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div class="flex justify-center my-6">
              <button
                type="submit"
                disabled={isDisabled}
                class=" rounded p-3 w-full sm:w-56 bg-yellow-600  text-white text-lg font-semibold "
              >
                Create Account
              </button>
            </div>
          </form>
          <div class="flex justify-center ">
            <p class="text-gray-500">Already have an acount? </p>
            <Link to="/login" class="text-sky-600 pl-2">
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
