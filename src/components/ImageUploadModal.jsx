import ReactDom from "react-dom";
import { FaImage, FaUpload, FaRegWindowClose } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function ImageUploadModal({ onClose, onUpload }) {
    const [previewImg, setPreviewImg] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const handleFileChange = (e) => {
        const reader = new FileReader();
        setImgFile(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setPreviewImg(reader.result);
        });
    };

    const handleUpload = async (e) => {
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", imgFile);

        try {
            const response = await fetch(
                "http://localhost:4000/images/upload",
                {
                    method: "post",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }
            setIsLoading(false);
            onUpload();
            onClose();
        } catch (error) {
            setError(error.message ? error : { message: "An error occurred" });
            setIsLoading(false);
        }
    };

    return ReactDom.createPortal(
        <>
            <div className="fixed h-screen w-screen inset-0 bg-gray-950 bg-opacity-50 z-30"></div>
            <div
                className="absolute top-3 left-1/2 -translate-x-1/2  bg-white 
        shadow-md w-full max-w-96 p-4 rounded-md z-40 flex flex-col gap-3"
            >
                <Button onClick={onClose} className="self-end px-1 py-1">
                    <FaRegWindowClose size={20} className=" text-gray-700" />
                </Button>
                <div className="w-full max-w-96 aspect-square mx-auto bg-slate-100 rounded flex justify-center items-center">
                    {previewImg ? (
                        <img
                            src={previewImg}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="flex flex-col items-center absolute">
                            <FaImage size={30} />
                            <input
                                id="uploadImg"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="uploadImg"
                                className=" cursor-pointer"
                            >
                                Select Image
                            </label>
                        </div>
                    )}
                </div>
                <Button
                    onClick={handleUpload}
                    className="justify-center gap-2.5"
                    isLoading={isLoading}
                    isDisabled={!imgFile}
                    updateBtn
                >
                    <FaUpload size={18} />
                    Upload
                </Button>
                {error && <p className="text-red-500">{error.message}</p>}
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default ImageUploadModal;
