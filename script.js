/* ============================================================
   BehaviorChain v2 — script.js  (FIXED BUILD)
   ============================================================ */
"use strict";

// ============================================================
// 1. CONSTANTS
// ============================================================
const LS = {
  events:"bc_events_v2", user:"bc_user_v2", wallet:"bc_wallet_v2",
  txs:"bc_transactions_v2", minted:"bc_minted_v2", chatData:"bc_chatdata_v2",
};

let currentUser   = null;
let walletAddress = null;
let chatState     = { qi:0, answers:[], dims:{ decision:0, emotion:0, social:0, cognitive:0, stress:0, growth:0 } };

// ============================================================
// 2. ARTICLES DATA
// ============================================================
const ARTICLES = [
  { id:"art1", cat:"neuroscience", tag:"Neuroscience", read:"8 min",
    title:"How Your Brain Makes Decisions Under Uncertainty",
    desc:"The neural circuits that activate during high-stakes choices and why humans default to pattern-based shortcuts under pressure.",
    author:"Dr. Priya Mehta", cred:"PhD Cognitive Neuroscience, IISc Bangalore",
    body:`<p>Every decision you make passes through neural circuits that evolved over millions of years. The prefrontal cortex (PFC) orchestrates complex decision-making, integrating signals from memory, emotion, and sensory input to project possible futures.</p>
<h3>The Prefrontal Cortex: Your Inner CEO</h3>
<p>Damage to the PFC doesn't cause paralysis — it causes an inability to make good decisions even in people with intact intelligence. Antonio Damasio documented patients with intact IQs who became completely unable to make simple daily choices after PFC lesions.</p>
<blockquote>"A patient brilliant by every standard lost his PFC to a tumor. His IQ remained at 140. Yet he spent three hours deciding where to have breakfast." — Antonio Damasio</blockquote>
<h3>The Amygdala Hijack</h3>
<p>Under stress, the amygdala floods the system with cortisol and adrenaline, shunting blood flow away from the PFC toward the motor cortex. You become faster but less thoughtful — adaptive in a jungle, catastrophic in a boardroom.</p>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Hover time before clicking correlates with PFC activation intensity</li>
<li>Users who pause 2–4 seconds make statistically better decisions</li>
<li>Decision fatigue reduces PFC activity by ~30% over 6 hours</li>
<li>Emotional priming changes choice outcomes by up to 40%</li>
</ul></div>
<h3>The Somatic Marker Hypothesis</h3>
<p>Damasio's theory proposes the body "marks" past decisions with emotional tags. When a similar situation arises, these markers fire before conscious reasoning — what we call gut feeling. Experienced professionals often make better intuitive decisions than novices running exhaustive analyses because their somatic library is richer.</p>`
  },
  { id:"art2", cat:"psychology", tag:"Psychology", read:"6 min",
    title:"The Paradox of Choice: Why More Options Paralyze Us",
    desc:"Barry Schwartz's landmark research reveals why abundance of choices leads to worse decisions and lower satisfaction.",
    author:"Dr. Arjun Nair", cred:"MSc Behavioral Psychology, NIMHANS",
    body:`<p>In 2000, psychologist Sheena Iyengar set up a tasting booth in a California grocery store. On alternating days: 6 or 24 jam varieties. With 24 options, only 3% purchased. With 6 options, 30% bought. More choice, dramatically less action.</p>
<h3>The Tyranny of Freedom</h3>
<p>Barry Schwartz argued that the explosion of options in modern consumer culture produces not liberation but paralysis. We live in a "choice overload" environment — and our brains aren't equipped for it.</p>
<blockquote>"With so many options to choose from, people find it very difficult to choose at all."</blockquote>
<h3>Maximizers vs. Satisficers</h3>
<p>Maximizers search exhaustively for the best option. Satisficers look for "good enough." Research finds maximizers make objectively better choices — and report significantly lower satisfaction. The pursuit of optimal perpetually feels like failure.</p>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Choice overload occurs consistently above 7 options</li>
<li>Maximizers score 25% lower on life satisfaction scales</li>
<li>Pre-commitment reduces regret by 60%</li>
<li>Time pressure paradoxically improves satisfaction by forcing satisficing</li>
</ul></div>
<h3>Opportunity Cost Anxiety</h3>
<p>Each choice forfeits all alternatives. This cost grows with the number of options, creating a peculiar phenomenon: people feel worse after choosing when more options were available, because imagination of unchosen paths heightens perceived loss.</p>`
  },
  { id:"art3", cat:"behavior", tag:"Behavioral Economics", read:"7 min",
    title:"Loss Aversion: Why Losses Feel Twice as Powerful as Gains",
    desc:"Kahneman and Tversky's prospect theory explained why the pain of losing ₹1000 outweighs the joy of winning ₹1000.",
    author:"Dr. Sneha Iyer", cred:"PhD Economics & Behavioral Science, IIM Ahmedabad",
    body:`<p>Kahneman and Tversky's prospect theory, developed in 1979, remains the most cited paper in all of economics. Its central finding: losses feel approximately 2.5 times more powerful than equivalent gains.</p>
<h3>The Mathematics of Loss</h3>
<p>Classical economics assumed rational utility maximization. Prospect theory proved otherwise. The value function is S-shaped: steep in the loss domain, gradual in the gain domain, with current status as the reference point.</p>
<blockquote>"The aggravation of losing a sum of money appears to be greater than the pleasure of gaining the same amount." — Kahneman & Tversky, 1979</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Average loss aversion ratio: 2.5:1</li>
<li>Investors hold losing stocks 1.5x longer than winning ones</li>
<li>Endowment effect: people value owned items 2x more</li>
<li>Loss aversion decreases with age and increases under cognitive load</li>
</ul></div>
<h3>Digital Behavior Implications</h3>
<p>Loss aversion pervades digital behavior. "Don't miss out" outperforms "Gain access" by 40% in conversion. Our Logic Game tracks whether incorrect answers increase or decrease your attempt rate — revealing your personal loss aversion coefficient.</p>`
  },
  { id:"art4", cat:"cognitive", tag:"Cognitive Science", read:"9 min",
    title:"Working Memory: The Bottleneck of Human Intelligence",
    desc:"Why your working memory capacity — not IQ — may be the primary constraint on your cognitive performance.",
    author:"Dr. Vikram Rao", cred:"Neuropsychologist, AIIMS Delhi",
    body:`<p>George Miller's 1956 paper established that human working memory holds approximately 7 items simultaneously. More recent research by Nelson Cowan suggests the true limit may be closer to 4 "chunks." Either way, the constraint is severe and consequential.</p>
<h3>What is Working Memory?</h3>
<p>Working memory is the cognitive workspace where you temporarily hold and manipulate information. When you do mental arithmetic, follow a conversation, or plan a sequence of actions, working memory is the mechanism. Unlike long-term memory — vast but slow — working memory is fast, small, and critical.</p>
<blockquote>"Working memory is the gating mechanism of thought — the ability to actively maintain information in the face of distraction."</blockquote>
<h3>Working Memory vs. IQ</h3>
<p>Working memory capacity (WMC) predicts academic performance more reliably than IQ in many domains. Particularly in reading comprehension and mathematical reasoning, WMC is the better predictor. Some researchers argue WMC simply is what we measure when we measure IQ.</p>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Working memory capacity: ~4 chunks in adults, declining after age 35</li>
<li>Sleep deprivation reduces WMC by 20–30% after 24 hours</li>
<li>Dual-task interference reveals WMC limits in multitasking</li>
<li>Working memory training shows transfer effects to fluid intelligence</li>
</ul></div>
<h3>Our Sequence Memory Game</h3>
<p>The Sequence Memory game directly measures your working memory capacity. The length of sequence you can correctly reproduce, and your error patterns, provide a behavioral fingerprint of your WMC that is remarkably stable within individuals.</p>`
  },
  { id:"art5", cat:"neuroscience", tag:"Neuroscience", read:"10 min",
    title:"Neuroplasticity: The Brain That Changes Itself",
    desc:"How your brain rewires itself in response to experience, and what this means for learning, habit, and trauma.",
    author:"Dr. Kavitha Sundaram", cred:"Clinical Neuroscientist, Manipal Hospital",
    body:`<p>For most of the 20th century, neuroscientists believed the adult brain was fixed. Norman Doidge's work demolished this view. The brain is radically plastic, reshaping itself in response to experience throughout life.</p>
<h3>Hebbian Learning</h3>
<p>Donald Hebb's 1949 postulate — "neurons that fire together, wire together" — describes the cellular mechanism of learning. When two neurons are repeatedly activated simultaneously, the synaptic connection strengthens. Repeated firing creates physical changes: more receptors, stronger signals, faster transmission.</p>
<blockquote>"The brain is a dynamic entity that rewires itself continuously. Every thought you have changes the brain, even if only transiently."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>London taxi drivers show measurable hippocampal enlargement from navigation learning</li>
<li>Meditation changes cortical thickness within 8 weeks</li>
<li>Intensive skill practice produces measurable structural changes</li>
<li>Trauma alters hippocampal and amygdala structure — reversed by therapy</li>
</ul></div>
<h3>Tracking Your Plasticity</h3>
<p>Your performance on repeated cognitive tasks across BehaviorChain sessions can reveal neuroplasticity in real time. If your reaction time improves or sequence memory extends across visits, that reflects actual synaptic changes in your brain. Tracking is a mirror of your brain's change.</p>`
  },
  { id:"art6", cat:"behavior", tag:"Behavioral Economics", read:"5 min",
    title:"The Anchoring Effect: Why First Numbers Dominate Your Mind",
    desc:"How arbitrary initial information disproportionately influences all subsequent judgments — even in experts.",
    author:"Dr. Rohan Kapoor", cred:"Behavioral Finance, ISB Hyderabad",
    body:`<p>In 1974, Kahneman and Tversky asked subjects to spin a wheel of fortune (rigged to land on 10 or 65) and then estimate the percentage of African nations in the UN. Subjects who saw 65 guessed significantly higher than those who saw 10 — despite the number being obviously irrelevant.</p>
<h3>How Anchoring Works</h3>
<p>Two mechanisms operate: insufficiency adjustment (we start from an anchor and stop adjusting too early) and confirmatory hypothesis testing (we selectively retrieve information confirming the anchor).</p>
<blockquote>"The anchor need not be plausible to be influential. Subjects anchored on birthday numbers when estimating population figures."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Real estate agents adjust property values based on listed prices, not market values</li>
<li>Judges give shorter sentences after rolling a low-numbered die</li>
<li>First salary number stated determines the final negotiation range</li>
<li>Anchoring effects survive explicit warnings</li>
</ul></div>
<h3>Digital Anchoring</h3>
<p>Every pricing page exploits anchoring. The Enterprise tier at ₹9999/month makes ₹999/month feel reasonable. The first article you read on BehaviorChain becomes the benchmark against which all others are compared — influencing hover time, click decisions, and reading depth across the session.</p>`
  },
  { id:"art7", cat:"psychology", tag:"Psychology", read:"11 min",
    title:"The Big Five: A Complete Map of Human Personality",
    desc:"How the OCEAN model emerged from decades of research to become psychology's gold standard for personality assessment.",
    author:"Dr. Priya Mehta", cred:"PhD Cognitive Neuroscience, IISc Bangalore",
    body:`<p>After decades of competing personality theories, consensus emerged in the 1990s around five robust, cross-culturally validated dimensions. The Big Five — OCEAN — is the most empirically supported framework in personality psychology.</p>
<h3>The Five Dimensions</h3>
<p><strong>Openness</strong> — intellectual curiosity, aesthetic sensitivity, preference for novelty. High scorers are creative; low scorers are conventional. <strong>Conscientiousness</strong> — self-discipline, organization, reliability. The strongest predictor of academic and professional achievement. <strong>Extraversion</strong> — positive emotionality, sociability, assertiveness. <strong>Agreeableness</strong> — empathy, cooperation, trust. <strong>Neuroticism</strong> — emotional instability, anxiety vulnerability. A transdiagnostic risk factor for most psychiatric conditions.</p>
<blockquote>"The Big Five emerged not from theory but from language — from the hypothesis that the most important personality differences are encoded in everyday words."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Big Five traits are 40–60% heritable</li>
<li>Personality is measurable from digital behavior with ~70% accuracy</li>
<li>Conscientiousness predicts job performance across virtually all occupations</li>
<li>Personality changes gradually toward greater stability across the lifespan</li>
</ul></div>
<h3>Your Digital Signature</h3>
<p>High openness: broad article selection, longer reading, exploration of unfamiliar topics. High conscientiousness: methodical puzzle-solving, careful chat responses, complete activity completion. High neuroticism: longer decision times, more back-navigation, topic avoidance patterns. BehaviorChain maps these signatures in real time.</p>`
  },
  { id:"art8", cat:"cognitive", tag:"Cognitive Science", read:"7 min",
    title:"Cognitive Load Theory: Why Your Brain Gets Overwhelmed",
    desc:"John Sweller's framework for understanding mental capacity explains why good design is cognitive, not just aesthetic.",
    author:"Dr. Arjun Nair", cred:"MSc Behavioral Psychology, NIMHANS",
    body:`<p>John Sweller introduced Cognitive Load Theory in 1988 to explain why some instructional designs produce learning and others produce frustration. Working memory is limited, and everything we experience competes for that resource. Exceed the limit and cognition collapses.</p>
<h3>Three Types of Load</h3>
<p><strong>Intrinsic load</strong> is inherent to the material — a physics problem is intrinsically more complex than a grocery list. <strong>Extraneous load</strong> is generated by poor design — confusing navigation, irrelevant information. This is waste. <strong>Germane load</strong> is the productive load involved in schema formation — the deep work that actually builds understanding.</p>
<blockquote>"Every element of an interface that requires interpretation is a cognitive tax. Good design minimizes extraneous load."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Split-attention effect: separated related information increases load by 30%</li>
<li>Worked example effect: studying solutions before problems dramatically reduces load</li>
<li>Expertise reversal: techniques that help novices can harm experts</li>
<li>Emotional load consumes working memory resources equally to cognitive tasks</li>
</ul></div>
<h3>Scroll Behavior as Load Indicator</h3>
<p>Scroll velocity and reading pauses are reliable indicators of cognitive load. Users reading under high load scroll faster, retain less, and click more erratically. BehaviorChain's scroll tracking captures this — velocity changes, backscrolling, and reading time anomalies all signal load events revealing how your mind handles information density.</p>`
  },
  { id:"art9", cat:"neuroscience", tag:"Neuroscience", read:"8 min",
    title:"The Default Mode Network: What Your Brain Does When Idle",
    desc:"The discovery of the brain's resting-state network revealed that inactivity is anything but passive.",
    author:"Dr. Kavitha Sundaram", cred:"Clinical Neuroscientist, Manipal Hospital",
    body:`<p>In the early 2000s, neuroimaging researchers noticed something strange: when subjects were told to "do nothing," a consistent network of brain regions activated. These regions — medial prefrontal cortex, posterior cingulate, angular gyrus, hippocampus — became known as the Default Mode Network (DMN).</p>
<h3>What the DMN Does</h3>
<p>The DMN is active during self-referential thinking, mind-wandering, social cognition, and autobiographical memory retrieval. It is the neural substrate of imagination — constructing mental simulations of past, future, and hypothetical scenarios. It deactivates during focused external tasks, which is why focused attention and mind-wandering are mutually exclusive.</p>
<blockquote>"The brain is never truly off. The DMN maintains a continuous interior monologue — a narrative of self that defines subjective experience."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Creative insight correlates with DMN-executive network coupling</li>
<li>Mind-wandering occupies ~47% of waking hours (Harvard study)</li>
<li>People report lower happiness during mind-wandering than focused activity</li>
<li>DMN activity during learning predicts long-term memory consolidation</li>
</ul></div>
<h3>Reading and the DMN</h3>
<p>Long dwell time on articles — especially near the end — may indicate DMN engagement: your brain has moved from reading to integrating, connecting new information to existing knowledge. BehaviorChain distinguishes "passive dwell" from "integrated dwell," using these as proxies for encoding depth.</p>`
  },
  { id:"art10", cat:"behavior", tag:"Behavioral Economics", read:"6 min",
    title:"Nudge Theory: Engineering Better Choices Without Restricting Freedom",
    desc:"How Thaler and Sunstein's framework is redesigning everything from pension enrollment to organ donation.",
    author:"Dr. Rohan Kapoor", cred:"Behavioral Finance, ISB Hyderabad",
    body:`<p>Richard Thaler and Cass Sunstein's 2008 book "Nudge" introduced a concept that has reshaped public policy, interface design, and organizational management. Small, low-cost environmental changes can predictably alter behavior without restricting choice. Thaler received the 2017 Nobel Prize in Economics for this work.</p>
<h3>The Architecture of Choice</h3>
<p>Every decision is made within a "choice architecture." The nudge insight: this architecture is never neutral. The question is whether this influence is designed thoughtfully or haphazardly. Choice architects are always nudging someone toward some outcome — whether they know it or not.</p>
<blockquote>"A nudge alters people's behavior in a predictable way without forbidding any options or significantly changing economic incentives."</blockquote>
<div class="am-key-findings"><h4>Key Research Findings</h4><ul>
<li>Default pension enrollment increased participation from 49% to 86%</li>
<li>Healthy food at eye level increased healthy choices by 25%</li>
<li>Social proof nudges increased UK tax compliance by 15%</li>
<li>Opt-out organ donation increases donor rates by 20–30 percentage points</li>
</ul></div>
<h3>Nudges in BehaviorChain</h3>
<p>Our platform itself is a nudge environment. Article order, game tab placement, chat question framing — all are architectural choices influencing your behavior. We make this transparent: your behavioral profile reveals which nudges you responded to and which you resisted — a measure of your "choice sensitivity."</p>`
  }
];

