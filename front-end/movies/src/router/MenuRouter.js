import React from "react";
import Movie from '../components/Movie';
import { NotFound } from "../components/NotFound";
import { Detail } from "../components/Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search";

function MenuRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search/>}/>
        <Route path="/index" element={<Search/>}/>        
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/detail/:movieId" element={<Detail/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default MenuRouter;