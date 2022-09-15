import React from "react";

import "./ImageBlock.scss"; 

const ImageBlock = ({ data }) => {
  console.log(data);

  return (
    <div className="image__block">
      {data.content.length ? (
        data.content.map((img, idx) => (
          <div className="block__picture" key={idx + "img"}>
            <img src={img.img || "not yet uploaded"} alt="img-block" />
            <p>{img?.description}</p>
          </div>
        ))
      ) : (
        <p>Images not found</p>
      )}
    </div>
  );
};

export default ImageBlock;
