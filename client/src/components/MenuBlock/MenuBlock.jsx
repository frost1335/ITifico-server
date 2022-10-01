import React, { useEffect, useRef } from "react";

import "./MenuBlock.scss";

export const MenuItem = ({ item }) => {
  const text = useRef(null);

  useEffect(() => {
    text.current.innerHTML = item || "";
  });

  return (
    <li className={`list__item`} key={"item"} ref={text}>
      {item || ""}
    </li>
  );
};

const MenuBlock = ({ data }) => {
  return (
    <div className="menu__block">
      <h2 className="menu__title">{data.content?.title || ""}</h2>
      <ul className="menu__list">
        {data.content.menu.map((item, index) => (
          <MenuItem item={item} key={index + "item"} />
        ))}
      </ul>
    </div>
  );
};

export default MenuBlock;
