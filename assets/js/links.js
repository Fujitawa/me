document.addEventListener('DOMContentLoaded', function() {
  // Загрузка данных из JSON-файла
  fetch('links.json')
    .then(response => response.json())
    .then(data => {
      const linksList = document.getElementById('links-list');
      
      // Очистка списка ссылок
      linksList.innerHTML = '';

      // Добавление ссылок из JSON
      data.links.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.innerHTML = link.icon + ' ' + link.text;
        listItem.appendChild(anchor);
        linksList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
});
