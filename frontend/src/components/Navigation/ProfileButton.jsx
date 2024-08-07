import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { IoMenu } from "react-icons/io5";

import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

import "./ProfileButton.css";
import { NavLink, useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const ulRef = useRef();

  const currentUser = useSelector((state) => state.session.user);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    setIsActive(!isActive);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setIsActive(false);
      }
    };

    document.addEventListener("click", closeMenu);

    if (currentUser) {
      setShowMenu(true);
    }

    return () => document.removeEventListener("click", closeMenu);
  }, [currentUser]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button
        onClick={toggleMenu}
        className={isActive ? "button-active" : "button-normal"}
      >
        <IoMenu className="profile-button-lines" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {!user && (
          <>
            <div id="profile-modal-login-signup-container">
              <li>
                <OpenModalButton
                  modalStyling="sign-up-button"
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  modalStyling="log-in-button"
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
            </div>
          </>
        )}
        {user && (
          <>
            <li>Hello, {user.firstName}</li>
            {/* <li>{user.lastName}</li> */}
            <li style={{ borderBottom: "solid 1px #e1e1e1", padding: "5px 0" }}>
              {user.email}
            </li>
            <li>
              <NavLink
                to="/spots/current/"
                style={{ textDecoration: "none", color: "black" }}
              >
                Manage Spots
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews/current/"
                style={{ textDecoration: "none", color: "black" }}
              >
                Manage Reviews
              </NavLink>
            </li>
            {/* <li>ManageSpots</li> */}

            <li>
              <div className="logout-button-container">
                <button
                  className="logout-button"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  Log Out
                </button>
              </div>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
