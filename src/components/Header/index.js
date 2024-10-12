import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import luck from "../../assets/luck.png";
import logo_company from "../../Image/Logo-removebg-preview.png";
import ButtonLogout from "../ButtonLogout";
export default function Header(props) {
  const [username, setUsername] = useState("")
  useEffect(() => {
    const user = localStorage.getItem("username")
    setUsername(user)
  }, [])
  return (
    <>
      <div className="container__header">
        <div className="header__lef ">
          <img src={logo_company} className="" alt="logo HauPV Store" />
        </div>
        <div className="header__mid">
          <div className="mid__title flex">
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>{props.title}</p>
            <ButtonLogout/>
          </div>
        </div>
        <div className="header__rig">
          <div className="logo">
            <img src={luck} alt="logo HauPV Store" />
          </div>
          <div className="inventory__name">
            <h1>{username}</h1>
            <FontAwesomeIcon className="caret__down" icon={faCaretDown} />
          </div>
          <div className="inventory__announce flex">
            <FontAwesomeIcon className="inventory__bell" icon={faBell} />
          </div>
        </div>
      </div>
    </>
  );
}
