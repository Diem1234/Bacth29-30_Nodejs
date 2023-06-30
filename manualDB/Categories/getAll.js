const { default: mongoose } = require('mongoose');
const { Category } = require('../../models');

mongoose.connect('mongodb://127.0.0.1:27017/Batch29&30');

try {
  Category.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}