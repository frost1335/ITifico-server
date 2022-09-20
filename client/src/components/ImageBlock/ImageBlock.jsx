import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetImagesQuery } from "../../services/imagesApi";

import "./ImageBlock.scss";

const ImageBlock = ({ data, index }) => {
  const { articleId } = useParams();
  const { data: imageList, isLoading } = useGetImagesQuery();
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      let imageClone = imageList?.data.filter((img, index) => {
        return img.index === index && img.parentId === articleId;
      });

      console.log(imageList);

      setImage([...imageClone]);
    }
  }, [isLoading, imageList, articleId]);

  return (
    <div className="image__block">
      {data.content.length ? (
        data.content.map((img, idx) => (
          <div className="block__picture" key={idx + "img"}>
            <img
              src={
                image?.find((img) => img.idx === idx)?.file ||
                "not yet uploaded"
              }
              alt="img-block"
            />
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