// ============================================================
// 3. PSYCHOLOGISTS
// ============================================================
const PSYCHOLOGISTS = [
  { name:"Dr. Priya Mehta",  cred:"PhD Cognitive Neuroscience", spec:"Decision anxiety, cognitive profiling, career psychology",      exp:"12 yrs", rating:"4.9", avail:"Available Today",  emoji:"👩‍⚕️" },
  { name:"Dr. Arjun Nair",   cred:"MSc Behavioral Psychology",  spec:"Behavioral economics, financial decisions, stress management", exp:"8 yrs",  rating:"4.8", avail:"Next: 3 PM",       emoji:"👨‍⚕️" },
  { name:"Dr. Sneha Iyer",   cred:"PhD Clinical Psychology",    spec:"Trauma, emotional regulation, personality disorders",          exp:"15 yrs", rating:"5.0", avail:"Available Now",   emoji:"👩‍⚕️" },
  { name:"Dr. Vikram Rao",   cred:"Neuropsychologist MD",       spec:"Memory disorders, ADHD, cognitive rehabilitation",             exp:"20 yrs", rating:"4.9", avail:"Tomorrow 10 AM",  emoji:"👨‍⚕️" },
  { name:"Dr. Kavitha S.",   cred:"Clinical Neuroscientist",    spec:"Neuroplasticity, learning disorders, brain health",            exp:"11 yrs", rating:"4.7", avail:"Available Today",  emoji:"👩‍⚕️" },
  { name:"Dr. Rohan Kapoor", cred:"Behavioral Finance PhD",     spec:"Financial anxiety, risk profiling, investor psychology",      exp:"9 yrs",  rating:"4.8", avail:"Next: 5 PM",       emoji:"👨‍⚕️" },
];

