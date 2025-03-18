import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-900">
        My Website
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center">
        {categories.map((category) => (
          <div key={category._id} className="relative">
            <button
              onClick={() => setOpenCategory(openCategory === category._id ? null : category._id)}
              className="text-lg font-medium text-gray-700 hover:text-blue-500"
            >
              {category.name}
            </button>
            {openCategory === category._id && category.subcategories?.length > 0 && (
              <ul className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md">
                {category.subcategories.map((sub) => (
                  <li key={sub._id} className="relative">
                    <button
                      onClick={() => setOpenSubCategory(openSubCategory === sub._id ? null : sub._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white"
                    >
                      {sub.name}
                    </button>
                    {openSubCategory === sub._id && sub.subSubcategories?.length > 0 && (
                      <ul className="absolute left-full top-0 w-40 bg-white shadow-md rounded-md">
                        {sub.subSubcategories.map((subSub) => (
                          <li key={subSub._id}>
                            <Link
                              to={`/subsubcategory/${subSub._id}`}
                              className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                            >
                              {subSub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <Link to="/my-news" className="text-lg font-medium text-gray-700 hover:text-blue-500">
          My News
        </Link>
        <button className="text-gray-700 hover:text-blue-500">
          <FaSearch size={20} />
        </button>
        <Link to="/get-started" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-4 md:hidden">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setOpenCategory(openCategory === category._id ? null : category._id)}
              className="text-lg font-medium text-gray-700 hover:text-blue-500"
            >
              {category.name}
            </button>
          ))}
          <Link to="/my-news" className="text-lg font-medium text-gray-700 hover:text-blue-500">
            My News
          </Link>
          <button className="text-gray-700 hover:text-blue-500">
            <FaSearch size={20} />
          </button>
          <Link to="/get-started" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;