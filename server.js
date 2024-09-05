const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));



app.post('/register', (req, res) => {
    const { firstName, lastName, age, gender, email, mobile } = req.body;
    console.log("check db start");
    db.run(`INSERT INTO users (firstName, lastName, age, gender, email, mobile) VALUES (?, ?, ?, ?, ?, ?)`, [firstName, lastName, age, gender, email, mobile], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('User registered successfully!');
        }
    });
});

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({ data: rows });
  });
});



app.get('/verifyUser', (req, res) => {
    const { email, mobile } = req.query;
    db.get(`SELECT * FROM users WHERE email = ? AND mobile = ?`, [email, mobile], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error verifying user');
        } else if (row) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    });
});


app.post('/submitQuiz', (req, res) => {
    const { answer, mobile } = req.body;
     console.log("hy")
    if (!answer || !mobile) {
        return res.status(400).json({ success: false, message: 'Answer and mobile number are required.' });
    }

    db.get('SELECT id FROM users WHERE mobile = ?', [mobile], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        if (!row) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        debugger
        const userId = row.id;
        const date = new Date().toISOString();
        debugger
        db.run('INSERT INTO quiz (date, answer, user_id) VALUES (?, ?, ?)', [date, answer, userId], (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ success: false, message: 'Failed to save quiz result.' });
            }
            res.json({ success: true });
        });
    });
});

app.get('/quizzes', (req, res) => {
    const query = `
        SELECT quiz.date, quiz.answer, users.firstName, users.mobile
        FROM quiz
        JOIN users ON quiz.user_id = users.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
  
            console.error('Error fetching quiz data:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log('Quiz data:');
        res.json({ data: rows });
    });
});
app.get('/showUsers', (req, res) => {
    res.sendFile(__dirname + '/public/users.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
