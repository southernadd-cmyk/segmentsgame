# Segment Studio

A static, no-login classroom game for BTEC Level 3 IT Unit 6: Website Development. Designed for Chrome, solo or pairs. All application files are plain HTML/CSS/JavaScript with no build, packages, external fonts or runtime API calls.

## Play

Intended GitHub Pages address: https://southernadd-cmyk.github.io/segmentsgame/

Open `index.html` locally, or serve the repository root with any static web server. The main game does not require access to brand sites. Source links and the final investigation use external websites. The linked support pages provide an alternative when a school network blocks a brand site; students must identify that limitation.

## Four rounds

1. **Decode:** 20 audience clues covering age, gender, income, education, occupation; values, beliefs, lifestyle, personality, interests; country, city, climate, urban/rural location; buying habits, loyalty, usage and benefits sought. Correct first answers earn 5 XP each.
2. **Design:** five fictional briefs using Roblox, Spotify, Amazon, Google and YouTube. Select features within six credits and write a short causal explanation. Up to 24 XP per brief, based on authored fit points. The top three options each cost two credits and earn four fit points. Written pitches are saved but not graded.
3. **Challenge:** eight claims exploring stereotypes, evidence, comparison, causality, performance and evaluation. Correct first answers earn 10 XP each.
4. **The verdict:** investigate two different real websites and write a comparison, analysis and evaluation. Export all answers, feedback, notes and references as a UTF-8 text file. The 100 completion XP is for filled fields and self-review, not writing quality.

400 maximum agency XP. Navigation is open to support differentiation; each decision can only score once. A fresh game resets all saved work and shuffles clue order. There is no shared leaderboard or server-side scoring.

## 90-minute teaching sequence

| Minutes | Activity |
| --- | --- |
| 0–10 | Introduce the four categories using the Field guide |
| 10–25 | Decode clues and discuss category boundaries |
| 25–45 | Design budgets in pairs; alternate decision-maker and challenger |
| 45–55 | Challenge weak report claims |
| 55–80 | Investigate two sites and draft the verdict |
| 80–90 | Peer review, export and debrief |

The final investigation can be extended into homework. Teacher notes are built into the interface. Suggested debrief: which choice helps one segment but creates a problem for another?

## Specification alignment

Based on Pearson BTEC National Level 3 Information Technology (2016), Issue 6, Unit 6 learning aim A; printed pages 57–65. Criteria are paraphrased here:

| Criterion | Practice in this activity |
| --- | --- |
| A.P1 | Compare website design principles on two websites, relating suitability to audience and purpose. |
| A.M1 | Analyse how design choices support creativity, performance and client requirements, using causal explanations. |
| A.D1 | Weigh effectiveness and limitations, reach justified judgements and propose prioritised improvements. |

Segmentation supports audience analysis. The game is formative preparation, not a complete Unit 6 assessment or an automatic grading tool. Teachers must assess depth, validity, independence and coverage against the actual assignment brief. Minimum character counts only check that entries are present. Students are prompted to distinguish measurements from proposed tests.

Specification: https://qualifications.pearson.com/content/dam/pdf/BTEC-Nationals/Information-Technology/2016/specification-and-sample-assessments/specification-pearson-btec-level-3-national-extended-certificate-in-information-technology.pdf

## Evidence and ethics

All profiles, client briefs, proposed redesigns and scoring are authored teaching scenarios. They are **not measured audience data, actual brand commissions or predicted business metrics**. Official public feature explanations are linked in the Field guide and stored in `data.js`; checked 10 September 2026. Layouts can vary with device, region, login status and experiments. Students should record URLs, date, device and limitations. Brand names are used for educational identification; the activity is unaffiliated.

The game explicitly challenges assumptions about gender, age, rural connectivity and personal interests. It asks students to consider accessibility, mobile layouts, performance, trustworthy information and potential conflicts between user and business goals.

## Files and editing

- `index.html`: application shell and accessible dialog.
- `styles.css`: responsive layout, keyboard focus and reduced-motion handling.
- `data.js`: editable clues, briefs, options, claim answers, writing prompts and source links.
- `app.js`: rendering, scoring, local saving, validation and text export.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.
- `.nojekyll`: static hosting marker.

## Saving and privacy

Progress is stored under `segment-studio-v1` in localStorage. No names are required and no student answers are transmitted by the application. GitHub Pages serves the files; external links open the external provider. Local storage may be restricted, cleared or shared between users. Export before leaving a shared computer, then reset. If storage is unavailable, the page reports this and the in-memory game remains playable. Downloads require the browser's usual permission/settings.

## GitHub Pages

The workflow publishes the static root using GitHub Actions. In repository **Settings → Pages**, the source must be **GitHub Actions**. The workflow's configure step requests Pages enablement; if GitHub denies that step, an owner must enable Pages in Settings, then rerun the workflow. Some GitHub App connections cannot change repository Pages settings.

No server, paid hosting service, API key or dependency installation is required. The project uses relative asset paths so it works at `/segmentsgame/`.
