// The archive's entries.
// `image` is a path under public/. `imageAlt` describes what the photo shows,
// for screen readers and for when the image fails to load.
// `story` is a longer write-up shown on the entry's detail page
// (/entries/[id]) — it goes deeper than `description`, which stays the
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
      "The empty condensed-milk tin that becomes the house's rice measure. It lives in the rice sack rather than a drawer, and nobody remembers buying it. Two cans for a family dinner, three if someone is staying — rice here is measured in cans, never in grams.",
    story: [
      "The tin stays in the rice sack. Whoever is cooking reaches in, scoops, and levels the rice off against the rim with a thumb. Nobody weighs rice and nobody owns a measuring cup, so the amount is carried in the hand and passed between cooks without a number ever being said out loud.",
      "The size is what makes it work. A standard tin of condensed milk holds about 397 grams, roughly 414 millilitres, which lands close to a single cup — so the moment the milk is gone the tin is already the right size for rice. Rather than buy a measure, a house settles on the container that is already in the kitchen and is reliably the same every time.",
      "It is kept for the reason most things in a Khmer kitchen are kept: it still works. The label soaks off, the rim dents, the tin darkens with handling, and it goes on measuring rice for years — an object that became a household tool by outlasting its own contents.",
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
      "The heaviest thing in the kitchen and the one nobody bothers to move. Kroeung — lemongrass, galangal, turmeric, kaffir lime, garlic — is pounded in it rather than blended, because stone bruises the fibre and drives the oil out where a blade only chops.",
    story: [
      "Weight is the whole point. A tbal is not lifted onto a counter and put away again; it stays where it is used, and the stone's own mass does the work, so the pestle is dropped rather than driven. The bowl is deep and narrow to keep the paste under the pestle instead of spreading out the way it would on a board, and the pounding surface is left slightly rough so the aromatics have something to catch on.",
      "It is the kroeung tool above all. Kroeung is the pounded paste — lemongrass, galangal, turmeric, kaffir lime leaf, garlic, sometimes fresh chilli — that sits underneath amok, samlor, and most Khmer curries, and it is built in the mortar in order, hardest ingredient first, each one broken down before the next goes in. The same mortar makes the everyday things too: chilli and garlic crushed for a dipping sauce, roasted peanuts broken up for a salad.",
      "Mortars are hand-carved from granite in the stone-working villages of Kampong Thom province, where artisans at the foot of Phnom Santhuk still quarry and cut stone by hand — the same craft tradition behind the sculpture at Angkorian temple sites. A mortar is chiselled out of a rough boulder into a bowl and then smoothed where the pounding happens: heavy, deliberately imperfect work meant to survive decades of daily use. Cambodian Cookbook calls the tbal \"THE Cambodian tool\" and advises buying the heaviest one you can manage, since stone \"bruises fibre and oil\" out of lemongrass and galangal in a way a blade never fully replicates.",
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
      "An open-weave bamboo basket that hangs on a nail until it is needed and then carries everything — rice from the sack, greens from market, fish still wet. The gaps are the design: water drains through, air moves, and nothing sweats or sours inside it.",
    story: [
      "A kanhchoe is carried on the hip or the arm, set down on the floor, emptied, and hung back up. Because the weave breathes, it holds the things that would spoil in a sealed bag — vegetables waiting to be cooked, fish coming back from market, rice being rinsed and drained. The same basket goes from market to kitchen to under the house without being washed in between, and when it finally splits it is handed down to a dirtier job rather than thrown out.",
      "Basket and mat weaving in bamboo, rattan and palm is one of Cambodia's oldest continuous crafts, documented back to the Angkorian period (9th–15th century) alongside stone carving and pottery. Weavers work by coiling, plaiting or twining depending on what the object has to do; an open basket like the kanhchoe is plaited loosely on purpose, so rice, vegetables or fish can drain and breathe through the gaps. Siem Reap and Kampong Cham are still known weaving regions.",
      "The craft came close to disappearing during the Khmer Rouge period (1975–1979), when many skilled weavers were killed or displaced and workshops closed along with most non-agricultural trades. Weaving villages have revived since the 2000s, though plenty of households never stopped making baskets for their own use regardless of whether anyone was buying them.",
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
      "The earthenware pot kept for kho — pork or fish braised down slowly in caramel and fish sauce. Porous clay is slow to heat and holds that heat evenly, which is exactly what a braise wants, and the pot comes off the charcoal onto the table still bubbling.",
    story: [
      "A chhnang dei is not a general-purpose pan. It is slow to come up to temperature, so it is used for the dishes that should be slow: kho, prahok-based soups, anything left to reduce while other work gets done. The slowness works in reverse once the pot leaves the fire — it stays hot long enough to serve from, which is why it goes straight to the table instead of being emptied into a bowl. Clay breaks, so a house tends to keep more than one, in more than one size.",
      "Kampong Chhnang — \"port of pottery\" — is named for the trade that has defined it for centuries. Kilns and the wooden paddles used to shape pots, found at village sites there, have been dated to the 6th century, predating the Angkorian empire by hundreds of years. The village of Andong Russey is still the centre of production, where potters shape pieces entirely by hand from local beige clay rather than on a wheel, using paddle-and-anvil techniques kept within families.",
      "Production declined after the fall of Angkor and again through the upheavals of the 20th century, before a revival in the early 2000s aimed at restoring the villages' traditional livelihoods. Cambodian Cookbook singles the clay pot out as the vessel for kho, valuing it for holding \"low, even heat\" suited to gentle braising and for being sturdy enough to carry the finished dish to the table.",
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
      "One broad blade instead of a drawer of knives. It slices lemongrass, flattens garlic under its flat, joints a chicken, and scoops the prep off the board on the way to the pan. A Khmer kitchen keeps one knife, keeps it sharp, and keeps it in the same place.",
    story: [
      "What makes the kambit useful is that it is not specialised. The weight of the blade does the cutting, so the hand only has to guide it; the flat side crushes garlic and ginger and then carries them to the pot; the spine bruises lemongrass before it goes in the mortar; the broad face clears the whole board in one pass. Nothing about the work asks for a second knife.",
      "It is used against a thick round block cut from a tree trunk rather than a thin board, because the cleaver is meant to come down hard — through chicken joints, through fish, through bundles of herbs at once. The edge is brought back at home on a whetstone instead of being sent out or replaced, and the handle wears smooth to the hand that uses it most. A knife treated this way lasts long enough to stop being a knife and become the knife.",
      "In a Khmer kitchen its day is mostly aromatics: lemongrass sliced thin before it is pounded into kroeung, galangal and turmeric cut down, garlic and shallot smashed flat. Then the heavier work — jointing a chicken for samlor, splitting a fish for the grill. Cambodian Cookbook recommends the kambit before any specialised blade for exactly that reason: one tool covers slicing, smashing, jointing, and scooping the board clean.",
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
      "One curved pan that stir-fries, boils, steams and deep-fries depending on how much oil or water goes into it. Over a charcoal fire it is often the only pan a house needs: light enough to lift one-handed, thin enough to get hot fast, shaped so the food keeps sliding back into the heat.",
    story: [
      "The curve is what the pan is for. Heat pools at the bottom and the food is kept moving up the sides and back down, so a small amount of oil and one hot spot can cook a whole dish. Change what goes in and the pan changes job: a spoon of oil for a stir-fry, a few inches for deep-frying spring rolls, water and a rack for steaming, more water for soup. One pan, one fire, most of a meal.",
      "Over charcoal the fire itself cannot be turned down, so the cook controls the dish by lifting and tilting the pan instead. Thin carbon steel suits that — it heats and cools quickly, and it answers to the hand rather than to a dial. It also blackens with use, and the blackening is not dirt: oil polymerised onto the metal over many fires is what keeps food from sticking, which is why a khteah is wiped out rather than scrubbed back to bare steel.",
      "It is the pan behind char kroeung, loc lac, fried rice, and the shallots fried crisp for scattering over noodles and soups. For a home stovetop rather than an open flame, Cambodian Cookbook recommends a flat-bottomed khteah and proper seasoning, so the pan sits steady and still takes the fast, high heat a stir-fry depends on.",
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
      "The rice pot, and the one thing in the kitchen that is never put away. Rice is measured in with the milk tin, water judged by a finger above it, and the lid stays down until the meal. Nothing else in the house gets opened as many times a day.",
    story: [
      "The name says what it is: chhnang is a pot, bay is cooked rice. It sits low and stays plugged in — on the floor, a step, or a shelf near the one outlet — and it is the first thing switched on and the last thing cleared. Rice goes in measured by the condensed-milk tin, water is judged by a finger laid on top of the rice rather than by any marking on the pot, and then it is left alone. Nobody stands over it.",
      "It is usually left on warm straight through the afternoon, because a Khmer house does not eat only at set times: someone comes in from work, someone comes back from school, and there is rice. The crust that forms at the bottom by evening is eaten too. At the end of the day the inner pot is washed and put back, and the cooker stays exactly where it was.",
      "That constancy is the point. Rice is not a side dish here — to eat a meal is ញ៉ាំបាយ, literally to eat rice, and everything else on the table is understood as what goes with it. Cambodian Cookbook notes the rice cooker turns up on nearly every page of its recipes for the same reason: rice accompanies nearly every Khmer meal, and this is the pot that makes it without being watched.",
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
      "Stacked tiers over one pot of water, so a single fire cooks three things at once. Amok in banana-leaf cups, steamed cakes, a whole fish — the heat is gentle enough to set a custard without breaking it.",
    story: [
      "One heat source, several dishes. That is the arrangement a chhnang chomhuy is built for, and it counts for more when the heat is charcoal that has to be lit, fed and put out than when it is a burner that can simply be switched on again. Rice, vegetables and fish can go in together, the tiers swapped top to bottom as each one finishes.",
      "Steam is also the only heat gentle enough for certain dishes. Amok — fish folded through kroeung, coconut cream and egg — is steamed in banana-leaf cups until it sets like a custard, and it will split and weep if it is cooked any harder than that. The same tiers hold num, the steamed rice-flour cakes made for festivals and for offerings, and a whole fish laid flat with ginger and spring onion, where boiling would tear the flesh apart.",
      "The tiers come apart to wash and stack away flat, and a plate set on a rack inside a covered pot does the same job when there is no dedicated steamer in the house — which Cambodian Cookbook says plainly, while singling the steamer out for amok, cakes and fish because its even heat \"sets custards without breaking them\".",
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
