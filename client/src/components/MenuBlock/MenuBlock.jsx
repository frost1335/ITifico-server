import React from "react";

import "./MenuBlock.scss";

const MenuBlock = ({ data }) => {
  console.log(data);

  return (
    <div className="menu__block">
      <h2 className="menu__title">{data.content.title}</h2>
      <ul className="menu__list">
        {data.content.menu.map((item, index) => (
          <li className="list__item" key={index + "item"}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBlock;