// ============================================================
// 4. CHAT QUESTIONS (30 across 6 dimensions)
// ============================================================
const CHAT_QS = [
  { q:"When facing a difficult choice, what is your first instinct?",          dim:"decision", chips:["Research extensively","Trust my gut","Ask someone I trust","Make a pros/cons list"] },
  { q:"How do you feel about making irreversible decisions?",                   dim:"decision", chips:["I avoid them if possible","I accept them as part of life","I get anxious but proceed","I find them exciting"] },
  { q:"When you are wrong about something, how do you typically respond?",     dim:"decision", chips:["Analyze what went wrong","Move on quickly","Feel embarrassed","Seek feedback actively"] },
  { q:"How long do you deliberate before a major purchase?",                   dim:"decision", chips:["Days to weeks","Hours","Minutes","I go with my first feeling"] },
  { q:"What is your ideal decision-making scenario?",                          dim:"decision", chips:["Full information, no time limit","Limited options, clear criteria","Collaborative with others","Alone with time to reflect"] },
  { q:"When someone upsets you, what do you do first?",                        dim:"emotion",  chips:["Try to understand their view","Express how I feel immediately","Distance myself to think","Suppress it and move on"] },
  { q:"How aware are you of your emotional states as they happen?",            dim:"emotion",  chips:["Very aware — almost real-time","Somewhat aware","I realize later","Rarely aware in the moment"] },
  { q:"When a colleague is visibly stressed, you respond by...",               dim:"emotion",  chips:["Checking in and offering support","Giving them space","Mentioning it if it affects work","Feeling stressed myself"] },
  { q:"How do you feel when others express strong emotions around you?",       dim:"emotion",  chips:["Comfortable — I can hold space","Slightly uncomfortable","I match their energy","I try to solve the problem"] },
  { q:"After a conflict, how long until you feel at peace?",                  dim:"emotion",  chips:["Minutes — I move on fast","Hours","A day or two","It lingers until resolved"] },
  { q:"At a party where you know almost no one, you typically...",             dim:"social",   chips:["Actively introduce myself","Stick with who I came with","Find one person and go deep","Leave early if possible"] },
  { q:"Your preferred collaboration style is:",                               dim:"social",   chips:["Lead the team","Contribute as an equal","Support others ideas","Work independently when possible"] },
  { q:"When giving feedback to a friend, you tend to be:",                    dim:"social",   chips:["Direct and honest even if hard","Gentle — I soften the message","I only give it if asked","I focus on positives only"] },
  { q:"In group discussions, you usually...",                                  dim:"social",   chips:["Speak early and often","Wait and synthesize others views","Speak when I have something specific","Prefer listening"] },
  { q:"Conflict with a close friend feels like:",                             dim:"social",   chips:["An opportunity to deepen understanding","Uncomfortable but necessary","Something to resolve quickly","Very distressing"] },
  { q:"When learning something new, you prefer:",                             dim:"cognitive", chips:["Dive in and learn by doing","Read everything available first","Learn from an expert in person","Watch videos and examples"] },
  { q:"Your primary thinking style is:",                                      dim:"cognitive", chips:["Big picture and conceptual","Detail-oriented and systematic","Intuitive and pattern-based","Mixed depending on context"] },
  { q:"When reading a long document, you tend to:",                          dim:"cognitive", chips:["Read every word carefully","Skim for key points","Read conclusion first then detail","Skip sections that seem obvious"] },
  { q:"How do you organize complex information?",                             dim:"cognitive", chips:["Mental maps and visuals","Written lists and outlines","Keep it all in my head","Speak it through with others"] },
  { q:"When faced with ambiguity, you feel:",                                 dim:"cognitive", chips:["Curious — I love the exploration","Uncomfortable — I seek clarity","Neutral — it is just a state","Energized by the challenge"] },
  { q:"Under deadline pressure, your performance:",                           dim:"stress",   chips:["Improves — pressure fuels me","Stays consistent","Declines — I need calm","Varies by the type of task"] },
  { q:"Your primary stress relief mechanism is:",                             dim:"stress",   chips:["Physical activity","Social connection","Solitude and quiet","Creative work"] },
  { q:"When multiple things go wrong at once, you:",                         dim:"stress",   chips:["Prioritize and tackle systematically","Feel overwhelmed but push through","Seek support immediately","Withdraw and reset"] },
  { q:"How does chronic low-level stress affect you?",                        dim:"stress",   chips:["I barely notice it","It affects my sleep","It affects my relationships","It motivates me to fix things"] },
  { q:"Your body physical stress response is typically:",                     dim:"stress",   chips:["Tension in neck and shoulders","Digestive changes","Headaches","I rarely notice physical symptoms"] },
  { q:"When you fail at something important, you typically think:",           dim:"growth",   chips:["What can I learn from this","I am not naturally good at this","How do I prevent this next time","Everyone fails sometimes"] },
  { q:"How do you view your intelligence and abilities?",                     dim:"growth",   chips:["Highly developable through effort","Somewhat fixed but improvable","A mix of fixed and flexible","Fundamentally changeable"] },
  { q:"Criticism of your work makes you:",                                   dim:"growth",   chips:["Eager to improve","Defensive initially then reflective","Depends entirely on the source","Uncomfortable but I use it"] },
  { q:"How often do you deliberately pursue challenging tasks?",              dim:"growth",   chips:["Constantly — I seek challenges","Often — when I feel ready","Occasionally","Rarely — I stick to strengths"] },
  { q:"When you see someone more skilled than you, you feel:",               dim:"growth",   chips:["Inspired — they show what is possible","Slightly intimidated","Curious about their path","Neutral — everyone has strengths"] },
];

const BOT_REPLIES = [
  (dim) => `Interesting — that response pattern is characteristic of a ${dim}-oriented cognitive style. Your profile has been updated.`,
  (dim) => `Noted. Research shows people who respond this way tend to score higher in ${dim === "decision" ? "analytical reasoning" : dim === "emotion" ? "empathetic accuracy" : dim === "social" ? "interpersonal intelligence" : dim === "cognitive" ? "cognitive flexibility" : dim === "stress" ? "resilience" : "learning agility"}. Next question...`,
  (dim) => `That is a revealing answer. About ${30 + Math.floor(Math.random()*45)}% of respondents choose similarly. This tells us something meaningful about your ${dim} dimension.`,
  (dim) => `Valuable insight. Your ${dim} profile is shaping up. Let me continue building your behavioral fingerprint...`,
  (dim) => `Understood. That pattern is well-documented in behavioral literature. Moving to the next question now...`,
];

// ============================================================
// 5. LOGIC GAME QUESTIONS
// ============================================================
const LOGIC_QS = [
  { q:"If all Blips are Blops, and some Blops are Blaps, which MUST be true?",                           opts:["All Blips are Blaps","Some Blips might be Blaps","No Blips are Blaps","All Blaps are Blips"],              ans:1, exp:"All Blips are Blops, and some Blops are Blaps — so it is POSSIBLE (not certain) that some Blips are Blaps." },
  { q:"A clock shows 3:15. What is the angle between the hour and minute hands?",                        opts:["0°","7.5°","45°","52.5°"],                                                                                 ans:1, exp:"Minute hand at 90°. Hour hand at 97.5° (3×30 + 15×0.5). Difference = 7.5°." },
  { q:"A bat and ball cost ₹110 total. The bat costs ₹100 more than the ball. How much is the ball?",   opts:["₹10","₹5","₹100","₹15"],                                                                                  ans:1, exp:"Ball = x, Bat = x+100. So 2x+100=110, x=₹5. (Not ₹10 — the intuitive but wrong answer!)" },
  { q:"What is 2 + 2 × 2 − 2 ÷ 2?",                                                                    opts:["4","5","6","3"],                                                                                           ans:1, exp:"BODMAS: 2 + (2×2) − (2÷2) = 2 + 4 − 1 = 5." },
  { q:"Which number comes next: 1, 1, 2, 3, 5, 8, 13, __?",                                             opts:["18","20","21","24"],                                                                                       ans:2, exp:"Fibonacci: each number = sum of the two before. 8 + 13 = 21." },
  { q:"A room has 4 corners. In each corner sits a cat, each facing 3 other cats. How many cats total?", opts:["16","4","12","7"],                                                                                         ans:1, exp:"4 cats — one in each corner. Each faces the other 3 corners. The answer is 4, not 16." },
  { q:"5 machines make 5 widgets in 5 minutes. How long for 100 machines to make 100 widgets?",          opts:["100 min","5 min","50 min","20 min"],                                                                       ans:1, exp:"Each machine makes 1 widget per 5 min. 100 machines in parallel = still 5 minutes." },
  { q:"You pass the person in 2nd place in a race. What place are you in now?",                          opts:["1st","2nd","3rd","4th"],                                                                                   ans:1, exp:"You passed 2nd place — so you ARE in 2nd. You did not pass 1st place." },
  { q:"What comes next in the sequence: 2, 6, 12, 20, 30, __?",                                         opts:["42","36","40","44"],                                                                                       ans:0, exp:"Differences: 4, 6, 8, 10, 12 — increasing by 2. So 30 + 12 = 42." },
  { q:"A snail climbs 3m up a 10m wall each day, slides 2m each night. How many days to reach the top?",opts:["7 days","8 days","9 days","10 days"],                                                                      ans:1, exp:"Net gain 1m/day. After 7 days = 7m. On day 8 it climbs 3m reaching 10m before sliding. Answer: 8 days." },
];

