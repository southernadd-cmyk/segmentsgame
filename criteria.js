'use strict';
/* Unit 6 learning aim A content and the P1/M1/D1 reasoning coach.
   Content headings below are taken from the Pearson BTEC National IT (2016)
   specification, Unit 6, learning aim A (A1 and A2) and from the "essential
   information for assessment decisions" guidance for learning aim A.
   Wording is paraphrased for students; the spec remains the authority.
   Edit this file to change what the coach looks for. */

/* ---------- A1: principles of website design ----------
   spec list: usability, white space, site layout, accessibility, spacing,
   navigation, typography, alignment, clarity, consistency/intuitiveness,
   accuracy, content, media, simplicity — grouped here into teachable
   categories. `terms` are the words the coach recognises in student writing. */
const PRINCIPLES = [
 {name:'Navigation', spec:'navigation, intuitiveness',
  look:'Menus, links, search, breadcrumbs, how many clicks to the main task.',
  ask:'How does a first-time visitor reach the thing this site exists to do?',
  terms:['navigation','nav bar','navbar','menu','breadcrumb','site map','sitemap','hyperlink','internal link','search bar','dropdown','drop-down','hamburger']},
 {name:'Site layout and alignment', spec:'site layout, alignment, spacing',
  look:'Grid, columns, what sits above the fold, whether edges line up.',
  ask:'What has the designer decided you should see first, and why that?',
  terms:['layout','grid','column','above the fold','alignment','aligned','spacing','margin','padding','hero','banner','structure of the page']},
 {name:'White space and simplicity', spec:'white space, simplicity',
  look:'Empty space around content; how much competes for attention at once.',
  ask:'Is the space doing work, or is the page just busy?',
  terms:['white space','whitespace','simplicity','simple','uncluttered','cluttered','busy','breathing room','minimal','density','dense']},
 {name:'Typography', spec:'typography, clarity',
  look:'Typeface, size, weight, line length, heading levels.',
  ask:'Can the intended audience read this at arm’s length on a phone?',
  terms:['typography','typeface','font','text size','point size','readability','readable','legib','line length','line height','heading level','sans-serif','serif','bold text','capital']},
 {name:'Media and objects', spec:'media and objects — position, colour, contrast, size, appropriateness',
  look:'Images, video, icons: where they sit, how big, what colour, whether they suit the audience.',
  ask:'Is this image carrying information, or filling a hole?',
  terms:['image','photograph','photo','graphic','icon','video','animation','audio','multimedia','thumbnail','carousel','autoplay','colour','color','contrast','palette','colour scheme']},
 {name:'Consistency', spec:'consistency/intuitiveness',
  look:'Does the same thing look and behave the same way on every page?',
  ask:'What has the visitor learned on page one that still works on page four?',
  terms:['consistency','consistent','inconsistent','house style','branding','brand identity','logo','template','style guide','uniform','same pattern','repeat']},
 {name:'Usability', spec:'usability',
  look:'Can a real person finish the task without help, mistakes or backtracking.',
  ask:'Watch someone try it. Where do they hesitate?',
  terms:['usability','usable','user-friendly','user friendly','ease of use','easy to use','intuitive','confus','error message','validation','dead end','friction','number of clicks','steps to']},
 {name:'Accessibility', spec:'accessibility',
  look:'Alt text, keyboard use, contrast ratio, captions, zoom, screen readers, W3C/WCAG.',
  ask:'Who is shut out by this choice, and what would let them in?',
  terms:['accessib','alt text','alternative text','alt tag','screen reader','keyboard','wcag','w3c','caption','subtitle','transcript','zoom','text-to-speech','colour blind','color blind','contrast ratio','aria','tab order','focus state','skip link']},
 {name:'Content accuracy', spec:'accuracy, content',
  look:'Is information correct, current, complete and in the audience’s language.',
  ask:'When was this last updated, and how would a visitor know?',
  terms:['accuracy','accurate','inaccurate','out of date','up to date','last updated','jargon','plain english','reading age','tone of voice','wording','description','spelling','information hierarchy','detail']},
 {name:'Creativity and innovation', spec:'creativity and innovation — unconventional layouts, white space, ‘outside of the box’ thinking, golden ratio',
  look:'Choices that break the expected pattern on purpose.',
  ask:'Is this original and useful, or original at the visitor’s expense?',
  terms:['creativ','innovat','original','unconventional','outside of the box','outside the box','golden ratio','distinctive','striking','imaginative','stands out','unexpected','full-bleed','full bleed','asymmetric']},
 {name:'Search engine optimisation', spec:'SEO — indexing (meta tags), keywords, importance of updates, limiting crawling',
  look:'Page titles, meta description, headings, keywords, robots.txt, how often the site changes.',
  ask:'If nobody can find this page, does the rest of the design matter?',
  terms:['search engine optimis','search engine optimiz','seo','meta tag','meta description','meta title','page title','keyword','indexing','indexed','crawl','robots.txt','sitemap.xml','ranking','search result']}
];

