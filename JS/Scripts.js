//load categories Api
const loadCategories = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayCategories(data.data.news_category))
}
//Display categories in UI
    const displayCategories = categories => {
    const categoryContainer = document.getElementById('Category-container');
    categories.forEach(category =>{
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML= 
    `
    <h2>${category.category_name}</h2>
    `;
    categoryContainer.appendChild(categoryDiv);
    })
    }

loadCategories();


