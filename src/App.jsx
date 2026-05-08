import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";
import LeaderBoard from "./Pages/LeaderBoard";
import BattleBase from "./Pages/BattleBase";
import LoyaltyProgram from "./Pages/LoyaltyProgram";
import LandingPage from "./Pages/LandingPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
                }/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/leaderpoint" element={
                  <ProtectedRoute>
                    <LeaderBoard/>
                  </ProtectedRoute>
                }/>
                <Route path="/prize" element={
                  <ProtectedRoute>
                    <BattleBase/>
                  </ProtectedRoute>
                }/>
                <Route
                  path="/loyalty"
                  element={
                    <ProtectedRoute>
                      <LoyaltyProgram/>
                    </ProtectedRoute>
                  }
                />
                <Route path="/*" element={<NotFound/>}/>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