/* ---------- A1: what a client may require of the site ----------
   spec: requirements, e.g. user-friendly, consistent, navigational,
   customisable, flexible. D1 asks learners to identify the requirements of
   the website and why they matter to the user. */
const SITE_REQS = [
 {name:'User-friendly', ask:'Can the intended audience finish the task first time?'},
 {name:'Consistent', ask:'Does the site behave the same way throughout?'},
 {name:'Navigational', ask:'Can a visitor always tell where they are and how to get back?'},
 {name:'Customisable', ask:'Can a visitor change anything to suit themselves — account, settings, saved items?'},
 {name:'Flexible', ask:'Does it still work on a different device, browser or connection?'},
 {name:'Secure', ask:'Login, payment, personal data: what is protected, and why does the visitor care?'}
];
const REQ_TERMS = ['requirement','user-friendly','user friendly','consistent','navigational','customisable','customizable','flexible','secure login','security','secure','client brief','the client','the business','the organisation','the organization','the college','the company','stakeholder','must be able to','needs to be'];

/* ---------- A2: factors affecting website performance ----------
   spec: where scripts run (server-side / client-side); browser compliance;
   server-side factors e.g. bandwidth availability, number of hits, file types;
   client-side factors e.g. upload and download speeds, browser, cache memory,
   processor speed, interactivity. M1 and D1 both require "high-performance". */
const PERF_FACTORS = [
 {name:'Where the script runs', side:'Both',
  what:'Server-side scripts run on the web server before the page arrives. Client-side scripts (JavaScript) run in the visitor’s browser.',
  check:'View source or open the network tab. Does the page arrive complete, or does it fill in after loading?',
  write:'Name which side does the work, and what that costs the visitor or the server.',
  terms:['server-side','server side','client-side','client side','where the script','javascript run','runs in the browser','runs on the server','php','node']},
 {name:'Browser compliance', side:'Client',
  what:'Different browsers support different elements. A feature that works in one may not work in another.',
  check:'Open the same page in two browsers and compare. Note the browser and version.',
  write:'Say which browser and version you used. A test in one browser is not a test of all.',
  terms:['browser compliance','browser support','browser version','chrome','firefox','safari','microsoft edge',' edge','compatib','cross-browser','cross browser','does not work in']},
 {name:'Download and upload speed', side:'Client',
  what:'The visitor’s connection speed limits how fast anything can arrive, whatever the site does.',
  check:'Compare the same page on college wi-fi and on mobile data. Time the same task on both.',
  write:'Record the connection you used. Never state a speed you did not measure.',
  terms:['download speed','upload speed','connection speed','bandwidth at','broadband','wi-fi','wifi','mobile data','4g','5g','slow connection','mbps','megabits','throttl']},
 {name:'Cache memory', side:'Client',
  what:'The browser stores files from a first visit and reuses them, so a repeat visit is usually faster.',
  check:'Load the page, then load it again. Then hard-refresh to clear the cache and compare.',
  write:'Say whether your timing was a first visit or a repeat visit. They are different numbers.',
  terms:['cache','cached','caching','first visit','repeat visit','second visit','hard refresh','clear the browser']},
 {name:'Processor speed and memory', side:'Client',
  what:'The visitor’s device has to render the page and run its scripts. An older phone does that more slowly.',
  check:'Try the same page on a newer and an older device. Note what stutters.',
  write:'Name the device. A fast laptop is not evidence about your audience’s phone.',
  terms:['processor','cpu','ram',' memory','older device','low-end','older phone','device spec','stutter','lag','janky','frame rate']},
 {name:'Interactivity', side:'Client',
  what:'Interactive features — filters, players, live search, maps — cost the browser work every time they run.',
  check:'Use the interactive feature and note the delay between your action and the response.',
  write:'Distinguish the page loading from the feature responding. They fail differently.',
  terms:['interactiv','live search','autocomplete','filter','infinite scroll','lazy load','lazy-load','responds','response time','delay after','click to response']},
 {name:'Bandwidth availability', side:'Server',
  what:'The host has a finite amount of data it can serve. Run out and everyone slows down.',
  check:'You cannot see this from outside. Say so, and say what evidence you would need.',
  write:'Treat this as an inference unless you have the host’s figures.',
  terms:['bandwidth availab','server bandwidth','hosting bandwidth','data allowance','server capacity','shared hosting','dedicated server','server load']},
 {name:'Number of hits', side:'Server',
  what:'Traffic volume, especially at peak times, affects how quickly the server can answer.',
  check:'Compare the same page at a quiet time and a busy time. Note both times.',
  write:'Peak-time slowness is evidence about load, not about the design.',
  terms:['number of hits',' hits','traffic','concurrent','peak time','busy period','visitors at once','load spike','black friday','results day']},
 {name:'File types and sizes', side:'Server',
  what:'What the server sends and how big it is: image format, compression, video, fonts, libraries.',
  check:'Open the network tab. Read the size of the largest files and the total page weight.',
  write:'Give the file, its format and its size. This is the most concrete performance evidence you can get.',
  terms:['file type','file size','file format','kilobyte',' kb',' mb','megabyte','page weight','total size','compress','gzip','brotli','webp','jpeg','jpg','png','svg','minif','http request','number of requests','image optimis','image optimiz','uncompressed','resize','resolution of the image']}
];

