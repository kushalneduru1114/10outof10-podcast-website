import { ANAND_BLOG_CONTENT, ANAND_BLOG_GALLERY } from './AnandAnnaBlog';
import { TIFF_POST_CONTENT, TIFF_POST_GALLERY } from './tiffPostContent';

export const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/1K9g6ClNj9TIK1CuAs5aOc?si=jppXn7UFQkemWFuGvJu6Dg';

// --- EPISODE DATA ARRAY ---
export const EPISODES = [
  {
    id: 'e1',
    season: 1,
    episode: 1,
    title: 'Discussions on Mahanati - Pranav B and Hemal',
    description: "A modern Telugu classic that's impossible not to love.",
    url: 'https://open.spotify.com/episode/0JuqYcx6F3PSXFOMDc96wt?si=xLITRsdzQUersbX4G5j9jg',
    isPopular: true,
    isLatest: false,
    thumbnail: '/assets/mahanati.jpg',
  },
  {
    id: 'e2',
    season: 1,
    episode: 2,
    title: 'Discussions on Parasite - Pranav B',
    description: "Best Picture winner, but did it happen overnight? Listen to our breakdown of Parasite's success and cultural impact.",
    url: 'https://open.spotify.com/episode/63HoKT1y9XZ0Jh4jrv0zMi?si=HLP0r75JTj-ETMyeJ1HEcQ',
    isPopular: true,
    isLatest: false,
    thumbnail: '/assets/parasite.jpg',
  },
  {
    id: 'e3',
    season: 1,
    episode: 8,
    title: 'Discussions on The Social Network - Kushal Neduru and Anek',
    description: "Kushal and Anek discuss David Fincher's critically acclaimed The Social Network, praising Aaron Sorkin's rhythmic dialogue and unpacking why the film stands out in Fincher's filmography.",
    url: 'https://open.spotify.com/episode/3iocOwKvzh4XHcPPeHunw8?si=EKg1S93OQcmc-62Q9n48Qw',
    isPopular: false,
    isLatest: true,
    thumbnail: '/assets/socialNetwork.jpg',
  },
  {
    id: 'e4',
    season: 1,
    episode: 9,
    title: 'Every FRIDAY Ever - Pranav B and Anand K',
    description: 'Anand Karanam joins us to talk about his journey as a filmmaker and writer, the importance of film criticism, and the impact of film reviews today.',
    url: 'https://open.spotify.com/episode/7o7Zle42jyINGPmUEn0b4a?si=85Gf0BwtRF2TGQ_k2RgpLg',
    isPopular: false,
    isLatest: true,
    thumbnail: '/assets/FridayEver.jpg',
    thumbnailPosition: 'top center',
  },
];

// --- GUEST DATA ARRAY ---
export const GUESTS = [
  {
    id: 'g1',
    name: 'Praveen Kandregula',
    image: '/assets/praveen.jpg',
    works: [
      { title: 'Cinema Bandi', poster: '/assets/guests/cinema-bandi.jpg' },
      { title: 'Shubham', poster: '/assets/guests/shubham.jpg' },
    ],
  },
  {
    id: 'g2',
    name: 'Vinod Anantoju',
    image: '/assets/vinod.jpg',
    works: [
      { title: 'Middle Class Melodies', poster: '/assets/guests/middle-class-melodies.jpeg' },
      { title: 'Takshakudu', poster: '/assets/guests/takshakudu.jpeg' },
    ],
  },
  {
    id: 'g3',
    name: 'Pavan Sadineni',
    image: '/assets/pavan.jpg',
    works: [
      { title: 'Senapati', poster: '/assets/guests/senapati.jpeg' },
      { title: 'Aakasam Lo Oka Taara', poster: '/assets/guests/aakasam-lo-oka-taara.jpeg' },
    ],
  },
];

// --- BLOG DATA ARRAY ---
export const BLOGS = [
  {
    id: 'Anand anna blog',
    title: 'No ‘C’ in Cinema: How Contemporary Telugu Films Ignore Caste',
    subtitle: 'A Personal Essay',
    slug: 'no-c-in-cinema-how-contemporary-telugu-films-ignore-caste',
    name: 'Anonymous',
    description: 'Telugu cinema constantly portrays oppression, power, and social conflict, yet rarely dares to name the force that shapes them all: caste.',
    metaDescription: 'Read Anand anna blog',
    date: 'June 8, 2026',
    content: ANAND_BLOG_CONTENT,
    image: '/assets/blog/tiff-2025-02.jpeg',
    gallery: ANAND_BLOG_GALLERY,
  },
  {
    id: 'tiff-2025',
    title: 'Attending The Toronto International Film Festival',
    subtitle: 'A Personal Essay',
    slug: 'attending-the-toronto-international-film-festival',
    name: 'Pranav Bellary',
    description: 'A personal essay on attending TIFF 2025 with a media pass, navigating screenings, festival culture, and what the experience meant for Ten Out Of Ten.',
    metaDescription: 'Read Ten Out Of Ten founder Pranav Bellary on attending TIFF 2025, covering festival screenings, filmmaker encounters, and the value of cinema culture.',
    date: 'June 6, 2026',
    content: TIFF_POST_CONTENT,
    image: '/assets/blog/tiff-2025-02.jpeg',
    gallery: TIFF_POST_GALLERY,
  },
];

