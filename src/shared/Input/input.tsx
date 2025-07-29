import React from 'react'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    name?: string;
    id?: string;
    type: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
}

const page = (
    { 
        name, 
        id, 
        type, 
        value, 
        onChange, 
        placeholder, 
        className, 
        ...props 
    }: InputProps
)  => {
    return (
        <div className='flex items-center justify-center w-full gap-4 '>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border border-primary-200 focus:outline-none border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 p-2 ${className}`}
                {...props}
            />
        </div>
    )
}

export default page