/* ---------- reasoning moves the coach looks for ---------- */
const CONNECT = {
 similar:['both','similarly','likewise','in the same way','share','the same','as with','equally','alike','each site','each of the sites','neither'],
 differ:['whereas','however','by contrast','in contrast','unlike','differs','different','while ','on the other hand','but ','instead','the opposite','takes the opposite','less ','more '],
 causal:['because','since ','this means','which means','means that','as a result','therefore','so that','which causes','causes','leads to','resulting in','consequently','forces','prevents','allows','which is why','at the expense','working against','ends up',/,\s*so\b/,/\bso (the|a|an|on|it|they|this|visitors|users|the visitor)\b/],
 effect:['easier','harder','faster','slower','quicker','fewer step','more step','fewer click','more click','without help','cannot find','can find','struggl','give up','gives up','abandon','complete the task','finish','has to wait','loads on','reach the','only way','helps','hinders','saves','costs the visitor','watches','before reading','more likely','less likely'],
 audience:['audience','intended for','aimed at','target','visitor','user','shopper','listener','learner','viewer','customer','prospective','student','segment','age profile','demographic','psychographic','geographic','behavioural','gamer','buyer','social networker'],
 purpose:['purpose','intended to','designed to','exists to','the aim','the goal','in order to','so visitors can','the site is for','content-based','product-based','service-based','e-commerce','ecommerce','informational','to sell','to inform','serves'],
 strength:['strength','effective','works well','succeeds','advantage','does this well','benefit','better meets','handles this','serves','supports','helps','suits','matters because','gains','improves','allows','keeps the','stronger','does cut','does gather','does collect'],
 limit:['limitation','weakness','drawback','however','but ','fails','does not','doesn’t','risk','trade-off','tradeoff','at the cost of','the cost is','costs','downside','problem with','falls short','cannot','spends','give up','abandon','soft on'],
 weigh:['on balance','overall','outweigh','more important','less important','although','despite','even though','set against','compared with','stronger than','on the whole','taken together','rather than','the trade runs'],
 judge:['i judge','in my judgement','in my judgment','i conclude','the more effective','the most effective','better meets','best meets','more successful','less successful','my judgement','my judgment','i would rate','the stronger site','the weaker','defensible','justified','suits that purpose better',/\bmeets\b[^.]{0,40}\bbetter\b/,/\bi judge it\b/],
 improve:['priorit','most important improvement','most valuable','the single','first i would','the biggest','i would change','i would add','i would remove','recommend','the improvement','the improvement i would'],
 test:['test','measure','measured','survey','usability test','stopwatch','timed','timing','network tab','devtools','developer tools','lighthouse','before and after','completion rate','comparing completion','call volume','ask ','sample of','trial'],
 orgPlus:['sales','revenue','enquir','applicat','sign-up','signup','conversion','retention','returning','loyalty','reputation','reach','saves staff','reduces cost','more likely to buy','growth','win them','cut follow-up','fewer calls'],
 orgMinus:['abandon','lost','loses','drop off','drop-off','bounce','complaint','refund','cost to the','cost onto','staff time','support call','phones instead','phone instead','damage','risk','negative outcome','harm','busiest point'],
 gap:['would need','i cannot','i could not','not measured','cannot prove','no evidence','would have to ask','inference','assumption','i am assuming','to confirm','do not have','would settle it','from the site alone']
};

