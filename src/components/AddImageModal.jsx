import ReactDom from "react-dom";
import { FaImage, FaPlus, FaRegWindowClose } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddImageMutation } from "../store";
import { toast } from "react-toastify";
import TagSelectInput from "./TagSelectInput";

function AddImageModal({ onClose }) {
    const [previewImg, setPreviewImg] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const user = useSelector((state) => state.user.data);
    const [addImage, { error, isLoading }] = useAddImageMutation();
    const [vError, setVError] = useState(null);
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState({ length: 0, tags: {} });

    const handleTagSelect = (tag) => {
        setSelectedTags((prev) => ({
            length: prev.length + 1,
            tags: {
                ...prev.tags,
                [tag.id]: tag,
            },
        }));
    };

    const handleTagRemove = (tag) => {
        if (selectedTags.tags[tag.id]) {
            setSelectedTags((prev) => {
                const { [tag.id]: _, ...rest } = prev.tags;
                return { length: prev.length - 1, tags: { ...rest } };
            });
        }
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        setImgFile(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setPreviewImg(reader.result);
        });
    };

    const handleAddImage = async (e) => {
        setVError(null);
        let titleT = title.trim();

        if (titleT.length < 3) {
            return setVError("Title length must be atleast 3 characters long");
        } else if (titleT.length > 60) {
            return setVError("Title length must be atmost 60 characters long");
        }

        if (selectedTags.length === 0) {
            return setVError("At least one tag should be selected");
        }

        const formData = new FormData();
        formData.append("image", imgFile);
        formData.append("title", titleT);
        formData.append("tags", JSON.stringify(Object.keys(selectedTags.tags)));

        try {
            await addImage({ user, formData }).unwrap();
            toast.success("Image added successfully!", {
                position: "top-center",
                autoClose: 2000,
            });
            onClose();
        } catch (error) {
            setVError(null);
        }
    };

    return ReactDom.createPortal(
        <>
            <div className="fixed h-screen w-screen inset-0 bg-gray-950 bg-opacity-50 z-30"></div>
            <div
                className="absolute top-3 left-1/2 -translate-x-1/2  bg-white 
        shadow-md w-full max-w-3xl p-5 rounded-md z-40 flex flex-col gap-4"
            >
                <Button onClick={onClose} className="self-end !px-1 !py-1">
                    <FaRegWindowClose size={22} className=" text-gray-600" />
                </Button>
                <div className="w-full grid grid-cols-2 gap-6">
                    <div className="w-full aspect-square bg-slate-100 rounded flex justify-center items-center">
                        {previewImg ? (
                            <img
                                src={previewImg}
                                className="w-full h-full object-contain rounded"
                            />
                        ) : (
                            <div className="flex flex-col items-center">
                                <FaImage size={30} />
                                <input
                                    id="addImg"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="addImg"
                                    className=" cursor-pointer"
                                >
                                    Select Image
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="titleInput" className="">
                                    Title
                                </label>
                                <input
                                    id="titleInput"
                                    type="text"
                                    className="border-2 py-1.5 px-2 rounded "
                                    placeholder="Enter title here"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <TagSelectInput
                                selectedTags={selectedTags}
                                onTagSelect={handleTagSelect}
                                onTagRemove={handleTagRemove}
                            />
                        </div>
                        <div className=" flex flex-col gap-2">
                            {vError && <p className="text-red-500">{vError}</p>}
                            {error && error.data && (
                                <p className="text-red-500">
                                    {error.data.message}
                                </p>
                            )}
                            <Button
                                onClick={handleAddImage}
                                className="justify-center"
                                isLoading={isLoading}
                                isDisabled={!imgFile}
                                updateBtn
                            >
                                <FaPlus />
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default AddImageModal;
