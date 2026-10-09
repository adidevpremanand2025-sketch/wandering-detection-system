// All editable site copy lives here.

export const site = {
  title: 'Wandering Detection System for Dementia / Alzheimer’s Patients',
  shortTitle: 'Wandering Detection',
  tagline:
    'A small, affordable wearable that learns how your loved one normally moves, and tells you early when something feels off.',
  quiet: 'So a walk never has to end in worry.',
  college: 'VIT Chennai',
  year: '2025–26',
}

export const nav = [
  { id: 'problem', label: 'Why' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'literature', label: 'Research' },
  { id: 'challenges', label: 'Gaps' },
  { id: 'objectives', label: 'Goals' },
  { id: 'architecture', label: 'How it works' },
  { id: 'methodology', label: 'Steps' },
  { id: 'hardware', label: 'Parts' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'involve', label: 'Get involved' },
  { id: 'team', label: 'Team' },
]

export const team = [
  { name: 'Karan Jonah', reg: '25BAI1716' },
  { name: 'Adidev Premanand', reg: '25BAI1720' },
  { name: 'Tharun Anand', reg: '25BAI1432' },
]

export const problem = {
  heading: ['It only takes a few minutes for someone to be ', 'gone', '.'],
  points: [
    { title: 'No warning', body: 'It can happen in the time it takes to make a cup of tea.' },
    { title: 'Real danger', body: 'Getting lost can mean injury, traffic, or a cold night outside.' },
    { title: 'No one can watch 24/7', body: 'Families need rest. Today’s tools speak up only after the person has already left.' },
  ],
  solution:
    'We are building a gentle wearable that learns what a normal day looks like for one person, notices when it changes, and tells the family early.',
}

export const literature = {
  heading: ['Good tools, but they speak up ', 'too late', '.'],
  columns: ['Tool', 'What it does', 'Where it falls short'],
  rows: [
    {
      name: 'GPS Geofencing Trackers',
      does: 'Alerts you when someone leaves a set zone.',
      limit: 'Only alerts after the boundary is crossed. Zones are set by hand. It never learns the person.',
    },
    {
      name: 'Smartwatches (e.g. Apple Watch)',
      does: 'Shares location, detects falls, sends emergency alerts.',
      limit: 'Built for everyone, not for them. Costly, and the wearer must manage a smartwatch.',
    },
    {
      name: 'Smart-home sensor systems (e.g. CASAS)',
      does: 'Motion and door sensors spot unusual activity at home.',
      limit: 'Stays at home. Needs a wired-up house and cannot follow them outside.',
    },
    {
      name: 'Our system',
      does: 'Combines movement, location and activity, then learns what is normal for one person.',
      limit: 'Notices when they drift from their own normal, and tells caregivers early.',
      highlight: true,
    },
  ],
}

export const challenges = {
  heading: ['What families are ', 'missing', '.'],
  items: [
    { n: '01', title: 'Late, not early', body: 'Most tools tell you after something has gone wrong.' },
    { n: '02', title: 'Too costly, too complicated', body: 'Many families simply cannot afford them or set them up.' },
    { n: '03', title: 'One rule for everyone', body: 'Everyone moves differently. Ours learns each person’s own routine.' },
  ],
  gapLabel: 'The gap',
  gap: 'Families need something affordable and personal that notices early, not after a boundary is crossed.',
}

export const objectives = {
  heading: ['What we ', 'hope', ' to achieve.'],
  items: [
    'A low-cost wearable that tracks movement',
    'A system that learns each person’s routine',
    'A model that notices when they drift from it',
    'Alerts that tell caregivers why, in plain words',
    'Honest testing: how often we are right, and how often we cry wolf',
  ],
}

// Pipeline nodes. kind: 'process' | 'decision' | 'end'
export const architecture = {
  heading: ['From a tiny sensor to a ', 'clear message', '.'],
  hint: 'Tap any step for a quick explanation.',
  nodes: [
    { id: 'wearable', title: 'Wearable Device', sub: 'ESP32 + Accelerometer + GPS', tip: 'Worn comfortably, it senses movement and position.' },
    { id: 'collect', title: 'Data Collection', sub: 'Serial / WiFi', tip: 'Readings travel to our software.' },
    { id: 'features', title: 'Feature Extraction', sub: 'speed, direction change, time-of-day, location', tip: 'Raw signals become a few meaningful numbers.' },
    { id: 'calibration', title: 'Calibration Phase', sub: '1–2 weeks, learns normal routine', tip: 'It watches quietly and judges nothing at first.' },
    { id: 'baseline', title: 'Personal Baseline Profile', sub: 'what normal looks like for them', tip: 'Their own usual pattern, hour by hour.' },
    { id: 'model', title: 'Anomaly Detection Model', sub: 'Isolation Forest', tip: 'Scores how unusual this moment is for them.' },
    { id: 'decision', kind: 'decision', title: 'Anomaly flagged?', tip: 'Is this different enough to matter?' },
    { id: 'alert', branch: 'YES', title: 'Caregiver Alert', sub: 'App / Dashboard / SMS', tip: 'You hear about it where you already look.' },
    { id: 'explain', kind: 'end', title: 'Explainable Alert', sub: '“movement 3× slower than usual for 2pm”', tip: 'Every alert says why, so you can decide fast.' },
    { id: 'continue', branch: 'NO', title: 'Continue Monitoring', sub: 'loops back to Data Collection', tip: 'All is well. Keep watching, quietly.' },
  ],
}

