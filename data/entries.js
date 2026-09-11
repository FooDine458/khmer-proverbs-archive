// The archive's entries.
// `image` is a path under public/. `imageAlt` describes what the photo shows,
// for screen readers and for when the image fails to load.
// `story` is a longer, web-researched write-up shown on the entry's detail
// page (/entries/[id]) — it goes deeper than `description`, which stays the
// short teaser shown on the card.

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
    story: [
      "Households across Cambodia and the wider region commonly repurpose empty condensed-milk tins as an informal rice-measuring cup rather than buying a dedicated measuring cup. A standard tin holds about 397 grams (14 oz) of condensed milk, roughly 414 milliliters — close to a typical single serving-cup measure, which is part of why the size caught on for rice once the milk is gone.",
      "The habit reflects a broader waste-not approach common in Cambodian kitchens: nothing with a second use is thrown away. Because there's no single standardized \"rice cup\" sold locally the way there is in countries with electric rice cookers that ship a proprietary cup, families settle on whatever container is already in the house and reliably the same size every time — most often the humble milk tin, dented, relabeled by memory, and handed down as a kitchen fixture in its own right.",
    ],
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
    story: [
      "Cambodia's stone-carving centers cluster around Kampong Thom province, whose name comes from a \"port\" or trading center for stone; artisans in a village at the foot of Phnom Santhuk still quarry and hand-carve granite and sandstone, a craft tradition that also produced the stone sculpture found throughout Angkorian temple sites. A mortar is shaped by chiseling a rough boulder into a bowl form, then smoothing the pounding surface — heavy, deliberately imperfect work meant to survive decades of daily use.",
      "In the kitchen, the tbal is the tool for kroeung, the pounded herb-and-spice paste (lemongrass, galangal, turmeric, kaffir lime leaf, garlic) that forms the flavor base of dishes like amok and many Khmer curries. Blending kroeung by machine is common now, but many households still keep a stone mortar because pounding, rather than chopping, releases oils from the aromatics differently than a blade does.",
      "Cambodian Cookbook's equipment guide frames the tbal as the foundational tool for making kroeung and advises buying the heaviest mortar you can manage, since the stone's own weight does the pounding work. As the site puts it, \"stone bruises fibre and oil\" out of aromatics like lemongrass in a way a blade never fully replicates.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
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
    story: [
      "Basket and mat weaving using bamboo, rattan, and palm is one of Cambodia's oldest continuous crafts, practiced alongside stone carving and pottery since at least the Angkorian period, when the empire's building boom ran alongside a flourishing of household craft traditions. Regional centers in Siem Reap and Kampong Cham remain known for it today, using techniques such as coiling, plaiting, and twining depending on the object's purpose — open-weave baskets like the kanhchoe are typically plaited loosely enough to let rice, vegetables, or fish drain and breathe.",
      "The craft nearly disappeared during the Khmer Rouge period (1975–1979), when many skilled weavers were killed or displaced and workshops were shuttered along with most non-agricultural trades. Since the 2000s, tourism demand and NGO-backed cooperative programs have helped revive weaving villages, though many households never stopped making baskets for their own everyday use regardless of the market.",
    ],
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
    story: [
      "Kampong Chhnang — \"Port of Pottery\" — takes its name directly from the trade that has defined it for centuries; kilns and the wooden paddles used to shape pots, found at village sites there, have been dated to the 6th century, predating the Angkorian empire by hundreds of years. The village of Andong Russey remains the center of production, where potters still shape pieces entirely by hand from local beige clay rather than on a wheel, using paddle-and-anvil techniques passed down within families.",
      "The craft went into decline after the fall of Angkor and again during the 20th century's upheavals, before a documented revival in the early 2000s backed by German development funding aimed at reviving the villages' traditional livelihoods. A chhnang dei's porous, slow-heating clay body is prized for the way it cooks: dishes like prahok-based soups and slow-braised curries are still said to taste different out of clay than out of metal.",
      "Cambodian Cookbook singles the clay pot out as the vessel for kho, Cambodia's caramel-braised dishes, valuing it for holding \"low, even heat\" suited to slow braising — and for being sturdy enough to go straight from stove to table once the dish is done.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
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
    story: [
      "The Chinese cleaver's lineage is traced back roughly 4,500 years to tools from the Longshan culture, with cast-iron blades documented by around 500 BCE and specialized butchery knives described in Chinese texts as far back as the 4th century BCE. Its defining idea — a single broad, heavy blade handling everything from fine mincing to bone-splitting — grew out of a cooking culture built around small, fast-cooked pieces, where fuel for slow cooking was often scarce and nothing could be wasted, including cutting time.",
      "That one-knife philosophy spread throughout East and Southeast Asia, adapted regionally rather than replaced by Western knife sets — Vietnam and Cambodia both kept variants of the cai dao, and Japan developed its own version, the chukabocho, in the 19th century. In a Khmer kitchen a single kambit still does what a whole knife block might do elsewhere: chop vegetables, mince lemongrass for kroeung, and break down poultry or fish.",
      "Cambodian Cookbook recommends the kambit as the first knife worth owning before any specialized blade, precisely because one tool covers so much ground: slicing aromatics, flattening garlic with the flat of the blade, jointing poultry, and clearing prep scraps off the board with the same edge.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
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
    story: [
      "Where the wok actually comes from is genuinely disputed among food historians. One theory holds it developed independently in China from cooking vessels at least 3,000 years old; a competing theory traces its curved shape to the karahi of South Asia or the kuali of Southeast Asia, reaching China via Central Asian and Indian trade routes. The earliest possible depictions, in Han-dynasty China, were clay vessels used mainly to dry grain; metal woks built for stir-frying only became common much later, in the Ming dynasty (1368–1644).",
      "Whichever the origin, the pan's single curved shape is what made it spread — one vessel that stir-fries, steams, boils, and deep-fries depending on how much oil or water goes in and how the heat is managed. Carbon steel, the material of most khteah in use today, is valued for being light and for heating and cooling fast, which is central to the high, quick heat that stir-frying depends on.",
      "For a home stovetop, Cambodian Cookbook recommends a flat-bottomed khteah rather than the traditional round-bottomed style built for an open flame, plus proper seasoning, so the pan can handle the rapid, high heat that dishes like char kroeung and other quick stir-fries require.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
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
    story: [
      "Toshiba's ER-4, launched December 10, 1955, was the first fully automatic electric rice cooker sold for home use, the result of a five-year development effort led by engineer Shogo Yamada starting in 1951. A key contribution came from Yoshitada Minami, head of a Toshiba partner company, whose wife Fumiko Minami spent years testing water-to-rice ratios and cooking times under real household conditions to work out the timing the automatic mechanism needed. The design used a double-pot arrangement with a thermostat switch that cut power once the pot's temperature hit 100°C (212°F), the point at which the water had fully cooked into the rice.",
      "Despite costing roughly a third of an average month's salary, the ER-4 was in about half of all Japanese households within four years, and the same double-pot, auto-shutoff design was licensed and copied across Asia, eventually reaching Cambodian kitchens as an alternative — not yet a full replacement — for cooking rice over an open flame.",
      "Cambodian Cookbook credits the rice cooker with turning up in \"nearly every page\" of its recipes, since rice accompanies nearly every Khmer meal — its main appeal being consistent jasmine rice without anyone needing to watch the pot.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
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
    story: [
      "Steaming is one of the oldest cooking methods documented in East Asia: pottery steaming vessels called zeng have been found at Neolithic sites in the lower Yangzi River region dating back thousands of years, and the method is recorded in texts from the Zhou dynasty. The bamboo steamer in something like its current form is associated with southern China during the Han dynasty, with a kitchen mural in the Dahuting tomb (Henan province, c. 25–220 CE) offering an early clear depiction of a steamer in use.",
      "The now-familiar stacked, multi-tier design became popular during the Song dynasty, as denser cities and more commercial food preparation created demand for a lighter, more efficient way to steam several dishes over one heat source at once — the same logic that makes a chhnang chomhuy useful for a household cooking rice, vegetables, and fish simultaneously.",
      "Cambodian Cookbook calls out the tiered steamer specifically for amok, cakes, and fish, where its gentle, even heat \"sets custards without breaking them\" — a step up in delicacy from boiling. The site notes a basic pot fitted with a rack works as a stand-in if a dedicated tiered steamer isn't on hand.",
    ],
    sources: [
      {
        label: "Cambodian Cookbook — Kitchen Equipment",
        url: "https://cambodiancookbook.com/equipment/",
      },
    ],
    contributor: "Common in Khmer households",
    place: "Cambodia",
  },
];

export default entries;
