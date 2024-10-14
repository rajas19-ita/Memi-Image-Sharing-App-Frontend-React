import { useState } from "react";
import Button from "../components/Button";
import GalleryImage from "../components/GalleryImage";
import { FaPlus } from "react-icons/fa";
import ImageUploadModal from "../components/ImageUploadModal";
import Navbar from "../components/Navbar";

function UserGallery() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [imageList, setImageList] = useState([]);

    const handleAddImg = (img) => {
        setImageList((imageList) => [img, ...imageList]);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col px-6">
                <div className="self-center py-4">
                    <Button
                        onClick={() => {
                            setShowUploadModal(true);
                        }}
                        updateBtn
                    >
                        <FaPlus />
                        Add Image
                    </Button>
                    {showUploadModal && (
                        <ImageUploadModal
                            onClose={() => setShowUploadModal(false)}
                            onAdd={handleAddImg}
                        />
                    )}
                </div>
                <div className="flex py-3 gap-6 flex-wrap">
                    {imageList.map((img, i) => (
                        <GalleryImage key={i} img={img} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserGallery;
