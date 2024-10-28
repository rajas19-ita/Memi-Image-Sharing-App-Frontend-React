import classNames from "classnames";
import { FaSync } from "react-icons/fa";

function Button({
    children,
    primaryBtn,
    secondaryBtn,
    updateBtn,
    isLoading,
    isDisabled,
    ...rest
}) {
    const classes = classNames(
        `flex items-center gap-2 cursor-pointer ${
            isLoading ? " py-3 " : " py-2 "
        } ${
            isDisabled && " bg-opacity-60 text-opacity-60 "
        } px-3 rounded text-gray-950 font-medium`,
        {
            "bg-green-400": updateBtn,
            "bg-sky-400": primaryBtn,
            "bg-slate-300": secondaryBtn,
        },
        rest.className
    );

    return (
        <button
            {...rest}
            disabled={isLoading || isDisabled}
            className={classes}
        >
            {isLoading ? <FaSync className="animate-spin" /> : children}
        </button>
    );
}

export default Button;
