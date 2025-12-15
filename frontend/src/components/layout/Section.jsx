
const Section = ({ children, id = "", className = "", maxWidth = "7xl", padding = "normal", background = "transparent", ...props }) => {

    // Both maximum width and padding increases progressively, there are no huge jumps in sizes

    // The classes below are resposible for setting the width for content
    // These classes are Tailwind utility classes mapped for each property name
    // Width starts from very narrow to 100% width
    const maxWidthClasses = {
        "sm": "max-w-sm", // for very narrow screens - 384px
        "md": "max-w-md", // narrow screens - 448px
        "lg": "max-w-lg", // medium narrow screens - 512px
        "xl": "max-w-xl", // medium wide - 576px
        "2xl": "max-w-2xl", // bigger medium wide - 672px - text heavy
        "4xl": "max-w-4xl", // wide screens - 896px - mixed content
        "7xl": "max-w-7xl", // very wide screens - 1280px - image grids
        "full": "max-w-full" // maximum width - 100% - mostly for hero images
    }

    // The padding classes below are setting the vertical spacing, 
    // Spacing between sections
    // Each property includes responsive padding sizes as well (md, lg)
    const paddingClasses = {
        "none": "py-0", // no padding
        "small": "py-8 md:py-12", // Small padding for (py)mobile is 32px and for (md)desktop 48px
        "normal": "py-12 md:py-16 lg:py-20", // Normal padding 48px -> 64px -> 80px
        "large": "py-16 md:py-24 lg:py-32" // Large padding 64px -> 96px -> 128px
    }

    const backgroundClasses = {
        "transparent": "bg-transparent",
        "white": "bg-white",
        "gray": "bg-gray-50",
        "blue": "bg-blue-50",
        "yellow": "bg-yellow-50"
    }

    return (
        <section 
            id={id}
            className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
            {...props}
        >

            <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
                {children}
            </div>

        </section>
    )
}

export default Section