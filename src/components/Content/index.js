import React from "react";
import "./Content.css";
export default function Content({component: Component}) {
  return (
    <>
      <div className="content">
        {Component && <Component/>}
      </div>
    </>
  );
}
