interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: () => void;
    label?: string;
}
const page = ({
    type ,
    className ,
    onClick,
    label,
    ...props
}: ButtonProps) => {
    return (
        <>
            <button 
                type={type}
                className={`px-4 py-2 bg-primary-100 text-background focus:outline-none focus:ring-2 focus:ring-white font-Inter font-medium cursor-pointer rounded-lg  hover:bg-primary-200 hover:text-white transition-colors duration-300 ${className}`}
                onClick={onClick}
                {...props}
            >
                <label htmlFor="">{label}</label>
            </button>
        </>
    )
}

export default page
