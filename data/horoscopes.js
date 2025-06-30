// Mock horoscope data for each zodiac sign
const horoscopeData = {
  'Aries': [
    "Today brings exciting opportunities for new beginnings. Your natural leadership will shine through in unexpected ways.",
    "Mars energizes your ambitions today. Take bold action, but remember to consider others' feelings.",
    "A burst of creative energy flows through you. Channel this into a project you're passionate about.",
    "Your competitive spirit serves you well today. Trust your instincts in making important decisions.",
    "Adventure calls to you today. Embrace change and step out of your comfort zone.",
    "Your enthusiasm is contagious today. Use it to inspire others and build meaningful connections.",
    "Focus on your goals with determination. Success is within reach if you stay persistent."
  ],
  'Taurus': [
    "Stability and comfort are your themes today. Take time to appreciate the simple pleasures in life.",
    "Your practical nature helps you solve a long-standing problem. Trust your methodical approach.",
    "Financial opportunities may present themselves. Your careful planning is about to pay off.",
    "Patience is your superpower today. Good things come to those who wait and work steadily.",
    "Your artistic side is highlighted today. Express yourself through creative endeavors.",
    "Focus on building lasting relationships. Your loyalty and dependability attract the right people.",
    "Nature calls to you today. Spend time outdoors to recharge your energy and find peace."
  ],
  'Gemini': [
    "Communication is key today. Your words have the power to inspire and influence others positively.",
    "Your curiosity leads you to discover something fascinating. Keep an open mind to new ideas.",
    "Networking brings unexpected benefits. Your social skills open doors to new opportunities.",
    "Mental agility is your strength today. Use it to solve complex problems with ease.",
    "Variety is the spice of life today. Embrace different experiences and perspectives.",
    "Your wit and charm make you the center of attention. Use this influence wisely.",
    "Learning something new energizes you today. Feed your mind with knowledge and inspiration."
  ],
  'Cancer': [
    "Your intuition is particularly strong today. Trust your gut feelings in important matters.",
    "Home and family take center stage. Nurturing relationships brings you deep satisfaction.",
    "Emotional healing is possible today. Allow yourself to process and release old hurts.",
    "Your caring nature touches someone's heart today. Small acts of kindness make a big difference.",
    "Past experiences provide valuable insights for current challenges. Wisdom comes from reflection.",
    "Your protective instincts guide you well today. Stand up for those who need your support.",
    "Creating a comfortable environment enhances your well-being. Focus on your personal space."
  ],
  'Leo': [
    "Your natural charisma shines brightly today. Step into the spotlight and share your talents.",
    "Creative expression brings joy and recognition. Don't be afraid to show your unique style.",
    "Leadership opportunities arise. Your confidence and warmth inspire others to follow.",
    "Generosity of spirit attracts abundance. What you give freely returns to you multiplied.",
    "Your dramatic flair adds excitement to ordinary situations. Embrace your theatrical nature.",
    "Pride in your accomplishments is well-deserved today. Celebrate your successes with others.",
    "Romance and passion color your day. Open your heart to love and meaningful connections."
  ],
  'Virgo': [
    "Attention to detail serves you well today. Your meticulous approach leads to perfect results.",
    "Organization and planning bring order to chaos. Your systematic methods create efficiency.",
    "Health and wellness deserve your focus today. Small improvements lead to significant benefits.",
    "Your analytical skills help others solve their problems. Your advice is both practical and wise.",
    "Service to others brings deep fulfillment. Your helpful nature makes a real difference.",
    "Perfectionism has its place, but don't let it paralyze progress. Aim for excellence, not perfection.",
    "Your practical wisdom guides important decisions today. Trust your logical approach."
  ],
  'Libra': [
    "Balance and harmony are your goals today. Seek the middle ground in all situations.",
    "Your diplomatic skills help resolve conflicts. Your fair approach brings peace to discord.",
    "Beauty and aesthetics inspire you today. Surround yourself with things that please your senses.",
    "Partnerships and relationships flourish under your caring attention. Cooperation leads to success.",
    "Justice and fairness guide your actions today. Stand up for what's right with grace.",
    "Your charm and social grace open doors. Use your people skills to build bridges.",
    "Decision-making requires careful consideration today. Weigh all options before choosing."
  ],
  'Scorpio': [
    "Deep transformation is possible today. Embrace change as a path to personal growth.",
    "Your intuitive powers are heightened. Trust the insights that come from within.",
    "Mysteries and secrets may be revealed today. Your investigative nature uncovers hidden truths.",
    "Emotional intensity brings both challenges and breakthroughs. Channel your passion constructively.",
    "Your magnetic personality draws others to you. Use this influence with wisdom and compassion.",
    "Regeneration and renewal are your themes today. Let go of what no longer serves you.",
    "Your determination overcomes any obstacle. Persistence and focus lead to victory."
  ],
  'Sagittarius': [
    "Adventure and exploration call to your spirit today. Expand your horizons in every way possible.",
    "Your philosophical nature seeks deeper meaning. Wisdom comes through experience and reflection.",
    "Freedom and independence are essential today. Break free from limiting circumstances.",
    "Your optimistic outlook inspires others. Share your positive vision of the future.",
    "Learning and teaching go hand in hand today. Knowledge shared is knowledge multiplied.",
    "Travel, whether physical or mental, broadens your perspective. Embrace new cultures and ideas.",
    "Your honesty and directness, though sometimes blunt, brings clarity to confusing situations."
  ],
  'Capricorn': [
    "Ambition and determination drive you toward your goals today. Success is built step by step.",
    "Your practical approach to problems yields concrete results. Steady progress leads to achievement.",
    "Responsibility and duty guide your actions today. Others rely on your dependable nature.",
    "Long-term planning pays off today. Your patience and persistence create lasting foundations.",
    "Authority and leadership come naturally to you today. Others look to you for guidance.",
    "Tradition and structure provide stability in uncertain times. Honor the wisdom of experience.",
    "Your disciplined approach to challenges ensures victory. Hard work always pays off."
  ],
  'Aquarius': [
    "Innovation and originality set you apart today. Your unique perspective offers fresh solutions.",
    "Humanitarian causes capture your attention. Your desire to help others creates positive change.",
    "Friendship and community are highlighted today. Your social network provides valuable support.",
    "Your independent spirit refuses to be confined. Freedom of thought and action are essential.",
    "Technology and progress fascinate you today. Embrace new ways of doing things.",
    "Your eccentric nature is actually your greatest strength. Don't try to fit conventional molds.",
    "Group efforts and teamwork achieve remarkable results. Your collaborative spirit inspires others."
  ],
  'Pisces': [
    "Your compassionate nature touches many hearts today. Empathy and understanding heal old wounds.",
    "Intuition and psychic sensitivity guide your decisions. Trust the messages from your inner voice.",
    "Creativity flows through you like a river today. Artistic expression brings joy and fulfillment.",
    "Dreams and imagination offer insights into reality. Pay attention to symbolic messages.",
    "Your spiritual nature seeks connection with something greater. Meditation and reflection bring peace.",
    "Emotional depth allows you to understand others' pain. Your healing presence comforts those in need.",
    "Sacrifice for others brings unexpected rewards. Your selfless nature creates positive karma."
  ]
};

// Function to get a random horoscope for a specific zodiac sign
function getDailyHoroscope(zodiacSign) {
  const horoscopes = horoscopeData[zodiacSign];
  if (!horoscopes) {
    return "The stars are mysterious today. Your unique path unfolds in unexpected ways.";
  }
  
  // Use date as seed for consistent daily horoscope
  const today = new Date();
  const dateString = today.toDateString();
  const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % horoscopes.length;
  
  return horoscopes[index];
}

// Function to get historical horoscopes (simulated)
function getHistoricalHoroscope(zodiacSign, date) {
  const horoscopes = horoscopeData[zodiacSign];
  if (!horoscopes) {
    return "The stars were mysterious on this day. Your unique path unfolded in unexpected ways.";
  }
  
  // Use date as seed for consistent historical horoscope
  const dateString = date.toDateString();
  const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % horoscopes.length;
  
  return horoscopes[index];
}

module.exports = {
  horoscopeData,
  getDailyHoroscope,
  getHistoricalHoroscope
};