import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Link = ({ className = "", href = "", text }) => {


  const navigate = useNavigate();



  return (
    <div className={classNames("underline capitalize text-sm cursor-pointer", className)} onClick={()=>navigate(href)}>
      {text}
    </div>
  );
};

export default Link;
