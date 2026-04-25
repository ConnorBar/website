
import { getAllTrips } from "@/lib/travel";

const taiwan_trips = getAllTrips().filter(trip => trip.country == "Taiwan").reverse();

const Awards = [
  {
    title: "Inducted to National Collegiate Chinese Honor Society",
    org: "CLTA NCCHS - 大学中文荣誉生协会",
    year: "2026-04",
  },
  {
    title: "First place in 400 level chinese speaking divison",
    org: "Purdue Chinese Speech & Performance Contest",
    year: "2026-03",
  },
  {
    title: "Was Host for a chinese speaking comp (50+ attendees)",
    org: "Purdue Chinese Speech & Performance Contest",
    year: "2026-03",
  },
  {
    title: "Visited Taiwan again",
    org: "",
    slug: taiwan_trips[1].slug,
    year: "2025-12",
  },
  {
    title: "Placement exam: (听力) Intermediate High (阅读) Advanced Low",
    org: "TOCFL Speedy Screening",
    year: "2025-11",
  },
  {
    title: "Taiwan Study Abroad",
    org: "Purdue Chinese Department",
    slug: taiwan_trips[0].slug,
    year: "2024-05",
  },
  {
    title: "Placement exam: (听力) Novice Mid (阅读) Intermediate Low",
    org: "TOCFL Speedy Screening",
    year: "2024-03",
  },
  {
    title: "Started studying!",
    org: "",
    year: "2023-08",
  },
];

export default Awards;
