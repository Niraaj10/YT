import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'


function App() {


  return (
    <>
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            
              <Route index element={<Home />} />
              {/* <Route path="blogs" element={<Blogs />} /> */}
              <Route path="*" element={<NoPage />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
