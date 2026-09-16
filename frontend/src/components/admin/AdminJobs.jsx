import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

// Admin page listing all jobs created by the logged-in recruiter/admin,
// with a search/filter input and a link to create a new job
const AdminJobs = () => {
  // Custom hook that fetches all admin jobs and populates Redux state on mount
  useGetAllAdminJobs();
  // Local input state for the filter/search box
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sync the local search input into Redux state whenever it changes,
  // so AdminJobsTable (which presumably reads from Redux) can filter accordingly
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          {/* Search/filter input for job name or role */}
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          {/* Navigates to the job creation form */}
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        {/* Table component that reads jobs (and the search filter) from Redux state */}
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
