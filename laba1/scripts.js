
      // Функция для сохранения новости в Local Storage
      function saveNews(title, description, date) {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];

        var news = {
          title: title,
          description: description,
          date: date,
        };

        newsList.push(news);

        localStorage.setItem("newsList", JSON.stringify(newsList));
      }

      // Функция для отображения списка новостей на странице
      function displayNews() {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];
        var newsContainer = document.querySelector(".news-list");

        newsContainer.innerHTML = "";

        newsList.forEach(function (news, index) {
          var newsItem = document.createElement("li");
          newsItem.className = "news-item";

          var title = document.createElement("h4");
          title.textContent = news.title;

          var description = document.createElement("p");
          description.textContent = news.description;

          var date = document.createElement("p");
          date.textContent = "Дата публикации: " + news.date;

          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Удалить";
          deleteButton.addEventListener("click", function () {
            deleteNews(index);
          });

          var updateButton = document.createElement("button");
          updateButton.textContent = "Обновить";
          updateButton.addEventListener("click", function () {
            updateNews(index);
          });

          newsItem.appendChild(title);
          newsItem.appendChild(description);
          newsItem.appendChild(date);
          newsItem.appendChild(deleteButton);
          newsItem.appendChild(updateButton);

          newsContainer.appendChild(newsItem);
        });
      }

      // Функция для удаления новости из Local Storage
      function deleteNews(index) {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];
        newsList.splice(index, 1);
        localStorage.setItem("newsList", JSON.stringify(newsList));
        displayNews();
      }

      // Функция для обновления новости в Local Storage
      function updateNews(index) {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];
        var news = newsList[index];
        var updatedTitle = prompt("Введите новый заголовок:", news.title);
        var updatedDescription = prompt(
          "Введите новое описание:",
          news.description
        );
        var updatedDate = prompt("Введите новую дату публикации:", news.date);

        if (updatedTitle && updatedDescription && updatedDate) {
          news.title = updatedTitle;
          news.description = updatedDescription;
          news.date = updatedDate;

          localStorage.setItem("newsList", JSON.stringify(newsList));
          displayNews();
        }
      }

      // Функция для поиска новостей по заголовку или описанию
      function searchNews(searchText) {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];
        var filteredNews = newsList.filter(function (news) {
          var titleMatches = news.title.toLowerCase().includes(searchText);
          var descriptionMatches = news.description
            .toLowerCase()
            .includes(searchText);
          return titleMatches || descriptionMatches;
        });
        var newsContainer = document.querySelector(".news-list");
        newsContainer.innerHTML = "";
        filteredNews.forEach(function (news) {
          var newsItem = document.createElement("li");
          newsItem.className = "news-item";

          var title = document.createElement("h4");
          title.textContent = news.title;

          var description = document.createElement("p");
          description.textContent = news.description;

          var date = document.createElement("p");
          date.textContent = "Дата публикации: " + news.date;

          newsItem.appendChild(title);
          newsItem.appendChild(description);
          newsItem.appendChild(date);

          newsContainer.appendChild(newsItem);
        });
      }

      // Функция для сортировки новостей по дате
      function sortNewsByDate() {
        var newsList = JSON.parse(localStorage.getItem("newsList")) || [];
        newsList.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        localStorage.setItem("newsList", JSON.stringify(newsList));
        displayNews();
      }

      document
        .querySelector("#news-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          var title = document.getElementById("title").value;
          var description = document.getElementById("description").value;
          var date = document.getElementById("date").value;

          saveNews(title, description, date);
          displayNews();

          document.getElementById("title").value = "";
          document.getElementById("description").value = "";
          document.getElementById("date").value = "";
        });

      document.querySelector("#search").addEventListener("input", function () {
        var searchText = document.getElementById("search").value.toLowerCase();
        searchNews(searchText);
      });

      document
        .querySelector("#sort-button")
        .addEventListener("click", function () {
          sortNewsByDate();
        });

      displayNews();
