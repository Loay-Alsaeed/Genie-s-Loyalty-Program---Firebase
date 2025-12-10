import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";
import LeaderBoard from "./Pages/LeaderBoard";
import BattleBase from "./Pages/BattleBase";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
                }/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/leaderpoint" element={<LeaderBoard/>}/>
                <Route path="/prize" element={<BattleBase/>}/>
                <Route path="/*" element={<NotFound/>}/>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
