export const ARTIST_NAME = "Brett Van Sanders";

export const ARTIST_INTRO_TEXT =
  "is an influential abstract, pop-art and modern artist known for his vibrant and evocative depictions of contemporary culture. Art has been a lifestyle for him since a very young age, and his work is inspired by popular culture: bold use of color, graphic imagery, and a playful yet incisive commentary on consumerism and media.";

export const ARTIST_BIO = [
  {
    highlight: ARTIST_NAME,
    text: ARTIST_INTRO_TEXT,
  },
  {
    highlight: null,
    text: "His art infuses both abstract and contemporary symbols with a nostalgic pop art sensibility. He attended the Art Institute of Colorado and became a professional graphic and fashion designer for fifteen years.",
  },
  {
    highlight: null,
    text: "After battling over 30 cancerous tumors, he decided to chase his dream, going back to his roots to create pieces featuring iconic symbols from popular culture, reimagined through his vibrant acrylic palette.",
  },
];

export const ARTIST_STATS = [
  { number: "15+", label: "Years in Design" },
  { number: "30+", label: "Tumors Battled" },
  { number: "100%", label: "Acrylic on Canvas" },
];

const about = { ARTIST_NAME, ARTIST_BIO, ARTIST_STATS };

export default about;