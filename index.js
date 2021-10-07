var express = require('express');
var hbs = require('express-handlebars');
var bodyparser = require('body-parser');
let port    = process.env.PORT || 80
const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "b70129ad",
  apiSecret: "uPqy6HHkao43kEJi"
});
// test 
var app = express();
// Middleware
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'));


//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    res.render('start');
});


app.get('/check', (req, res) => {
  res.render('check');
});

// app.post('/tester', (req, res)=>{
//   const name = req.body.name
//   const code = req.body.code
//   const text = 'Hey ' + name + ' Your OTP is ' + code;

//   console.log(text);
// })

// Sms logic
app.post('/sendCode', (req, res)=>{
  const name = req.body.name
  const code = req.body.code
  const from = "KampGig"
const to = req.body.to
const text = 'Hello ' + name + ' Your OTP is ' + code


vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
        res.send('<p>An error occured</p>')
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
            res.send('<p> An OTP has been sent to</p>' + to)
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            res.send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
})

  // get tel
//   app.post('/verify', (req, res) =>{
//     vonage.verify.request({
//       number: req.body.tel,
//       brand: "KampGig"
//     }, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.send('An Error Occured')
//       } else {

//         const verifyRequestId = result.request_id;
//         console.log('request_id', verifyRequestId);
//         res.render('check', {requestId: verifyRequestId})

//       }
//     });

//   });

//   app.post('/checkCode', (req, res)=>{
//     vonage.verify.check({
//       request_id: req.body.id,
//       code: req.body.code,
//     }, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.send('invalid')
//       } else {
//         console.log(result);
//         res.render('complete');
//         res.send('valid')
//       }
//     });
// });
  app.listen(port, () =>{
    console.log(`App started on port: ${port}`);
  });









