import pikachuImg from "../assets/pikachu.jpg";
import squirtleImg from "../assets/squirtle.jfif";
import bulbasaurImg from "../assets/bulbasaur.jfif";

function GalleryImage({ img }) {
    return (
        <div className="w-56 h-56 rounded border-2 bg-slate-100">
            <img src={img} className="w-full h-full object-contain rounded" />
        </div>
    );
}

export default GalleryImage;