// ============================================================
// 6. EVENT TRACKING
// ============================================================
function getEvents() { try { return JSON.parse(localStorage.getItem(LS.events)||"[]"); } catch { return []; } }
function trackEvent(type, data) {
  const events = getEvents();
  events.push({ type, data, timestamp:Date.now(), user:currentUser?.email||"anon" });
  localStorage.setItem(LS.events, JSON.stringify(events));
  updateTracker();
  pushEventStream({ type, data, timestamp:Date.now() });
}
function updateTracker() {
  const ev = getEvents();
  const profile = buildProfile(ev);
  setText("tg-events",  ev.length);
  setText("tg-articles", ev.filter(e=>e.type==="article_read").length);
  setText("tg-games",   ev.filter(e=>e.type==="game_complete").length);
  setText("tg-chats",   ev.filter(e=>e.type==="chat_answer").length);
  setText("tg-score",   profile.score||"—");
  setText("tg-chain",   walletAddress ? "🟢 Live" : "⚪ Offline");
  setText("heroScore",  profile.score||"—");
}
function pushEventStream(ev) {
  const stream = document.getElementById("eventStream");
  if (!stream) return;
  const div = document.createElement("div");
  div.className = "es-item";
  const t = new Date(ev.timestamp).toLocaleTimeString();
  div.innerHTML = `<span class="es-time">${t}</span><span class="es-event">${ev.type}</span><span class="es-data">${JSON.stringify(ev.data||{}).slice(0,55)}</span>`;
  stream.prepend(div);
  while (stream.children.length > 60) stream.removeChild(stream.lastChild);
}
function setText(id, val) { const el=document.getElementById(id); if(el) el.textContent=val; }

// ============================================================
// 7. AUTH
// ============================================================
function switchAuth(mode) {
  document.getElementById("loginPanel").classList.toggle("hidden", mode!=="login");
  document.getElementById("signupPanel").classList.toggle("hidden", mode!=="signup");
}

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const pass  = document.getElementById("loginPassword").value.trim();
  if (!email||!pass) { showToast("Please enter email and password"); return; }
  const users = JSON.parse(localStorage.getItem("bc_users")||"{}");
  if (!users[email])           { showToast("Account not found. Please sign up."); return; }
  if (users[email].pw !== pass){ showToast("Incorrect password"); return; }
  loginUser(users[email]);
});

document.getElementById("signupBtn").addEventListener("click", () => {
  const first = document.getElementById("signupFirst").value.trim();
  const last  = document.getElementById("signupLast").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass  = document.getElementById("signupPassword").value.trim();
  if (!first||!last||!email||!pass) { showToast("Please fill in all fields"); return; }
  if (pass.length < 8)              { showToast("Password must be 8+ characters"); return; }
  const users = JSON.parse(localStorage.getItem("bc_users")||"{}");
  if (users[email]) { showToast("Email already registered. Sign in instead."); return; }
  const user = { first, last, email, pw:pass, role:document.getElementById("signupRole").value, created:Date.now() };
  users[email] = user;
  localStorage.setItem("bc_users", JSON.stringify(users));
  loginUser(user);
});

document.getElementById("loginWithWallet").addEventListener("click",  walletAuth);
document.getElementById("signupWithWallet").addEventListener("click", walletAuth);

async function walletAuth() {
  if (typeof window.ethereum === "undefined") { showToast("MetaMask not installed — visit metamask.io"); return; }
  try {
    const accounts = await window.ethereum.request({ method:"eth_requestAccounts" });
    if (!accounts.length) return;
    const addr = accounts[0];
    const users = JSON.parse(localStorage.getItem("bc_users")||"{}");
    const key   = "wallet_" + addr.toLowerCase();
    if (!users[key]) users[key] = { first:"Web3", last:"User", email:key, role:"user", wallet:addr, created:Date.now() };
    localStorage.setItem("bc_users", JSON.stringify(users));
    setWallet(addr);
    loginUser(users[key]);
  } catch(e) { showToast("Wallet connection rejected"); }
}

function loginUser(user) {
  currentUser = user;
  localStorage.setItem(LS.user, JSON.stringify(user));
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("mainApp").classList.remove("hidden");
  setText("navAvatar",   user.first[0].toUpperCase());
  setText("navUserName", user.first);
  const savedWallet = localStorage.getItem(LS.wallet);
  if (savedWallet) setWallet(savedWallet);
  // Restore chat progress
  const savedChat = localStorage.getItem(LS.chatData);
  if (savedChat) { try { chatState = JSON.parse(savedChat); } catch {} }
  initApp();
}

function logout() {
  currentUser = null;
  localStorage.removeItem(LS.user);
  document.getElementById("authScreen").style.display = "";
  document.getElementById("mainApp").classList.add("hidden");
}

function initApp() {
  buildArticleGrid();
  buildPsychGrid();
  initChatPage();
  initGames();
  updateTracker();
  initBlockchainPage();
  trackEvent("session_start", { user:currentUser?.email });
}

// ============================================================
// 8. NAVIGATION
// ============================================================
function navigateTo(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  const pg = document.getElementById("page-"+page);
  const lk = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (pg) pg.classList.add("active");
  if (lk) lk.classList.add("active");
  if (page==="analysis")   renderAnalysis();
  if (page==="blockchain") refreshBlockchain();
  window.scrollTo(0,0);
}
document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => navigateTo(l.dataset.page)));

// ============================================================
// 9. WALLET
// ============================================================
function setWallet(addr) {
  walletAddress = addr;
  localStorage.setItem(LS.wallet, addr);
  const btn = document.getElementById("navConnectWallet");
  const info = document.getElementById("walletConnected");
  if (btn)  btn.classList.add("hidden");
  if (info) info.classList.remove("hidden");
  setText("walletShort", addr.slice(0,6)+"..."+addr.slice(-4));
  setText("bcNetwork",   "Sepolia Testnet");
  setText("bcAddress",   addr);
  updateTracker();
  trackEvent("wallet_connect", { address:addr });
}

document.getElementById("navConnectWallet").addEventListener("click", connectWallet);
document.getElementById("bcConnectBtn").addEventListener("click",     connectWallet);

async function connectWallet() {
  if (typeof window.ethereum === "undefined") { showToast("MetaMask not detected — install from metamask.io"); return; }
  try {
    const accounts = await window.ethereum.request({ method:"eth_requestAccounts" });
    if (accounts.length) { setWallet(accounts[0]); refreshBlockchain(); showToast("✓ Wallet connected: "+accounts[0].slice(0,12)+"..."); }
  } catch(e) { showToast("Connection rejected"); }
}
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", accs => { if (accs.length) setWallet(accs[0]); });
}

// ============================================================
// 10. ARTICLES
// ============================================================
function buildArticleGrid() {
  const grid = document.getElementById("articlesGrid");
  if (!grid || grid.dataset.built) return;
  grid.dataset.built = "1";
  ARTICLES.forEach(art => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.dataset.cat = art.cat;
    card.innerHTML = `
      <span class="art-tag">${art.tag}</span>
      <h3 class="art-title">${art.title}</h3>
      <p class="art-desc">${art.desc}</p>
      <div class="art-meta">
        <span class="art-read">📖 ${art.read}</span>
        <span class="art-hover" id="ah_${art.id}">hover to track</span>
      </div>`;
    let hoverStart = null;
    card.addEventListener("mouseenter", () => { hoverStart = Date.now(); });
    card.addEventListener("mouseleave", () => {
      if (!hoverStart) return;
      const t = ((Date.now()-hoverStart)/1000).toFixed(2);
      hoverStart = null;
      trackEvent("article_hover", { id:art.id, hoverTime:parseFloat(t) });
      const lbl = document.getElementById("ah_"+art.id);
      if (lbl) lbl.textContent = `⏱ ${t}s`;
    });
    card.addEventListener("click", () => openArticle(art));
    grid.appendChild(card);
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".article-card").forEach(c => {
        c.style.display = (f==="all" || c.dataset.cat===f) ? "" : "none";
      });
    });
  });
}

function openArticle(art) {
  const modal = document.getElementById("articleModal");
  const body  = document.getElementById("articleModalBody");
  body.innerHTML = `
    <p class="am-cat">${art.tag}</p>
    <h2 class="am-title">${art.title}</h2>
    <div class="am-author">
      <div class="am-avatar">${art.author.charAt(3)}</div>
      <div class="am-author-info">
        <span class="am-author-name">${art.author}</span>
        <span class="am-author-cred">${art.cred}</span>
      </div>
    </div>
    <div class="am-body">${art.body}</div>`;
  modal.dataset.openAt = Date.now();
  modal.dataset.artId  = art.id;
  modal.classList.remove("hidden");
  trackEvent("article_open", { id:art.id });
}
function closeArticleModal() {
  const modal = document.getElementById("articleModal");
  const spent = ((Date.now() - parseInt(modal.dataset.openAt||Date.now()))/1000).toFixed(1);
  trackEvent("article_read", { id:modal.dataset.artId, seconds:parseFloat(spent) });
  modal.classList.add("hidden");
}
document.getElementById("articleModal").addEventListener("click", function(e){ if(e.target===this) closeArticleModal(); });

