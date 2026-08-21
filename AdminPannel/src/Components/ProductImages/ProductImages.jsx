import React from "react";

import {
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import { BsCardImage } from "react-icons/bs";

import "./ProductImages.css";

const ProductImages = ({
  images,
  setImages,
}) => {
  const handleFilesChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const validType = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);

      const validSize =
        file.size <= 5 * 1024 * 1024;

      if (!validType) {
        alert(
          `${file.name}: Only JPG, PNG and WEBP are allowed`
        );
        return false;
      }

      if (!validSize) {
        alert(
          `${file.name}: Maximum file size is 5MB`
        );
        return false;
      }

      return true;
    });

    const newImages = validFiles.map(
      (file, index) => ({
        id:
          Date.now() +
          Math.random() +
          index,

        file,

        url: URL.createObjectURL(file),

        isCover:
          images.length === 0 &&
          index === 0,
      })
    );

    setImages((prevImages) => [
      ...prevImages,
      ...newImages,
    ]);

    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(
      e.dataTransfer.files || []
    );

    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const validType = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);

      const validSize =
        file.size <= 5 * 1024 * 1024;

      if (!validType) {
        alert(
          `${file.name}: Only JPG, PNG and WEBP are allowed`
        );
        return false;
      }

      if (!validSize) {
        alert(
          `${file.name}: Maximum file size is 5MB`
        );
        return false;
      }

      return true;
    });

    const newImages = validFiles.map(
      (file, index) => ({
        id:
          Date.now() +
          Math.random() +
          index,

        file,

        url: URL.createObjectURL(file),

        isCover:
          images.length === 0 &&
          index === 0,
      })
    );

    setImages((prevImages) => [
      ...prevImages,
      ...newImages,
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (id) => {
    setImages((prevImages) => {
      const removedImage =
        prevImages.find(
          (img) => img.id === id
        );

      if (removedImage?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(
          removedImage.url
        );
      }

      const filtered = prevImages.filter(
        (img) => img.id !== id
      );

      if (
        filtered.length > 0 &&
        !filtered.some(
          (img) => img.isCover
        )
      ) {
        filtered[0] = {
          ...filtered[0],
          isCover: true,
        };
      }

      return filtered;
    });
  };

  return (
    <div className="product-images-wrapper">
      <div className="product-images-container">
        <div className="product-images-header">
          <div className="product-images-header-icon-box">
            <BsCardImage className="product-images-header-icon" />
          </div>

          <h2 className="product-images-header-title">
            Product Images
          </h2>
        </div>

        <div className="product-images-body">
          <div
            className="product-images-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="product-images-dropzone-content">
              <FiUploadCloud className="product-images-upload-cloud-icon" />

              <p className="product-images-dropzone-text">
                Drag & Drop images here
              </p>

              <span className="product-images-dropzone-or">
                or
              </span>

              <label className="product-images-browse-btn">
                Browse Files

                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFilesChange}
                  className="product-images-file-input"
                />
              </label>

              <p className="product-images-dropzone-formats">
                JPG, PNG, WEBP (Max. 5MB each)
              </p>
            </div>
          </div>

          <div className="product-images-grid">
            {images.map((img) => (
              <div
                className="product-images-card"
                key={img.id}
              >
                <img
                  src={img.url}
                  alt="Product preview"
                  className="product-images-card-img"
                />

                <button
                  type="button"
                  className="product-images-card-remove"
                  onClick={() =>
                    handleRemove(img.id)
                  }
                  aria-label="Remove image"
                >
                  <FiX className="product-images-remove-icon" />
                </button>

                {img.isCover && (
                  <span className="product-images-card-cover-badge">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;