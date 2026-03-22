// Simulated career recommendation engine

const CAREERS = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    domain: 'Technology & Analytics',
    cluster: 'STEM',
    weights: { Logical_Mathematical: 0.35, Spatial_Visualization: 0.2, Linguistic: 0.15, Intrapersonal: 0.15, Interpersonal: 0.05, Musical: 0.02, Bodily: 0.03, Naturalist: 0.05 },
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    strengths: ['Strong analytical ability', 'Pattern recognition', 'Quantitative reasoning'],
    roadmap: {
      beginner: ['Learn Python basics', 'Study statistics fundamentals', 'Complete a data analysis course'],
      intermediate: ['Build ML models with scikit-learn', 'Work on Kaggle competitions', 'Learn SQL & databases'],
      advanced: ['Deploy ML systems in production', 'Research deep learning', 'Lead data science projects'],
    },
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    domain: 'Design & Technology',
    cluster: 'Creative Tech',
    weights: { Spatial_Visualization: 0.35, Interpersonal: 0.25, Linguistic: 0.15, Intrapersonal: 0.1, Logical_Mathematical: 0.05, Musical: 0.03, Bodily: 0.04, Naturalist: 0.03 },
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
    strengths: ['Visual thinking', 'Empathy for users', 'Creative problem solving'],
    roadmap: {
      beginner: ['Learn design principles', 'Master Figma basics', 'Study color theory & typography'],
      intermediate: ['Conduct usability tests', 'Build a portfolio', 'Learn interaction design'],
      advanced: ['Lead design sprints', 'Specialize in design systems', 'Mentor junior designers'],
    },
  },
  {
    id: 'teacher',
    title: 'Educator / Teacher',
    domain: 'Education',
    cluster: 'Social Services',
    weights: { Linguistic: 0.3, Interpersonal: 0.35, Intrapersonal: 0.1, Logical_Mathematical: 0.1, Spatial_Visualization: 0.05, Musical: 0.04, Bodily: 0.03, Naturalist: 0.03 },
    skills: ['Communication', 'Curriculum Design', 'Assessment', 'Classroom Management', 'Empathy'],
    strengths: ['Strong interpersonal skills', 'Clear communication', 'Patience and leadership'],
    roadmap: {
      beginner: ['Get a teaching certification', 'Learn pedagogy fundamentals', 'Practice lesson planning'],
      intermediate: ['Develop curriculum materials', 'Use EdTech tools', 'Try project-based learning'],
      advanced: ['Become a department head', 'Publish educational research', 'Coach other educators'],
    },
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    domain: 'Technology',
    cluster: 'STEM',
    weights: { Logical_Mathematical: 0.4, Spatial_Visualization: 0.15, Intrapersonal: 0.15, Linguistic: 0.1, Interpersonal: 0.1, Musical: 0.02, Bodily: 0.03, Naturalist: 0.05 },
    skills: ['JavaScript', 'Python', 'Algorithms', 'System Design', 'Git'],
    strengths: ['Logical thinking', 'Problem decomposition', 'Systematic debugging'],
    roadmap: {
      beginner: ['Learn programming fundamentals', 'Build simple CRUD apps', 'Understand data structures'],
      intermediate: ['Contribute to open source', 'Learn system design', 'Pass coding interviews'],
      advanced: ['Architect large-scale systems', 'Lead engineering teams', 'Specialize in a domain'],
    },
  },
  {
    id: 'psychologist',
    title: 'Psychologist / Counselor',
    domain: 'Healthcare & Mental Wellness',
    cluster: 'Social Sciences',
    weights: { Interpersonal: 0.35, Intrapersonal: 0.25, Linguistic: 0.2, Logical_Mathematical: 0.08, Spatial_Visualization: 0.04, Musical: 0.03, Bodily: 0.02, Naturalist: 0.03 },
    skills: ['Active Listening', 'CBT Techniques', 'Empathy', 'Clinical Assessment', 'Research'],
    strengths: ['Deep empathy', 'Excellent listening skills', 'Introspective ability'],
    roadmap: {
      beginner: ['Study general psychology', 'Volunteer at clinics', 'Learn counseling ethics'],
      intermediate: ['Specialize in a therapeutic approach', 'Complete supervised hours', 'Get licensed'],
      advanced: ['Open a private practice', 'Conduct clinical research', 'Supervise junior therapists'],
    },
  },
  {
    id: 'musician',
    title: 'Musician / Music Producer',
    domain: 'Arts & Entertainment',
    cluster: 'Creative Arts',
    weights: { Musical: 0.45, Linguistic: 0.15, Interpersonal: 0.15, Intrapersonal: 0.1, Bodily: 0.08, Spatial_Visualization: 0.04, Logical_Mathematical: 0.02, Naturalist: 0.01 },
    skills: ['Music Theory', 'Instrument Proficiency', 'Audio Production', 'Composition', 'Performance'],
    strengths: ['Musical intelligence', 'Creative expression', 'Rhythmic sensitivity'],
    roadmap: {
      beginner: ['Master an instrument', 'Learn music theory', 'Record home demos'],
      intermediate: ['Collaborate with other artists', 'Learn DAW software', 'Release original tracks'],
      advanced: ['Produce for other artists', 'Perform live tours', 'Build a label or studio'],
    },
  },
  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    domain: 'Environment & Sustainability',
    cluster: 'Natural Sciences',
    weights: { Naturalist: 0.35, Logical_Mathematical: 0.25, Spatial_Visualization: 0.15, Linguistic: 0.1, Intrapersonal: 0.08, Interpersonal: 0.04, Musical: 0.01, Bodily: 0.02 },
    skills: ['Field Research', 'GIS Mapping', 'Data Analysis', 'Environmental Policy', 'Biology'],
    strengths: ['Nature affinity', 'Scientific reasoning', 'Systems thinking'],
    roadmap: {
      beginner: ['Study environmental science basics', 'Join field research projects', 'Learn GIS tools'],
      intermediate: ['Publish research papers', 'Work with NGOs or government', 'Specialize in a biome'],
      advanced: ['Lead conservation policy', 'Direct major research programs', 'Advise international bodies'],
    },
  },
  {
    id: 'sports-coach',
    title: 'Sports Coach / Physiotherapist',
    domain: 'Sports & Wellness',
    cluster: 'Physical Sciences',
    weights: { Bodily: 0.4, Interpersonal: 0.25, Intrapersonal: 0.15, Linguistic: 0.08, Logical_Mathematical: 0.06, Spatial_Visualization: 0.03, Musical: 0.01, Naturalist: 0.02 },
    skills: ['Sports Science', 'Coaching Techniques', 'Anatomy', 'Motivation', 'Injury Prevention'],
    strengths: ['Physical intelligence', 'Leadership and motivation', 'Kinesthetic awareness'],
    roadmap: {
      beginner: ['Get a coaching certification', 'Study anatomy & kinesiology', 'Volunteer with local teams'],
      intermediate: ['Coach at club level', 'Specialize in a sport', 'Learn sports psychology basics'],
      advanced: ['Coach professional athletes', 'Establish a training academy', 'Conduct sports research'],
    },
  },
]

