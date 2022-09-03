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
        .then( data => showNews(data.data ? data.data : 'News Not Found'));
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
        <p style="width:100%;
        height: 70px;text-overflow: ellipsis; display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;" class="card-text d-block">${news.details}</p>
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
                    <button onclick="loadNewsDetaile('')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detailes</button>
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


//modal
const loadNewsDetailes = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaynewsDetailes(data.data);
;}

const displaynewsDetailes = news => {
    console.log(news);
    const ModalTitle = document.getElementById('exampleModalLabel');
    ModalTitle.innerText = news.title;
    const phoneDetailes = document.getElementById('newsdetailes');
    phoneDetailes.innerHTML= `
    <p>Release Date: ${news.title ?news.title: 'no title Found'}</p>
    <p>Bluetooth:${phone.others?phone.others.Bluetooth : 'No Detail Founds'}</p>
    <p>Storage:${phone.mainFeatures?phone.mainFeatures.storage : 'No Storage Detail Founds'}</p>
    <p>Sensors:${phone.mainFeatures?phone.mainFeatures.sensors[0] : 'No Sensor Detail Founds'}</p>
    `;
    ModalTitle.appendChild(phoneDetailes);
    
}