const hit = (text, terms) => terms.some(t => t instanceof RegExp
 ? t.test(text)
 : new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(text));
const groupsHit = (text, groups) => groups.filter(g => hit(text, g.terms)).map(g => g.name);
const principlesUsed = text => groupsHit(text, PRINCIPLES);
const perfUsed = text => groupsHit(text, PERF_FACTORS);
const vocabCount = text => principlesUsed(text).length + perfUsed(text).length;

/* Each move: what the criterion needs, and a hint if it is missing.
   `test(t, ctx)` — t is the lower-cased draft; ctx.sites is the two site names. */
const MOVES = {
 compare:{
  code:'A.P1', verb:'Compare',
  spec:'Compare the principles of website design used in two websites, including their suitability for the intended audience and intended purpose.',
  standard:'A detailed comparison of two websites, explaining who each site is aimed at and its purpose, and comparing how each applies design principles.',
  moves:[
   {id:'pair', label:'Both websites named in your comparison',
    hint:'Name both sites. If a paragraph only mentions one, you are describing, not comparing.',
    test:(t,c)=>c.sites.every(s=>s && t.includes(s.toLowerCase()))},
   {id:'principles', label:'At least two design principles named',
    hint:'P1 says principles, plural. Pick two or three and use their proper names — navigation, layout, typography, accessibility — not "the design".',
    test:t=>principlesUsed(t).length>=2},
   {id:'similar', label:'A similarity between the two sites',
    hint:'Say what both sites do the same way, and why that suits both audiences.',
    test:t=>hit(t,CONNECT.similar)},
   {id:'differ', label:'A difference between the two sites',
    hint:'Use a contrast: whereas, however, unlike. A list of features side by side is not yet a comparison.',
    test:t=>hit(t,CONNECT.differ)},
   {id:'audience', label:'Who each site is aimed at',
    hint:'State the intended audience for each site. This is what makes it a judgement of suitability rather than taste.',
    test:t=>hit(t,CONNECT.audience)},
   {id:'purpose', label:'What each site is for',
    hint:'Name each site’s intended purpose — to inform, to sell, to entertain, to build a community.',
    test:t=>hit(t,CONNECT.purpose)}
  ]},
 analyse:{
  code:'A.M1', verb:'Analyse',
  spec:'Analyse how the principles of website design are used to produce creative, high-performance websites that meet client requirements.',
  standard:'A detailed analysis of how user needs and design principles affect the site, as a balanced discussion supported by reasoned examples.',
  moves:[
   {id:'causal', label:'A chain of reasoning, not an assertion',
    hint:'Analysis is the "because". Design choice → what it does to the visitor → what that does for the client.',
    test:t=>hit(t,CONNECT.causal)},
   {id:'need', label:'A design choice tied to a user need or task',
    hint:'Say what the visitor was trying to do and whether the choice made that easier or harder.',
    test:t=>hit(t,CONNECT.audience)&&hit(t,CONNECT.effect)},
   {id:'creative', label:'Creativity or innovation addressed',
    hint:'M1 says creative. The spec means unconventional layouts, use of white space, outside-the-box thinking, the golden ratio — and whether the originality earns its cost.',
    test:t=>hit(t,PRINCIPLES.find(p=>p.name==='Creativity and innovation').terms)&&hit(t,CONNECT.causal)},
   {id:'performance', label:'A performance factor named',
    hint:'M1 says high-performance. Name a real factor: file size, compression, cache, download speed, browser, number of hits, where the script runs.',
    test:t=>perfUsed(t).length>=1},
   {id:'client', label:'A client requirement named',
    hint:'Say which client requirement the choice serves — user-friendly, consistent, navigational, customisable, flexible, secure.',
    test:t=>hit(t,REQ_TERMS)},
   {id:'balance', label:'Balanced — a benefit and a cost',
    hint:'The spec asks for a balanced discussion. Every design choice buys something and spends something. Name both.',
    test:t=>hit(t,CONNECT.strength)&&hit(t,CONNECT.limit)}
  ]},
 evaluate:{
  code:'A.D1', verb:'Evaluate',
  spec:'Evaluate how the principles of website design are used to produce creative, high-performance websites that meet client requirements.',
  standard:'A detailed, balanced evaluative report: identify the requirements of the websites and why they matter to the user, and discuss the overall impact on the organisation including positive and negative outcomes, in connected chains of reasoning.',
  moves:[
   {id:'requirement', label:'A specific site requirement, and why the user cares',
    hint:'The spec’s own example is a secure login. Pick one requirement — secure, navigational, customisable — and say what it is worth to the visitor.',
    test:t=>hit(t,REQ_TERMS)},
   {id:'orgPlus', label:'A positive outcome for the organisation',
    hint:'What does the organisation gain — enquiries, sales, returning visitors, reputation, staff time saved?',
    test:t=>hit(t,CONNECT.orgPlus)},
   {id:'orgMinus', label:'A negative outcome for the organisation',
    hint:'D1 asks for both. What does this design cost the organisation — abandoned tasks, support calls, lost visitors, reputation?',
    test:t=>hit(t,CONNECT.orgMinus)},
   {id:'weigh', label:'The two sides weighed against each other',
    hint:'Use weighing language: on balance, although, this outweighs. Listing good points then bad points is not yet evaluation.',
    test:t=>hit(t,CONNECT.weigh)},
   {id:'judge', label:'A judgement you have justified',
    hint:'Commit to a conclusion about how well each site meets its requirements, and make the reason the evidence — not your preference.',
    test:t=>hit(t,CONNECT.judge)},
   {id:'improve', label:'One prioritised improvement, and how you would check it',
    hint:'Say which improvement matters most and why it comes first, then how you would test whether it worked.',
    test:t=>hit(t,CONNECT.improve)&&hit(t,CONNECT.test)},
   {id:'carried', label:'Creativity or performance judged, not just usability',
    hint:'D1 repeats \u201ccreative, high-performance\u201d. Bring at least one of them into the judgement \u2014 name a performance factor, or say whether an original choice earns what it costs.',
    test:t=>perfUsed(t).length>=1||hit(t,PRINCIPLES.find(p=>p.name==='Creativity and innovation').terms)}
  ]}
};

