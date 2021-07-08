import React, { useState } from "react";

import "./image-upload.scss";

const ImageUpload = ({image, addImage, removeImage}) => {

  const [error, setError] = useState("");

  const validateImage = ({ target: { name, value } }) => {};

  const uploadImageFile = ({ target: { files } }) => {
    if (files[0]?.size / 1024 > 4000) {
      setError("Maximum size 4MB");
    } else if (!/image\/.*/.test(files[0].type)) {
      setError("Invalid file type: Images only");
    } else {
      addImage(URL.createObjectURL(files[0]));
      if (error) setError("");
    }
  };

  const uploadImageUrl = (e) => {
    e.preventDefault();
    if (!image) {
      addImage(document.querySelector("#image-url").value);
    } else {
      setError("An image is already set");
    }
  };

  return (
    <div className="image-upload mb-5">
      <div className="form-group">
        <label for="exampleFormControlFile1">Example file input</label>
        <input
          type="file"
          className="form-control-file"
          id="exampleFormControlFile1"
          onChange={uploadImageFile}
          disabled={image}
        />

        {image?.type==='file' && (
          <p
            onClick={() => {
              document.querySelector("#exampleFormControlFile1").value = "";
              removeImage();
            }}
          >
            X Remove image
          </p>
        )}
      </div>

      <div className="col-auto">
        <label className="sr-only" for="image-url">
          Image url
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <input
            type="text"
            className="form-control"
            id="image-url"
            placeholder="Enter image url"
          />
          <button onClick={uploadImageUrl}>Upload</button>
        </div>
        {image?.type==='url' && 
        <>
        <small>{image.content}</small>
        <p onClick={()=>removeImage()}>X remove</p>
        </>
        }
      </div>
      {error && <small>{error}</small>}
    </div>
  );
};

export default ImageUpload;
