const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required']
  },
  zodiacSign: {
    type: String,
    required: false // Will be calculated automatically
  },
  horoscopeHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    horoscope: String,
    zodiacSign: String
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Auto-calculate zodiac sign before saving
userSchema.pre('save', function(next) {
  if (this.birthdate) {
    this.zodiacSign = calculateZodiacSign(this.birthdate);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Function to calculate zodiac sign based on birthdate
function calculateZodiacSign(birthdate) {
  const month = birthdate.getMonth() + 1; // getMonth() returns 0-11
  const day = birthdate.getDate();

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagittarius';
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'Capricorn';
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
  
  return 'Unknown';
}

module.exports = mongoose.model('User', userSchema);