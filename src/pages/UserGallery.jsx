import { useEffect, useState } from "react";
import Button from "../components/Button";
import Gallery from "../components/Gallery";
import { FaUpload } from "react-icons/fa";
import ImageUploadModal from "../components/ImageUploadModal";
import Navbar from "../components/Navbar";
import useFetchImages from "../hooks/useFetchImages";

function UserGallery() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const { isLoading, imagesData, error, page, setPage, triggerRefetch } =
        useFetchImages();

    return (
        <>
            <Navbar />
            <div className="flex flex-col px-6">
                <div className="self-center py-5">
                    <Button
                        onClick={() => {
                            setShowUploadModal(true);
                        }}
                        className="gap-2.5 px-4"
                        updateBtn
                    >
                        <FaUpload size={18} />
                        Upload Image
                    </Button>
                    {showUploadModal && (
                        <ImageUploadModal
                            onClose={() => setShowUploadModal(false)}
                            onUpload={() => {
                                triggerRefetch();
                            }}
                        />
                    )}
                </div>
                <Gallery
                    isLoading={isLoading}
                    imagesData={imagesData}
                    error={error}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </>
    );
}

export default UserGallery;
