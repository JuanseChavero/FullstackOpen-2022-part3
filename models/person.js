const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'Number is required'],
    validate: {
      validator: function (v) {
        return (
          /\d{2}-\d/.test(v) ||
          /\d{3}-\d/.test(v) ||
          /\d{3}-\d{3}-\d{4}/.test(v)
        );
      },
      message: '{VALUE} is not a valid phone number!',
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
