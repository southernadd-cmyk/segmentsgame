'use strict';
const CATEGORIES = [
 {name:'Demographics',cue:'The who',symbol:'01 / WHO',examples:'Age, gender, income, education, occupation',detail:'Characteristics describing who people are. An age or gender does not tell you someone’s interests, ability or preferences.'},
 {name:'Psychographics',cue:'The why',symbol:'02 / WHY',examples:'Values, beliefs, lifestyle, personality, interests',detail:'What matters to people and what motivates them. Use stated preferences or research; do not infer someone’s beliefs from their appearance.'},
 {name:'Geographics',cue:'The where',symbol:'03 / WHERE',examples:'Country, city, climate, urban or rural',detail:'Where people live or use a service. Location can affect language, delivery and relevant content. Rural location alone does not prove a slow connection.'},
 {name:'Behavioural',cue:'The how',symbol:'04 / HOW',examples:'Buying habits, brand loyalty, usage rate, benefits sought',detail:'How people use, choose or buy a service, including the benefits they seek. A broad value such as independence is psychographic; wanting next-day delivery from a purchase is a benefit sought.'}
];
const CLUES = [
 ['Spotify','A listener is 19 years old.',0,'Age is demographic. It does not establish what music this person enjoys.','Use research about needs before choosing imagery or language.'],
 ['Roblox','A player says creative self-expression matters to them.',1,'This is a stated value: why an experience appeals to them.','Avatar customisation may support that motivation.'],
 ['Amazon','A shopper lives in the United Kingdom.',2,'Country is geographic, even though it can influence buying conditions.','Show the appropriate currency and delivery information.'],
 ['YouTube','A viewer watches tutorials every evening.',3,'This describes usage frequency: what the person does.','Continue-watching links could reduce repeat navigation.'],
 ['Google','A user describes her gender as female.',0,'Gender is demographic. It does not tell you which colours or topics she prefers.','Test inclusive content; do not turn gender into a design stereotype.'],
 ['Amazon','A customer prefers companies that share their environmental values.',1,'Environmental values explain motivation, so this clue is psychographic.','Clear, substantiated product information may help this customer.'],
 ['Google','A visitor is searching from Exeter.',2,'A city is a geographic location.','Local results may be more useful than distant ones.'],
 ['Spotify','A listener renews the same music subscription every year.',3,'Repeatedly staying with the same service indicates brand loyalty.','Easy access to a saved library can support returning listeners.'],
 ['Amazon','A shopper’s annual income is £24,000.',0,'Income is demographic. Their actual spending choices still need evidence.','Transparent prices help budget decisions without assuming low income means low digital skill.'],
 ['YouTube','A viewer has a strong interest in repairing old computers.',1,'An interest is psychographic; it differs from a recorded viewing action.','Topic labels can help them find repair content.'],
 ['Amazon','A customer lives in a region with a hot, dry climate.',2,'Climate is geographic. Buying sun protection would be a separate behavioural clue.','Seasonally relevant content is a possible design response, to be tested.'],
 ['Amazon','A customer compares prices across three websites before buying.',3,'This is a buying habit: an observable action.','Visible prices and product details can make comparison easier.'],
 ['Google','A user is studying for a Level 3 qualification.',0,'Education level is demographic. It does not prove expertise in every topic.','Clear result descriptions can help a learner judge relevance.'],
 ['Spotify','A listener describes their lifestyle as active and outdoorsy.',1,'Lifestyle is psychographic. It is not the same as a country or a usage rate.','Activity-based discovery could suit this stated preference.'],
 ['Amazon','A customer lives in a rural village rather than a city.',2,'Urban versus rural location is geographic. Connection quality must be checked separately.','Accurate delivery information may matter; do not invent restrictions.'],
 ['YouTube','A viewer wants quick, practical answers from the service.',3,'The benefit sought is a fast practical answer. This is behavioural segmentation.','Clear durations and searchable titles may reduce wasted time.'],
 ['Google','A user works as an electrician.',0,'Occupation is demographic. Searches for wiring guides would be behavioural evidence.','Use explicit needs, not occupation alone, to decide what to prioritise.'],
 ['Roblox','A player describes themselves as adventurous and curious.',1,'A self-described personality is psychographic.','Discovery tools might appeal; confirm this with user research.'],
 ['YouTube','A viewer believes educational content should be freely accessible.',1,'A belief explains why they value a service.','Make access conditions clear; do not promise that all content is free.'],
 ['Spotify','A listener plays the same saved playlist on every commute.',3,'This is a repeated usage pattern. The reason they like that music is not stated.','A prominent library shortcut could save time.']
];
const SOURCES = [
 {name:'Pearson — BTEC National IT specification, Unit 6 (printed pp. 57–65)',url:'https://qualifications.pearson.com/content/dam/pdf/BTEC-Nationals/Information-Technology/2016/specification-and-sample-assessments/specification-pearson-btec-level-3-national-extended-certificate-in-information-technology.pdf',note:'Learning aim A: compare website design for audiences and purposes; analyse and evaluate design, creativity, performance and client requirements.'},
 {name:'Spotify — Find playlists',url:'https://support.spotify.com/us/article/find-playlists/',note:'Spotify describes playlists informed by listening habits, including saves and skips.'},
 {name:'YouTube — How recommendations work',url:'https://support.google.com/youtube/answer/16089387?hl=en',note:'YouTube describes watch history as a recommendation signal, especially on its homepage.'},
 {name:'Google — Location and Search',url:'https://support.google.com/websearch/answer/179386?hl=en',note:'Google explains how location can affect search results.'},
 {name:'Roblox — What is Roblox?',url:'https://about.roblox.com/what-is-roblox',note:'Roblox describes experiences and self-expression features.'},
 {name:'Amazon UK — Customer reviews',url:'https://www.aboutamazon.co.uk/news/retail/update-on-customer-reviews',note:'Amazon explains the role of reviews in informed purchase decisions. This is a historical feature explanation, not current audience statistics.'}
];
const BRANDS = [
 {name:'Roblox',kind:'Games and community',url:'https://www.roblox.com/',source:4,purpose:'Discover and participate in experiences; express an identity.',feature:'Self-expression and experience discovery',principle:'Visual hierarchy, navigation and customisation'},
 {name:'Spotify',kind:'Media and streaming',url:'https://open.spotify.com/',source:1,purpose:'Discover and listen to audio; retain listeners.',feature:'Playlists informed by listening habits',principle:'Personalisation, consistency and navigation'},
 {name:'Amazon',kind:'Product and service (commerce)',url:'https://www.amazon.co.uk/',source:5,purpose:'Find, compare and buy products.',feature:'Customer reviews supporting purchase decisions',principle:'Information hierarchy, trust and usability'},
 {name:'Google',kind:'Search and information',url:'https://www.google.com/',source:3,purpose:'Find relevant information and services.',feature:'Location can influence search results',principle:'Clarity, whitespace and relevance'},
 {name:'YouTube',kind:'Media and streaming',url:'https://www.youtube.com/',source:2,purpose:'Find and watch video; support creators and returning viewers.',feature:'Recommendations can use watch history',principle:'Discovery, visual hierarchy and user control'}
];
// All design briefs and their scoring are authored classroom simulations, not brand analytics.
const MISSIONS = [
 {brand:0,title:'Let creativity lead',client:'Help new visitors find a suitable experience and understand avatar choices.',facts:['16-year-old college student','Values creativity and self-expression','Lives in a UK city','Returns daily; explores with friends'],need:'A first-time visitor must be able to understand choices without a crowded screen.',options:[
 ['Clear experience categories',2,4,'Navigation','Group experiences under clear labels.','Supports discovery without requiring prior knowledge.','Categories can oversimplify; test the labels with new users.'],
 ['Avatar preview with clear controls',2,4,'Customisation','Preview a choice before confirming it.','Connects the stated self-expression value to a visible interaction.','Preview media adds weight; optimise assets and provide text labels.'],
 ['Readable labels and keyboard access',2,4,'Accessibility','Make the main choices understandable and operable.','Helps more visitors complete the client’s discovery task.','Test keyboard order and contrast; appearance alone is insufficient.'],
 ['Full-screen autoplay trailer',3,1,'Multimedia','Start an animation before showing any choices.','May communicate atmosphere, but delays the discovery task.','Motion, data use and forced waiting can exclude visitors.'],
 ['Use one colour for all teenagers',1,0,'Assumption','Choose colours solely from the visitor’s age.','Age alone provides no evidence of colour preference.','Research preferences and prioritise contrast.'],
 ['Search with useful empty results',2,3,'Usability','Help users recover when a search finds nothing.','Gives a direct route for visitors who already know what they want.','A new visitor may not yet know what to search for.']
 ]},
 {brand:1,title:'The daily listening shortcut',client:'Help returning listeners reach familiar audio quickly while discovering something new.',facts:['20-year-old university student','Values discovery; enjoys an active lifestyle','Lives in Bristol, UK','Listens daily and frequently replays saved playlists'],need:'The listener uses a small screen on a commute and wants fewer steps to a saved playlist.',options:[
 ['Prominent library shortcut',2,4,'Navigation','Place saved audio within easy reach.','Responds to the repeated listening habit and reduces navigation effort.','Avoid crowding the interface with too many shortcuts.'],
 ['Explain recommendation choices',2,4,'Personalisation','Label suggestions and provide a way to adjust them.','Supports discovery and gives listeners more control.','Personalisation may repeat familiar content and depends on useful signals.'],
 ['Responsive, labelled controls',2,4,'Accessibility','Keep playback actions readable and usable on a small screen.','Supports the brief’s mobile task without relying on tiny icons.','Verify keyboard access and touch targets on actual devices.'],
 ['Large animated background',3,1,'Multimedia','Animate the entire player backdrop.','Could establish a mood but does not shorten the route to a playlist.','Extra rendering and motion can obstruct playback controls.'],
 ['Recommend only by gender',1,0,'Assumption','Select music using a demographic label alone.','Gender is not reliable evidence of musical taste.','Use expressed preferences and user-controlled discovery.'],
 ['Manual genre filter',2,3,'User control','Let the listener browse a chosen genre.','Offers discovery even without a rich listening history.','Genre labels overlap and can hide cross-genre music.']
 ]},
 {brand:2,title:'Confidence before checkout',client:'Help visitors compare products and make an informed purchase.',facts:['Apprentice with limited disposable income','Values reliability and avoiding waste','Lives in rural Devon, UK','Compares prices and seeks dependable delivery'],need:'The shopper wants to judge total cost, delivery and product suitability before committing.',options:[
 ['Clear total price and delivery',2,4,'Information hierarchy','Show costs and delivery information before checkout.','Supports comparison and the stated benefit sought.','Delivery estimates depend on address and stock; avoid unsupported promises.'],
 ['Readable reviews and product details',2,4,'Trust and usability','Make supporting product information easy to compare.','Helps users assess suitability and may reduce unsuitable purchases.','Reviews are not guaranteed truth; show context and use other evidence.'],
 ['Accessible comparison layout',2,4,'Responsive design','Keep key specifications readable on narrow screens.','Enables side-by-side decisions without clipped text.','Tables need a mobile alternative and screen-reader testing.'],
 ['Video above every product detail',3,1,'Multimedia','Load a large video before the price and specifications.','May demonstrate a product but delays this shopper’s priorities.','Media can increase loading time and distract from total cost.'],
 ['Hide fees until the last step',1,0,'Persuasion','Reveal additional costs only after details are entered.','Undermines the client brief’s informed purchase goal.','May cause abandonment and reduce trust.'],
 ['Save a comparison shortlist',2,3,'Interaction','Let a visitor retain items for later comparison.','Supports a considered purchase across multiple visits.','Explain how long saved information remains available.']
 ]},
 {brand:3,title:'Find somewhere nearby',client:'Help visitors quickly find a relevant local service and assess the result.',facts:['Working adult; electrician','Values independence and clear information','Currently in Exeter, UK','Searches occasionally and wants a nearby repair service'],need:'The visitor needs useful local information but must be able to correct the location.',options:[
 ['Visible, editable location',2,4,'Relevance and control','Show which area the results refer to.','Uses geography while letting the visitor correct an inaccurate assumption.','Estimated location can be wrong; provide a manual alternative.'],
 ['Clear result titles and descriptions',2,4,'Hierarchy','Make relevant result details easy to scan.','Helps the visitor judge relevance before opening a page.','A snippet does not prove the service is reliable or currently available.'],
 ['Lightweight responsive results',2,4,'Performance','Prioritise useful text and usable controls.','Reduces unnecessary content and supports quick information finding.','Measure performance; visual simplicity alone does not prove speed.'],
 ['Decorative video before results',3,1,'Multimedia','Show a brand film before local results appear.','May promote the brand but interrupts the immediate search task.','Extra waiting conflicts with finding a service quickly.'],
 ['Assume the user is in London',1,0,'Assumption','Use one city for every UK visitor.','Country does not identify the user’s city.','Allow accurate location selection.'],
 ['Distance and opening-time filters',2,3,'Navigation','Allow refinement using useful constraints.','Could improve task fit when reliable information exists.','Opening times can be stale; indicate uncertainty.']
 ]},
 {brand:4,title:'Learn it, then leave',client:'Help learners find a suitable tutorial, understand it and control what plays next.',facts:['17-year-old Level 3 IT student','Interested in repairing computers; values free learning','Lives in the UK','Watches tutorials frequently and seeks quick practical answers'],need:'The learner needs a relevant tutorial with clear steps, not an endless distraction.',options:[
 ['Clear title, duration and chapters',2,4,'Navigation and hierarchy','Help a learner judge scope and jump to a step.','Matches the benefit sought and reduces time spent locating an answer.','Chapters require accurate labels and editorial effort.'],
 ['Captions and transcript access',2,4,'Accessibility','Offer readable alternatives when available.','Supports learners who cannot hear audio or need to revisit a term.','Automatic captions can contain errors and need checking.'],
 ['Visible autoplay and history controls',2,4,'User control','Let the learner manage continuation and personalisation.','Supports a focused session and an informed choice about recommendations.','Some users may prefer automatic continuation; preserve choice.'],
 ['More autoplay with hidden controls',3,1,'Engagement','Prioritise continuous viewing over clear stopping controls.','Could increase viewing time but conflicts with the brief’s learner control.','Time spent is not proof of learning or satisfaction.'],
 ['Recommend by age alone',1,0,'Assumption','Assume all 17-year-olds want the same topic.','Age cannot establish subject interests or skill level.','Use explicit topics and appropriate user-controlled signals.'],
 ['Topic filters for search',2,3,'Discovery','Offer a direct route to a technical topic.','Useful when the learner knows what they need.','A beginner may not yet know the correct technical term.']
 ]}
];
// Performance clinic (unit content A2). Fictional symptoms on teaching pages;
// each case names one dominant factor, and what evidence would confirm it.
const DIAGNOSE = [
 {symptom:'A course page takes about nine seconds the first time you open it. Open it again straight away and it is almost instant. Nothing on the page has changed.',
  where:'Client-side',
  options:['Cache memory \u2014 the browser reused files it had already stored','Number of hits \u2014 the server was busier the first time','File types and sizes \u2014 the images shrank between visits'],
  correct:0,
  why:'A first visit downloads everything; a repeat visit reuses cached files. This is why a single timing is meaningless unless you say whether it was a first or a repeat visit.',
  confirm:'Hard-refresh to clear the cache, then time it again. If the slow number comes back, it was the cache.'},
 {symptom:'On the college wi-fi the shop page is quick. On your phone using mobile data on the bus, the same page takes far longer, and the images arrive last.',
  where:'Client-side',
  options:['Processor speed \u2014 the phone cannot render the page','Download speed \u2014 the connection limits how fast files can arrive','Browser compliance \u2014 the phone browser does not support the images'],
  correct:1,
  why:'The site sent the same files both times. What changed was the connection, so the limit is download speed at the visitor\u2019s end. This is the factor most likely to affect a real audience the designer never tests on.',
  confirm:'Throttle the connection in the browser\u2019s network tab and repeat the same task on the same device.'},
 {symptom:'The page itself appears immediately. But when you tick a filter, the results take about two seconds to update, every single time.',
  where:'Client-side',
  options:['Bandwidth availability at the host has run out','Cache memory is full so nothing can be stored','Interactivity \u2014 the script has to do work in the browser after each click'],
  correct:2,
  why:'Page loading and feature responding are different failures. Here the page has already arrived, so the delay is the interactive script running in the browser each time you act.',
  confirm:'Time the page load and the filter response separately. Report them as two numbers, not one.'},
 {symptom:'The network tab shows one hero image at 2.4 MB. Every other file on the page is under 40 KB, and the total is 2.7 MB.',
  where:'Server-side',
  options:['File types and sizes \u2014 one unoptimised image is most of the page weight','Processor speed \u2014 the device cannot decode the image','Number of hits \u2014 too many visitors requested the image'],
  correct:0,
  why:'One file is carrying almost all the weight. Compressing it, resizing it or serving a modern format would cut the page by most of its size without touching the design.',
  confirm:'Read the file size and format straight off the network tab. This is the most concrete performance evidence you can collect from outside a site.'},
 {symptom:'On results day the site is slow for everybody from about 9am. At 7am the same morning it was fine, from the same device and connection.',
  where:'Server-side',
  options:['Download speed \u2014 everyone\u2019s broadband got worse at 9am','Number of hits \u2014 traffic at a peak time is more than the server can answer quickly','Cache memory \u2014 the browser cleared itself overnight'],
  correct:1,
  why:'Same device, same connection, same files, different time. What changed was how many people were asking at once. Peak-time slowness is evidence about server load, not about the design.',
  confirm:'Repeat the identical task at a quiet time and a busy time and record both. You cannot see the server\u2019s own figures from outside.'},
 {symptom:'The booking form works in Chrome. In Safari the date picker does not open at all, so the visitor cannot finish the booking.',
  where:'Client-side',
  options:['Browser compliance \u2014 the element is not supported the same way in both browsers','Interactivity \u2014 the form has too many interactive fields','File types and sizes \u2014 the form script is too large to load'],
  correct:0,
  why:'A feature that works in one browser and fails in another is a compliance problem, not a speed problem. It also means a test in one browser is not a test of the site.',
  confirm:'Open the same page in two browsers and record the name and version of each. Note exactly what could not be completed.'},
 {symptom:'You view the page source. The product names and prices are already there in the HTML that arrived, before any script has run.',
  where:'Where the work happens',
  options:['A client-side script built the list in your browser','A server-side script built the page before it was sent','The browser cached the prices from a previous visit'],
  correct:1,
  why:'If the content is present in the HTML on arrival, the server did that work. Client-side scripts fill content in after the page loads, which you would see as the page changing.',
  confirm:'Compare view-source with what you see on screen. Content only in the rendered page, not the source, was added client-side.'},
 {symptom:'A background animation runs smoothly on a new laptop. On a three-year-old phone the same animation stutters and scrolling feels sticky, even on fast wi-fi.',
  where:'Client-side',
  options:['Bandwidth availability \u2014 the host is throttling the phone','Processor speed and memory \u2014 the device cannot render it fast enough','Number of hits \u2014 the phone is queuing behind other visitors'],
  correct:1,
  why:'The connection was fast, so the files arrived. The device still has to render every frame. A fast laptop is not evidence about the phone your audience actually uses.',
  confirm:'Run the same page on a newer and an older device on the same connection, and describe what stutters.'}
];
// Moderation desk. Extracts a Level 3 student might plausibly write, judged on a
// three-point scale and then on the reason. The verdict key is deliberately mixed
// (3 sound, 4 half-way, 3 not yet) so that always challenging scores about a third,
// and no reason option is systematically the longest.
const VERDICTS = [
 {label:'Sound', cue:'Supported as written'},
 {label:'Half-way', cue:'Right idea, something missing'},
 {label:'Not yet', cue:'The claim does not follow'}
];
const MODERATION = [
 {source:'Amazon \u00b7 P1 extract', verdict:0,
  extract:'On the Amazon UK product page (viewed 10/09/26, Chrome on a laptop) the total price and the delivery date both sit above the Add to Basket button. For a shopper comparing costs, the two figures they need are visible before they commit, which supports the client requirement that the site be user-friendly.',
  reasons:['Located observation, then the effect on the shopper\u2019s task, then a named requirement.',
           'It reports a measured performance figure with its test conditions, which is what the high-performance part of M1 asks for.',
           'It compares this page with a second website on the same principle, which is what P1 asks for.'],
  correct:0,
  why:'Nothing here is asserted. The observation is located in place and time, the effect on the visitor follows from it, and it lands on a requirement the client actually has.',
  teach:'A sound extract does not have to be long or contain a measurement. It has to be checkable, and the reasoning has to reach something the client wanted.'},
 {source:'Spotify \u00b7 M1 extract', verdict:1,
  extract:'Spotify\u2019s home page loads quickly, which makes it better for users on their phones.',
  reasons:['The speed claim needs a factor and test conditions: which connection, which device, first or repeat visit.',
           'Change \u201cbetter\u201d to \u201cthe best\u201d so that the judgement comes across much more strongly to whoever marks it.',
           'The sentence is fine exactly as it is \u2014 anyone who has used the site can tell you that it loads fast.'],
  correct:0,
  why:'The instinct is right: page speed genuinely matters to a phone user. But \u201cloads quickly\u201d is not evidence until you say quickly on what, measured how.',
  teach:'Half-way is the commonest verdict on real drafts. The point is not to delete the sentence but to say precisely what it is missing.'},
 {source:'Roblox \u00b7 P1 extract', verdict:2,
  extract:'The audience for Roblox is 13-year-old boys, so the site uses bright colours and cartoon graphics.',
  reasons:['An age and a gender cannot establish a colour preference, and the audience claim itself has no source.',
           'The colours and the cartoon graphics need describing in far more detail before the point will count for anything.',
           'It is missing the comparison with a second website that P1 requires throughout.'],
  correct:0,
  why:'Two faults, and both are in the reasoning rather than the wording. The audience is asserted with no source, and even if it were sourced, a demographic cannot explain a colour choice.',
  teach:'\u201cThe audience is X, so the design is Y\u201d is the single most common way to lose marks on P1. Demographics describe who; they do not explain why.'},
 {source:'Google + Amazon \u00b7 P1 extract', verdict:1,
  extract:'Both Google and Amazon put a search bar at the top of the page, which suits their audiences.',
  reasons:['Say what each search bar is for \u2014 the two sites search for different things \u2014 before judging suitability.',
           'Split it into two sentences, one for each site, so the reader can follow which claim belongs where.',
           'A search bar is a feature rather than a design principle, so this sentence does not belong in the comparison.'],
  correct:0,
  why:'The similarity is real and worth having. But one searches the web and one searches a catalogue, so \u201csuits their audiences\u201d is doing work the extract has not earned.',
  teach:'A shared feature is where a comparison starts, not where it finishes. Two sites can do the same thing for entirely different purposes.'},
 {source:'YouTube \u00b7 M1 extract', verdict:0,
  extract:'I opened the YouTube home page twice in Chrome on the college wi-fi. The first load took about six seconds; opening it again straight after took under two. That gap is the browser cache reusing files, so six seconds is the figure a first-time visitor would meet.',
  reasons:['Named factor, stated conditions, and it says which of the two numbers represents the real audience.',
           'Two timings on one device and one connection cannot support any claim, so this needs removing.',
           'It has to give the file sizes as well, otherwise a loading observation does not count as evidence.'],
  correct:0,
  why:'This is what a performance observation looks like when it is done properly: a factor named, the conditions stated, and an interpretation that says which number matters and why.',
  teach:'You do not need professional tools to evidence performance. You need conditions, and you need to know which of your numbers describes your audience.'},
 {source:'Roblox \u00b7 D1 extract', verdict:2,
  extract:'Roblox uses an unconventional layout, which shows creativity and therefore meets the client\u2019s requirements.',
  reasons:['Creativity is not automatically a benefit \u2014 say whether the unusual choice still lets the audience finish the task.',
           'The fault is the word \u201cunconventional\u201d; describe what the layout actually does rather than labelling it that way.',
           'Creativity belongs to learning aim B, where the designs are actually produced, so it has no place in this report.'],
  correct:0,
  why:'\u201cTherefore\u201d is the broken link. The specification puts creativity alongside usability, not above it, so an unconventional layout can just as easily cost the client as serve them.',
  teach:'Creativity is credited when you cost it as well as praise it. An original choice the visitor pays for is not a requirement met.'},
 {source:'Greenway College \u00b7 M1 extract', verdict:1,
  extract:'The page has a clear title and a meta description, so it will appear near the top of the search results.',
  reasons:['Both are genuine SEO factors, but ranking rests on more than two \u2014 soften the claim or say what would confirm it.',
           'A meta description has no measurable effect on anything, so the whole of this sentence should be deleted from the report.',
           'Search engine optimisation is not one of the design principles, so it cannot be used as evidence here.'],
  correct:0,
  why:'The factors are correctly identified \u2014 indexing and meta tags are in the unit content. What overreaches is \u201cnear the top\u201d, which no two on-page factors can promise.',
  teach:'Naming the right factor and then overclaiming its effect is a distinct fault from naming the wrong factor. Keep the factor; scale the claim to it.'},
 {source:'YouTube \u00b7 D1 extract', verdict:0,
  extract:'Autoplay keeps YouTube viewers watching, which serves the business, but for a student using it to learn one skill it works against finishing and leaving. On balance I judge the visible autoplay toggle the more important feature, because it lets the site serve both without having to choose.',
  reasons:['Both sides named, weighed against each other, and a judgement given with its reason. That is evaluation.',
           'It is the writer\u2019s own opinion, and an opinion cannot count as evaluation however carefully it is worded.',
           'A judgement like this needs a measured figure behind it before it can be made at all.'],
  correct:0,
  why:'A judgement with a stated reason is exactly what D1 asks for. Note that the user goal and the business goal are allowed to conflict here rather than being smoothed over.',
  teach:'Evaluation is not the absence of an opinion. It is an opinion you have made checkable by showing what you weighed to reach it.'},
 {source:'Amazon + Google \u00b7 D1 extract', verdict:2,
  extract:'Amazon is the better website because it has more features than Google.',
  reasons:['Number of features is not a criterion, and the two sites have different purposes \u2014 judge each against its own.',
           'Count up the features on each of the two sites so that the claim has some actual numbers properly standing behind it.',
           'Name the specific features on both sides, and then the comparison will hold up perfectly well.'],
  correct:0,
  why:'Counting would not rescue this. A search engine having fewer features than a shop is a design decision, not a defeat, so \u201cbetter\u201d has nothing to attach to.',
  teach:'Before you can call one site better, you need a shared standard. Different purposes usually mean there is no single winner to find.'},
 {source:'Amazon \u00b7 P1 extract', verdict:1,
  extract:'A shopper in rural Devon may have a slower connection, so Amazon\u2019s lighter product pages help them.',
  reasons:['The slower connection is an assumption, not an observation \u2014 label it, and say how you would check the page weight.',
           'Rural areas genuinely do have much slower connections, so the claim stands exactly as written and needs nothing adding.',
           'Where a shopper happens to live cannot appear in a website design report, so this should come out.'],
  correct:0,
  why:'Both halves are plausible and neither is evidenced. \u201cMay have\u201d is honest about the connection, but the pages being lighter is asserted \u2014 and that half is the one you can actually check.',
  teach:'Geographic location is legitimate evidence about where someone is. It is not evidence about their connection speed, their device or their skill.'}
];

