import React, { useState } from "react";

function UploadImage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Vehicle Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={image}
            alt="Uploaded"
            width="400"
            style={{ borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadImage;