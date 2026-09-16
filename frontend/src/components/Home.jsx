import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Landing page: hero banner, category shortcuts, latest jobs, and footer.
// Recruiters are redirected away since this page is meant for students/job-seekers.
const Home = () => {
  // Custom hook that fetches all jobs (respecting any active search query) and populates Redux state
  useGetAllJobs();
  // Logged-in user from Redux auth state
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  // If a recruiter lands on the homepage, redirect them to their companies dashboard instead,
  // since the homepage's job-browsing content isn't relevant to recruiters
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
