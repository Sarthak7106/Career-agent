export const CAREER_DETAILS = {
  'data-scientist': {
    career_dna: { analytical: 10, creativity: 5, social: 4, risk: 6, structure: 8 },
    day_in_life: [
      'Cleaning and structuring large datasets',
      'Training and hyperparameter tuning ML models',
      'Collaborating with engineering to deploy models',
      'Creating dashboards to present insights to stakeholders'
    ],
    reality_check: {
      competition: 'High',
      work_pressure: 'Moderate to High',
      learning_curve: 'Steep (Constant upskilling required)'
    },
    market_data: {
      avg_salary: '10 - 25+ LPA',
      growth_rate: 'Very High',
      demand: 'High'
    },
    related_careers: ['Data Analyst', 'Machine Learning Engineer', 'Quantitative Analyst'],
    resources: ['Kaggle', 'Coursera (Andrew Ng)', 'Towards Data Science'],
    not_for_you_if: [
      'You dislike working with raw, messy data',
      'You are not comfortable with math and statistics',
      'You prefer highly subjective or purely creative tasks'
    ]
  },
  'ux-designer': {
    career_dna: { analytical: 4, creativity: 9, social: 7, risk: 5, structure: 5 },
    day_in_life: [
      'Conducting user interviews and surveys',
      'Creating wireframes and high-fidelity prototypes in Figma',
      'Running usability testing sessions',
      'Collaborating with product managers and developers'
    ],
    reality_check: {
      competition: 'Very High',
      work_pressure: 'Moderate',
      learning_curve: 'Moderate'
    },
    market_data: {
      avg_salary: '7 - 20+ LPA',
      growth_rate: 'High',
      demand: 'High'
    },
    related_careers: ['UI Designer', 'Product Designer', 'Interaction Designer'],
    resources: ['Nielsen Norman Group', 'Laws of UX', 'Awwwards'],
    not_for_you_if: [
      'You have trouble accepting subjective criticism of your work',
      'You prefer writing code over understanding user behavior'
    ]
  },
  'teacher': {
    career_dna: { analytical: 4, creativity: 7, social: 10, risk: 3, structure: 8 },
    day_in_life: [
      'Delivering engaging lectures to students',
      'Developing lesson plans and grading assignments',
      'Providing one-on-one mentorship',
      'Attending faculty meetings and communicating with parents'
    ],
    reality_check: {
      competition: 'Moderate',
      work_pressure: 'High (Emotional labor)',
      learning_curve: 'Moderate'
    },
    market_data: {
      avg_salary: '3 - 10 LPA',
      growth_rate: 'Stable',
      demand: 'Constant'
    },
    related_careers: ['Instructional Designer', 'Educational Consultant', 'Corporate Trainer'],
    resources: ['Edutopia', 'Coursera (Pedagogy)', 'Khan Academy (Teacher resources)'],
    not_for_you_if: [
      'You have low patience for repetitive questions',
      'You dislike public speaking',
      'You want rapid, high monetary scaling'
    ]
  },
  'software-engineer': {
    career_dna: { analytical: 9, creativity: 6, social: 4, risk: 4, structure: 9 },
    day_in_life: [
      'Writing and reviewing code (pull requests)',
      'Participating in daily stand-ups and sprint planning',
      'Debugging issues in production',
      'Designing system architectures for new features'
    ],
    reality_check: {
      competition: 'High',
      work_pressure: 'High',
      learning_curve: 'Steep'
    },
    market_data: {
      avg_salary: '8 - 30+ LPA',
      growth_rate: 'High',
      demand: 'Very High'
    },
    related_careers: ['Systems Architect', 'DevOps Engineer', 'Web Developer'],
    resources: ['LeetCode', 'System Design Primer', 'MDN Web Docs'],
    not_for_you_if: [
      'You are easily frustrated by abstract logic errors',
      'You hate continuously learning new technologies'
    ]
  },
  'psychologist': {
    career_dna: { analytical: 6, creativity: 4, social: 10, risk: 3, structure: 7 },
    day_in_life: [
      'Conducting therapy sessions with clients',
      'Taking detailed clinical notes',
      'Developing treatment plans',
      'Staying updated with psychological research'
    ],
    reality_check: {
      competition: 'Moderate',
      work_pressure: 'High (Emotional burnout)',
      learning_curve: 'Steep (Years of certification)'
    },
    market_data: {
      avg_salary: '4 - 15 LPA',
      growth_rate: 'Rising',
      demand: 'High'
    },
    related_careers: ['Psychiatrist', 'Social Worker', 'HR Specialist'],
    resources: ['American Psychological Association', 'Psychology Today', 'NCBI'],
    not_for_you_if: [
      'You absorb others negative emotions easily',
      'You are highly judgmental of unconventional life choices'
    ]
  },
  'musician': {
    career_dna: { analytical: 3, creativity: 10, social: 6, risk: 9, structure: 3 },
    day_in_life: [
      'Practicing instruments or vocal exercises',
      'Composing and producing tracks in a DAW',
      'Rehearsing with bands or performing at gigs',
      'Networking and promoting music on social media'
    ],
    reality_check: {
      competition: 'Extreme',
      work_pressure: 'Variable (Inconsistent income)',
      learning_curve: 'Lifelong'
    },
    market_data: {
      avg_salary: 'Highly Variable',
      growth_rate: 'Unpredictable',
      demand: 'Niche / Entertainment dependent'
    },
    related_careers: ['Audio Engineer', 'Film Composer', 'Music Teacher'],
    resources: ['Sound on Sound', 'Berklee Online', 'Ableton/Logic Tutorials'],
    not_for_you_if: [
      'You need a guaranteed steady paycheck',
      'You are unwilling to self-promote relentlessly'
    ]
  },
  'environmental-scientist': {
    career_dna: { analytical: 8, creativity: 4, social: 5, risk: 5, structure: 7 },
    day_in_life: [
      'Collecting soil, water, or air samples in the field',
      'Analyzing data in a laboratory',
      'Writing environmental impact reports',
      'Advising organizations on sustainable practices'
    ],
    reality_check: {
      competition: 'Moderate',
      work_pressure: 'Moderate',
      learning_curve: 'Moderate to Steep'
    },
    market_data: {
      avg_salary: '4 - 12 LPA',
      growth_rate: 'Steady',
      demand: 'Increasing due to climate change'
    },
    related_careers: ['Conservationist', 'Geologist', 'Sustainability Consultant'],
    resources: ['National Geographic society', 'Environmental Protection Agency guidelines', 'Nature (Journal)'],
    not_for_you_if: [
      'You disdain working outdoors in rough conditions',
      'You get bored by long-term research compiling'
    ]
  },
  'sports-coach': {
    career_dna: { analytical: 5, creativity: 4, social: 8, risk: 6, structure: 8 },
    day_in_life: [
      'Designing and leading training sessions',
      'Analyzing match footage and competitor strategies',
      'Motivating and monitoring player physical/mental health',
      'Strategizing game plans'
    ],
    reality_check: {
      competition: 'High',
      work_pressure: 'Very High (Performance-driven)',
      learning_curve: 'Moderate'
    },
    market_data: {
      avg_salary: '3 - 20+ LPA (Varies widely by level)',
      growth_rate: 'Moderate',
      demand: 'Steady'
    },
    related_careers: ['Physiotherapist', 'Athletic Director', 'Fitness Trainer'],
    resources: ['National team coaching certifications', 'Sports Science Institutes', 'Coaches Tribune'],
    not_for_you_if: [
      'You don\'t like working weekends or evenings',
      'You struggle handling aggressive conflicts or intense pressure'
    ]
  }
}
