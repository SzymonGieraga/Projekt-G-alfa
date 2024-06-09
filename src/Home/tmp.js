
  {/* <!-- Skrypt obsługujący dodawanie postów i komentarzy --> */}
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
`;

    // Szablon HTML dla nowego komentarza
    const commentTemplate = `
    `;

    // Szablon HTML dla formularza dodawania komentarzy
    const commentFormTemplate = `
    `;
  </script>