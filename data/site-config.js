// src/data/site-config.js

export const siteConfig = {
  // 1. GENERAL INFO
  general: {
    appName: "TEAM RGYCSP",
    logoText: "RGYCSP",
    whatsappLink: "https://chat.whatsapp.com/J8foEbkquy971xRei3uCXu", // Your Group Link
  },

  // 2. NAVIGATION MENUS
  navigation: [
    { title: "Home", path: "/" },
    { title: "Our Journey", path: "/#trips" }, // The timeline
    { title: "Team", path: "/#team" },       // Anchor link to homepage team section
    { title: "Gallery", path: "/gallery" },
  ],

  // 3. HERO SECTION (The first thing people see)
  hero: {
    title: "TEAM RGYCSP",
    subtitle: "Real Group of Young Colleagues Supporting Positivity",
    tagline: "Collecting Moments, Not Things.",
    buttonText: "Explore Our Memories",
    // These images will slide in the background
    backgroundImages: [
      "https://res.cloudinary.com/dmhipemqk/image/upload/v1769761067/musiuam_02_kh4zfk.webp",
      "https://res.cloudinary.com/dmhipemqk/image/upload/v1769764175/birthDayRsnt_02_ipoivv.webp",
      "https://res.cloudinary.com/dmhipemqk/image/upload/v1769765108/digha_16_ydklmx.jpg"

      // "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200", // Placeholder 1
      // "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200", // Placeholder 2
      // "https://images.unsplash.com/photo-1504609773096-104ff1058705?q=80&w=1200", // Placeholder 3
    ],
  },

  // 4. ABOUT SECTION
  about: {
    title: "Who We Are",
    description: "We are a group of 5 colleague-friends who believe in working hard and traveling harder. From the computer institute to the mountains, our bond remains unbreakable.",
  },

  // 5. FOOTER SECTION
  footer: {
    text: "© 2026 TEAM RGYCSP. Built with ❤️ by Suman.",
    links: [
      { label: "WhatsApp Group", url: "https://chat.whatsapp.com/J8foEbkquy971xRei3uCXu" },
      { label: "Suman's GitHub", url: "https://github.com/yourusername" } // Optional
    ]
  }
};