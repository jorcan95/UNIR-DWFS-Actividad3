import React from "react";
import { Index } from "../components/Index";
import Movie from '../components/Movie';
import { NotFound } from "../components/NotFound";
import { Detail } from "../components/Detail/Detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../components/Search/Search";

function MenuRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/index" element={<Index/>}/>        
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/detail/:movieId" element={<Detail/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default MenuRouter;