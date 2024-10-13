import classNames from "classnames";

function Button({ children, updateBtn, ...rest }) {
    const classes = classNames(
        "flex items-center gap-2 py-2 px-3 rounded text-gray-900 font-medium",
        {
            "bg-green-400": updateBtn,
        },
        rest.className
    );

    return (
        <button {...rest} className={classes}>
            {children}
        </button>
    );
}

export default Button;
