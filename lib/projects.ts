export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  short_desc?: string;
  short_tags?: string[];
};

export const projects: Project[] = [
  {
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
    title: "Chinese Speech Recognition",
    description:
      "Optimized audio preprocessing with a multiprocessing pipeline, achieving an 81% speedup across 200,000 audio samples and yielding 3 million training/testing/validation examples. Leveraged CTC Forced Alignment for automatic sentence segmentation and phoneme boundary detection. Developed a Multi-Task Learning model using a ResNet + LSTM integrating Phonotactic Constraint Learning and Counterfactual Data Augmentation.",
    tags: ["PyTorch", "PyTorch Lightning", "Librosa", "Pandas", "Python"],
    featured: true,
    short_desc:
      "Built a Mandarin tone recognition model with a multiprocessing pipeline that cut preprocessing time by 81% across 200k audio samples.",
    short_tags: ["PyTorch", "CTC Alignment", "Multi-Task Learning"],
  },
  {
    title: "Boilertheremin",
    description:
      "Real-time musical instrument that translates hand gestures and body pose into sound using MediaPipe pose estimation. Generates melodies from chords played using ML models constrained by music theory rules. Won 2nd place out of 70+ submitted projects at Purdue's Boilermake hackathon.",
    tags: ["MediaPipe", "JavaScript", "Magenta.js", "Tailwind CSS"],
    github: "https://github.com/ConnorBar",
    demo: "https://boilertheremin.netlify.app/",
    featured: true,
    short_desc:
      "Real-time gesture-controlled instrument — won 2nd at Purdue's Boilermake out of 70+ projects.",
    short_tags: ["MediaPipe", "Magenta.js", "JavaScript"],
  },
];

export function getFeaturedProjects() {
  return projects
    .filter((p) => p.featured)
    .map((p) => ({
      title: p.title,
      description: p.short_desc ?? p.description,
      tags: p.short_tags ?? p.tags,
      href: "/projects",
    }));
}
