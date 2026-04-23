import React, { useEffect } from "react";
import { assets } from "../../../assets/assets";
import { useState } from "react";
import BlogtableItem from "../../admin/BlogtableItem";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    draft: 0,
    recentBlogs: [],
  });

  const { axios, token } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboard)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(token)
    fetchDashboardData();
  }, [token]);

  return (
    <div className="flex-1  p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow 
         cursor-pointer hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_1} alt="Dashboard Logo" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow 
         cursor-pointer hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_2} alt="Dashboard Logo" />

          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow 
         cursor-pointer hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_3} alt="Dashboard Logo" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.draft}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Dashboard Logo" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white p-4">
          <table className="w-full text-sm text-gray-500 table-auto text-left">
            <thead className="text-gray-400 font-light border-b">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max:sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max:sm:hidden">
                  status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogtableItem
                  key={blog._id}
                  blog={blog}
                  index={index}
                  fetchDashboardData={fetchDashboardData} // ✅ ADD THIS ONLY
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