const WRITING = [
 ['compare','A.P1 \u00b7 Compare','Compare the principles of website design used in both sites. Name who each site is aimed at and what it is intended to do, then explain one similarity and one difference in how they apply at least two design principles.','Both sites are aimed at\u2026 so both\u2026 The difference is in\u2026: site A\u2026 whereas site B\u2026 For this audience and purpose that suits\u2026 because\u2026'],
 ['analyse','A.M1 \u00b7 Analyse','For each site, explain how a design principle is used to produce a creative, high-performance site that meets a client requirement. Give the chain of reasoning: the choice, what it does to the visitor\u2019s task, what it does for the client. Name a performance factor and say whether you measured it or would need to test it.','The choice to\u2026 means the visitor\u2026 because\u2026 This serves the client requirement that the site be\u2026 Creatively it\u2026 On performance, [factor] \u2014 I observed\u2026 on [device/browser/connection]. The cost of this choice is\u2026'],
 ['evaluate','A.D1 \u00b7 Evaluate','Identify a requirement of each site and why it matters to the visitor. Weigh strengths against limitations, and discuss the impact on the organisation \u2014 the positive and the negative outcomes. Reach a justified judgement, then prioritise one improvement and say how you would check it worked.','The requirement that\u2026 matters to the visitor because\u2026 and to the organisation because\u2026 It works well where\u2026 but\u2026 Set against that\u2026 On balance I judge\u2026 because\u2026 The improvement I would prioritise is\u2026 and I would check it by\u2026']
];