/* Investigation notes get a lighter check: is this evidence or is it a guess? */
const EVIDENCE_MOVES = {
 audience:[
  {id:'who', label:'A defined audience, not "everyone"', hint:'Use who / why / where / how to pin one segment down.', test:t=>hit(t,CONNECT.audience)},
  {id:'purpose', label:'The site’s purpose stated', hint:'Content-based, product or service-based? What does the site exist to do?', test:t=>hit(t,CONNECT.purpose)},
  {id:'labelled', label:'Assumptions labelled as assumptions', hint:'Write "I am assuming" where you are inferring. Unlabelled guesses cost marks at every grade.', test:t=>hit(t,CONNECT.gap)}
 ],
 evidence:[
  {id:'principle', label:'A design principle named by its proper name', hint:'Navigation, layout, white space, typography, media, consistency, usability, accessibility, accuracy, creativity, SEO.', test:t=>principlesUsed(t).length>=1},
  {id:'located', label:'Where you saw it — URL, date, device', hint:'Live sites change. Without the URL and date your observation cannot be checked.', test:t=>/https?:\/\/|\.co\.uk|\.com|\d{1,2}[\/.]\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(t)},
  {id:'specific', label:'Something specific enough to disagree with', hint:'"Good navigation" is not an observation. "Six top-level menu items, course search first" is.', test:t=>/\d/.test(t)}
 ],
 performance:[
  {id:'factor', label:'A performance factor from the spec', hint:'Client-side: download speed, browser, cache, processor, interactivity. Server-side: bandwidth, number of hits, file types.', test:t=>perfUsed(t).length>=1},
  {id:'conditions', label:'The conditions you tested under', hint:'Device, browser, connection, first visit or repeat. A number without conditions is not evidence.', test:t=>hit(t,PERF_FACTORS[1].terms)||hit(t,PERF_FACTORS[2].terms)||hit(t,PERF_FACTORS[3].terms)||hit(t,PERF_FACTORS[4].terms)},
  {id:'access', label:'An accessibility check', hint:'Try the keyboard only, check contrast, look for alt text or captions, zoom to 200%.', test:t=>hit(t,PRINCIPLES.find(p=>p.name==='Accessibility').terms)},
  {id:'honest', label:'What you could not test', hint:'Server bandwidth and traffic cannot be seen from outside. Say so, and say what evidence you would need.', test:t=>hit(t,CONNECT.gap)}
 ]
};

