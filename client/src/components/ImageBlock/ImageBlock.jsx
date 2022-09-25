import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetImagesQuery } from "../../services/imagesApi";

import "./ImageBlock.scss";

const ImageBlock = ({ data, index, component }) => {
  const { lessonId, articleId } = useParams();
  const { data: imageList, isLoading } = useGetImagesQuery(component);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      let imageClone = imageList?.data.filter((img) => {
        return img.parentId === lessonId || articleId;
      });

      imageClone = imageClone.filter((img) => img.index === index);

      setImage([...imageClone]);
    }
  }, [isLoading, imageList, lessonId]);

  return (
    <div className="image__block">
      {data.content.length ? (
        data.content.map((img, idx) => (
          <div className="block__picture" key={idx + "img"}>
            <img
              src={
                process.env.REACT_APP_BASE_URL +
                  "/Uploads/" +
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