export function getRecommendations(profile) {
  const scored = CAREERS.map((career) => {
    let score = 0
    Object.entries(career.weights).forEach(([trait, w]) => {
      score += w * (profile.traits[trait] || 0)
    })
    // Preference adjustment (minor factor)
    const prefSum = Object.values(profile.preferences).reduce((a, b) => a + b, 0)
    score += prefSum * 0.01
    return { ...career, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const top = scored[0]
  const maxScore = 10
  const normalizedScore = top.score / maxScore

  let confidence, confidenceMsg
  if (normalizedScore >= 0.6) {
    confidence = 'High'
    confidenceMsg = 'Your profile strongly aligns with this career path.'
  } else if (normalizedScore >= 0.4) {
    confidence = 'Moderate'
    confidenceMsg = 'Good alignment. Some skill development may strengthen this fit.'
  } else {
    confidence = 'Low'
    confidenceMsg = 'Consider diversifying your skills to improve career alignment.'
  }

  return {
    top: scored[0],
    alternatives: scored.slice(1, 4),
    all: scored,
    confidence,
    confidenceMsg,
  }
}

export function getSkillGap(profile, career) {
  const required = career.skills
  const userSkills = profile.skills.map((s) => s.toLowerCase())
  const matched = required.filter((s) => userSkills.includes(s.toLowerCase()))
  const missing = required.filter((s) => !userSkills.includes(s.toLowerCase()))
  const readiness = Math.round((matched.length / required.length) * 100)
  return { matched, missing, readiness }
}
