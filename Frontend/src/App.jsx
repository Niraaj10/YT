import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import NoPage from './components/NoPage'
import Videos from './components/Videos'
import Login from './components/Login'
import { UserProvider } from './globalState/userState'; 


function App() {
  const [selectedCategory, setSelectedCategory] = useState('Home');


  return (
    <>
      <UserProvider>

        <BrowserRouter>
          <div>
            <Navbar />
            <div className='flex '>

              <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

              <Routes>
                <Route index element={<Home />} />
                <Route path='/videos' element={<Videos />} />
                
                <Route path='/login' element={<Login />} />
                {/* <Route path="blogs" element={<Blogs />} /> */}

                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App


