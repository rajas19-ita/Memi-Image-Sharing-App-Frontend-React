import { useState } from "react";
import Button from "../components/Button";
import Gallery from "../components/Gallery";
import { FaPlus } from "react-icons/fa";
import AddImageModal from "../components/AddImageModal";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useFetchImagesQuery } from "../store";

function UserGallery() {
    const user = useSelector((state) => state.user.data);
    const [showAddModal, setShowAddModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const { data, isFetching, error } = useFetchImagesQuery({
        user,
        page,
        pageSize,
    });

    return (
        <>
            <Navbar />
            <div className="flex flex-col px-6">
                <div className="self-center py-5">
                    <Button
                        onClick={() => {
                            setShowAddModal(true);
                        }}
                        className=""
                        updateBtn
                    >
                        <FaPlus />
                        Add Image
                    </Button>
                    {showAddModal && (
                        <AddImageModal onClose={() => setShowAddModal(false)} />
                    )}
                </div>
                <Gallery
                    isLoading={isFetching}
                    imagesData={data}
                    error={error}
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                />
            </div>
        </>
    );
}

export default UserGallery;
