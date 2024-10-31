import { useEffect, useState, useRef } from "react";
import { FaSync, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useFetchTagsQuery, useAddTagMutation } from "../store";
import Button from "./Button";

function TagSelectInput({ selectedTags, onTagSelect, onTagRemove }) {
    const user = useSelector((state) => state.user.data);
    const [page, setPage] = useState(1);
    const [{ tagSearch, dbdTagSearch }, setTagSearch] = useState({
        tagSearch: "",
        dbdTagSearch: "",
    });
    const { data, isFetching, error } = useFetchTagsQuery({
        user,
        page,
        pageSize: 10,
        tagName: dbdTagSearch,
    });
    const [allTags, setAllTags] = useState({});
    const [showDropDown, setShowDropDown] = useState(false);
    const [addTag, { error: tagError, isLoading: addTagLoading, ...rest }] =
        useAddTagMutation();
    const [tagVError, setTagVError] = useState(null);
    const [newTag, setNewTag] = useState("");
    const tagSearchRef = useRef(null);

    const endReached = data && Object.keys(data).length === 0;

    const showTagCreate = page === 1 && endReached && selectedTags.length !== 5;

    useEffect(() => {
        let ignore = false;
        setAllTags({});
        let timeoutId = setTimeout(() => {
            if (!ignore) {
                setPage(1);
                setTagSearch((prev) => ({
                    ...prev,
                    dbdTagSearch: tagSearch,
                }));
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            ignore = true;
        };
    }, [tagSearch]);

    useEffect(() => {
        if (data) {
            setAllTags((prev) => ({
                ...prev,
                ...data,
            }));
        }
    }, [data]);

    useEffect(() => {
        const clickListener = (e) => {
            if (tagSearchRef.current) {
                if (!tagSearchRef.current.contains(e.target)) {
                    setShowDropDown(false);
                }
            }
        };

        document.addEventListener("click", clickListener);

        return () => {
            document.removeEventListener("click", clickListener);
        };
    }, []);

    const handleAddTag = async (e) => {
        setTagVError(null);
        let tag = newTag.trim();

        if (tag.length < 3) {
            return setTagVError("tag length must be at least 3 characters");
        } else if (tag.length > 25) {
            return setTagVError("tag length must be at most 25 characters");
        }
        try {
            const addedTag = await addTag({ user, tagName: tag }).unwrap();
            onTagSelect(addedTag);
            setNewTag("");
            setTagSearch((prev) => ({
                ...prev,
                tagSearch: "",
            }));
            setShowDropDown(false);
        } catch (error) {}
    };

    return (
        <div className="flex flex-col gap-2 relative" ref={tagSearchRef}>
            <div className="flex gap-3 flex-wrap ">
                <label htmlFor="tagInput" className="">
                    Tags
                </label>
                {Object.entries(selectedTags.tags).map(([id, tag]) => (
                    <span
                        className="px-2 py-0.5 pb-1 rounded-sm bg-sky-500 font-medium text-white flex gap-1
                        items-center"
                        key={id}
                    >
                        {tag.tagName}
                        <Button
                            className="!px-0 !py-0 !pt-1 text-white font-medium"
                            onClick={() => onTagRemove(tag)}
                        >
                            <IoClose size={18} />
                        </Button>
                    </span>
                ))}
            </div>
            <input
                id="tagInput"
                type="text"
                className="border-2 py-1.5 px-2 rounded "
                placeholder="Select tags"
                value={tagSearch}
                onFocus={() => setShowDropDown(true)}
                onChange={(e) =>
                    setTagSearch((prev) => ({
                        ...prev,
                        tagSearch: e.target.value,
                    }))
                }
                onClick={() => setShowDropDown(true)}
            />
            {showDropDown && (
                <div className="w-full max-w-60 h-36 overflow-y-scroll absolute top-full bg-white shadow-md rounded flex flex-col gap-2 p-4">
                    {!showTagCreate ? (
                        <>
                            {Object.entries(allTags).map(([id, tag]) => (
                                <p
                                    key={id}
                                    className={`cursor-pointer ${
                                        selectedTags.tags[id]
                                            ? " text-gray-300 "
                                            : " text-gray-700 "
                                    }`}
                                    onClick={() => {
                                        if (
                                            !selectedTags.tags[id] &&
                                            selectedTags.length !== 5
                                        ) {
                                            onTagSelect(tag);
                                            setTagSearch((prev) => ({
                                                ...prev,
                                                tagSearch: "",
                                            }));
                                        }
                                    }}
                                >
                                    {tag.tagName}
                                </p>
                            ))}
                            {error && (
                                <p className="self-center text-red-500">
                                    {error.data
                                        ? error.data.message
                                        : "An error occurred"}
                                </p>
                            )}

                            <Button
                                className="self-center"
                                secondaryBtn
                                onClick={() => setPage(page + 1)}
                                isDisabled={endReached}
                                isLoading={isFetching}
                            >
                                <FaPlus className="pointer-events-none" />
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <p className="text-center pb-3 text-gray-500 border-b">
                                No Matching tag
                            </p>
                            <input
                                className="border-2 py-1.5 px-2 rounded mt-3"
                                placeholder="Add new tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            {tagVError && (
                                <p className="self-center text-red-500">
                                    {tagVError}
                                </p>
                            )}
                            {tagError && tagError.data && (
                                <p className="text-red-500">
                                    {tagError.data.message}
                                </p>
                            )}
                            <Button
                                className="self-center"
                                updateBtn
                                onClick={handleAddTag}
                                isLoading={addTagLoading}
                            >
                                <FaPlus className="pointer-events-none" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TagSelectInput;
