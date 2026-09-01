// The archive's entries. Khmer spellings and romanizations are as they were
// given to us and have not been checked against a dictionary. `verified` turns
// true only once a family member has confirmed the spelling.
// `image` is a path under public/. `imageAlt` describes what the photo shows,
// for screen readers and for when the image fails to load.

export const entries = [
  {
    id: 1,
    khmerName: "ក្រឡ",
    romanization: "Krolar",
    image: "/images/krolar-rice-can.webp",
    imageAlt:
      "A dented condensed milk tin, darkened with rust, open at one end.",
    englishName: "Condensed milk can rice cup",
    description:
      "An empty condensed milk tin, kept and reused as the standard rice measure. Nobody buys it. It stays after the milk runs out and the same can gets used for years. Rice is measured in cans, not grams.",
    contributor: "Grandmother",
    place: "Kampong Cham",
    verified: false,
  },
  {
    id: 2,
    khmerName: "ត្បាល់",
    romanization: "Tbal",
    image: "/images/tbal-stone-mortar.webp",
    imageAlt:
      "A heavy stone mortar with a stone pestle resting in it and dried chili at the bottom.",
    englishName: "Stone mortar and pestle",
    description:
      "Heavy stone mortar for pounding kroeung, garlic, chili, and prahok. Older cooks refuse a blender for this, because pounding crushes and releases the oils while a blade only cuts.",
    contributor: "Grandmother",
    place: "Kampong Cham",
    verified: false,
  },
  {
    id: 3,
    khmerName: "កញ្ជើ",
    romanization: "Kanhchoe",
    image: "/images/kanhchoe-bamboo-basket.webp",
    imageAlt:
      "A round open-weave bamboo basket with a bound rim.",
    englishName: "Woven bamboo basket",
    description:
      "Open-weave bamboo basket for washing rice, draining vegetables, drying fish, or carrying market produce. The weave is tighter or looser depending on what it is meant to hold.",
    contributor: "Grandmother",
    place: "Kampong Cham",
    verified: false,
  },
  {
    id: 4,
    khmerName: "ក្រមា",
    romanization: "Krama",
    image: "/images/krama-checkered-scarf.webp",
    imageAlt:
      "A red and white checkered cotton scarf, loosely gathered, with fringed ends.",
    englishName: "Checkered cotton scarf",
    description:
      "One cloth doing a dozen jobs: towel, sun cover, baby sling, bag, dust mask, hammock, belt. Pattern and weave shift by province, so a krama can tell you where its owner is from.",
    contributor: "Grandmother",
    place: "Kampong Cham",
    verified: false,
  },
  {
    id: 5,
    khmerName: "ឆ្នាំងដី",
    romanization: "Chhnang dei",
    image: "/images/chhnang-dei-clay-pot.webp",
    imageAlt:
      "A round earthenware pot with a fitted lid, incised with bands of pattern.",
    englishName: "Clay cooking pot",
    description:
      "Earthenware pot for slow-cooked samlor. Holds heat differently than metal, and some families keep one only for the dishes they say taste wrong out of aluminium.",
    contributor: "Grandmother",
    place: "Kampong Cham",
    verified: false,
  },
];

export default entries;
