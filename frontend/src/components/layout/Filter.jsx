import Button from "../common/Button";
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
        <div className="flex flex-col gap-5">

            {/* Search bar for searchString */}
            <div className="p-3 flex gap-3 max-w-full md:mx-auto md:max-w-[450px] rounded-xl border-2 border-sky-300">
                <Search className="w-6 h-6" color="gray" />
                <input 
                    type="text" 
                    placeholder="Search by name.."
                    className="outline-none text-gray-600"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>


            {/* Select filters for age, gender, size */}
            <div className="flex flex-row gap-4">
                
                {/* Age filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Age </label>
                    <select 
                        className="border-2 border-sky-300 rounded-lg"
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                    >
                        <option value="all">All ages</option>
                        <option value="puppy">Puppy</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>

                {/* Size filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Size </label>
                    <select 
                        className="border-2 border-sky-300 rounded-lg"
                        value={sizeFilter}
                        onChange={(e) => setSizeFilter(e.target.value)}
                    >
                        <option value="all">All Sizes</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                {/* Gender filter */}
                <div className="flex flex-col max-w-[80px]">
                    <label className="text-gray-600 text-sm font-semibold"> Gender </label>
                    <select 
                        className="border-2 border-sky-300 rounded-lg"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>

                    </select>
                </div>

                {/* Button to reset filters  */}
                <Button
                    onClick={resetFilters}
                    variant="accent"
                    size="small"

                >
                    Reset Filters
                </Button>
                



            </div>

        </div>
    )

}


export default Filter;