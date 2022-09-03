//load categories Api
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);

}
//Display categories in UI
const displayCategories = categories => {
    const categoryContainer = document.getElementById('Category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('px-4')
        categoryDiv.innerHTML =
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
        .then(data => showNews(data.data))
}

//Show news in UI
const showNews = allnews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allnews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');

        newsDiv.innerHTML =
            `
        <div class="row g-1">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
        `;
        newsContainer.appendChild(newsDiv);
    })

}
loadNews();

//calling categories Loader Function
loadCategories();





//spinnner function 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading === true) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// <img src="${news.author.img}" class="img-fluid rounded-start" alt="...">
//<p>${news.author.name}</p>