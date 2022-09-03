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
            `<button onclick="loadNews('${category.category_id}')">${category.category_name}
        </button>`;
        categoryContainer.appendChild(categoryDiv);
    })
}
//calling categories Loader Function
loadCategories();

//load News accroding to category
const loadNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data));
}
//Show news in UI
const showNews = allnews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allnews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-5', 'p-4', 'bg-secondary');
        newsDiv.innerHTML =
            `<div class="row g-1">
        <div class="col-md-4">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <div style=" display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;text-overflow: ellipsis;">
        <p class="card-text d-block">${news.details}</p>
        </div>
        </div>
          <div class = "d-flex justify-content-evenly mt-5">
                    <div class="d-flex">
                    <img src="${news.author.img}" class="img-fluid rounded" style="height:50px;width:50px;">
                    <p class="ps-4">${news.author.name ? news.author.name : 'Name Not Found'}</p>
                    </div>
                    <div class="d-flex">
                    <i class="fa-thin fa-eye"></i>
                    <p class="ps-4">${news.total_view}</p>
                    </div>
                    </div>
                    <div class="text-center mt-3">
                    <button onclick="loadNewsDetailes('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detailes</button>
                    </div>
        `;
        newsContainer.appendChild(newsDiv);
    })

}

loadNews();


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

//modal for details news
const loadNewsDetailes = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaynewsDetailes (data.data);
    ;
}
//function to display Modal
const displaynewsDetailes = news => {
    const ModalTitle = document.getElementById('exampleModalLabel');
    ModalTitle.innerHTML='';
    news.forEach(allnews =>{
        const modalDiv = document.createElement('div');
        modalDiv.classList.add('modal-body');
        modalDiv.innerHTML= `
        <img src="${allnews.author.img ? allnews.author.img : 'image Not Available'}" class="img-fluid rounded" style="height:50px;width:50px;">
        <p>Author Name:${allnews.author.name ? allnews.author.name: 'Name Not Available'} </p>
        <p>Total Veiw: ${allnews.total_view ? allnews.total_view : 'No Veiw'}</p>
        <p>Published Date: ${allnews.author.published_date ? allnews.author.published_date : 'Date Not Available'}</p>
        `;
        ModalTitle.appendChild(modalDiv);
    })
}