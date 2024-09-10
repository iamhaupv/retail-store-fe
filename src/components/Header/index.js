import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import luck from "../../assets/luck.png"
import logo_pokemon from "../../assets/heineken.png"
export default function Header() {
  return (
    <>
      <div className="container__header">
        <div className="header__lef">
          <img src={logo_pokemon} alt="logo HauPV Store"/>
        </div>
        <div className="header__mid">
          <div className="mid__content">
            <FontAwesomeIcon className="arrow__left" icon={faArrowLeft} />
            <h3>Kho</h3>
            <span>Dashboard</span>
            <a href="#">Kho</a>
          </div>
        </div>
        <div className="header__rig">
          <div className="logo">
            <img src ={luck} alt="logo HauPV Store"/>
          </div>
          <div className="inventory__name">
            <h1>HauPV Store</h1>
            <FontAwesomeIcon className="caret__down" icon={faCaretDown} />
          </div>
          <div className="inventory__announce">
            <FontAwesomeIcon className="inventory__bell" icon={faBell} />
          </div>
        </div>
      </div>
    </>
  );
}
