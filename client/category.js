document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const subcategoryId = params.get("subcategory");
    const newsList = document.getElementById("news-list");
    const categoryTitle = document.getElementById("category-title");
    try {
        const response = await fetch(`http://localhost:5000/api/news?subcategory=${subcategoryId}`);
        const newsPosts = await response.json();
        categoryTitle.innerText = `News in ${subcategoryId}`;
        newsList.innerHTML = newsPosts.map(post => `<h3>${post.title}</h3><p>${post.content}</p>`).join("");
    } catch (error) {
        console.error("Error fetching news posts:", error);
    }
});

// document.addEventListener("DOMContentLoaded", async function() {
//     const params = new URLSearchParams(window.location.search);
//     const subcategoryId = params.get("subcategory"); 
//     const newsList = document.getElementById("news-list");
//     const categoryTitle = document.getElementById("category-title");

//     if (!subcategoryId) {
//         categoryTitle.innerText = "No Subcategory Selected";
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:5000/api/news?subcategory=${subcategoryId}`);
//         const newsPosts = await response.json();

//         categoryTitle.innerText = `News in ${subcategoryId}`;
//         newsList.innerHTML = newsPosts.length 
//             ? newsPosts.map(post => `<h3>${post.title}</h3><p>${post.content}</p>`).join("")
//             : "<p>No news posts available for this subcategory.</p>";
//     } catch (error) {
//         console.error("Error fetching news posts:", error);
//     }
// });
