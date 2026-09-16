import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

// Static filter categories and their selectable options (location, industry, salary range)
const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

// Sidebar filter panel: a single radio-button selection across all filter categories,
// which updates the global search query whenever a new option is picked
const FilterCard = () => {
    // Currently selected filter value (only one can be selected at a time, across all categories)
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    // Updates local state when a radio option is selected
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    // Whenever the selected filter value changes, push it into Redux as the search query,
    // so job listing pages (e.g. Browse.jsx via useGetAllJobs) can filter accordingly
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {/* Single RadioGroup spanning all categories — this uses this app's own
                Radix-based RadioGroup/RadioGroupItem components correctly, with matching
                id/htmlFor pairing (see itemId below), unlike the plain <Input type="radio">
                used in Login.jsx/Signup.jsx */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        // Note: no `key` prop on this outer category <div> (see note below)
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    // Unique ID combining category index and item index, used to
                                    // correctly pair each RadioGroupItem with its Label
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        // Note: no `key` prop on this inner <div> either (see note below)
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
