// Final copy for the 3-Day Youth Shivir page (#youth-shivir), word for word from the Nov 2026 brief.

export const YOUTH_SHIVIR = {
  heading: '3-Day Youth Shivir — A More Purposeful You',
  detailLine:
    '10–12 October 2026 · 8:00 AM – 7:00 PM · Pathshala Hall, Chickpet Jain Temple, Bangalore · Conducted by Param Pujya Muniraj Shri Bhuvanbhushanvijayji Maharajsaheb',
  intro:
    "Three full days, morning to evening, built on five pillars — Self, Career, Health, Mind and Community. Each day began with a Dharmik activity and Sahebji's Pravachan, moved into hands-on skill labs, and closed with Aarti and Bhakti.",

  // Rows of the day-by-day table: [slot, day 1, day 2, day 3]
  schedule: [
    { slot: 'Morning activity', days: ['Making a garland', 'Nandavarta Swastik', 'Garland'] },
    { slot: 'Pravachan', days: ['Sahebji', 'Sahebji', 'Sahebji'] },
    {
      slot: 'Skill labs',
      days: ['Computer basics; AI website-building lab', 'Advanced AI; Excel advanced', 'Photoshop & Illustrator'],
    },
    { slot: 'Life skills', days: ['Insurance', 'Psychology (Neha ben); Law (Dipak bhai)', 'Cyber-crime awareness'] },
    { slot: 'Shivir session', days: ['Sahebji', 'Sahebji', 'Sahebji'] },
    {
      slot: 'Finale',
      days: ['Aarti & Bhakti', 'Aarti & Bhakti', 'Individual presentations by every youth; Aarti & Bhakti'],
    },
  ],

  mentors: [
    { name: 'Sahebji', role: '' },
    { name: 'Gaurav bhai', role: 'computers, AI, Excel, insurance' },
    { name: 'Yash bhai', role: 'AI website lab' },
    { name: 'Naveen bhaiya', role: 'Photoshop, Illustrator, Aarti & Bhakti' },
    { name: 'Neha ben', role: 'psychology' },
    { name: 'Dipak bhai', role: 'law' },
  ],

  closingLine:
    'We came in as participants. We left with a website we built, a presentation we delivered, and a clearer idea of who we want to be.',
};
