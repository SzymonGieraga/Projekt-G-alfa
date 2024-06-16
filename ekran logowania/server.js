const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const cookieParser = require('cookie-parser');
const { Student, sequelize } = require('./models/student');
const { redirect } = require('express/lib/response');

const app = express();
const port = 8080;

const supabaseUrl = 'https://lgfyfbsajqevelhnyiak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZnlmYnNhanFldmVsaG55aWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3ODczNTcsImV4cCI6MjAzMzM2MzM1N30.miplvEdimTfLZXJP74SS4vpfgT5PSyJJ8pw1DPDFbpA';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'src/main/resources/static')));

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('Brak tokena, przekierowanie na /api/login');
    return res.redirect('/api/login');
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    console.log('Błąd lub brak użytkownika, przekierowanie na /api/login', error);
    res.clearCookie('token');
    return res.redirect('/api/login');
  }

  req.user = data.user;
  next();
};

const checkAlreadyAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (token && (req.path === '/api/login' || req.path === '/')) {
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data.user) {
      return res.redirect('/strona-glowna');
    }
  }

  next();
};

app.use((req, res, next) => {
  if (['/api/login', '/api/login?error=1', '/api/reset-password', '/api/reset-password/info', '/api/new-password',
     '/api/new-password/info','/api/logout'].includes(req.path)) 
  {
    return next();
  } else {
    return checkAuth(req, res, next);
  }
});

app.get('/api/login', checkAlreadyAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/ekran-logowania.html'));
});

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  let dbUser;
  if (isNaN(login)) {
    dbUser = await Student.findOne({
      where: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), sequelize.fn('LOWER', login))
    });
  } else {
    dbUser = await Student.findOne({
      where: { index: login }
    });
  }

  if (!dbUser) {
    console.log('User not found in database');
    return res.redirect('/api/login?error=1');
  }

  console.log('Logging in user:', dbUser.email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: dbUser.email,
    password: password,
  });

  if (error) {
    console.error('Login error:', error);
    return res.redirect('/api/login?error=1');
  }

  if (data && data.session && data.session.access_token) {
    res.cookie('token', data.session.access_token, { httpOnly: true });

    if (dbUser.first_login) {
      await dbUser.update({ first_login: false });

      return res.redirect('/first-login');
    } else {
      return res.redirect('/strona-glowna');
    }
  } else {
    console.error('Invalid login response:', data);
    res.redirect('/api/login?error=1');
  }
});

app.get('/api/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/reset-hasla.html'));
});

app.get('/api/reset-password/info', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/info-o-resecie.html'));
});

app.get('/api/new-password', (req, res) => {
  const token = req.query.token;
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/nowe-haslo.html'));
});

app.get('/api/new-password/info', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/reset-udany.html'));
});

app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://localhost:8080/api/new-password',
  });

  if (error) {
    console.error('Error sending password reset email:', error);
    return res.redirect('/api/reset-password');
  }

  res.redirect('/api/reset-password/info');
});

app.post('/api/new-password', async (req, res) => {
  const { password, token } = req.body;

  const { data, error } = await supabase.auth.updateUser({
    password: password,
    access_token: token,
  });

  if (error) {
    console.error('Error updating password:', error.message);
    return res.status(400).send('Wystąpił błąd podczas aktualizacji hasła.');
  }

  res.redirect('/api/new-password/info');
});

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/api/login');
});

app.get('/strona-glowna', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/strona-glowna.html'));
});

app.get('/first-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/main/resources/templates/pierwsze-logowanie.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
