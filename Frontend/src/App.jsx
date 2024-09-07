import { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import NoPage from './components/NoPage'
import Videos from './components/Videos'
import Login from './components/Login'
import { UserContext, UserProvider } from './globalState/userState';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'; 
import UserDetails from './components/UserDetails'


function App() {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const { user } =useContext(UserContext)
  


  return (
    <>
      <UserProvider>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">

        <BrowserRouter>
          <div>
            <Navbar />
            <div className='flex '>

              <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

              <Routes>
                <Route index element={<Home />} />
                <Route path='/videos' element={<Videos />} />

                <Route path="/userdetails" element={user ? <UserDetails /> : <Navigate to="/login" />} />
                
                <Route path='/login' element={<Login />} />
                {/* <Route path="blogs" element={<Blogs />} /> */}

                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </SkeletonTheme>
      </UserProvider>
    </>
  )
}

export default App


