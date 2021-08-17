import React, { useState, useRef, useEffect } from "react";
import { validationsAPI } from "../../DAL/validations";

const ImageUpload = ({ images: urls, setImagesInFormState, errors }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (uploadedImages) {
      displayUploadedImages();
    }
  }, [uploadedImages]);

  const displayUploadedImages = () => {
    const previews = [];
    uploadedImages.forEach((uploadedImage) => {
      const objectUrl = URL.createObjectURL(uploadedImage);
      previews.push(objectUrl);
    });
    setPreview(previews);
  };

  const popImage = ({ target: { id } }) => {
    const imagesArr = uploadedImages.filter((uploadedImage) => uploadedImage.name !== id);
    setUploadedImages(imagesArr);
    setImagesInFormState(imagesArr);
  };

  const handleChange = ({ target: { files } }) => {
    setError("");

    if (files.length > 4) return setError("Maximum 4 images");

    if (files.length) {
      const imagesArr = [];

      try {
        Array.from(files).forEach((file) => {
          validationsAPI.image(file);
          imagesArr.push(file); // local component
        });
      } catch (error) {
        setError(error.message);
      }
      setUploadedImages(imagesArr);
      setImagesInFormState(imagesArr);
    }
  };

  return (
    <div className="image-upload mb-5">
      <div className="custom-file mb-4">
        <input
          type="file"
          name="images"
          className="custom-file-input"
          id="customFile"
          onChange={handleChange}
          accept="image/*"
          multiple={true}
        />
        <label htmlFor="customFile" className="custom-file-label">
          Select File
        </label>
      </div>
      <br />
      <small>{error}</small>

      <div className="row justify-content-between">
        {uploadedImages.length
          ? uploadedImages.map((image, i) => (
              <div className="image-preview" key={image.name}>
                <img src={preview[i]} alt="" />
                <div className="pannel">
                  <i className="fas fa-trash-alt text-danger" onClick={popImage} id={image.name}></i>
                </div>
              </div>
            ))
          : urls.map((url, i) => (
              <div className="image-preview" key={url}>
                <img src={`${process.env.REACT_APP_SERVER_PATH}/${url}`} alt="" />
              </div>
            ))}
      </div>
      <small>{errors}</small>
    </div>
  );
};

export default ImageUpload;
