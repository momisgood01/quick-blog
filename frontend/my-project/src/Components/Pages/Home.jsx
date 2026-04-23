import React from "react";
import Navbar from "../Navbar";
import Header from "../../Components/Header";
import BlogList from "../../Components/BlogList";
import NewsLetter from "../NewsLetter";
import Footer from "../Footer";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
const Home = () => {
  const { fetchBlogs } = useAppContext();

  useEffect(() => {
    fetchBlogs(); 
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
