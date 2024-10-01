export const uploadToCloudinary = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "growSphere_upload"); // Replace with your Cloudinary preset

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const imageData = await res.json();
    return imageData.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
