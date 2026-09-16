import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];
// (unused, commented-out leftover code)

// "Browse" page: shows all jobs matching the current search query as a grid of Job cards
const Browse = () => {
    // Custom hook that fetches all jobs (filtered by the current search query) and populates Redux state
    useGetAllJobs();
    // Full list of jobs from Redux state
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();

    // Cleanup effect: clears the search query in Redux when navigating away from this page,
    // so a stale search term doesn't carry over to other pages that use the same query state
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                {/* Grid of job cards, one per matching job */}
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