// ============================================================
// 11. GAMES
// ============================================================
function initGames() {
  document.querySelectorAll(".game-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".game-tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      loadGame(tab.dataset.game);
    });
  });
  loadGame("sequence");
}
function loadGame(name) {
  const arena = document.getElementById("gameArena");
  if (name==="sequence") buildSequenceGame(arena);
  else if (name==="stroop")   buildStroopGame(arena);
  else if (name==="reaction") buildReactionGame(arena);
  else if (name==="logic")    buildLogicGame(arena);
}

/* --- Sequence Memory --- */
function buildSequenceGame(arena) {
  const ICONS = ["🔵","🔴","🟡","🟢","🟣","🟠","⚫","⚪","🔶"];
  let seq=[], player=[], level=1, score=0, showing=false;
  arena.innerHTML = `<div class="seq-game">
    <div class="seq-info">
      <div class="seq-info-item"><span class="seq-info-val" id="sqLevel">1</span><span class="seq-info-lbl">Level</span></div>
      <div class="seq-info-item"><span class="seq-info-val" id="sqScore">0</span><span class="seq-info-lbl">Score</span></div>
      <div class="seq-info-item"><span class="seq-info-val" id="sqLen">—</span><span class="seq-info-lbl">Seq Length</span></div>
    </div>
    <div class="seq-grid" id="sqGrid"></div>
    <p class="seq-status" id="sqStatus">Press Start to begin</p>
    <button class="btn-primary" id="sqStart" style="margin-top:8px">▶ Start Game</button>
  </div>`;
  const grid = document.getElementById("sqGrid");
  ICONS.forEach((ic,i) => {
    const cell = document.createElement("div");
    cell.className="seq-cell"; cell.textContent=ic; cell.dataset.i=i;
    grid.appendChild(cell);
  });
  const sleep = ms => new Promise(r=>setTimeout(r,ms));
  async function showSeq() {
    showing=true;
    document.getElementById("sqStatus").textContent="Watch the sequence...";
    for (const idx of seq) {
      const c=grid.children[idx];
      c.classList.add("lit"); await sleep(550); c.classList.remove("lit"); await sleep(180);
    }
    showing=false;
    document.getElementById("sqStatus").textContent="Your turn! Repeat the sequence.";
    player=[];
  }
  document.getElementById("sqStart").addEventListener("click", async () => {
    seq=[]; level=1; score=0; player=[];
    setText("sqLevel",1); setText("sqScore",0);
    seq.push(Math.floor(Math.random()*9));
    setText("sqLen",seq.length);
    await sleep(400); await showSeq();
  });
  grid.addEventListener("click", async e => {
    if (showing) return;
    const cell=e.target.closest(".seq-cell");
    if (!cell) return;
    const idx=parseInt(cell.dataset.i);
    cell.classList.add("lit"); await sleep(180); cell.classList.remove("lit");
    player.push(idx);
    if (player[player.length-1]!==seq[player.length-1]) {
      cell.classList.add("wrong"); await sleep(400); cell.classList.remove("wrong");
      document.getElementById("sqStatus").textContent=`Game Over! Level ${level} — Score: ${score}`;
      document.getElementById("sqStart").textContent="▶ Play Again";
      trackEvent("game_complete",{game:"sequence",score,level,seqLen:seq.length});
      return;
    }
    if (player.length===seq.length) {
      score+=level*10; level++;
      setText("sqScore",score); setText("sqLevel",level);
      seq.push(Math.floor(Math.random()*9));
      setText("sqLen",seq.length);
      document.getElementById("sqStatus").textContent="✓ Correct! Level up!";
      await sleep(700); await showSeq();
    }
  });
}

/* --- Stroop --- */
function buildStroopGame(arena) {
  const COLORS={red:"#ff4d6d",blue:"#00e5ff",green:"#00ffc8",yellow:"#f0b429",purple:"#8b5cf6"};
  const NAMES=Object.keys(COLORS);
  let score=0,wrong=0,total=0,timeLeft=30,timer=null,ink="";
  arena.innerHTML=`<div class="stroop-game">
    <div class="seq-info">
      <div class="seq-info-item"><span class="seq-info-val" id="stScore">0</span><span class="seq-info-lbl">Score</span></div>
      <div class="seq-info-item"><span class="seq-info-val" id="stTime">30</span><span class="seq-info-lbl">Seconds</span></div>
      <div class="seq-info-item"><span class="seq-info-val" id="stAcc">—</span><span class="seq-info-lbl">Accuracy</span></div>
    </div>
    <div class="stroop-word" id="stWord" style="min-height:110px;display:flex;align-items:center;justify-content:center;">READY</div>
    <p class="stroop-prompt" id="stPrompt">Click the COLOR the word is written in — not what it says!</p>
    <div class="stroop-colors" id="stColors"></div>
    <button class="btn-primary" id="stStart">▶ Start Stroop Test</button>
  </div>`;
  const colorDiv=document.getElementById("stColors");
  NAMES.forEach(n=>{
    const btn=document.createElement("button");
    btn.className="stroop-btn"; btn.textContent=n.toUpperCase();
    btn.style.cssText=`border-color:${COLORS[n]};color:${COLORS[n]}`;
    btn.addEventListener("click",()=>{
      if(!timer)return; total++;
      if(n===ink){score++;setText("stScore",score);}else{wrong++;}
      const acc=total?Math.round((score/total)*100):0;
      setText("stAcc",acc+"%"); newWord();
    });
    colorDiv.appendChild(btn);
  });
  function newWord(){
    const wordName=NAMES[Math.floor(Math.random()*NAMES.length)];
    ink=NAMES[Math.floor(Math.random()*NAMES.length)];
    const w=document.getElementById("stWord");
    w.textContent=wordName.toUpperCase(); w.style.color=COLORS[ink];
  }
  document.getElementById("stStart").addEventListener("click",()=>{
    score=0;wrong=0;total=0;timeLeft=30;
    setText("stScore",0);setText("stTime",30);setText("stAcc","—");
    clearInterval(timer);
    newWord();
    timer=setInterval(()=>{
      timeLeft--; setText("stTime",timeLeft);
      if(timeLeft<=0){
        clearInterval(timer);timer=null;
        const w=document.getElementById("stWord");
        w.textContent="TIME!"; w.style.color="var(--cyan)";
        const acc=total?Math.round((score/total)*100):0;
        document.getElementById("stPrompt").textContent=`Done! ${score} correct, ${wrong} wrong — Accuracy: ${acc}%`;
        trackEvent("game_complete",{game:"stroop",score,wrong,total,accuracy:acc});
      }
    },1000);
  });
}

/* --- Reaction Time --- */
function buildReactionGame(arena) {
  let state="idle",times=[],startTime=null,waitTimer=null;
  arena.innerHTML=`<div class="reaction-game">
    <div class="reaction-results">
      <div class="rr-item"><span class="rr-val" id="rrLast">—</span><span class="rr-lbl">Last (ms)</span></div>
      <div class="rr-item"><span class="rr-val" id="rrBest">—</span><span class="rr-lbl">Best (ms)</span></div>
      <div class="rr-item"><span class="rr-val" id="rrAvg">—</span><span class="rr-lbl">Avg (ms)</span></div>
      <div class="rr-item"><span class="rr-val" id="rrRound">0/5</span><span class="rr-lbl">Round</span></div>
    </div>
    <div class="reaction-target waiting" id="rtTarget">Click to Start</div>
    <p style="color:var(--t3);font-size:.82rem;font-family:var(--font-mono);text-align:center">Wait for GREEN — then click as fast as you can!</p>
  </div>`;
  const tgt=document.getElementById("rtTarget");
  tgt.addEventListener("click",()=>{
    if(state==="idle"){
      state="waiting"; tgt.className="reaction-target ready"; tgt.textContent="Get ready...";
      waitTimer=setTimeout(()=>{
        state="go"; startTime=Date.now();
        tgt.className="reaction-target go"; tgt.textContent="CLICK NOW!";
      },1500+Math.random()*3000);
    } else if(state==="waiting"){
      clearTimeout(waitTimer); state="idle";
      tgt.className="reaction-target waiting"; tgt.textContent="Too early! Click to try again.";
    } else if(state==="go"){
      const rt=Date.now()-startTime; times.push(rt); state="idle";
      const best=Math.min(...times), avg=Math.round(times.reduce((a,b)=>a+b,0)/times.length);
      setText("rrLast",rt); setText("rrBest",best); setText("rrAvg",avg); setText("rrRound",times.length+"/5");
      if(times.length>=5){
        tgt.className="reaction-target waiting"; tgt.textContent=`Done! Avg: ${avg}ms`;
        trackEvent("game_complete",{game:"reaction",avgMs:avg,bestMs:best,trials:times});
        times=[];
      } else {
        setTimeout(()=>{
          tgt.className="reaction-target waiting"; tgt.textContent="Click to continue";
        },600);
      }
    }
  });
}

