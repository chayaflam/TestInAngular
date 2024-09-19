import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider }
 from "react-router-dom";
import AddDonation from './components/AddDonation';
import DisplayDonations from './components/DisplayDonations';
import EditDonation from './components/EditDonation';
export default function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<DisplayDonations />} />
        <Route path="/donations" element={<DisplayDonations />} />
        <Route path="editDonation" element={<EditDonation />} />
        <Route path="addDonation" element={<AddDonation />} />

      </Route>

    ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

