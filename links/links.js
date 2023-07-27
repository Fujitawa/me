document.addEventListener('DOMContentLoaded', function() {
  const tagsMenu = document.getElementById("tags-menu");
  const tagButtons = tagsMenu.getElementsByClassName("tag");
  const clearFilterButton = document.getElementById("clear");
  const mainElement = document.getElementById("root");
  let jsonData;
  let linksToShow = [];
  let showMoreButton;

  // Функция для показа кнопки "крестик"
  function showClearFilterButton() {
    clearFilterButton.style.display = "inline";
  }

  // Функция для скрытия кнопки "крестик" и сброса фильтра
  function hideClearFilterButton() {
    clearFilterButton.style.display = "none";
    createLinkElements(jsonData); // Отображаем все ссылки
    showMoreButton.style.display = "none"; // Скрываем кнопку "Показать еще"
  }

  // Функция для отображения ссылок
  function displayLinks() {
    const linksBatch = linksToShow.splice(0, 10);

    linksBatch.forEach(linkData => {
      const linkElement = document.createElement("a");
      linkElement.href = linkData.href;
      linkElement.classList.add("layout");

      const span1 = document.createElement("div");
      span1.textContent = linkData.text1;

      const hrElement = document.createElement("hr");

      const span2 = document.createElement("article");
      span2.textContent = linkData.text2;

      linkElement.appendChild(span1);
      linkElement.appendChild(hrElement);
      linkElement.appendChild(span2);

      mainElement.appendChild(linkElement);
    });

    // Удаляем предыдущую кнопку "Показать еще", если она существует
    if (showMoreButton && showMoreButton.parentNode) {
      showMoreButton.parentNode.removeChild(showMoreButton);
      showMoreButton = null;
    }

    // Если еще есть ссылки для отображения, создаем кнопку "Показать еще"
    if (linksToShow.length > 0) {
      showMoreButton = document.createElement("button");
      showMoreButton.textContent = "Показать еще";
      showMoreButton.addEventListener("click", () => {
        displayLinks();
      });
      mainElement.appendChild(showMoreButton);
    }
  }

  // Загрузка файла links.json с помощью Fetch API
  fetch("links.json")
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      linksToShow = data.links.slice();
      displayLinks();
    })
    .catch(error => console.error("Ошибка загрузки файла:", error));

  function createLinkElements(data) {
    mainElement.innerHTML = '';

    data.links.forEach(linkData => {
      const linkElement = document.createElement("a");
      linkElement.href = linkData.href;
      linkElement.classList.add("layout");

      const span1 = document.createElement("div");
      span1.textContent = linkData.text1;

      const hrElement = document.createElement("hr");

      const span2 = document.createElement("article");
      span2.textContent = linkData.text2;

      linkElement.appendChild(span1);
      linkElement.appendChild(hrElement);
      linkElement.appendChild(span2);

      mainElement.appendChild(linkElement);
    });
  }

  Array.from(tagButtons).forEach(button => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag;
      showClearFilterButton();
      const filteredLinks = jsonData.links.filter(linkData => linkData.tags.includes(selectedTag));
      createLinkElements({ links: filteredLinks });
    });
  });

  clearFilterButton.addEventListener("click", () => {
    hideClearFilterButton();
    mainElement.innerHTML = ''; // Очищаем mainElement при сбросе фильтра
  });
});