/* --- Logic Grid --- */
function buildLogicGame(arena) {
  let qi=0, score=0;
  function renderQ(){
    if(qi>=LOGIC_QS.length){
      arena.innerHTML=`<div class="logic-game" style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:16px">🎉</div>
        <h3 style="font-size:1.5rem;margin-bottom:10px">Logic Test Complete!</h3>
        <p style="color:var(--t2)">Score: <strong style="color:var(--cyan)">${score}/${LOGIC_QS.length}</strong></p>
        <button class="btn-primary" style="margin-top:24px" onclick="loadGame('logic')">Play Again</button>
      </div>`;
      trackEvent("game_complete",{game:"logic",score,total:LOGIC_QS.length});
      return;
    }
    const q=LOGIC_QS[qi]; let answered=false;
    arena.innerHTML=`<div class="logic-game">
      <div class="logic-meta">
        <span class="logic-progress">Question ${qi+1} / ${LOGIC_QS.length}</span>
        <span class="logic-score-display">Score: ${score}</span>
      </div>
      <p class="logic-q">${q.q}</p>
      <div class="logic-opts">${q.opts.map((o,i)=>`<button class="logic-opt" data-i="${i}">${o}</button>`).join("")}</div>
      <div class="logic-explain" id="lgExp" style="display:none">${q.exp}</div>
    </div>`;
    arena.querySelectorAll(".logic-opt").forEach(btn=>{
      btn.addEventListener("click",()=>{
        if(answered)return; answered=true;
        const c=parseInt(btn.dataset.i);
        if(c===q.ans){btn.classList.add("correct-opt");score++;}
        else{btn.classList.add("wrong-opt");arena.querySelectorAll(".logic-opt")[q.ans].classList.add("correct-opt");}
        document.getElementById("lgExp").style.display="block";
        trackEvent("logic_answer",{qi,correct:c===q.ans});
        setTimeout(()=>{qi++;renderQ();},1900);
      });
    });
  }
  renderQ();
}

// ============================================================
// 12. CHAT
// ============================================================
function initChatPage() {
  const win=document.getElementById("chatWindow");
  if(!win)return;
  win.innerHTML="";
  // Restore or fresh start
  const saved=localStorage.getItem(LS.chatData);
  if(saved){try{chatState=JSON.parse(saved);}catch{}}
  updateDimBars();
  setText("chatQNum", chatState.qi);
  if(chatState.qi===0){
    appendBot("Welcome to your behavioral assessment. I am BehaviorBot — your AI-guided psychologist.\n\nI will ask you 30 questions across 6 psychological dimensions. Your answers build your behavioral profile in real time. Take your time — there are no right or wrong answers.\n\nLet us begin...");
    setTimeout(askQ, 1200);
  } else {
    appendBot(`Welcome back! You are on question ${chatState.qi+1}/30. Let us continue...`);
    setTimeout(askQ, 1200);
  }
  document.getElementById("btnSend").onclick   = sendChat;
  document.getElementById("chatInput").onkeydown = e=>{ if(e.key==="Enter") sendChat(); };
}

function askQ(){
  if(chatState.qi>=CHAT_QS.length){
    appendBot("Assessment complete! You have answered all 30 questions. Your behavioral profile is now fully built. Visit My Profile to see your complete analysis.");
    document.getElementById("quickChips").innerHTML=`<button class="chip" onclick="navigateTo('analysis')">View My Profile →</button>`;
    trackEvent("chat_complete",{answers:chatState.answers.length});
    return;
  }
  const q=CHAT_QS[chatState.qi];
  setText("chatQNum", chatState.qi+1);
  setTimeout(()=>{
    appendBot(q.q);
    const chips=document.getElementById("quickChips");
    chips.innerHTML="";
    q.chips.forEach(chip=>{
      const btn=document.createElement("button");
      btn.className="chip"; btn.textContent=chip;
      btn.onclick=()=>handleAnswer(chip,q);
      chips.appendChild(btn);
    });
  },500);
}

function sendChat(){
  const inp=document.getElementById("chatInput");
  const txt=inp.value.trim(); if(!txt)return;
  inp.value="";
  const q=chatState.qi<CHAT_QS.length?CHAT_QS[chatState.qi]:{dim:"general"};
  handleAnswer(txt,q);
}

function handleAnswer(text,q){
  appendUser(text);
  document.getElementById("quickChips").innerHTML="";
  chatState.answers.push({q:q.q,a:text,dim:q.dim});
  chatState.dims[q.dim]=(chatState.dims[q.dim]||0)+1;
  chatState.qi++;
  updateDimBars();
  trackEvent("chat_answer",{q:q.q,a:text,dim:q.dim});
  localStorage.setItem(LS.chatData,JSON.stringify(chatState));
  // typing + reply
  const typingEl=appendTyping();
  setTimeout(()=>{
    typingEl.remove();
    const replies=BOT_REPLIES;
    const r=replies[Math.floor(Math.random()*replies.length)](q.dim);
    appendBot(r);
    setTimeout(askQ,900);
  },700+Math.random()*600);
}

function updateDimBars(){
  Object.keys(chatState.dims).forEach(dim=>{
    const fill=document.querySelector(`.dim-item[data-dim="${dim}"] .dim-fill`);
    if(fill){ const pct=Math.min(100,Math.round((chatState.dims[dim]/5)*100)); fill.style.width=pct+"%"; }
  });
}

function appendBot(text){
  const win=document.getElementById("chatWindow");
  const el=document.createElement("div"); el.className="chat-msg bot";
  el.innerHTML=`<div class="msg-av">BC</div><div class="msg-bub">${text.replace(/\n/g,"<br>")}</div>`;
  win.appendChild(el); win.scrollTop=win.scrollHeight; return el;
}
function appendUser(text){
  const win=document.getElementById("chatWindow");
  const el=document.createElement("div"); el.className="chat-msg user";
  el.innerHTML=`<div class="msg-av">ME</div><div class="msg-bub">${text}</div>`;
  win.appendChild(el); win.scrollTop=win.scrollHeight; return el;
}
function appendTyping(){
  const win=document.getElementById("chatWindow");
  const el=document.createElement("div"); el.className="chat-msg bot";
  el.innerHTML=`<div class="msg-av">BC</div><div class="msg-bub" style="color:var(--t3);font-style:italic">Analyzing...</div>`;
  win.appendChild(el); win.scrollTop=win.scrollHeight; return el;
}

// ============================================================
// 13. PSYCHOLOGISTS
// ============================================================
function buildPsychGrid(){
  const grid=document.getElementById("psychGrid");
  if(!grid||grid.dataset.built)return;
  grid.dataset.built="1";
  PSYCHOLOGISTS.forEach(p=>{
    const card=document.createElement("div"); card.className="psych-card";
    card.innerHTML=`<div class="psych-avatar">${p.emoji}</div>
      <div class="psych-name">${p.name}</div>
      <div class="psych-cred">${p.cred}</div>
      <div class="psych-spec">${p.spec}</div>
      <div class="psych-meta">
        <div class="pm-item"><span class="pm-val">${p.exp}</span><span class="pm-lbl">Experience</span></div>
        <div class="pm-item"><span class="pm-val">⭐ ${p.rating}</span><span class="pm-lbl">Rating</span></div>
      </div>
      <div class="psych-avail">🟢 ${p.avail}</div>
      <button class="btn-psych" onclick="openBooking('quick','199')">Book Session</button>`;
    grid.appendChild(card);
  });
}

// ============================================================
// 14. BOOKING MODAL
// ============================================================
let _bType="quick", _bPrice="199";
function openBooking(type,price){
  _bType=type; _bPrice=price;
  const names={quick:"Quick Insight — 30 min",deep:"Deep Dive — 60 min",team:"Team Analysis"};
  const body=document.getElementById("bookingModalBody");
  const today=new Date().toISOString().split("T")[0];
  body.innerHTML=`
    <h2 class="bm-title">Book Your Session</h2>
    <p class="bm-sub">Confirm details and simulate payment</p>
    <div class="bm-plan-info">
      <span class="bm-plan-name">${names[type]||type}</span>
      <span class="bm-plan-price">₹${price}</span>
    </div>
    <div class="form-group"><label>Choose Psychologist</label>
      <select class="form-input form-select" id="bkPsych">
        ${PSYCHOLOGISTS.map(p=>`<option>${p.name} — ${p.spec.split(",")[0]}</option>`).join("")}
      </select>
    </div>
    <div class="form-group"><label>Preferred Date</label>
      <input type="date" class="form-input" id="bkDate" min="${today}"/>
    </div>
    <div class="form-group"><label>Session Mode</label>
      <select class="form-input form-select" id="bkMode">
        <option>Text Chat</option><option>Video Call</option><option>Voice Call</option>
      </select>
    </div>
    <div class="form-group"><label>Your Concern (optional)</label>
      <input type="text" class="form-input" id="bkConcern" placeholder="e.g. career anxiety, decision fatigue..."/>
    </div>
    <button class="btn-auth" onclick="proceedToPayment()">Proceed to Payment →</button>`;
  document.getElementById("bookingModal").classList.remove("hidden");
}
function proceedToPayment(){
  const date=document.getElementById("bkDate")?.value;
  if(!date){showToast("Please select a date");return;}
  const body=document.getElementById("bookingModalBody");
  const walletInfo=walletAddress?`<div style="background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.15);border-radius:10px;padding:12px 16px;margin-bottom:18px;font-family:var(--font-mono);font-size:.78rem;color:var(--cyan)">⬡ Paying from: ${walletAddress.slice(0,12)}...${walletAddress.slice(-6)}</div>`:"";
  body.innerHTML=`
    <h2 class="bm-title">Simulated Payment</h2>
    <p class="bm-sub">Demo only — no real charge will be made</p>
    <div class="bm-plan-info">
      <span class="bm-plan-name">Total Due</span>
      <span class="bm-plan-price">₹${_bPrice}</span>
    </div>
    ${walletInfo}
    <div class="form-group"><label>Card Number</label><input class="form-input" value="4242 4242 4242 4242" readonly/></div>
    <div class="form-row-2">
      <div class="form-group"><label>Expiry</label><input class="form-input" value="12/28" readonly/></div>
      <div class="form-group"><label>CVV</label><input class="form-input" value="•••" readonly/></div>
    </div>
    <button class="btn-auth" onclick="confirmPayment()">Confirm & Pay ₹${_bPrice} →</button>
    <p style="text-align:center;font-family:var(--font-mono);font-size:.68rem;color:var(--t3);margin-top:10px">🔒 Simulated secure payment — no real transaction</p>`;
}
function confirmPayment(){
  document.getElementById("bookingModalBody").innerHTML=`
    <div style="text-align:center;padding:40px 20px">
      <div style="width:52px;height:52px;border:3px solid var(--border);border-top-color:var(--cyan);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 24px"></div>
      <p style="color:var(--t2);font-family:var(--font-mono)">Processing${walletAddress?" on-chain":""}...</p>
    </div>`;
  setTimeout(()=>{
    const ref="BC-"+Math.random().toString(36).substr(2,8).toUpperCase();
    addTx("Session Booking",_bPrice+" INR",ref);
    trackEvent("booking",{type:_bType,price:_bPrice,ref});
    document.getElementById("bookingModalBody").innerHTML=`
      <div style="text-align:center;padding:30px 20px">
        <div style="font-size:3.5rem;margin-bottom:16px">✅</div>
        <h3 style="font-size:1.4rem;font-weight:800;margin-bottom:8px">Session Booked!</h3>
        <p style="color:var(--t2);margin-bottom:20px">Confirmation sent to ${currentUser?.email||"your email"}.</p>
        <div style="background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.15);border-radius:10px;padding:12px 20px;font-family:var(--font-mono);font-size:.82rem;color:var(--cyan);margin-bottom:24px">
          Ref: ${ref}${walletAddress?"<br>Tx: 0x"+Math.random().toString(16).substr(2,40):""}
        </div>
        <button class="btn-primary" onclick="closeBookingModal()">Done</button>
      </div>`;
  },2200);
}
function closeBookingModal(){ document.getElementById("bookingModal").classList.add("hidden"); }
document.getElementById("bookingModal").addEventListener("click",function(e){if(e.target===this)closeBookingModal();});

