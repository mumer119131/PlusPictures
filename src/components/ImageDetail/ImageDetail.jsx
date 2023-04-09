import React from "react";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { getPhoto } from "../../utils/ApiCalls";
import SmallGallery from "../SmallGallery/SmallGallery";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageDetail = ({ query, id, image, setImage, setAlt }) => {
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [videoQuality, setVideoQuality] = React.useState(null);
  const navigate = useNavigate();
  const getImage = async () => {
    const newImage = await getPhoto(id);
    if (newImage.data.type === "video") {
      setVideoQuality(newImage.data.video[0]);
    }
    console.log(newImage);
    setAlt(newImage.data.alt);
    setImage(newImage);
  };
  React.useEffect(() => {
    getImage();
  }, []);
  function downloadImage(url) {
    setStatus("Downloading...");
    axios({
      url: image.data.main_img ? image.data.main_img : videoQuality.link,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const objectUrl = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = `${id}.${image.data.type === "image" ? "jpg" : "mp4"}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
        setStatus("Downloaded");
      })
      .catch((error) => console.error(error));
  }
  const goBack = () => {
    navigate(-1);
    window.location.reload();
  };
  return (
    <div>
      {query && (
        <h1 className="text-4xl font-bold mt-[5rem]">
          Search Results for "{query}"
        </h1>
      )}
      {/* <h3 className='flex items-center text-primary font-bold gap-1 mt-2 cursor-pointer' onClick={goBack}><RxDoubleArrowLeft className='inline font-bold' /> Back</h3> */}
      {image && (
        <div className="flex mt-8 flex-wrap">
          {image.data.type === "image" ? (
            <img
              src={image.data.main_img}
              className="sm:max-w-[100%] lg:max-w-[60%] h-[40rem]"
              alt=""
            />
          ) : (
            <video
              controls
              className="sm:max-w-[100%] lg:max-w-[60%] h-[40rem]"
            >
              {image.data.video.map((video, index) => {
                return <source src={video.link} key={index} type="video/mp4" />;
              })}
            </video>
          )}
          <div className="p-8 sm:w-[100%] lg:w-[30%]">
            <a
              href={image.data.user_url}
              target="_blank"
              className="flex items-center gap-2"
            >
              <img
                src={image.data.user_img}
                alt="user_img"
                className="rounded-[50%] w-[3rem]"
              />

              <div>
                <h2 className="text-sm">
                  <b>{image.data.user}</b>
                </h2>
                <h2 className="text-xs">1214 Pictures</h2>
              </div>
            </a>
            <a
              href={image.data.url}
              target="_blank"
              className="bg-primary mt-4 text-white px-12 py-2 rounded-full block w-max"
            >
              Free Download
            </a>
            <h2 className=" font-semibold text-2xl mt-6 mb-4">
              Other free {image.data.type === "image" ? "Images" : "Videos"}
            </h2>
            <SmallGallery
              images={galleryImages}
              setImages={setGalleryImages}
              selectedResource={image.data.type == "image" ? "Fotos" : "Videos"}
              query={image.data.alt}
            />
            <a
              href={
                image.data.id.slice(-2) === "us"
                  ? "https://www.unsplash.com"
                  : image.data.id.slice(-2) === "px"
                  ? "https://www.pexels.com"
                  : "https://www.pixabay.com"
              }
              target="_blank"
              className="underline mt-4 text-sm"
            >
              See more free pictures on{" "}
              {image.data.id.slice(-2) === "us"
                ? "www.unsplash.com"
                : image.data.id.slice(-2) === "px"
                ? "www.pexels.com"
                : "www.pixabay.com"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
