import { usePets } from "../../context/PetsContext"
import { Search } from 'lucide-react';


const Filter = () => {

    // Taking data and functions from context
    const { 
        searchString, 
        setSearchString, 
        sizeFilter, 
        setSizeFilter, 
        ageFilter, 
        setAgeFilter, 
        genderFilter, 
        setGenderFilter, 
        resetFilters 
    } = usePets();
    
    return (
        <div>

            {/* Search bar for searchString */}
            <div className="p-3 flex gap-3 max-w-full md:mx-auto md:max-w-[450px] rounded-xl border-2 border-sky-300">
                <Search className="w-6 h-6" color="gray" />
                <input 
                    type="text" 
                    placeholder="Search by name.."
                    className="outline-none text-gray-600"
                />
            </div>


            {/* Select filters for age, gender, size */}
            <div className="flex flex-row gap-4">
                
                {/* Age filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Age </label>
                    <select className="border-2 border-sky-300 rounded-lg">
                        <option value="all">All</option>
                        <option value="puppy">Puppy</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>

                {/* Size filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Size </label>
                    <select className="border-2 border-sky-300 rounded-lg">
                        <option value="all">All</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                {/* Gender filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Gender </label>
                    <select className="border-2 border-sky-300 rounded-lg">
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
      
                    </select>
                </div>
                



            </div>

        </div>
    )

}


export default Filter;