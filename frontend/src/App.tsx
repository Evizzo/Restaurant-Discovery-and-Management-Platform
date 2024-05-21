import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./components/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import About from "./components/About.tsx";
import Footer from "./components/Footer.tsx";
import SearchSpots from "./components/SearchSpots.tsx";
import Events from "./components/Events.tsx";
import Login from "./components/Login.tsx"
import SpotPage from "./components/SpotPage.tsx";
import { useAuth } from "./api/AuthContex";
import AuthProvider from "./api/AuthContex";
import { ReactNode } from "react";
import NotFound from "./components/NotFound.tsx";
import UserPage from "./components/UserPage.tsx";
import AddSpot from "./components/AddSpot.tsx";
import ChooseSpotToUpadte from "./components/ChooseSpotToUpdate.tsx";
import UpdateSpot from "./components/UpdateSpot.tsx";

function App(){
  function AuthenticatedRoute({ children }: { children: ReactNode }) {
    const authContext = useAuth()
    
    if (authContext.isAuthenticated){
      console.log(authContext)
      return children
    }
    else
      return <Navigate to="/login" />
    }

  return(
    <div className="GdinApp">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <br /><br /><br />
          <Routes>

            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/search" element={<SearchSpots/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/spot/:spotId" element={<SpotPage />} />
            <Route path="/edit-spot/:spotId" element={<UpdateSpot />} />

            <Route path="/current-user" element={
              <AuthenticatedRoute>
                <UserPage />
              </AuthenticatedRoute>
            } />

            <Route path="/add-spot" element={
              <AuthenticatedRoute>
                <AddSpot />
              </AuthenticatedRoute>
            } />

            <Route path="/edit-spot" element={
              <AuthenticatedRoute>
                <ChooseSpotToUpadte />
              </AuthenticatedRoute>
            } />

          <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>

  )
}
export default App