/* ---------- worked ladder: the same task at three levels ----------
   A neutral fictional pair, so these cannot be pasted into an answer about
   the real sites students investigate. Two similar sites on purpose: the
   spec's own pass-standard example is two comparable commerce sites. */
const EXEMPLARS = {
 compare:{
  pair:'Two fictional college websites: Greenway College and Ridgeway College.',
  drafts:[
   {level:'Not there yet', why:'This describes each site in turn. Description is not comparison, whatever its length.',
    text:'Greenway College’s website has a blue header with a search bar at the top. There are pictures of students on the home page and the menu has six links. Ridgeway College’s website is red and has a menu down the side. It also has pictures of students and a search bar.',
    notes:['Each site gets its own sentences; the two are never held against each other.','No design principle is named — "has a menu" is a feature, navigation is the principle.','No audience and no purpose, so there is nothing to judge suitability against.']},
   {level:'Meets the criterion', why:'Two principles, a similarity and a difference, and the difference is judged against a stated audience and purpose.',
    text:'Both sites are aimed at 15–18 year olds choosing a course, so both put a course search in the top navigation. The difference is site layout: Greenway groups every course by subject area on one page, whereas Ridgeway spreads them across five faculty pages reached from a side menu. For a visitor who does not yet know the subject name, Greenway’s grouping suits that purpose better.',
    notes:['Both sites appear in the same sentence, so the comparison is genuinely side by side.','Two principles named properly: navigation and site layout.','Audience and purpose are stated, which turns "better" into a reasoned claim rather than a preference.']},
   {level:'Pushes further', why:'A third principle, and each site’s approach is judged against its own purpose instead of one being crowned.',
    text:'Both sites serve prospective students, so both lead with course search — but they apply consistency differently. Greenway repeats one course-card pattern on every page, so a visitor learns it once and reuses it. Ridgeway restyles each faculty page, which serves its purpose of giving faculties a distinct identity but spends that learned pattern. On white space the trade runs the other way: Greenway is denser, fitting more courses on screen at the cost of breathing room.',
    notes:['Three principles, and each is compared rather than listed.','Neither site is simply "better" — each choice is weighed against that site’s own purpose. This balance is what M1 and D1 will need.','Technical vocabulary is used accurately and without padding.']}
  ]},
 analyse:{
  pair:'The same two fictional college sites.',
  drafts:[
   {level:'Not there yet', why:'Three assertions with no reasoning, no evidence and no named factor.',
    text:'Greenway uses a lot of images which makes it look creative. Ridgeway is fast. Both sites meet the client requirements because students can find the courses they want.',
    notes:['"Creative" and "fast" are claims, not analysis. Nothing explains how or on what evidence.','"Fast" names no performance factor and no test conditions.','"Client requirements" is asserted without naming a single requirement.']},
   {level:'Meets the criterion', why:'A chain of reasoning from a measured performance factor through the user’s situation to a named client requirement — and it admits the cost.',
    text:'Greenway compresses its course photographs to roughly 80 KB each. Because total page weight stays low, the page finishes loading on mobile data, which helps prospective students who browse between lessons on a phone. That supports the client requirement that the site be flexible across devices. The plain course-card layout is a deliberately unshowy creative choice, so nothing competes with the course titles a visitor is scanning for. The cost is image quality: at that compression the photographs look soft on a large screen.',
    notes:['File size and download speed are named A2 factors, with an actual figure attached.','The reasoning connects: compression → page weight → loads on mobile data → suits this audience → meets a named requirement.','Creativity is treated as a decision with a reason, not as a compliment.','The last sentence supplies the balance the merit standard asks for.']},
   {level:'Pushes further', why:'It analyses a conflict between two principles the client asked for at the same time.',
    text:'Ridgeway takes the opposite approach: full-bleed, uncompressed hero images on every faculty page. Creatively this is the stronger decision — the unconventional layout and generous white space make each faculty feel like its own place. But the same choice raises both the number of requests and the size of each file the browser must download, so on a slow connection the visitor watches the layout shift as images arrive. The principle serving creativity is working against the performance the client also asked for.',
    notes:['Two performance factors, and creativity handled in the spec’s own terms.','The analysis is about a trade-off between principles, which is harder and more valuable than praising one.','It shows how a design principle affects development, not just appearance.']}
  ]},
 evaluate:{
  pair:'The same two fictional college sites.',
  drafts:[
   {level:'Not there yet', why:'A preference dressed as a conclusion.',
    text:'Overall I think Greenway is the best website because it looks nicer and I found the courses quickly. Ridgeway could improve its colours and make the site easier to use.',
    notes:['"Looks nicer" is taste. Evaluation needs criteria the reader can check.','No site requirement is named, and no impact on either organisation.','The improvement is neither prioritised nor testable.']},
   {level:'Meets the criterion', why:'A named requirement explained from both sides, weighed, judged, then one improvement with a stated test.',
    text:'Both sites need a working enquiry form. For the college that requirement is what turns a visitor into an application; for the visitor it is the only way to get a reply without phoning. Greenway’s is three fields on one screen, validated client-side, so a mistyped email is caught in the browser instead of after a round trip to the server; Ridgeway’s is eleven fields across two screens, which risks abandoned enquiries at exactly the point the college is trying to win them. On balance Greenway meets that requirement better, although Ridgeway does gather more useful data for its admissions team. The improvement I would prioritise is cutting Ridgeway’s form to the three fields admissions actually acts on, then comparing completion rates for a fortnight before and after.',
    notes:['The requirement is explained from both sides — what it is worth to the visitor and what it is worth to the college. That double view is what D1 asks for.','“On balance… although…” weighs the two sides instead of listing them.','Where the validation runs is a performance point, not just a usability one — D1 repeats “high-performance” and expects it carried into the judgement.','The improvement is prioritised, and it comes with a method for finding out whether it worked.']},
   {level:'Pushes further', why:'Positive and negative organisational outcomes, and a judgement honest about the evidence it lacks.',
    text:'Ridgeway’s eleven-field form fails the requirement that the site be user-friendly, and the negative outcome is not only lost enquiries: every abandoned form is a prospective student who phones instead, moving cost onto a small admissions team at the busiest point of the year. Set against that, the longer form does cut follow-up calls for the enquiries that do complete, so the design is defensible if Ridgeway’s real constraint is staff time rather than enquiry volume. The same pattern runs through the rest of the site: the uncompressed hero images are an unconventional, genuinely creative choice that the visitor pays for in download speed. On the evidence available I judge Ridgeway the weaker site because the cost falls on the visitor first — though its own enquiry and call figures would settle it. The improvement I would prioritise is a two-stage form, three fields to enquire and the rest after a reply, measured by comparing completion and call volumes across one intake.',
    notes:['A cost and a gain for the organisation, which is the distinction-standard requirement.','The chain of reasoning runs design → user behaviour → organisational cost, and holds together across the whole paragraph.','Creativity and performance are judged rather than praised — the unconventional choice is credited and costed in the same sentence.','Naming the missing evidence is a strength here, not a hedge — it marks the limit of what the site alone can prove.']}
  ]}
};

/* ---------- public helpers ---------- */
function checkMoves(kind, text, sites){
 const t = String(text || '').toLowerCase(), ctx = {sites: sites || ['','']};
 return MOVES[kind].moves.map(m => ({...m, met: t.length > 0 && !!m.test(t, ctx)}));
}
function checkEvidence(kind, text){
 const t = String(text || '').toLowerCase();
 return EVIDENCE_MOVES[kind].map(m => ({...m, met: t.length > 0 && !!m.test(t)}));
}
function movesMet(kind, text, sites){ return checkMoves(kind, text, sites).filter(m => m.met).length; }
