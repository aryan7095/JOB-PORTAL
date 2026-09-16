import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

// Admin page listing all companies owned by the logged-in recruiter,
// with a search/filter input and a link to register a new company
const Companies = () => {
    // Custom hook that fetches all companies and populates Redux state on mount
    useGetAllCompanies();
    // Local input state for the filter/search box
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Sync the local search input into Redux state whenever it changes,
    // so CompaniesTable (which presumably reads from Redux) can filter accordingly
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    {/* Search/filter input for company name */}
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {/* Navigates to the company registration form */}
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                {/* Table component that reads companies (and the search filter) from Redux state */}
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
