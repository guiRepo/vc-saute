import { express } from 'express';

const app = express();
const PORT = 4000;

app.get('/home', (req, res) => {
  res.status(200).json('Welcome page')
});

app.listen(PORT, () => {
    console.log('Operational Server')
})

module.exports = app;