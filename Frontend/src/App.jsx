import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import NoPage from './components/NoPage'


function App() {
  const [selectedCategory, setSelectedCategory] = useState('Home');


  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <div className='flex'>

          <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          <Routes>
            <Route index element={<Home i/>} />
            {/* <Route path="blogs" element={<Blogs />} /> */}
            <Route path="*" element={<NoPage />} />
          </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App


