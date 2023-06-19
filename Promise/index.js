function getPostById(postId) {
    return new Promise((resolve, reject) => {
      if (postId < 1 || postId > 100) {
        reject(new Error('Недійсний ідентифікатор поста. Введіть число від 1 до 100.'));
      }
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Не вдалося знайти пост з заданим ідентифікатором.');
          }
          return response.json();
        })
        .then(post => resolve(post))
        .catch(error => reject(error));
    });
}


function getCommentsByPostId(postId) {
    return new Promise((resolve, reject) => {
      if (postId < 1 || postId > 100) {
        reject(new Error('Недійсний ідентифікатор поста. Введіть число від 1 до 100.'));
      }
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Не вдалося знайти коментарі для заданого поста.');
          }
          return response.json();
        })
        .then(comments => resolve(comments))
        .catch(error => reject(error));
    });
}

function getPostAndComments(postId) {
    getPostById(postId)
    .then(post => {
        const postBlock = document.createElement('div');
        postBlock.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        document.body.appendChild(postBlock);
        const commemtsButton = document.createElement('button');
        commemtsButton.textContent = 'Отримати коментарі';
        commemtsButton.addEventListener('click', () => {
            getCommentsByPostId(postId)
            .then(comments => {
                const commentsBlock = document.createElement('div');
                comment.forEach(comment => {
                    const commentItem = document.createElement('p');
                    commentItem.textContent = `${comment.name}: ${comment.body}`;
                    commentsBlock.appendChild(commentItem);
                });
                document.body.appendChild(commentsBlock);
            })
            .catch(error => console.error(error));
        });
        document.body.appendChild(commemtsButton);
    })
    .catch(error => console.error(error));
}

const postId = 1;
getPostAndComments(postId);