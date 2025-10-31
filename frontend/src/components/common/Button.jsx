
const Button = ({ children, variant = "primary", size = "medium", fullWidth = false, onClick, href, className = "", ...props}) => {

    // Tailwind classes below are always applied
    const baseClasses = `
        inline-flex items-center justify-center rounded-full
        font-semibold transition-all duration-300 transform
        hover:scale-105 hover:rotate-1
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
    `

    // Variant classes are focusing on button style, color schemes
    const variants = {
            primary: `
              bg-yellow-300 hover:bg-yellow-400
              text-yellow-900
              shadow-md hover:shadow-lg
              focus:ring-yellow-400
            `,
            secondary: `
              bg-sky-300 hover:bg-sky-400
              text-yellow-900
              shadow-md hover:shadow-lg
              focus:ring-sky-400
            `,
            accent: `
              bg-amber-500 hover:bg-amber-600
              text-white
              shadow-md hover:shadow-lg
              focus:ring-amber-500
            `,
            outline: `
              bg-transparent border-2 border-yellow-300
              text-yellow-900 hover:bg-yellow-100
              focus:ring-yellow-300
            `
    }

    // Size classes based on button purpose
    const sizes = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg"
    }

    // Classes combined
    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    if(href) {
        return (
            <a href={href} className={buttonClasses} {...props}>
                {children}
            </a>
        )
    }

    return (
        <button
            onClick={onClick}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button