import React, { useEffect } from "react";
import { MenuList } from "../helpers/MenuList";
import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";
export default function Menu() {
  const navigate = useNavigate();
  const Valid = () => {
    let token = localStorage.getItem("userdbToken");
    if (token) {
      console.log("valid User");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    Valid();
  }, []);
  return (
    <div className="menu">
      <h1 className="menuTittle">Our Menu</h1>
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              name={menuItem.name}
              image={menuItem.src}
              price={menuItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}
