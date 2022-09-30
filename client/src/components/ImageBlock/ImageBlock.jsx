import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetImagesQuery } from "../../services/imagesApi";

import "./ImageBlock.scss";

const ImageBlock = ({ data, index, component }) => {
  const { lessonId, articleId } = useParams();
  const { data: imageList, isLoading } = useGetImagesQuery(component);
  const [image, setImage] = useState([]);
  const [elRefs, setElRefs] = React.useState([]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(data.content.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [data]);

  useEffect(() => {
    if (elRefs.length) {
      data.content.forEach((img, i) => {
        elRefs[i].current.innerHTML = img?.description || "";
      });
    }
  }, [data, elRefs]);

  console.log(elRefs);

  useEffect(() => {
    if (!isLoading) {
      let imageClone = imageList?.data.filter((img) => {
        if (component === "article") {
          return img.parentId === articleId;
        }
        if (component === "lesson") {
          return img.parentId === lessonId;
        }
      });

      imageClone = imageClone.filter((img) => img.index === index);

      setImage([...imageClone]);
    }
  }, [isLoading, imageList, lessonId]);

  useEffect(() => {}, []);

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
            <p ref={elRefs[idx]}>{img?.description}</p>
          </div>
        ))
      ) : (
        <p>Images not found</p>
      )}
    </div>
  );
};

export default ImageBlock;
