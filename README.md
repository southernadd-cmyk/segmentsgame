# Segment Studio

A static, no-login classroom game for BTEC Level 3 IT Unit 6: Website Development. Designed for Chrome, solo or pairs. All application files are plain HTML/CSS/JavaScript with no build, packages, external fonts or runtime API calls.

## Play

Intended GitHub Pages address: https://southernadd-cmyk.github.io/segmentsgame/

Open `index.html` locally, or serve the repository root with any static web server. The main game does not require access to brand sites. Source links and the final investigation use external websites. The linked support pages provide an alternative when a school network blocks a brand site; students must identify that limitation.

## Five rounds

1. **Decode:** 20 audience clues across demographics, psychographics, geographics and behavioural segmentation. Correct first answers earn 5 XP each.
2. **Design:** five fictional briefs using Roblox, Spotify, Amazon, Google and YouTube. Select features within six credits, then build an audience → feature → benefit → client outcome connection. Up to 24 XP per brief.
3. **Diagnose:** a performance clinic covering unit content A2. Eight fictional symptoms — slow first visit but fast second, fine on wi-fi but slow on mobile data, one 2.4 MB hero image, slow only at peak time, works in Chrome but not Safari — each answered by naming the dominant factor and then the evidence that would confirm it. 10 XP per correct first answer.
4. **Challenge:** ten claims covering stereotypes, evidence, comparison, causality, performance, evaluation, search engine optimisation and creativity. 10 XP each.
5. **The verdict:** investigate two websites and write a comparison, analysis and evaluation through five guided steps, with the P1/M1/D1 coach. Export everything as a UTF-8 text file. 100 completion XP for filled fields and self-review, not for writing quality.

500 maximum agency XP. Navigation is open to support differentiation; each decision can only score once. A fresh game resets all saved work and reshuffles order. There is no shared leaderboard or server-side scoring.

## Teaching sequence

Five rounds no longer fit comfortably in 90 minutes. Two routes, both also in the built-in teacher notes:

| Route | Shape |
| --- | --- |
| **Two lessons** (recommended) | **L1:** field guide 10 · Decode 15 · Design 25 · Diagnose 20 · debrief 20. **L2:** Challenge 15 · investigate two sites 25 · P1/M1/D1 writing 40 · peer review and export 10 |
| **One lesson** (90 min) | field guide 10 · Decode first 10 clues 10 · Design two briefs 15 · Diagnose 15 · Challenge 10 · the verdict 25 · export 5 |

Navigation is open, so partial rounds are fine — XP is not a grade and unanswered questions cost nothing. In the single-lesson route, set the writing steps as homework and mark from the exported case file. Suggested debrief: which choice helps one segment but creates a problem for another, and what evidence would settle it?

## Specification alignment

Pearson BTEC National Level 3 Information Technology (2016), Unit 6: Website Development, learning aim A. The criteria are quoted, not paraphrased:

| Criterion | Wording |
| --- | --- |
| A.P1 | Compare the principles of website design used in two websites, including their suitability for the intended audience and intended purpose. |
| A.M1 | Analyse how the principles of website design are used to produce creative, high-performance websites that meet client requirements. |
| A.D1 | Evaluate how the principles of website design are used to produce creative, high-performance websites that meet client requirements. |

Learning aim A content covered in `criteria.js`:

- **A1** purpose of websites; target audience; client requirements (user-friendly, consistent, navigational, customisable, flexible); principles of website design (usability, white space, site layout, accessibility, spacing, navigation, typography, alignment, clarity, consistency/intuitiveness, accuracy, content, media, simplicity); media and objects; creativity and innovation; search engine optimisation.
- **A2** drilled directly in the Diagnose round: where scripts run; browser compliance; server-side factors (bandwidth availability, number of hits, file types); client-side factors (upload and download speeds, browser, cache memory, processor speed, interactivity).

Segmentation supports the audience half of A.P1. It is not the whole of learning aim A, and this activity is formative preparation rather than an assessment. The coach counts words, not reasoning: teachers must still assess depth, validity, balance, independence and coverage against the centre's assignment brief.

Specification: https://qualifications.pearson.com/content/dam/pdf/BTEC-Nationals/Information-Technology/2016/specification-and-sample-assessments/specification-pearson-btec-level-3-national-extended-certificate-in-information-technology.pdf

## The P1/M1/D1 coach

Each of the three writing steps carries a live checklist of the moves that criterion asks for, recomputed as the student types:

| Criterion | Moves checked |
| --- | --- |
| A.P1 | both sites named; two or more principles named; a similarity; a difference; who each site is for; what each site is for |
| A.M1 | a chain of reasoning; a choice tied to a user task; creativity reasoned about; a performance factor named; a client requirement named; a benefit and a cost |
| A.D1 | a requirement and why the user cares; a positive organisational outcome; a negative one; the two weighed; a justified judgement; a prioritised improvement with a test; creativity or performance carried into the judgement |

Alongside the checklist, chips name which design principles and which A2 performance factors the draft actually mentions — the quickest way to see a draft that names one principle four times rather than three principles once.

