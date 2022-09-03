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
    categoryDiv.classList.add('px-4')
    categoryDiv.innerHTML= 
    `
    <button onclick="loadNews('${category.category_id}')">${category.category_name}</button>
    `; 
    categoryContainer.appendChild(categoryDiv);
    })
    }







//load News accroding to category
const loadNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showNews(data.data[0]))
}

//Show news in UI
const showNews = news => {
    console.log(news);
    const newsContainer = document.getElementById('news-container');
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML= 
        `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.details}</p>
            <p class="card-text">${news.details}</p>
          </div>
          <div class="d-flex">
                <div class="d-flex'>
                <img src="" class="img-fluid rounded-start" alt="...">
               
                </div>
          </div>
        </div>
      </div>   
        `;
        newsContainer.appendChild(newsDiv);

}
loadNews();

//calling categories Loader Function
loadCategories();


//${news.author.img}  <p>${news.author.name}</p>