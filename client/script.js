document.addEventListener("DOMContentLoaded", async function() {
    const navItems = document.getElementById("nav-items");
    try {
        const categoryResponse = await fetch("http://localhost:5000/api/categories");
        const categories = await categoryResponse.json();
        const subcategoryResponse = await fetch("http://localhost:5000/api/subcategories");
        const subcategories = await subcategoryResponse.json();

        categories.forEach(category => {
            const categoryLi = document.createElement("li");
            categoryLi.classList.add("dropdown", "relative");
            let subcategoryLinks = subcategories
                .filter(sub => sub.category === category._id)
                .map(sub => `<a href="category.html?subcategory=${sub._id}">${sub.name}</a>`)
                .join("");
            categoryLi.innerHTML = `<a href="#">${category.name} ▾</a>
                <div class="dropdown-content absolute hidden mt-2">${subcategoryLinks || "<a href='#'>No Subcategories</a>"}</div>`;
            navItems.appendChild(categoryLi);
        });
    } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
    }
});










// document.addEventListener("DOMContentLoaded", async function() {
//     const navItems = document.getElementById("nav-items");

//     try {
//         const categoryResponse = await fetch("http://localhost:5000/api/categories");
//         const categories = await categoryResponse.json();

//         const subcategoryResponse = await fetch("http://localhost:5000/api/subcategories");
//         const subcategories = await subcategoryResponse.json();

//         categories.forEach(category => {
//             const categoryLi = document.createElement("li");
//             categoryLi.classList.add("dropdown", "relative");

//             let subcategoryLinks = subcategories
//                 .filter(sub => sub.category === category._id)
//                 .map(sub => `<a href="category.html?subcategory=${sub._id}">${sub.name}</a>`)
//                 .join("");

//             categoryLi.innerHTML = `
//                 <a href="#">${category.name} ▾</a>
//                 <div class="dropdown-content absolute hidden mt-2">${subcategoryLinks || "<a href='#'>No Subcategories</a>"}</div>
//             `;

//             navItems.appendChild(categoryLi);
//         });

//     } catch (error) {
//         console.error("Error fetching categories or subcategories:", error);
//     }
// });