export const methodology = {
  heading: ['How we ', 'get there', '.'],
  steps: [
    'The wearable notes how they move.',
    'A model learns what a normal day looks like.',
    'We pick out the key patterns.',
    'We spot what does not fit.',
    'We alert the family, early.',
    'We test with synthetic data, then real data.',
    'Volunteers wear the prototype so we can learn from real life.',
  ],
}

export const hardware = {
  heading: ['Small, simple, ', 'affordable', '.'],
  items: [
    { name: 'ESP32', kind: 'Microcontroller', role: 'The brain. Reads the sensors and sends data on.', image: '/images/esp32.jpg' },
    { name: 'MPU-6050', kind: '3-axis accelerometer + gyroscope', role: 'Feels how they move and turn.', image: '/images/mpu6050.jpg' },
    { name: 'GPS module', kind: 'e.g. NEO-6M', role: 'Knows where they are outdoors.', image: '/images/gps.jpg' },
  ],
}

export const roadmap = {
  heading: ['Four steps to a ', 'working prototype', '.'],
  steps: [
    { title: 'Data and software foundation', status: 'In progress' },
    { title: 'Build the hardware, gather real data' },
    { title: 'Learn each person, detect early' },
    { title: 'Bring it together and test it' },
  ],
}

export const teamSection = {
  heading: ['The people ', 'behind it', '.'],
}

// Contact details are placeholders: replace before sharing the site.
export const involve = {
  headingParts: ['If someone you love ', 'wanders', ', help us notice ', 'sooner', '.'],
  lede: 'We are students building this for families like yours, and we cannot get it right alone.',
  body: 'We need people who have lived this, and a few volunteers to wear our prototype for a short trial. A conversation is enough to begin.',
  ways: [
    { verb: 'Wear it.', body: 'Try the prototype for a short trial. Your ordinary days teach us more than any lab can.' },
    { verb: 'Tell us.', body: 'What does a hard afternoon look like? What would you want to be told, and how?' },
    { verb: 'Follow along.', body: 'Ask for a note when there is something real to show.' },
  ],
  cta: 'Write to us',
  email: 'adidev.premanand2025@vitstudent.ac.in',
  note: 'What you share stays with the project team and is used only to improve it.',
}

// Statistics: wording is taken verbatim from the two sources below. Do not add figures from any other source.
const WHO_URL = 'https://www.who.int/news-room/fact-sheets/detail/dementia'
const ALZ_URL = 'https://www.alz.org/help-support/caregiving/stages-behaviors/wandering'
const WHO = { source: 'Source: WHO, 2026 fact sheet', url: WHO_URL }
const ALZ = { source: "Source: Alzheimer's Association", url: ALZ_URL }

export const numbers = {
  heading: 'The numbers',
  lead: {
    text: 'Six in 10 people living with dementia will wander at least once, and many do so repeatedly.',
    ...ALZ,
  },
  stats: [
    { text: 'Many people who wander are found within 1.5 miles of where they disappeared.', ...ALZ },
    { text: 'If a person is not found within 15 minutes, call the emergency number and say the person has dementia.', ...ALZ },
    { text: '57 million people were living with dementia worldwide in 2021. More than 60% live in low- and middle-income countries.', ...WHO },
    { text: 'Nearly 10 million new cases every year.', ...WHO },
    { text: "Alzheimer's disease may contribute to 60-70% of dementia cases.", ...WHO },
    { text: 'Dementia is the seventh leading cause of death worldwide.', ...WHO },
    { text: 'Dementia cost economies US$1.3 trillion in 2019. About 50% of that is care by family and friends, who give on average 5 hours of care and supervision per day.', ...WHO },
    { text: 'Women provide 70% of care hours for people living with dementia.', ...WHO },
  ],
}

export const ethics = {
  heading: 'About this project: ethics and privacy',
  intro:
    'This is a student project by Karan Jonah (25BAI1716), Adidev Premanand (25BAI1720) and Tharun Anand (25BAI1432) at VIT Chennai. It is a prototype, not a medical device. It has not been clinically tested and must not be used as a substitute for professional care or supervision.',
  items: [
    {
      lead: 'What it collects:',
      text: ' location (GPS) and movement (motion sensor) data from a wearable prototype, and the alerts the system generates. This website itself collects only the email address you choose to send us.',
    },
    {
      lead: 'Where it is stored and who sees it:',
      // TODO: confirm with team where data is stored and who has access (shown on screen as plain text until confirmed)
      text: ' [TODO: confirm with team where data is stored and who has access]. Test data is shared only within the project team and our faculty reviewers. We do not sell or share data with third parties.',
    },
    {
      lead: 'Consent:',
      text: ' any testing with people uses informed consent from the person and their caregiver. No real patient data is shown on this site.',
    },
    {
      lead: 'Your data:',
      textBefore: " to ask us to delete anything you've sent, email ",
      email: true,
      textAfter: '.',
    },
  ],
  outro:
    'If you or someone you care for is struggling with memory loss, please talk to a doctor. This site is for awareness only.',
}
