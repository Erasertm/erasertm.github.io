// Define your functions in the global scope
function loadArticlesFromFile(jsonFilePath) {
    console.log('Loading file:', jsonFilePath);  // Debugging

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                clearArticles();
                displayArticles(data.articles);
            } else {
                console.error("Failed to load articles");
            }
        })
        .catch(error => console.error('Error fetching the JSON:', error));
}

function clearArticles() {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';
}

function displayArticles(articles) {
    const container = document.getElementById('articles-container');

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;
        articleDiv.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        articleDiv.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank';
        articleDiv.appendChild(link);

        container.appendChild(articleDiv);
    });
}

// Initialize your script once the page is fully loaded
window.onload = function() {
    document.querySelectorAll('.json-button').forEach(button => {
        button.addEventListener('click', function() {
            const filePath = this.getAttribute('data-file');
            loadArticlesFromFile(filePath);
        });
    });

    // Load the default file on initial page load
    loadArticlesFromFile('03.json');
};
