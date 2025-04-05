const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

const articles = [
  { id: 1, title: 'Introduction to Node.js', content: 'Node.js is a JavaScript runtime...' },
  { id: 2, title: 'Mastering Express', content: 'Express is a minimal and flexible Node.js...' },
];

app.get('/', (req, res) => {
  res.redirect('/users');  
});

app.get('/users', (req, res) => {
  res.render('users/index.pug', { users });
});

app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (user) {
    res.render('users/detail.pug', { user });
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/articles', (req, res) => {
  res.render('articles/index', { articles });
});

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));
  if (article) {
    res.render('articles/detail', { article });
  } else {
    res.status(404).send('Article not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