// ============================================================
// 15. ANALYSIS ENGINE
// ============================================================
function buildProfile(events){
  const hovers  = events.filter(e=>e.type==="article_hover");
  const reads   = events.filter(e=>e.type==="article_read");
  const chats   = events.filter(e=>e.type==="chat_answer");
  const games   = events.filter(e=>e.type==="game_complete");
  const logicAs = events.filter(e=>e.type==="logic_answer");

  const avgHover = hovers.length?hovers.reduce((s,e)=>s+(e.data.hoverTime||0),0)/hovers.length:0;
  const avgRead  = reads.length?reads.reduce((s,e)=>s+(e.data.seconds||0),0)/reads.length:0;

  const engScore  = Math.min(20,reads.length*3+hovers.length);
  const attScore  = Math.min(20,Math.round(avgHover*4));
  const cogScore  = Math.min(20,games.length*5+Math.min(5,logicAs.filter(e=>e.data.correct).length*2));
  const socScore  = Math.min(20,Math.round(chats.length*0.67));
  const depScore  = Math.min(20,Math.round(avgRead*1.5));
  const score     = Math.min(100,engScore+attScore+cogScore+socScore+depScore);

  const dims={
    attention:   Math.min(100,Math.round(avgHover*20)),
    depth:       Math.min(100,Math.round(avgRead*8)),
    analytical:  logicAs.length?Math.min(100,Math.round((logicAs.filter(e=>e.data.correct).length/logicAs.length)*100)):0,
    social:      Math.min(100,chats.length*3),
    persistence: Math.min(100,games.length*25),
    growth:      Math.min(100,chatState.dims.growth*17),
  };

  const traits=[];
  if(hovers.length>0){
    if(avgHover>=3) traits.push({icon:"🔍",name:"Deep Evaluator",desc:`Avg hover ${avgHover.toFixed(1)}s — deliberate before committing`});
    else            traits.push({icon:"⚡",name:"Rapid Scanner",desc:`Avg hover ${avgHover.toFixed(1)}s — quick decisive judgment`});
  }
  if(reads.length>0){
    if(avgRead>=40) traits.push({icon:"📚",name:"Deep Reader",desc:`${avgRead.toFixed(0)}s avg reading — thorough content processing`});
    else            traits.push({icon:"🏃",name:"Efficient Skimmer",desc:"Extracts key ideas fast — goal-oriented reader"});
  }
  if(logicAs.length>=5){
    const acc=logicAs.filter(e=>e.data.correct).length/logicAs.length;
    if(acc>0.7) traits.push({icon:"🧠",name:"Logical Thinker",desc:`${Math.round(acc*100)}% logic accuracy — systematic reasoning`});
    else        traits.push({icon:"🔄",name:"Intuitive Solver",desc:"Favors intuition over step-by-step deduction"});
  }
  if(chats.length>=10) traits.push({icon:"💬",name:"Self-Reflective",desc:`${chats.length} questions answered — high self-awareness`});
  if(games.length>=3)  traits.push({icon:"🎮",name:"Cognitively Curious",desc:"Explored multiple cognitive games — strong learning drive"});
  if(walletAddress)    traits.push({icon:"🔗",name:"Web3 Native",desc:"Connected crypto wallet — early technology adopter"});
  if(!traits.length)   traits.push({icon:"❓",name:"Profile Building",desc:"Complete activities to unlock behavioral traits"});

  const insights=[];
  if(hovers.length>0){
    if(avgHover>2) insights.push({label:"Decision Style",text:"You carefully evaluate options before committing. This suggests a deliberate, low-impulsivity decision architecture consistent with high conscientiousness."});
    else           insights.push({label:"Decision Style",text:"You decide quickly and move on. Strong action-orientation and comfort with ambiguity — entrepreneurial cognitive patterns."});
  }
  if(reads.length>0){
    if(avgRead>30) insights.push({label:"Learning Pattern",text:"Extended reading sessions indicate deep processing — you extract meaning, not just information. Your encoding depth is likely high."});
    else           insights.push({label:"Learning Pattern",text:"You read efficiently, scanning for key insights. Goal-oriented and selective in what deserves your full attention."});
  }
  const correctLogic=logicAs.filter(e=>e.data.correct).length;
  if(correctLogic>=7) insights.push({label:"Analytical Ability",text:"Strong logic scores indicate active, systematic reasoning — you evaluate premises before concluding, rather than relying on intuition alone."});
  if(chats.length>=15) insights.push({label:"Self-Awareness",text:`Engaging with ${chats.length} introspective questions places you in the top quartile for self-reflection. High openness to experience signature.`});
  const rxGames=games.filter(g=>g.data.game==="reaction");
  if(rxGames.length>0){
    const avgRt=rxGames.reduce((s,g)=>s+(g.data.avgMs||0),0)/rxGames.length;
    insights.push({label:"Processing Speed",text:`Your average reaction time of ${Math.round(avgRt)}ms indicates ${avgRt<250?"fast":avgRt<350?"average":"deliberate"} cognitive processing speed.`});
  }
  if(!insights.length) insights.push({label:"Getting Started",text:"Complete activities across Articles, Games, and Chat to generate personalized behavioral insights."});

  return {score,dims,traits,insights,breakdown:{engScore,attScore,cogScore,socScore,depScore}};
}

function renderAnalysis(){
  const ev=getEvents(), profile=buildProfile(ev);
  // Score ring
  const circ=document.getElementById("scoreCircle");
  if(circ){ const c=2*Math.PI*66; setTimeout(()=>{ circ.style.strokeDashoffset=c-(profile.score/100)*c; circ.style.transition="stroke-dashoffset 1.2s ease"; },100); }
  setText("scoreVal", profile.score||"—");
  setText("heroScore",profile.score||"—");
  // Radar
  drawRadar(profile.dims);
  // Traits
  const tl=document.getElementById("traitsList");
  if(tl){
    tl.innerHTML="";
    profile.traits.forEach(t=>{
      const el=document.createElement("div"); el.className="trait-item";
      el.innerHTML=`<div class="trait-icon-lg">${t.icon}</div><div class="trait-body"><div class="trait-name">${t.name}</div><div class="trait-desc">${t.desc}</div></div>`;
      tl.appendChild(el);
    });
  }
  // Insights
  const il=document.getElementById("insightsList");
  if(il){
    const grid=document.createElement("div"); grid.className="insights-grid";
    profile.insights.forEach(ins=>{
      const el=document.createElement("div"); el.className="insight-card";
      el.innerHTML=`<div class="insight-card-lbl">${ins.label}</div><div class="insight-card-text">${ins.text}</div>`;
      grid.appendChild(el);
    });
    il.innerHTML=""; il.appendChild(grid);
    const btn=document.createElement("button"); btn.className="btn-refresh"; btn.textContent="↻ Refresh"; btn.onclick=renderAnalysis;
    il.appendChild(btn);
  }
  // Data log
  const log=document.getElementById("dataLog");
  if(log){
    log.innerHTML="";
    [...ev].reverse().slice(0,30).forEach(ev=>{
      const el=document.createElement("div"); el.className="log-row";
      el.innerHTML=`<span class="log-time">${new Date(ev.timestamp).toLocaleTimeString()}</span><span class="log-type">${ev.type}</span><span class="log-data">${JSON.stringify(ev.data||{}).slice(0,60)}</span>`;
      log.appendChild(el);
    });
    if(!ev.length) log.innerHTML=`<p style="color:var(--t3);font-family:var(--font-mono);font-size:.8rem;padding:16px">No events yet — start exploring!</p>`;
  }
}

