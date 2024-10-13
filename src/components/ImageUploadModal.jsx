import ReactDom from "react-dom";
import { FaImage, FaPlus, FaRegWindowClose } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";

function ImageUploadModal({ onClose, onAdd }) {
    const [previewImg, setPreviewImg] = useState(null);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setPreviewImg(reader.result);
        });
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
                    onClick={() => {
                        onAdd(previewImg);
                        onClose();
                    }}
                    className="justify-center"
                    updateBtn
                >
                    <FaPlus />
                    Add
                </Button>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default ImageUploadModal;
