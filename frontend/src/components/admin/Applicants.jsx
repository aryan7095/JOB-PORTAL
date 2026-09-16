import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

// Admin page showing all applicants for a specific job
const Applicants = () => {
    const params = useParams(); // job ID from the URL
    const dispatch = useDispatch();
    // Applicants data (job + its applications) from Redux state
    const {applicants} = useSelector(store=>store.application);

    // Fetch the job's applicants on mount
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                // Store the job object (which includes its populated applications) in Redux
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                {/* Shows the total number of applicants for this job */}
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                {/* Table component that reads applicant details from Redux state */}
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
