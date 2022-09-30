import React, { createRef, useRef } from "react";
import { useEffect } from "react";

import "./MenuBlock.scss";

const MenuBlock = ({ data }) => {
  let title = useRef(null);
  const [elRefs, setElRefs] = React.useState([]);
  useEffect(() => {
    setElRefs((elRefs) =>
      Array(data.content.menu.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [data]);

  useEffect(() => {
    title.current.innerHTML = data?.content?.title || "";

    if (elRefs.length) {
      data.content.menu.forEach((item, i) => {
        elRefs[i].current.innerHTML = item;
      });
    }
  }, [data, title, elRefs]);

  return (
    <div className="menu__block">
      <h2 className="menu__title" ref={title}>
        {data.content?.title || ""}
      </h2>
      <ul className="menu__list">
        {data.content.menu.map((item, index) => (
          <li
            className={`list__item list__item-${index}`}
            ref={elRefs[index]}
            key={index + "item"}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBlock;
