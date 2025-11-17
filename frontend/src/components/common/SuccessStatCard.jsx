const SuccessStatCard = ({title, description, id}) => {

    let borderColor;

    if(id === 1) {
        borderColor = "border-yellow-300";
    } else if(id === 2) {
        borderColor = "border-sky-300";
    } else {
        borderColor = "border-amber-300";
    }


    return (
        <div className={`
                flex-1 p-8 
                bg-white rounded-lg shadow-lg border-t-4 ${borderColor}
                cursor-pointer hover:rotate-2 transition-all duration-400
                `
        }>
            <h3 className="mb-2 text-4xl font-bold text-yellow-900">{title}</h3>
            <p className="text-md text-gray-700">{description}</p>
        </div>
    )
}

export default SuccessStatCard;