const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const ps = require('python-shell');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Static files
app.use('/', express.static(path.join(__dirname, '/')));
app.use('/', express.static(path.join(__dirname, '/public')));
// Docs static files
app.use('/', express.static(path.join(__dirname, '/docs/static')));
app.use('/docs/', express.static(path.join(__dirname, '/docs/client')));
app.use('/docs/', express.static(path.join(__dirname, '/docs/static')));
app.set('view engine', 'ejs');


// Multer config
const multerConfig = {

  storage: multer.diskStorage({
    // Set destination
    destination: function(req, file, next){
      next(null, './media');
    },

    // Set filename
    // Use timesignature
    filename: function(req, file, next){
      // Get files mimetype ie 'image/jpeg' 
      const ext = file.mimetype.split('/')[1];
      // Timesign
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
  }),

  // Filter files
  fileFilter: function(req, file, next){
      if(!file){
        next();
      }
      const image = file.mimetype.startsWith('image/');
      if(image){
        console.log('photo uploaded');
        next(null, true);
      }else{
        console.log("file not supported")
        return next();
      }
  }
};


app.post('/upload', multer(multerConfig).single('photo'), async function(req, res){
    // Get pic name 
    let pic_url = req.file.filename
    // Python shell config
    let options = {
      args: [pic_url]
    };

    try {
      await ps.PythonShell.run('ml.py', options, function (err) {
        if (err) throw err;
        res.render('../public/profile.ejs', {pic_url: pic_url});
      });
    } catch(e){
      console.log(e);
    }
});

app.listen(port,function(){
  console.log(`Server si running on port ${port}`);
});
