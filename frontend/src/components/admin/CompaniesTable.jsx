import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Table displaying the admin's registered companies, filterable by the search text
// set in Companies.jsx (stored in Redux as searchCompanyByText)
const CompaniesTable = () => {
    // Full list of companies and the current search text, both from Redux state
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    // Locally filtered companies, recomputed whenever the source data or search text changes
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    // Recompute the filtered company list whenever companies or searchCompanyByText changes
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            // No search text — show all companies
            if(!searchCompanyByText){
                return true
            };
            // Case-insensitive match against company name
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            // Note: no `key` prop set on this row (see note below)
                            <tr>
                                <TableCell>
                                    {/* Company logo shown as a small avatar */}
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                {/* Extract just the date portion (YYYY-MM-DD) from the ISO timestamp */}
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    {/* Popover menu to edit this company */}
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