function drawRadar(dims){
  const canvas=document.getElementById("radarCanvas");
  if(!canvas)return;
  const ctx=canvas.getContext("2d"),cx=150,cy=150,r=105,sides=6;
  const labels=["attention","depth","analytical","social","persistence","growth"];
  const vals=labels.map(k=>(dims[k]||0)/100);
  ctx.clearRect(0,0,300,300);
  // rings
  for(let ring=1;ring<=5;ring++){
    ctx.beginPath();
    for(let i=0;i<sides;i++){
      const a=(Math.PI*2/sides)*i-Math.PI/2,rr=(ring/5)*r;
      i?ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)):ctx.moveTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a));
    }
    ctx.closePath(); ctx.strokeStyle="rgba(255,255,255,0.06)"; ctx.stroke();
  }
  // spokes
  for(let i=0;i<sides;i++){
    const a=(Math.PI*2/sides)*i-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
    ctx.strokeStyle="rgba(255,255,255,0.06)"; ctx.stroke();
  }
  // data
  ctx.beginPath();
  for(let i=0;i<sides;i++){
    const a=(Math.PI*2/sides)*i-Math.PI/2,rv=vals[i]*r;
    i?ctx.lineTo(cx+rv*Math.cos(a),cy+rv*Math.sin(a)):ctx.moveTo(cx+rv*Math.cos(a),cy+rv*Math.sin(a));
  }
  ctx.closePath(); ctx.fillStyle="rgba(0,229,255,0.14)"; ctx.fill();
  ctx.strokeStyle="rgba(0,229,255,0.75)"; ctx.lineWidth=2; ctx.stroke();
  for(let i=0;i<sides;i++){
    const a=(Math.PI*2/sides)*i-Math.PI/2,rv=vals[i]*r;
    ctx.beginPath(); ctx.arc(cx+rv*Math.cos(a),cy+rv*Math.sin(a),4,0,Math.PI*2);
    ctx.fillStyle="#00e5ff"; ctx.fill();
  }
  // labels
  ctx.fillStyle="rgba(122,155,181,.85)"; ctx.font="11px JetBrains Mono,monospace"; ctx.textAlign="center";
  for(let i=0;i<sides;i++){
    const a=(Math.PI*2/sides)*i-Math.PI/2;
    ctx.fillText(labels[i],cx+(r+24)*Math.cos(a),cy+(r+24)*Math.sin(a)+4);
  }
}

// ============================================================
// 16. BLOCKCHAIN
// ============================================================
function initBlockchainPage(){
  if(walletAddress){
    setText("bcAddress", walletAddress);
    setText("bcNetwork","Sepolia Testnet");
    setText("bcBalance",(Math.random()*0.5).toFixed(4));
    setText("bcTxCount",Math.floor(Math.random()*50)+1);
    const minted=JSON.parse(localStorage.getItem(LS.minted)||"null");
    if(minted) setText("bcNFTs","1");
    const btn=document.getElementById("bcConnectBtn");
    if(btn) btn.style.display="none";
  }
}
function refreshBlockchain(){
  initBlockchainPage();
  const list=document.getElementById("txList");
  if(!list)return;
  const txs=JSON.parse(localStorage.getItem(LS.txs)||"[]");
  if(!txs.length){list.innerHTML=`<p class="tx-empty">No transactions yet. Mint your profile to see activity.</p>`;return;}
  list.innerHTML="";
  txs.forEach(tx=>{
    const el=document.createElement("div"); el.className="tx-item";
    el.innerHTML=`<span class="tx-hash">${tx.hash.slice(0,12)}...${tx.hash.slice(-6)}</span><span class="tx-type">${tx.type}</span><span class="tx-status">✓ ${tx.status}</span>`;
    list.appendChild(el);
  });
}
function addTx(type,amount,hash){
  const txs=JSON.parse(localStorage.getItem(LS.txs)||"[]");
  txs.unshift({type,amount,hash,ts:Date.now(),status:"Confirmed"});
  localStorage.setItem(LS.txs,JSON.stringify(txs.slice(0,20)));
}
function mintProfile(){
  if(!walletAddress){showToast("Connect your MetaMask wallet first to mint");return;}
  const btn=document.getElementById("mintBtn");
  btn.textContent="Minting..."; btn.disabled=true;
  setText("mintStatus","⏳ Submitting transaction...");
  setTimeout(()=>{
    setText("mintStatus","⏳ Waiting for block confirmation...");
    setTimeout(()=>{
      const hash="0x"+Math.random().toString(16).substr(2,64);
      const tokenId=Math.floor(Math.random()*9999);
      localStorage.setItem(LS.minted,JSON.stringify({hash,tokenId,ts:Date.now()}));
      addTx("Mint BehaviorNFT","~0.001 ETH gas",hash);
      trackEvent("nft_minted",{hash,tokenId});
      setText("mintStatus",`✓ Minted! Token #${tokenId}`);
      setText("bcNFTs","1");
      btn.textContent=`⬡ NFT #${tokenId} Minted`;
      btn.style.cssText="color:var(--teal);border-color:var(--teal)";
      showToast(`🎉 BehaviorNFT #${tokenId} minted!`);
      refreshBlockchain();
    },2000);
  },1500);
}
function simulateContractCall(fn){
  const out=document.getElementById("contractOutput");
  out.textContent=`> Calling ${fn}()...\n> Estimating gas...\n`;
  setTimeout(()=>{
    const p=buildProfile(getEvents());
    const results={
      registerProfile:`> registerProfile(address: ${walletAddress||"0x0 — connect wallet"})\n> Gas estimated: 87,432\n> Status: ${walletAddress?"SUCCESS ✓":"REVERT: caller not connected"}\n> Event: ProfileRegistered(${walletAddress?.slice(0,12)||"null"}, score=${p.score})`,
      getProfile:`> getProfile(${walletAddress||"0x0"})\n> Returns:\n  score: uint256 = ${p.score}\n  traits: string[] = [${p.traits.slice(0,2).map(t=>t.name).join(", ")}]\n  timestamp: ${Date.now()}\n  minted: ${!!localStorage.getItem(LS.minted)}`,
      mintNFT:`> mintBehaviorNFT(to: ${walletAddress||"0x0 — connect wallet"})\n> TokenId: #${Math.floor(Math.random()*9999)}\n> IPFS: ipfs://Qm${Math.random().toString(36).substr(2,40)}\n> Gas: 142,800\n> Status: ${walletAddress?"PENDING CONFIRMATION":"REVERT: wallet not connected"}`,
      updateScore:`> updateScore(addr: ${walletAddress||"0x0"}, newScore: ${p.score})\n> Gas: 32,100\n> Status: ${walletAddress?"SUCCESS ✓":"REVERT: unauthorized"}\n> Emitted: ScoreUpdated(${walletAddress?.slice(0,12)||"null"}, ${p.score})`,
    };
    out.textContent=results[fn]||"> Unknown function";
    if(walletAddress) addTx(fn+"()","~0.001 ETH","0x"+Math.random().toString(16).substr(2,64));
    refreshBlockchain();
  },800);
}

// ============================================================
// 17. TOAST
// ============================================================
function showToast(msg,dur=3200){
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.remove("hidden");
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.add("hidden"),dur);
}

// ============================================================
// 18. INIT ON PAGE LOAD
// ============================================================
window.addEventListener("DOMContentLoaded",()=>{
  // Check saved session
  const saved=localStorage.getItem(LS.user);
  if(saved){
    try{ loginUser(JSON.parse(saved)); }
    catch(e){ localStorage.removeItem(LS.user); }
  }
  // Check saved wallet
  const savedW=localStorage.getItem(LS.wallet);
  if(savedW&&currentUser) setWallet(savedW);
});

// Scroll depth tracking
const scrollMilestones={};
window.addEventListener("scroll",()=>{
  const active=document.querySelector(".page.active");
  if(!active||!currentUser)return;
  const maxSc=document.body.scrollHeight-window.innerHeight;
  if(maxSc<1)return;
  const pct=Math.min(100,Math.round((window.scrollY/maxSc)*100));
  const m=Math.floor(pct/25)*25;
  const key=active.id+"_"+m;
  if(m>0&&!scrollMilestones[key]){
    scrollMilestones[key]=true;
    trackEvent("scroll",{page:active.id,pct:m});
  }
},{passive:true});


// =======================
// META MASK CONNECT
// =======================
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      walletAddress = accounts[0];

      localStorage.setItem(LS.wallet, walletAddress);

      updateWalletUI(walletAddress);

      console.log("Connected:", walletAddress);

    } catch (err) {
      console.error("Connection failed", err);
    }
  } else {
    alert("MetaMask not installed");
  }
}
function updateWalletUI(address) {
  const short = address.slice(0, 6) + "..." + address.slice(-4);

  document.getElementById("walletShort").innerText = short;

  document.getElementById("walletConnected").classList.remove("hidden");
  document.getElementById("navConnectWallet").classList.add("hidden");

  document.getElementById("tg-chain").innerText = "Connected";
}
document.getElementById("loginWithWallet").onclick = connectWallet;
document.getElementById("signupWithWallet").onclick = connectWallet;
document.getElementById("navConnectWallet").onclick = connectWallet;

window.addEventListener("load", () => {
  const savedWallet = localStorage.getItem(LS.wallet);

  if (savedWallet) {
    walletAddress = savedWallet;
    updateWalletUI(savedWallet);
  }
});