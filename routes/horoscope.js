const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getDailyHoroscope, getHistoricalHoroscope } = require('../data/horoscopes');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Horoscope:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         zodiacSign:
 *           type: string
 *         horoscope:
 *           type: string
 *         message:
 *           type: string
 *     HoroscopeHistory:
 *       type: object
 *       properties:
 *         history:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Horoscope'
 *         totalDays:
 *           type: number
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/horoscope/today:
 *   get:
 *     summary: Get today's horoscope for authenticated user
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's horoscope retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Horoscope'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/today', auth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date();
    const todayString = today.toDateString();
    
    // Get today's horoscope
    const horoscopeText = getDailyHoroscope(user.zodiacSign);
    
    // Check if we already have today's horoscope in history
    const existingEntry = user.horoscopeHistory.find(entry => 
      entry.date.toDateString() === todayString
    );
    
    if (!existingEntry) {
      // Add to user's horoscope history
      user.horoscopeHistory.push({
        date: today,
        horoscope: horoscopeText,
        zodiacSign: user.zodiacSign
      });
      
      // Keep only last 30 days of history to prevent unlimited growth
      if (user.horoscopeHistory.length > 30) {
        user.horoscopeHistory = user.horoscopeHistory
          .sort((a, b) => b.date - a.date)
          .slice(0, 30);
      }
      
      await user.save();
    }
    
    res.json({
      date: today.toISOString().split('T')[0],
      zodiacSign: user.zodiacSign,
      horoscope: horoscopeText,
      message: `Here's your horoscope for today, ${user.name}!`
    });
  } catch (error) {
    console.error('Today horoscope error:', error);
    res.status(500).json({ error: 'Server error while fetching horoscope' });
  }
});

/**
 * @swagger
 * /api/horoscope/history:
 *   get:
 *     summary: Get last 7 days of horoscope history for authenticated user
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Horoscope history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HoroscopeHistory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/history', auth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    // Get last 7 days of history from user's stored history
    let history = user.horoscopeHistory
      .filter(entry => entry.date >= sevenDaysAgo)
      .sort((a, b) => b.date - a.date)
      .map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        zodiacSign: entry.zodiacSign,
        horoscope: entry.horoscope
      }));
    
    // If we don't have enough history, generate historical horoscopes
    const existingDates = new Set(history.map(h => h.date));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      const dateString = date.toISOString().split('T')[0];
      
      if (!existingDates.has(dateString)) {
        const historicalHoroscope = getHistoricalHoroscope(user.zodiacSign, date);
        history.push({
          date: dateString,
          zodiacSign: user.zodiacSign,
          horoscope: historicalHoroscope
        });
      }
    }
    
    // Sort by date (most recent first) and limit to 7 days
    history = history
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);
    
    res.json({
      history,
      totalDays: history.length,
      message: `Here's your horoscope history for the last ${history.length} days, ${user.name}!`
    });
  } catch (error) {
    console.error('History horoscope error:', error);
    res.status(500).json({ error: 'Server error while fetching horoscope history' });
  }
});

/**
 * @swagger
 * /api/horoscope/signs:
 *   get:
 *     summary: Get all zodiac signs
 *     tags: [Horoscope]
 *     responses:
 *       200:
 *         description: List of all zodiac signs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signs:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/signs', (req, res) => {
  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  
  res.json({
    signs: zodiacSigns,
    message: 'All zodiac signs retrieved successfully'
  });
});

/**
 * @swagger
 * /api/horoscope/date/{date}:
 *   get:
 *     summary: Get horoscope for a specific date
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Horoscope for specific date retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Horoscope'
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/date/:date', auth, async (req, res) => {
  try {
    const { date } = req.params;
    const user = req.user;
    
    // Validate date format
    const requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }
    
    // Don't allow future dates beyond today
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    
    if (requestedDate > today) {
      return res.status(400).json({ error: 'Cannot get horoscope for future dates.' });
    }
    
    // Check if we have this date in history
    const existingEntry = user.horoscopeHistory.find(entry => 
      entry.date.toDateString() === requestedDate.toDateString()
    );
    
    let horoscopeText;
    if (existingEntry) {
      horoscopeText = existingEntry.horoscope;
    } else {
      horoscopeText = getHistoricalHoroscope(user.zodiacSign, requestedDate);
    }
    
    res.json({
      date: requestedDate.toISOString().split('T')[0],
      zodiacSign: user.zodiacSign,
      horoscope: horoscopeText,
      message: `Here's your horoscope for ${requestedDate.toDateString()}, ${user.name}!`
    });
  } catch (error) {
    console.error('Date horoscope error:', error);
    res.status(500).json({ error: 'Server error while fetching horoscope for date' });
  }
});

module.exports = router;