The check is transparent keyword and connective matching. It cannot tell whether a claim is true or a judgement sound, and a weak draft can still collect ticks. Every writing step therefore includes a **worked ladder**: the same task written three ways, each with its own tick count, ending on the point that the weakest draft scores some ticks and the two strongest both score 6/6. Ticks are a floor, not a grade. Nothing in the coach awards XP, so there is nothing to gain by keyword-stuffing.

Investigation notes get a lighter three- or four-move check aimed at the difference between evidence and a guess: a named principle, a URL and date, something specific enough to disagree with, test conditions, an accessibility check, and what could not be tested from outside the site.

Edit `criteria.js` to change any of the content or any of the detectors.

## Choosing the two websites

The pass standard describes two *similar* sites, its own example being two comparable commerce sites. The site picker therefore offers **Another website — type it in** as well as the five built-in brands, so a class can compare two colleges, two supermarkets or two takeaways. The app labels the chosen pair as a good pairing (both sites do the same job, so every principle has a like-for-like counterpart) or a harder one (judge each against its own purpose; do not declare a winner). The default pair is two streaming sites. Notes are kept separately per site, so switching back restores the earlier draft.

## Evidence and ethics

All profiles, client briefs, proposed redesigns and scoring are authored teaching scenarios. They are **not measured audience data, actual brand commissions or predicted business metrics**. Official public feature explanations are linked in the Field guide and stored in `data.js`; checked 10 September 2026. Layouts can vary with device, region, login status and experiments. Students should record URLs, date, device and limitations. Brand names are used for educational identification; the activity is unaffiliated.

The game explicitly challenges assumptions about gender, age, rural connectivity and personal interests. It asks students to consider accessibility, mobile layouts, performance, trustworthy information and potential conflicts between user and business goals.

## Files and editing

- `index.html`: application shell and accessible dialog.
- `styles.css`: responsive layout, keyboard focus and reduced-motion handling.
- `data.js`: editable clues, briefs, options, claim answers, writing prompts and source links.
- `criteria.js`: design principles, performance factors, client requirements, the P1/M1/D1 move detectors and the worked ladder.
- `app.js`: rendering, scoring, local saving, validation and text export.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.
- `.nojekyll`: static hosting marker.

## Saving and privacy

Progress is stored under `segment-studio-v1` in localStorage. No names are required and no student answers are transmitted by the application. GitHub Pages serves the files; external links open the external provider. Local storage may be restricted, cleared or shared between users. Export before leaving a shared computer, then reset. If storage is unavailable, the page reports this and the in-memory game remains playable. Downloads require the browser's usual permission/settings.

## GitHub Pages

The workflow publishes the static root using GitHub Actions. In repository **Settings → Pages**, the source must be **GitHub Actions**. The workflow's configure step requests Pages enablement; if GitHub denies that step, an owner must enable Pages in Settings, then rerun the workflow. Some GitHub App connections cannot change repository Pages settings.

No server, paid hosting service, API key or dependency installation is required. The project uses relative asset paths so it works at `/segmentsgame/`.

## Experience update

- `criteria.js` holds the learning aim A content and the coach: design principles, A2 performance factors, client requirements, the per-criterion move detectors and the worked ladder. It is the file to edit for teaching content.
- The three writing steps show the criterion in the specification's own wording, a live move checklist, principle and performance chips, the worked ladder, and one reference desk containing how the criterion is judged, the principles, the performance factors, the client requirements and the sentence starters.
- Investigation prompts now ask for a named principle, the URL, date and device, one performance observation with its test conditions, one accessibility check, and what could not be tested.
- The sidebar shows A.P1 / A.M1 / A.D1 move counts; each row jumps to its writing step.
- The case-file export lists, per criterion, which moves were detected and which principles and performance factors were named — a marking aid, clearly labelled as an automated word check rather than a grade.
- Students can compare any two websites, not only the five built-in brands, and the app advises on how comparable the chosen pair is.
- Each round shows progress independently of XP. Completion summaries focus attention on misconceptions and keep full explanations available.
- Decode and Challenge support number-key answers, with instant keyboard transitions.
- Design uses a three-stage flow, explicit credit availability, an editable four-part connection, highlighted drag targets, tap/click alternatives and concise explanation cards.
- Existing local sessions, scores, pitches and written drafts are migrated without starting over; no save format change was needed.
- Typography, spacing, focus states, touch controls, contrast and status messages share consistent styles. Motion is limited to brief press feedback and answer feedback.
- The Diagnose round drills A2 performance factors directly, and the Challenge round now questions SEO and creativity, closing the coverage gap in the previous version. A.D1 gained a seventh move requiring creativity or performance to be carried into the judgement rather than left in the analysis.
- Saves migrate from version 1 to version 2 automatically: an old session resumes on the right round, keeps every answer and draft, and has the clinic added to it.
- Tested with a jsdom harness (41 assertions) across all five rounds, version 1 save migration, the coach's live updates, custom site selection, save/reload migration and export. Browser visual and gesture testing was not performed in this update.

Design direction informed by the supplied Emil Design Engineering, Apple Design and Animate skill documents.
