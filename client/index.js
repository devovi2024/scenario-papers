document.addEventListener("DOMContentLoaded", async function() {
    const navItems = document.getElementById("nav-items");
    const mobileNavItems = document.getElementById("mobile-nav-items");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    // Toggle mobile menu
    menuToggle.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });

    try {
        // ক্যাটেগরি এবং সাবক্যাটেগরি ফেচ করা
        const categoryResponse = await fetch("http://localhost:5000/api/categories");
        const categories = await categoryResponse.json();

        const subcategoryResponse = await fetch("http://localhost:5000/api/subcategories");
        const subcategories = await subcategoryResponse.json();

        categories.forEach(category => {
            const categoryLi = document.createElement("li");
            categoryLi.classList.add("dropdown", "relative");
            
            // ক্যাটেগরি লিংক
            let subcategoryLinks = subcategories
                .filter(sub => sub.category === category._id)
                .map(sub => `<a href="#">${sub.name}</a>`)
                .join("");

            // যদি সাবক্যাটেগরি থাকে, তাহলে ড্রপডাউন দেখাও
            categoryLi.innerHTML = `
                <a href="#" class="hover:underline">${category.name} ▾</a>
                <div class="dropdown-content absolute hidden mt-2">${subcategoryLinks || "<a href='#'>No Subcategories</a>"}</div>
            `;

            // মেনু হোভার ইফেক্ট
            categoryLi.addEventListener("mouseover", () => categoryLi.querySelector(".dropdown-content").classList.remove("hidden"));
            categoryLi.addEventListener("mouseout", () => categoryLi.querySelector(".dropdown-content").classList.add("hidden"));

            navItems.appendChild(categoryLi);

            // মোবাইল মেনুর জন্য
            const mobileLi = document.createElement("li");
            mobileLi.innerHTML = `<a href="#" class="block py-2">${category.name}</a>`;
            mobileNavItems.appendChild(mobileLi);
        });

    } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
    }
});
