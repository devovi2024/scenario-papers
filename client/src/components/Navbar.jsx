import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <nav className="navbar flex  items-center px-6 py-3 bg-white shadow-md rounded-lg">
      <Link to="/" className="text-2xl font-bold text-gray-900">My Website</Link>
      <div className="hidden md:flex space-x-6 relative">
        {categories.map((category) => (
          <div key={category._id} className="relative group">
            <button
              onClick={() => setOpenDropdown(openDropdown === category._id ? null : category._id)}
              className="text-lg font-medium text-gray-700 hover:text-primary transition"
            >
              {category.name}
            </button>
            {openDropdown === category._id && category.subcategories?.length > 0 && (
              <ul className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-100 scale-100 transition-all duration-200">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory._id} className="relative">
                    <button
                      onClick={() => setOpenSubDropdown(openSubDropdown === subcategory._id ? null : subcategory._id)}
                      className="block px-4 py-2 hover:bg-primary hover:text-white w-full text-left transition"
                    >
                      {subcategory.name}
                    </button>
                    {openSubDropdown === subcategory._id && subcategory.subSubcategories?.length > 0 && (
                      <ul className="absolute left-full top-0 w-56 bg-white shadow-lg rounded-lg opacity-100 scale-100 transition-all duration-200">
                        {subcategory.subSubcategories.map((subSubcategory) => (
                          <li key={subSubcategory._id}>
                            <Link
                              to={`/subsubcategory/${subSubcategory._id}`}
                              className="block px-4 py-2 hover:bg-primary hover:text-white transition"
                            >
                              {subSubcategory.name}
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
      </div>
    </nav>
  );
};

export default Navbar;