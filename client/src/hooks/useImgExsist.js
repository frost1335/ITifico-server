import { useEffect, useState } from "react";

export const useImgExsist = (img) => {
  const [imgExsist, setImgExsist] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (img) {
        await fetch(process.env.REACT_APP_BASE_URL + `/Uploads/${img}`).then(
          (res) => (res.ok ? setImgExsist(true) : setImgExsist(false))
        );
      } else {
        setImgExsist(false);
      }
    };
    fetchImage();
  }, [img]);

  return imgExsist;
};
