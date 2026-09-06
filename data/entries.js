// The archive's entries.
// `image` is a path under public/. `imageAlt` describes what the photo shows,
// for screen readers and for when the image fails to load.

export const entries = [
  {
    id: 1,
    khmerName: "ក្រឡ",
    romanization: "Krolor",
    image: "/images/krolar-rice-can.jpeg",
    imageAlt:
      "A dented condensed milk tin resting in a bowl of uncooked rice.",
    englishName: "Condensed milk can rice cup",
    description:
      "An empty condensed milk tin, kept and reused as the standard rice measure. Nobody buys it. It stays after the milk runs out and the same can gets used for years. Rice is measured in cans, not grams.",
    contributor: "Grandmother",
    place: "Kampong Cham",
  },
  {
    id: 2,
    khmerName: "ត្បាល់",
    romanization: "Tbal",
    image: "/images/tbal-stone-mortar.jpeg",
    imageAlt:
      "A stone mortar with the pestle leaning inside it and dried chili at the bottom.",
    englishName: "Stone mortar and pestle",
    description:
      "Stone mortars are hand-carved from granite quarried around Cambodian stone-working centers such as Kampong Thom (whose name means \"stone port\"), which sources rock from the foot of Phnom Santhuk. Pounding spice pastes by hand with stone tools predates any written record of Khmer cooking.",
    contributor: "Grandmother",
    place: "Kampong Cham",
  },
  {
    id: 3,
    khmerName: "កញ្ជើ",
    romanization: "Kanhchoe",
    image: "/images/kanhchoe-bamboo-basket.jpeg",
    imageAlt:
      "An open-weave bamboo basket set on a table, photographed against trees.",
    englishName: "Woven bamboo basket",
    description:
      "Bamboo and rattan basket weaving in Cambodia is documented back to the Angkorian era (9th–15th century). Siem Reap and Kampong Cham remain known weaving regions today, though the craft was nearly lost during the Khmer Rouge period (1975–1979), when many weavers were killed or displaced.",
    contributor: "Grandmother",
    place: "Kampong Cham",
  },
  {
    id: 5,
    khmerName: "ឆ្នាំងដី",
    romanization: "Chhnang dei",
    image: "/images/chhnang-dei-clay-pot.jpeg",
    imageAlt:
      "Three lidded earthenware pots stacked together on a wooden table.",
    englishName: "Clay cooking pot",
    description:
      "Kampong Chhnang — \"port of pottery\" in Khmer — has produced clay pots for at least 5,000 years; kilns found there have been dated to the 6th century, predating the Angkorian empire. The craft nearly died out after Angkor's fall and was revived in the early 2000s with German development funding.",
    contributor: "Grandmother",
    place: "Kampong Cham",
  },
  // The next four entries describe tools common across Khmer kitchens
  // generally, not one family's specific household — per user direction,
  // contributor/place reflect that broader scope rather than a single person.
  {
    id: 6,
    khmerName: "កាំបិត",
    romanization: "Kambit",
    // TODO: add photo as public/images/kambit-cleaver.jpeg, then set image below
    // and adjust imageAlt to describe the actual photo.
    image: "",
    imageAlt: "A stainless kitchen cleaver resting on a wooden cutting board.",
    englishName: "Kitchen cleaver",
    description:
      "The all-purpose cleaver traces back roughly 4,500 years to China's Longshan culture, with cast-iron versions common by around 500 BCE. Known in Chinese as cai dao (\"vegetable knife\"), the single do-everything blade spread across Asia, shaping kitchens that use one knife instead of a Western-style set.",
    contributor: "Common in Khmer households",
    place: "Cambodia",
  },
  {
    id: 7,
    khmerName: "ខ្ទះ",
    romanization: "Khteah",
    // TODO: add photo as public/images/khteah-wok.jpeg, then set image below
    // and adjust imageAlt to describe the actual photo.
    image: "",
    imageAlt: "A blackened carbon-steel wok with two metal handles.",
    englishName: "Carbon-steel wok",
    description:
      "The wok's exact origin is debated: one theory traces it to a Chinese cooking pot at least 3,000 years old, another to the South/Southeast Asian kuali and karahi pans that reached China through Central Asia and India. Either way, it spread across East and Southeast Asia because one curved pan could stir-fry, steam, boil, and deep-fry.",
    contributor: "Common in Khmer households",
    place: "Cambodia",
  },
  {
    id: 8,
    khmerName: "ឆ្នាំងបាយ",
    romanization: "Chhnang bay",
    // TODO: add photo as public/images/chhnang-bay-rice-cooker.jpeg, then set
    // image below and adjust imageAlt to describe the actual photo.
    image: "",
    imageAlt:
      "An electric rice cooker with its lid closed, plugged in on a counter.",
    englishName: "Rice cooker",
    description:
      "The first electric rice cooker was built by Mitsubishi Electric in 1923 but needed manual attention. Toshiba's ER-4, released December 10, 1955 with an automatic-shutoff thermostat invented by Yoshitada Minami, was the first fully automatic version — within four years it was in half of all Japanese households, and the design spread across Asia from there.",
    contributor: "Common in Khmer households",
    place: "Cambodia",
  },
  {
    id: 9,
    khmerName: "ឆ្នាំងចំហុយ",
    romanization: "Chhnang chomhuy",
    // TODO: add photo as public/images/chhnang-chomhuy-steamer.jpeg, then set
    // image below and adjust imageAlt to describe the actual photo.
    image: "",
    imageAlt: "A stacked tiered steamer pot with its lid on.",
    englishName: "Tiered steamer",
    description:
      "Steaming is one of China's oldest cooking methods — pottery steaming vessels date back roughly 5,000 years, and a kitchen mural in the Han-dynasty Dahuting tomb (25–220 CE) shows an early version. The stacked-tier design became popular during the Song dynasty as growing cities needed to steam multiple dishes at once.",
    contributor: "Common in Khmer households",
    place: "Cambodia",
  },
];

export default entries;
