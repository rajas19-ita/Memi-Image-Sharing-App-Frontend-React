function GalleryImage({ img }) {
    return (
        <div className="w-full aspect-square rounded border-2 bg-slate-100">
            <img src={img} className="w-full h-full object-cover rounded" />
        </div>
    );
}

export default GalleryImage;