// Valid audience-to-feature links for the bounded matching activity. Accessibility
// can benefit any segment; these links do not infer a disability from a profile.
const CONNECTIONS = [
 {links:{0:[3],1:[1],2:[0,1,2,3],5:[3]},outcomes:['Help visitors discover suitable experiences and understand avatar choices.','Keep visitors watching a trailer before they can make a choice.','Increase the number of products added to a shopping basket.']},
 {links:{0:[3],1:[1],2:[0,1,2,3],5:[1]},outcomes:['Help returning listeners reach familiar audio and discover something new.','Make every listener use the same playlist regardless of taste.','Help shoppers compare delivery charges before checkout.']},
 {links:{0:[0,2,3],1:[1,3],2:[0,1,2,3],5:[3]},outcomes:['Help shoppers compare products and make an informed purchase.','Keep product costs hidden until shoppers have entered their details.','Help players choose an avatar for a new experience.']},
 {links:{0:[2],1:[1,3],2:[0,1,2,3],5:[2,3]},outcomes:['Help visitors find and assess a relevant local service quickly.','Make all visitors search within London, wherever they are.','Increase the time spent browsing music playlists.']},
 {links:{0:[3],1:[0,1,2,3],2:[1,3],5:[1]},outcomes:['Help learners find and understand a suitable tutorial with control over playback.','Keep learners watching automatically even when their task is finished.','Help shoppers compare product delivery options.']}
];

// Concise cards for the explanation builder. Indices match each brief's options.
const BENEFITS = [
 ['Find experiences through clear categories.','See how an avatar choice expresses their style.','Read and operate the main choices more easily.','Watch an atmosphere-setting trailer before making choices.','See colours chosen from their age alone.','Recover from an unsuccessful search.'],
 ['Reach a saved playlist in fewer steps.','Discover audio with more control over suggestions.','Use labelled playback controls on a small screen.','Watch a moving background while listening.','Receive music selected from gender alone.','Browse a music genre they choose.'],
 ['Compare the full cost and delivery before committing.','Assess whether a product is suitable using reviews and details.','Read and compare specifications on a narrow screen.','Watch a product video before seeing the price.','Enter their details before finding out all the fees.','Return to a shortlist for a considered comparison.'],
 ['Correct the area used for local results.','Scan result details before opening a page.','Reach useful results without unnecessary page content.','Watch a brand film before finding a service.','See London results regardless of their actual city.','Refine local results by distance and opening time.'],
 ['Judge a tutorial’s scope and jump to a specific step.','Read the content when audio is unavailable or unclear.','Control what plays next and how history is used.','Keep watching automatically after their task is finished.','See topics selected from age alone.','Find a tutorial on a topic they already know.']
];
