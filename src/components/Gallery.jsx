import GalleryImage from "./GalleryImage";
import { FaSync, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from "./Button";

function Gallery({ imagesData, isLoading, error, page, pageSize, setPage }) {
    return (
        <div className="flex flex-col gap-3">
            {isLoading ? (
                <div className="self-center py-3">
                    <FaSync className=" animate-spin" size={25} />
                </div>
            ) : error ? (
                error.data && (
                    <p className="self-center py-3 text-red-500">
                        {error.data.message}
                    </p>
                )
            ) : imagesData && imagesData.totalImages === 0 ? (
                <p className="self-center py-3 text-gray-500">
                    No Images Added
                </p>
            ) : (
                <div className="py-3 grid grid-cols-4 gap-6">
                    {imagesData &&
                        imagesData.images.map((img) => (
                            <GalleryImage key={img.id} img={img.url} />
                        ))}
                </div>
            )}
            <div className="flex justify-center gap-2 border-t py-3">
                <Button
                    onClick={() => setPage((prev) => prev - 1)}
                    isDisabled={page === 1}
                    secondaryBtn
                >
                    <FaAngleLeft />
                </Button>
                Page {page} {imagesData && `of ${imagesData.totalPages}`}
                <Button
                    onClick={() => {
                        setPage((prev) => prev + 1);
                    }}
                    isDisabled={
                        !imagesData ||
                        imagesData.totalImages === 0 ||
                        page === imagesData.totalPages
                    }
                    secondaryBtn
                >
                    <FaAngleRight />
                </Button>
            </div>
        </div>
    );
}

export default Gallery;
