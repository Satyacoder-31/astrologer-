export interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  englishMeaning: string;
  practicalWisdom: string;
  lifeDilemma: string; // e.g. "Anxiety & Fear", "Duty & Action", "Mental Peace", "Indecision", "Grief"
}

export interface KrishnaTeaching {
  id: string;
  title: string;
  subtitle: string;
  sanskrit: string;
  translation: string;
  practicalInsight: string;
  theme: string;
}

export const GITA_VERSES: GitaVerse[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi',
    englishMeaning: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions. Never consider yourself the cause of the results of your activities, and never be attached to inaction.',
    practicalWisdom: 'Focus completely on the quality and sincerity of your current action without obsessive anxiety over the outcome. Release the psychological burden of results, and supreme inner peace will naturally follow.',
    lifeDilemma: 'Anxiety over Results & Work Stress',
  },
  {
    chapter: 2,
    verse: 14,
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    transliteration: 'mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ\nāgamāpāyino ’nityās tans-titikṣhasva bhārata',
    englishMeaning: 'O son of Kunti, the contact between the senses and sense objects gives rise to fleeting sensations of heat and cold, happiness and distress. These are non-permanent; they come and go. Learn to endure them with forbearance.',
    practicalWisdom: 'External circumstances, praise and blame, pleasure and pain are transient cosmic tides. Cultivate the inner stillness of an observer. Do not let temporary turbulence shake your eternal center.',
    lifeDilemma: 'Emotional Turmoil & Life Ups and Downs',
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ',
    englishMeaning: 'Elevate yourself through the power of your own mind, and do not degrade yourself. For the mind can be the greatest friend of the self, or the greatest enemy.',
    practicalWisdom: 'Your own disciplined thoughts are your supreme ally. When you direct your mind toward divine devotion and constructive action, no external force can overpower you.',
    lifeDilemma: 'Low Self-Esteem & Negative Self-Talk',
  },
  {
    chapter: 4,
    verse: 7,
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmyaham',
    englishMeaning: 'Whenever and wherever there is a decline in righteousness (Dharma) and a predominant rise of unrighteousness, at that time I manifest Myself on earth.',
    practicalWisdom: 'Divine justice is never sleeping. Even in times of darkness or feeling wronged, stay anchored in integrity. The cosmic balance will unfailingly restore righteousness.',
    lifeDilemma: 'Loss of Faith & Facing Injustice',
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ',
    englishMeaning: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not grieve.',
    practicalWisdom: 'When human intellect reaches its limit and the burden of life feels unbearable, surrender your worries at the lotus feet of the Supreme Divine. You are sheltered in infinite grace.',
    lifeDilemma: 'Helplessness & Overwhelming Burdens',
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham',
    englishMeaning: 'To those who constantly worship Me with undivided devotion, meditating upon My divine form, I provide what they lack and preserve what they possess.',
    practicalWisdom: 'Align your consciousness with universal love and truth. The universe takes personal responsibility for meeting your genuine needs and protecting your spiritual progress.',
    lifeDilemma: 'Financial Worry & Insecurity about Future',
  },
];

export const DAILY_MANTRAS = [
  {
    title: 'Maha Mantra (The Great Divine Vibration)',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
    transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare',
    significance: 'Cleanses the dust of material contamination from the mirror of the mind and awaken the dormant love of the Supreme Lord.',
    recommendedCount: '108 repetitions (1 Mala) in the morning Brahma Muhurta',
  },
  {
    title: 'Krishna Gayatri Mantra',
    sanskrit: 'ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि।\nतन्नः कृष्णः प्रचोदयात्॥',
    transliteration: 'Om Devaki-nandanaya Vidmahe Vasudevaya Dhimahi\nTanno Krishnah Prachodayat',
    significance: 'Illuminates the intellect with divine spiritual discernment, courage, and radiant joy.',
    recommendedCount: '27 or 108 repetitions at sunrise',
  },
  {
    title: 'Vasudeva Sharanagati Mantra',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय॥',
    transliteration: 'Om Namo Bhagavate Vasudevaya',
    significance: 'The twelve-syllable mukti mantra that bestows peace, dissolves generational karma, and grants liberation.',
    recommendedCount: '108 repetitions',
  },
];

export const MEDITATION_STEPS = [
  {
    step: 1,
    title: 'Sacred Asana & Breath Alignment',
    instruction: 'Sit comfortably with a straight spine in Sukhasana or Padmasana. Close your eyes softly and take five deep, slow diaphragmatic breaths, inhaling through the nose and releasing all tension through the exhale.',
  },
  {
    step: 2,
    title: 'Heart Lotus Visualization',
    instruction: 'Visualize a glowing eight-petaled golden lotus blooming in the center of your heart cave (Hridaya Akasha). Feel warm, soothing celestial light radiating into every cell of your physical body.',
  },
  {
    step: 3,
    title: 'Divine Form of Shyamasundara',
    instruction: 'In the center of that golden lotus, envision Lord Krishna with peacock feather adorning His crown, holding a divine flute to His lips, smiling with infinite compassion and boundless grace.',
  },
  {
    step: 4,
    title: 'Rhythmic Japa & Surrender',
    instruction: 'Mentally chant the sacred syllables "Hare Krishna" with each breath cycle. As thoughts arise, gently guide awareness back to the divine flute melody resonating within your soul.',
  },
  {
    step: 5,
    title: 'Cosmic Gratitude & Shanti',
    instruction: 'End by dedicating the merit of your meditation to the peace and enlightenment of all living beings. Rub your palms together, place them over your eyes, and open your eyes with renewed peace.',
  },
];

export const KRISHNA_WALLPAPERS = [
  {
    id: 'krishna-cosmic-universe',
    title: 'Lord Krishna in the Cosmic Universe',
    category: 'Sacred Divine Consciousness',
    resolution: '4K Ultra HD (3840x2160)',
    imageUrl: '/images/krishna-cosmic-blend.jpg',
    description: 'Lord Krishna in celestial cyan with glowing butterflies, divine garland, and sacred blessing hand in deep space.',
  },
  {
    id: 'krishna-flute-nebula',
    title: 'Divine Flute in the Cosmic Nebula',
    category: 'Cosmic Art',
    resolution: '4K Ultra HD (3840x2160)',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    description: 'Lord Krishna playing the celestial bansuri surrounded by the swirling violet and gold gases of the Orion Nebula.',
  },
  {
    id: 'krishna-peacock-aura',
    title: 'Peacock Feather of Eternity',
    category: 'Spiritual Essence',
    resolution: '4K Ultra HD (3840x2160)',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200',
    description: 'The sacred Mayur Pankh glowing with iridescent turquoise, sapphire, and radiant gold divine frequencies.',
  },
  {
    id: 'krishna-arjuna-kurukshetra',
    title: 'Gita Upadesha - The Chariot of Truth',
    category: 'Epic Bhagavad Gita',
    resolution: '4K Ultra HD (3840x2160)',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
    description: 'The Partha Sarathi guiding the celestial white stallions through the battlefield of cosmic duty.',
  },
  {
    id: 'radha-krishna-vrindavan',
    title: 'Radha Krishna Divine Starlight',
    category: 'Divine Love',
    resolution: '4K Ultra HD (3840x2160)',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1200',
    description: 'Eternal lovers surrounded by celestial lotus ponds under a canopy of twinkling Vedic constellations.',
  },
];
