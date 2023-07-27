document.addEventListener('DOMContentLoaded', function() {
  fetch('articles.json')
    .then(response => response.json())
    .then(data => {
      var mainElement = document.getElementById("articles");

      data.forEach(function(article) {
        var articleLink = document.createElement("a");
        var articleContentSpan = document.createElement("span"); // Create a single span for h5 and p
        var articleTitle = document.createElement("h5");
        var articleDescription = document.createElement("p");
        var articleImage = document.createElement("img");

        articleLink.href = article.link ? article.link : "#"; // Check for the presence of the "link" field
        articleTitle.textContent = article.title;
        articleDescription.textContent = article.description;
        articleImage.src = article.image;

        articleContentSpan.appendChild(articleTitle);
        articleContentSpan.appendChild(articleDescription);

        articleLink.appendChild(articleContentSpan); // Append the span containing h5 and p to the articleLink
        articleLink.appendChild(articleImage);
        mainElement.appendChild(articleLink);
      });
    })
    .catch(error => console.error('Ошибка загрузки данных из JSON: ', error));


const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);

// Получаем корневой элемент документа (html)
const root = document.documentElement;

// Проверяем, есть ли сохраненное значение в localStorage
const savedTheme = localStorage.getItem('theme');

// Если значение существует и равно 'dark', применяем темную тему
if (savedTheme === 'dark') {
  root.setAttribute('dark', '');
}

// Функция переключения темы
function toggleTheme() {
  // Если у корневого элемента есть атрибут "dark", удаляем его, чтобы переключиться на светлую тему
  if (root.hasAttribute('dark')) {
    root.removeAttribute('dark');
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme', 'light');
  } else {
    // Иначе добавляем атрибут "dark", чтобы переключиться на темную тему
    root.setAttribute('dark', '');
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme', 'dark');
  }
}
});
