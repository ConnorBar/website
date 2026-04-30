export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  wip?: boolean;
  short_desc?: string;
  short_tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "offline-rl",
    title: "Offline RL for Robotic Manipulation",
    description:
      "Implementing Implicit Q-Learning (IQL) for offline reinforcement learning on the MARS Lab's multimodal robotic dataset (vision, tactile, force, state). Designing multimodal observation pipelines using R3M ResNet18 encoders with online fine-tuning, and extending the IQL framework to support policy rollout in simulation via a modified Isaac Gym environment.",
    tags: ["PyTorch", "IsaacGym", "Reinforcement Learning", "Python"],
    featured: true,
    short_desc:
      "Implementing IQL-based offline RL on a multimodal robotic dataset (vision, tactile, force, state) at Purdue's MARS Lab.",
    short_tags: ["PyTorch", "Reinforcement Learning", "IsaacGym"],
  },
  {
    slug: "speech-recognition",
    title: "Mandarin Speech Recognition",
    description:
      "Optimized audio preprocessing with a multiprocessing pipeline, achieving an 81% speedup across 200,000 audio samples and yielding 3 million training/testing/validation examples. Leveraged CTC Forced Alignment for automatic sentence segmentation and phoneme boundary detection. Developed a Multi-Task Learning model using a ResNet + LSTM integrating Phonotactic Constraint Learning and Counterfactual Data Augmentation.",
    tags: ["PyTorch", "PyTorch Lightning", "Librosa", "Pandas", "Python"],
    github: "https://github.com/ConnorBar/audio",
    featured: true,
    short_desc:
      "Built a Mandarin tone recognition model with a multiprocessing pipeline that cut preprocessing time by 81% across 200k audio samples.",
    short_tags: ["PyTorch", "CTC Alignment", "Multi-Task Learning"],
  },
  {
    slug: "boilertheremin",
    title: "Boilertheremin",
    description:
      "Real-time musical instrument that translates hand gestures and body pose into sound using MediaPipe pose estimation. Generates melodies from chords played using ML models constrained by music theory rules. Won 2nd place out of 70+ submitted projects at Purdue's Boilermake hackathon.",
    tags: ["MediaPipe", "JavaScript", "Magenta.js", "Tailwind CSS"],
    github: "https://github.com/plantarchy/theremin",
    demo: "https://boilertheremin.netlify.app/",
    featured: true,
    short_desc:
      "Real-time gesture-controlled instrument — won 2nd at Purdue's Boilermake out of 70+ projects.",
    short_tags: ["MediaPipe", "Magenta.js", "JavaScript"],
  },
  {
    slug: "easyeats",
    title: "EasyEats (WIP)",
    description:
      "Pantry tracker + recipe matcher — see what you can cook tonight and auto-deduct ingredients when you do.",
    tags: ["Flutter", "FastAPI", "MongoDB"],
    github: "https://github.com/ConnorBar/easyeats",
    featured: false,
    short_desc:
      "Kitchen inventory + recipe matching app. Track what's in your pantry, save recipes, and instantly see what you can actually make tonight. Completing a recipe auto-deducts ingredients to keep your inventory in sync. Planned features include grocery lists with per-store pricing, a drag-and-drop meal plan calendar, and smarter ways to import recipes and groceries. Potential for integration into E-Clair...",
    short_tags: ["Flutter", "FastAPI", "MongoDB"],
  },
  {
    slug: "eclair",
    title: "E-Clair (WIP)",
    description:
      "Rocket Money? Monarch? naw bro you must have hit your head. this does takes all of that PLUS more & blazingly fast.",
    tags: ["Rust", "TypeScript", "Plaid"],
    github: "https://github.com/ConnorBar/eclair",
    featured: false,
    short_desc:
      "All-in-one finance tracker. Blazing fast and secure.",
    short_tags: ["Rust", "TypeScript", "Plaid"],
  },
  {
    slug: "this-website",
    title: "This website!",
    description:
      "its pretty cool huh? check it out!",
    tags: ["React", "MusicKit", "Redis"],
    github: "https://github.com/ConnorBar/website",
    demo: "https://cobars.space",
    featured: false,
    // short_desc:
    //   "",
    // short_tags: [],
  },
  {
    slug: "white-snake",
    title: "Legend of the White Snake - Story Mode (WIP Passion Project)",
    description:
      "Inspired by the Chinese story 白娘子 that has many different interpretations all changing throughout history, this is a 2D RPG style game that has decision based endings. ",
    tags: ["Godot", "Gamedesign"],
    // github: "https://github.com/ConnorBar/eclair",
    featured: false,
    // short_desc:
    //   "All-in-one finance tracker. Blazing fast and secure.",
    // short_tags: ["Rust", "TypeScript", "Plaid"],
  },
];

export function getFeaturedProjects() {
  return projects
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.short_desc ?? p.description,
      tags: p.short_tags ?? p.tags,
      href: `/projects/${p.slug}`,
    }));
};

export function getWIPProjects() {
  return projects.filter((p) => p.wip);
};

