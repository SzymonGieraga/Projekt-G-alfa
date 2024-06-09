<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ogloszenia</title>
  <style>
    /* Ogólny styl dla całego dokumentu */
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    /* Kontener dla całej zawartości strony */
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
    }

    /* Styl nagłówka */
    .header {
      background-color: #7A0019;
      color: #fff;
      font-size: larger;
      padding-top: 10px;
      text-align: center;
      height: 8vh;
    }

    /* Kontener dla nagłówka, który jest przyklejony do góry strony */
    .header-container {
      position: sticky;
      top: 0;
      background-color: #f8f8f8;
      z-index: 1;
    }

    .header h1 {
      margin: 0;
    }

    /* Styl zawartości strony */
    .content {
      width: 100%;
      padding: 20px;
      background-color: #ffffff;
      overflow-y: auto;
      max-height: calc(100vh - 8vh); /* Maksymalna wysokość kontenera minus wysokość nagłówka */
    }

    /* Kontener dla zawartości, który zapewnia odpowiednie odstępy */
    .content-container {
      margin-left: 9vh;
      max-width: calc(100% - 18vh); /* Szerokość kontenera zmniejszona o szerokość panelu bocznego */
      height: calc(100vh - 8vh); /* Maksymalna wysokość kontenera minus wysokość nagłówka */
    }

    /* Styl pojedynczego postu */
    .post {
      border: 1px solid #AFAEAE;
      padding: 15px;
      margin-bottom: 10px; /* Zmniejszono margines między postami */
      border-radius: 5px;
      height: 20%; /* Zmniejszono wysokość postu */
      position: relative;
      width: 40%; /* Zmniejszono szerokość postu */
      margin-left: auto;
      margin-right: auto;
      background-color: #AFAEAE; /* Kolor tła postu */
    }

    .post h2 {
      margin-top: 0;
      font-size: 1.2em; /* Zmieniono rozmiar tytułu postu */
    }

    .post p {
      line-height: 1.4;
      font-size: 0.9em; /* Zmieniono rozmiar tekstu w postach */
    }

    .post .meta {
      margin-top: 5px; /* Mniejszy odstęp od treści postu */
    }

    .post .actions {
      text-align: right;
    }

    .post .actions a {
      text-decoration: none;
      color: #333;
      margin-left: 10px;
    }

    .comments {
      margin-top: 1px;
      max-height: 50px; /* Ograniczenie wysokości sekcji komentarzy */
      overflow-y: auto; /* Dodanie przewijania */
      border: 1px solid rgb(92, 86, 86);
    }

    .comment {
      background-color: #f9f9f9;
      padding: 1px;
      margin-bottom: 5px; /* Mniejsza odległość między komentarzami */
    }

    .comment-button {
      margin-right: 10px;
      color: #000
    }

    .clear {
      clear: both;
    }

    /* Styl dla przycisku dodawania postów */
    .add-post-button {
      position: fixed;
      bottom: 8vh;
      right: 8vh;
      background-color: #ffffff;
      color: #fff;
      border: none;
      border-radius: 50%;
      padding: 10px;
      cursor: pointer;
      font-size: 24px;
    }

    .add-post-button:hover {
      background-color: #ffffff;
    }

    /* Styl dla formularza dodawania postów */
    .add-post-form {
      display: none;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      z-index: 2;
    }

    .add-post-form label {
      display: block;
      margin-bottom: 5px;
    }

    .add-post-form input[type="text"],
    .add-post-form textarea,
    .add-post-form select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      margin-bottom: 10px;
    }

    .add-post-form button[type="submit"] {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .add-post-form button[type="submit"]:hover {
      background-color: #0056b3;
    }

    /* Styl dla bocznego paska nawigacyjnego */
    .sidenav {
      margin-top: 8vh;
      height: 100vh;
      width: 100%;
      max-width: 9vw;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: #7A0019;
    }

    .sidenav a {
      padding: 15% 15% 15% 17%;
      text-decoration: none;
      color: #818181;
      display: block;
      transition: 0.3s;
    }

    .sidenav img {
      width: 100%;
      height: auto;
      max-height: 50vh;
      max-width: 40vw;
    }

    .sidenav a:hover {
      color: #f1f1f1;
      background: #660016;
      position: relative;
      background-color: #660016;
    }

    @media screen and (max-height: 900px) {
      .sidenav img {
        max-height: 40vh;
     

      }
    }

    @media screen and (max-height: 700px) {
      .sidenav img {
        max-height: 30vh;
      }
    }

    @media screen and (max-height: 500px) {
      .sidenav img {
        max-height: 20vh;
      }
    }

    @media screen and (max-height: 450px) {
      .sidenav {
        padding-top: 15px;
      }
      .sidenav a {
        font-size: 18px;
      }
      .sidenav img {
        max-height: 15vh;
      }
    }
  </style>
</head>

<body>
  <!-- Pasek boczny nawigacyjny -->
  <div id="mySidenav" class="sidenav">
    <a href='https://media1.tenor.com/m/5pdpG_LHeKoAAAAC/arrival-cat.gif'><img src="Terminarz.png" alt="Terminarz"></a>
    <a href='https://media1.tenor.com/m/uamFFayV6SAAAAAC/get-fake-funny.gif'><img src="Plan zajec.png" alt="Plan zajęć"></a>
    <a href='https://media1.tenor.com/m/5mpQTQmMfbsAAAAd/teeth-bite.gif'><img src="Tablica.png" alt="Tablica"></a>
    <a href='https://pl.wikipedia.org/wiki/Marcin_Najman'><img src="Wydarzenia.png" alt="Wydarzenia"></a>
    <a href='https://media1.tenor.com/m/DH09VAmrmeMAAAAd/thomas-the-tank-engine-o-face.gif'><img src="Ustawienia.png" alt="Ustawienia"></a>
  </div>

  <!-- Kontener nagłówka -->
  <div class="header-container">
    <div class="header">
      <h1>Ogloszenia</h1>
    </div>
  </div>

  <!-- Kontener zawartości -->
  <div class="content-container">
    <div class="content">
      <!-- Dodatkowe posty będą tutaj dodawane -->
    </div>
  </div>

  <!-- Przycisk do dodawania nowego postu -->
  <button class="add-post-button">
    <img src="button.png" alt="Add Post">
  </button>

  <!-- Formularz do dodawania nowego postu -->
  <form class="add-post-form">
    <h2 style="text-align: center;">Dodawanie Ogłoszenia</h2> <!-- Dodanie nagłówka przed polem tytułu -->
    <label for="title">Tytul:</label>
    <input type="text" id="title" name="title" required>
    <label for="content">Tresc:</label>
    <textarea id="content" name="content" required></textarea>
    <label for="group">Widoczność:</label>
    <select id="group" name="group" required>
      <option value="Wszystkie grupy">Wszystkie grupy</option>
      <option value="Grupa 4I1">4I1</option>
      <option value="Grupa 4I2">4I2</option>
      <option value="Grupa 4I3">4I3</option>
      <option value="Grupa 4I4">4I4</option>
      <option value="Grupa 4I5">4I5</option>
      <option value="Grupa 4I6">4I6</option>
      <option value="Grupa 4I7">4I7</option>
      <option value="Grupa 4I8">4I8</option>
    </select>
    <button type="submit">Dodaj Post</button>
    <button type="button" class="cancel-post-button">Anuluj</button> <!-- Dodanie przycisku anulowania -->
  </form>

  <!-- Skrypt obsługujący dodawanie postów i komentarzy -->
  <script>
    // Funkcja do otwierania formularza dodawania postów
    document.querySelector('.add-post-button').addEventListener('click', function () {
      document.querySelector('.add-post-form').style.display = 'block';
    });

    // Funkcja do zamykania formularza po dodaniu postu
    document.querySelector('.add-post-form').addEventListener('submit', function (e) {
      e.preventDefault();

      // Pobranie wartości z formularza
      const title = document.querySelector('#title').value;
      const content = document.querySelector('#content').value;
      const group = document.querySelector('#group').value;
      const uniqueId = generateUniqueId();

      // Tworzenie nowego postu za pomocą szablonu
      const postHtml = postTemplate
        .replace(/%id%/g, uniqueId)
        .replace('%title%', title)
        .replace('%content%', content)
        .replace('%group%', group);

      // Wstawianie nowego postu na początek listy postów
      document.querySelector('.content').insertAdjacentHTML('afterbegin', postHtml);

      // Ukrywanie formularza po dodaniu postu
      document.querySelector('.add-post-form').style.display = 'none';

      // Czyszczenie wartości formularza
      document.querySelector('#title').value = '';
      document.querySelector('#content').value = '';
      document.querySelector('#group').value = '';

      // Tworzenie obiektu Post i dodanie go do listy postów
      const post = new Post(uniqueId, title, content, group);
      const postElement = document.getElementById(`post-${uniqueId}`);
      postElement.__post__ = post;
    });

    // Generowanie unikalnego identyfikatora
    function generateUniqueId() {
      const time = Date.now().toString();
      const randomNumber = Math.floor(Math.random() * 1000);
      return `${time}-${randomNumber}`;
    }

    // Klasa Post reprezentująca post z komentarzami
    class Post {
      constructor(id, title, content, group) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.group = group;
        this.comments = [];
      }

      // Dodawanie komentarza do postu
      addComment(comment) {
        this.comments.push(comment);
      }
    }

    // Event listener dla przycisku dodawania komentarzy
    document.querySelector('.content').addEventListener('click', function (e) {
      if (e.target.classList.contains('comment-button')) {
        const postId = e.target.closest('.post').id;
        const commentFormHtml = commentFormTemplate.replace(/%id%/g, postId);
        const commentForm = document.createElement('div');
        commentForm.innerHTML = commentFormHtml;

        e.target.closest('.post').appendChild(commentForm);

        commentForm.querySelector('form').addEventListener('submit', function (e) {
          e.preventDefault();

          const comment = document.querySelector('#comment').value;
          const commentHtml = commentTemplate.replace('%comment%', comment);

          document.querySelector(`#${postId} .comments`).insertAdjacentHTML('beforeend', commentHtml);

          commentForm.parentElement.removeChild(commentForm);

          const postElement = document.querySelector(`#${postId}`);
          const post = postElement.__post__;
          post.addComment(comment);

          document.querySelector('#comment').value = '';
        });
      }
    });

    // Szablon HTML dla nowego postu
    const postTemplate = `
  <div class="post" id="post-%id%">
    <h2>%title%</h2>
    <div class="meta">
      <p>%content%</p>
      <p>Widoczność: %group%</p>
    </div>
    <div class="comments"></div>
    <div class="actions" style="display: flex; justify-content: space-between; margin-top: 10px;">
      <div style="display: flex; align-items: center;">
        <a href="#" class="comment-button" style="margin-right: 10px;">Komentarz</a>
        <input type="checkbox" id="wezme-udzial-%id%" name="wezme-udzial-%id%" style="margin-left: 60px;">
        <label for="wezme-udzial-%id%" style="margin-right: 5px;">Wezme udzial</label>
        <button class="more-actions-button" style="border: none; margin-left: 60px;background-color: transparent; cursor: default;">Wiecej Akcji</button>
        <div class="more-actions" style="margin-left: 10px;"> <!-- Dodanie marginesu po lewej stronie -->
          <select id="group-%id%" name="group" required style="margin-right: 2px;">
            <option value="all">Wiecej akcji</option>
            <option value="Zglos post">Zglos post</option>
            <option value="Ukryj post">Ukryj post</option>
          </select>
        </div>
      </div>
    </div>
    <form class="add-comment-form" style="display: none;">
      <label for="comment">Tresc:</label>
      <textarea id="comment-%id%" name="comment" required></textarea>
      <button type="submit">Dodaj komentarz</button>
    </form>
  </div>
`;

    // Szablon HTML dla nowego komentarza
    const commentTemplate = `
      <div class="comment">
        <p>%comment%</p>
      </div>
    `;

    // Szablon HTML dla formularza dodawania komentarzy
    const commentFormTemplate = `
      <form class="add-comment-form">
        <label for="comment">Tresc:</label>
        <textarea id="comment" name="comment" required></textarea>
        <button type="submit">Dodaj komentarz</button>
      </form>
    `;
  </script>
</body>

</html>