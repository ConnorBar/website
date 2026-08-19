# Graph Report - website  (2026-05-15)

## Corpus Check
- 29 files · ~402,149 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 54 nodes · 34 edges · 3 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `generateStaticParams()` - 3 edges
2. `generateMetadata()` - 3 edges
3. `getAppleMusicRecentlyPlayed()` - 3 edges
4. `getAllTrips()` - 3 edges
5. `ProjectSlugPage()` - 2 edges
6. `GET()` - 2 edges
7. `TravelPage()` - 2 edges
8. `getRedis()` - 2 edges
9. `getSpotifyToken()` - 2 edges
10. `getSpotifyNowPlaying()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllTrips()`  [INFERRED]
  app/travel/[slug]/page.tsx → lib/travel.ts
- `generateMetadata()` --calls--> `getTrip()`  [INFERRED]
  app/travel/[slug]/page.tsx → lib/travel.ts
- `ProjectSlugPage()` --calls--> `getProjectContent()`  [INFERRED]
  app/projects/[slug]/page.tsx → lib/projects-content.ts
- `GET()` --calls--> `getAppleMusicRecentlyPlayed()`  [INFERRED]
  app/api/now-playing/route.ts → lib/widgets.ts
- `TravelPage()` --calls--> `getAllTrips()`  [INFERRED]
  app/travel/page.tsx → lib/travel.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (5): getRedis(), getAppleMusicRecentlyPlayed(), getSpotifyNowPlaying(), getSpotifyToken(), GET()

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (4): getProjectContent(), generateMetadata(), generateStaticParams(), ProjectSlugPage()

### Community 2 - "Community 2"
Cohesion: 0.4
Nodes (3): getAllTrips(), getTrip(), TravelPage()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getAllTrips()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `generateStaticParams()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `getAppleMusicRecentlyPlayed()` (e.g. with `GET()` and `getRedis()`) actually correct?**
  _`getAppleMusicRecentlyPlayed()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `getAllTrips()` (e.g. with `TravelPage()` and `generateStaticParams()`) actually correct?**
  _`getAllTrips()` has 2 INFERRED edges - model-reasoned connections that need verification._