export const COMPLETED_WORKS = [
  {
    id: 'w1',
    title: 'Lilly',
    type: 'Short Film',
    year: 2024,
    role: 'Production & Distribution',
    description: 'A powerful short film that explores themes of identity and belonging through the lens of contemporary Telugu storytelling.',
    link: 'https://youtu.be/GcdCW_XRoCk?si=Gxw9U0OQK78S4R9X',
    image: '/assets/Lilly.jpg',
  },
  {
    id: 'w2',
    title: 'Anjigaadu',
    type: 'Short Film',
    year: 2024,
    role: 'Publicity Collaborators',
    description: 'When his village faces a grave crisis, Anjigaadu devises a simple yet powerful solution. Directed by Sai Ram, this short film gained widespread attention for its emotionally driven storytelling and carefully crafted screenplay.',
    link: 'https://youtu.be/ciQLCOhymHQ?si=aPScwgYl8mgEqh72',
    image: '/assets/Anjigaadu.jpg',
  },
  {
    id: 'w3',
    title: 'Friday',
    type: 'Independent Film',
    year: 2024,
    role: 'Presenters',
    description: 'Directed by Anand Karanam, this critically acclaimed independent feature tells the story of an insomniac IT employee preparing for a crucial meeting.',
    link: 'https://youtu.be/O_qo4q1JDbs?si=3UNHuaFGgnTjckLg',
    image: '/assets/FridayPic.jpg',
    thumbnailPosition: 'top center',
  },
  {
    id: 'w4',
    title: 'Lights, Camera & Action!',
    type: 'Short Film',
    year: 2025,
    role: 'Presenters',
    description: 'On a messy college film set, an unexpected spark grows between Abhinav, a carefree fresher who dreams of becoming an actor, and Priya, a first-time director finding her voice.',
    link: 'https://youtu.be/ljE4YnD950E?si=QPfPSQQUXI6AS_Sb',
    image: '/assets/LCApic.jpg',
  },
  {
    id: 'w5',
    title: 'Tarunam',
    type: 'Short Film',
    year: 2025,
    role: 'Presenters',
    description: 'Directed by Ten Out Of Ten team member Amarthya Raj, Tarunam follows a chess player confronting the demons of his own mind.',
    link: 'https://youtu.be/xjYFtJDdKgM?si=TQhTWS4qox1fQ7Xx',
    image: '/assets/TarunamPic.jpg',
  },
];

export const CO_PRODUCED_WORKS = [
  {
    id: 'cp1',
    title: 'Kalasalao',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/-UnR0FpGG6k?si=NbUO-6Ab5IHea0Bf',
    image: 'https://i.ytimg.com/vi/-UnR0FpGG6k/hqdefault.jpg',
  },
  {
    id: 'cp2',
    title: 'Uchitha Salaha',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/g7pZB_Iti3w?si=SuzwXkzCvM4gX6ly',
    image: 'https://i.ytimg.com/vi/g7pZB_Iti3w/hqdefault.jpg',
  },
  {
    id: 'cp3',
    title: 'Clouds of August',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/GKvTuSYGmX0?si=IaufXDgcig4ABUII',
    image: 'https://i.ytimg.com/vi/GKvTuSYGmX0/hqdefault.jpg',
  },
  {
    id: 'cp4',
    title: 'Agent Viper',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/bxRs12Hq4v8?si=EPHN5ed42hV-R0ho',
    image: 'https://i.ytimg.com/vi/bxRs12Hq4v8/hqdefault.jpg',
  },
  {
    id: 'cp5',
    title: 'Another',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/i0n99ayAmYo?si=4Kfvee6fRAoPg6-l',
    image: 'https://i.ytimg.com/vi/i0n99ayAmYo/hqdefault.jpg',
  },
  {
    id: 'cp6',
    title: 'Hi I am Hayagreeva',
    type: 'Short Film',
    role: 'Co-Produced',
    description: 'A Ten Out Of Ten co-produced short film.',
    link: 'https://youtu.be/1oNMeX6CZ0s?si=m7B_YmWgpbfxEygl',
    image: 'https://i.ytimg.com/vi/1oNMeX6CZ0s/hqdefault.jpg',
  },
];

// --- UPCOMING WORK DATA ARRAY ---
export const UPCOMING_WORKS = [];

// --- TEAM MEMBER DATA ARRAY ---
export const TEAM_MEMBERS = [
  {
    id: 'tm1',
    firstName: 'Pranav',
    lastName: 'Bellary',
    position: 'Founder & Host',
    tenure: '',
    image: '/assets/pranav-bellary-new.jpeg',
  },
  {
    id: 'tm2',
    firstName: 'Tanmayi',
    lastName: 'Challa',
    position: 'Co-Founder',
    tenure: '',
    image: '/assets/tanmayi.jpg',
  },
  {
    id: 'tm3',
    firstName: 'Prabhath',
    lastName: 'Reddy',
    position: 'Producer',
    tenure: '',
    image: '/assets/prabhath-reddy-new.jpeg',
  },
  {
    id: 'tm4',
    firstName: 'Kushal',
    lastName: 'Neduru',
    position: 'Host',
    tenure: '',
    image: '/assets/kushal.jpg',
  },
  {
    id: 'tm5',
    firstName: 'Amarthya',
    lastName: 'Raj',
    position: 'Producer & Communications',
    tenure: '',
    image: '/assets/amarthya.jpg',
  },
  {
    id: 'tm6',
    firstName: 'Prachi',
    lastName: 'Sarda',
    position: 'Design',
    tenure: '',
    image: '/assets/prachi.png',
  },
  {
    id: 'tm7',
    firstName: 'Hemal',
    lastName: 'Tummapudi',
    position: 'Producer',
    tenure: '',
    image: '/assets/hemal.jpg',
  },
];

// --- ABOUT SECTION COPY ---
export const ABOUT_TEXT = 'Ten Out Of Ten is a cinema podcast and independent film platform built around conversations, curation, and collaboration. Across 45 episodes and 3 seasons, we discuss films that move us and the culture around us. Beyond the mic, we present and distribute short and independent films across South India.';
