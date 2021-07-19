import React, { useState, useRef, useEffect } from "react";

const ImageUpload = ({ image_url, addImage, removeImage, errors }) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const handleChange = ({ target: { files } }) => {
    fileInputRef.current.click();
    const file = files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImageFile(file);
      addImage(file);
      setError("");
    } else {
      setImageFile(null);
      setError("Invalid image");
    }
  };

  return (
    <div className="image-upload mb-5">
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={handleChange}
          ref={fileInputRef}
          accept="image/*"
        />
        <label htmlFor="customFile" className="custom-file-label">
          {imageFile?.name ?? image_url ?? "Select File"}
        </label>
      </div>
      <br />
      <small>{error}</small>

      <div className="d-flex justify-content-between">
        <img src={preview ?? `${process.env.REACT_APP_SERVER_PATH}/${image_url}`} alt="" />
        {imageFile && (
          <i
            className="far fa-trash-alt"
            id="11"
            title="instructions"
            index="0"
            onClick={() => {
              removeImage();
              setImageFile(null);
            }}
          ></i>
        )}
      </div>
      <small>{errors}</small>
    </div>
  );
};

export default ImageUpload;
