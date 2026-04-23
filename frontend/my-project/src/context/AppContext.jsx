import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.error);
        console.log(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ handle axios + localStorage whenever token changes
  useEffect(() => {
    fetchBlogs();

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ optional: central logout (best practice)
  const logout = () => {
    setToken(null); // triggers cleanup in useEffect
    navigate("/");
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
    logout, 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => {
  return useContext(AppContext);
};