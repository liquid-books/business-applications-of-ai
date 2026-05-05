---
title: Appendices
---

# Appendices

---

## Appendix A — GHL Quick-Reference Navigation Guide

This reference covers the exact GoHighLevel (GHL) menu paths used in Labs 8, 10, and 11. Print this page and keep it at your workstation during lab sessions. Navigation paths are written for the standard GHL sub-account interface; agency-level views may differ.

### Lab 8 — Marketing Automation & Funnel Builds

| Task | Navigation Path |
|------|----------------|
| Create a new funnel | **Sites → Funnels → + New Funnel** |
| Add a funnel step (opt-in page) | Open funnel → **+ Add New Step → Opt-In** |
| Edit funnel page content | Open funnel step → **Edit** (pencil icon) → drag-and-drop editor |
| Set up a form on opt-in page | Editor → **Elements → Form** → drag to canvas → configure fields |
| Connect form to a workflow | Editor → Form settings → **Linked Workflow → + Create / Select Workflow** |
| Create a new workflow | **Automation → Workflows → + New Workflow** |
| Add a workflow trigger | Workflow editor → **+ Add Trigger** → select trigger type |
| Add a workflow action (send email) | Workflow editor → **+ → Send Email** → configure template |
| Add a workflow action (add tag) | Workflow editor → **+ → Add Tag** → type or select tag |
| Publish a workflow | Workflow editor → toggle **Draft → Published** (top-right) |
| View form submissions | **Sites → Funnels → [Funnel Name] → Stats** or **Contacts → filter by tag** |
| Configure email sender identity | **Settings → Email Services → From Name / From Email** |
| Set up SMTP or Mailgun | **Settings → Email Services → SMTP Service** |

### Lab 10 — AI Ethics Review & Audit Trail

| Task | Navigation Path |
|------|----------------|
| Access conversation history (AI chatbot) | **Conversations → select contact → view full thread** |
| Review automated workflow execution log | **Automation → Workflows → [Workflow Name] → Execution Logs** |
| Add internal notes to a contact record | **Contacts → [Contact Name] → Notes tab → + Add Note** |
| Tag contacts for audit segmentation | **Contacts → [Contact Name] → Tags → + Add Tag** |
| Export contact list for review | **Contacts → filter → Actions → Export** (CSV) |
| View pipeline stage history | **CRM → Pipelines → [Pipeline Name] → [Opportunity] → Activity tab** |
| Manage user permissions | **Settings → Team Management → [User] → Permissions** |
| Review billing and usage | **Settings → Company Billing** |

### Lab 11 — Agentic Workflow Architecture

| Task | Navigation Path |
|------|----------------|
| Build a multi-step agent workflow | **Automation → Workflows → + New Workflow → Blank Workflow** |
| Add AI Content Generation action | Workflow editor → **+ → AI Tools → Content AI** |
| Add Wait step between agent actions | Workflow editor → **+ → Wait** → set duration or condition |
| Add conditional branch (If/Else) | Workflow editor → **+ → If/Else** → define condition logic |
| Connect workflow to inbound webhook | **+ Add Trigger → Inbound Webhook** → copy endpoint URL |
| Set up outbound HTTP action | Workflow editor → **+ → Custom Webhook** → configure URL, method, payload |
| Create a sub-account pipeline | **CRM → Pipelines → + Add Pipeline** → name and add stages |
| Move opportunity through pipeline via workflow | Workflow action → **+ → Move Opportunity In Funnel** → select pipeline and stage |
| Monitor live workflow executions | **Automation → Workflows → [Workflow] → Execution Logs → filter by date** |
| Trigger workflow manually for testing | **Contacts → [Test Contact] → Automations → + Add to Workflow** |
| View agent conversation (AI chatbot widget) | **Conversations → filter by channel: Live Chat / Web Chat** |
| Configure AI chatbot widget | **Sites → Chat Widget** or **Settings → Chat Widget → AI Chatbot tab** |

---

## Appendix B — AI Tool Reference Card

The following tools are used across the eleven chapters of this course. This table provides a quick orientation for students setting up their tool stack at the beginning of the semester.

| Tool | What It Does | Where Used in Book | Free Tier Available | Best For |
|------|-------------|-------------------|--------------------|---------:|
| **Gemini** (Google) | Multimodal LLM: text, images, documents, long-context reasoning | Ch 1–11 (primary AI partner throughout) | Yes — Gemini 1.5 Flash free via AI Studio | Strategic analysis, document synthesis, long-context tasks, rapid iteration |
| **Claude** (Anthropic) | Conversational LLM with strong reasoning, writing, and instruction-following | Ch 2, 3, 5, 8, 10 | Yes — Claude.ai free tier (limited) | Nuanced writing, ethical reasoning, business document drafting |
| **Claude Code** (Anthropic) | Agentic coding assistant that reads/writes files, runs commands, and iterates | Ch 6 (vibe coding), Ch 11 | No — requires API access or Claude Pro | Autonomous code generation, debugging, vibe coding sessions |
| **Google AI Studio** | Web IDE for Gemini API: prompt testing, multimodal builds, API key generation | Ch 1 (setup), Ch 6, Ch 7, Ch 11 | Yes — free access to Gemini models | Hands-on builds, weekly lab sessions, prototyping AI features |
| **NotebookLM** (Google) | Grounded Q&A and synthesis over uploaded documents; generates study guides, podcasts | Ch 3 (market research), Ch 9 | Yes — free | Synthesizing research docs, competitive analysis, investor memo prep |
| **GoHighLevel (GHL)** | All-in-one CRM, funnel builder, email/SMS automation, and AI workflow platform | Ch 8 (martech), Ch 10 (audit), Ch 11 (agentic workflows) | No — paid (trial available) | Marketing automation, pipeline management, agentic business workflows |
| **Cursor / Windsurf** | AI-native code editors with in-editor chat, autocomplete, and agent modes | Ch 6 (vibe coding) | Yes — free tiers available | Vibe coding, building web apps without traditional software engineering background |
| **ChatGPT** (OpenAI) | Broadly capable LLM; widely known entry point to generative AI | Ch 1 (context), Ch 2 | Yes — GPT-4o free tier | General-purpose drafting, quick lookups; useful baseline for comparison |
| **Perplexity** | AI-powered search engine with cited, real-time web sources | Ch 3 (ICP research), Ch 9 | Yes — free tier | Market research with citations, competitor discovery, real-time information retrieval |

---

## Appendix C — Meta-Prompting Templates

Meta-prompting is the practice of designing prompts with explicit structure: you specify role, context, constraints, output format, and iteration criteria *before* asking AI to generate anything. The following six templates correspond to major deliverables in the course. Each contains `[PLACEHOLDER]` fields — replace them with your specific information before submitting.

---

### Template 1 — The Pain Translator *(Chapter 2: Customer Discovery)*

> You are a customer discovery strategist with deep experience in [INDUSTRY]. I am building [PRODUCT/SERVICE DESCRIPTION] for [TARGET CUSTOMER SEGMENT]. Based on the following raw interview notes or assumptions, identify the three most acute customer pains — not surface complaints, but the underlying anxieties that drive behavior. [PASTE NOTES OR LIST ASSUMPTIONS HERE]. For each pain, provide: (1) a plain-language name, (2) the specific moment it is felt most acutely (the "trigger moment"), and (3) the emotional and economic cost the customer associates with it. Format your output as a structured table. Do not speculate beyond what the evidence supports — flag any inference as an assumption.

---

### Template 2 — The ICP Dossier Builder *(Chapter 3: Ideal Customer Profile)*

> You are a B2B market researcher specializing in [INDUSTRY OR MARKET]. I am building a detailed Ideal Customer Profile (ICP) for [COMPANY NAME / PRODUCT]. My target customer is a [JOB TITLE] at a [COMPANY SIZE / STAGE / INDUSTRY] company. Using publicly available data patterns and your knowledge of this segment, generate a full ICP dossier that includes: demographic profile, psychographic profile (values, fears, aspirations), a typical week in their work life, the top three tools they use daily, where they get industry information, who influences their purchasing decisions, and what a "win" looks like to them. [ADD ANY SPECIFIC CONTEXT OR CONSTRAINTS HERE]. Be specific. Avoid generic descriptions — this dossier should feel like a portrait of a real person.

---

### Template 3 — The Unit Economics Stress Tester *(Chapter 4: Unit Economics)*

> You are a startup CFO reviewing the unit economics of an early-stage company. The company is [COMPANY DESCRIPTION]. Current metrics are: CAC = $[X], LTV = $[Y], gross margin = [Z]%, monthly churn = [W]%, and average contract value = $[ACV]. Evaluate whether these metrics indicate a viable business at scale. Then stress-test three scenarios: (1) CAC doubles due to increased competition, (2) churn increases by [PERCENTAGE POINT] because of a product quality issue, and (3) gross margin compresses by [PERCENTAGE POINT] due to infrastructure costs. For each scenario, show the impact on LTV:CAC ratio and payback period, and state clearly whether the business remains fundable. Flag any metric that is outside acceptable range for [BUSINESS MODEL TYPE — SaaS / marketplace / services / etc.].

---

### Template 4 — The Pitch Critic *(Chapter 5: Investor Pitch)*

> You are a Series A venture partner who has reviewed more than five hundred pitch decks. I am pitching [COMPANY NAME], a [ONE-SENTENCE DESCRIPTION]. Our target raise is $[AMOUNT] at a $[VALUATION] pre-money valuation. Below is the narrative arc of my pitch: [PASTE PITCH OUTLINE OR DECK NOTES HERE]. Review this pitch from the perspective of an investor who is skeptical but open-minded. Identify the three questions you would ask that the current pitch does not answer, the single most significant gap in the logic, and the one thing that, if strengthened, would most increase the probability of a yes. Then rewrite the opening two slides as you would want to see them — direct, specific, and free of clichés. Be honest. Do not soften your critique.

---

### Template 5 — The Brand Voice Generator *(Chapter 8: Marketing Systems)*

> You are a brand strategist and copywriter. I am building a marketing voice for [COMPANY NAME], a [PRODUCT/SERVICE DESCRIPTION] targeting [TARGET AUDIENCE]. The brand's core values are [VALUE 1], [VALUE 2], and [VALUE 3]. The brand should feel [ADJECTIVE 1] and [ADJECTIVE 2], and should never feel [ADJECTIVE TO AVOID]. Review the following sample copy: [PASTE 2–3 EXISTING COPY SAMPLES OR DRAFT PARAGRAPHS]. Based on this input, generate: (1) a brand voice statement in three sentences, (2) a vocabulary guide — ten words we use, ten we avoid, (3) a tone spectrum for four contexts: social media, email, sales pages, and customer support. Then rewrite [SPECIFIC COPY SAMPLE] in the defined voice and explain what changed and why.

---

### Template 6 — The Ethics Audit *(Chapter 10: AI Ethics & Governance)*

> You are an AI ethics auditor with expertise in [INDUSTRY]. I am deploying [AI SYSTEM DESCRIPTION — e.g., an automated lead qualification agent / a customer-facing chatbot / a content generation workflow] at [COMPANY NAME]. The system makes the following decisions autonomously: [LIST AUTOMATED DECISIONS]. Using the EU AI Act risk classification framework and the principles of algorithmic accountability, evaluate this system across five dimensions: (1) transparency — do affected parties know AI is involved?, (2) fairness — are there populations that may be systematically disadvantaged?, (3) human oversight — what is the blast radius if the system fails, and who is responsible?, (4) data governance — what personal data is processed and under what consent conditions?, and (5) auditability — can decisions be reviewed and explained after the fact? For each dimension, provide a risk rating (Low / Medium / High) and one specific remediation recommendation. [ADD ANY ADDITIONAL CONTEXT HERE].

---

## Appendix D — Master Glossary

The following definitions compile key terms from all eleven chapters. Definitions are written in plain language for accessibility; technical precision is prioritized over simplicity where the distinction matters.

---

**AI-native moat**
A competitive advantage that can only exist because AI capabilities are deeply embedded in a company's product, operations, or data — not merely bolted on. Unlike traditional moats (brand, switching costs), an AI-native moat grows as the model learns from proprietary usage data.

**Agent graph position**
The role a specific AI agent occupies within a larger multi-agent network — whether it is an orchestrator directing other agents, a specialist subagent executing specific tasks, or a reviewer validating outputs before they propagate downstream.

**Agentic enterprise**
An organization in which AI agents — rather than individual human workers at each step — execute significant portions of core business processes autonomously, with humans setting goals and managing exceptions rather than performing each operation.

**Algorithmic accountability**
The principle that organizations deploying AI decision-making systems are responsible for the outcomes those systems produce, even when the specific decision was made by an algorithm. Accountability cannot be delegated to the model.

**Asymmetry premium**
The economic advantage gained by an individual or organization that holds superior information, analytical capability, or AI leverage relative to competitors or counterparties. AI dramatically increases the size of achievable asymmetry premiums.

**Barbell economy**
An economic structure, accelerated by AI, in which value concentrates at two extremes — high-skill creative and strategic work commanding premium prices, and low-cost commodity work fully automated — while the middle erodes. Mid-skill knowledge work is most exposed.

**Beachhead market**
A narrowly defined initial target market chosen because it can be dominated quickly and used as a launch point to expand into adjacent markets. In AI-era startups, choosing the right beachhead often determines whether network effects and data advantages can compound.

**Blast radius**
The scope of damage caused when an automated AI system fails or produces incorrect outputs. Estimating blast radius — how many decisions are affected, how reversible they are, how fast the error propagates — is a core input to the trust and control framework for agent deployment.

**CAC (Customer Acquisition Cost)**
The total cost required to acquire one new paying customer, including all sales and marketing expenses divided by the number of new customers in a given period. CAC is meaningful only in relation to LTV and payback period.

**Churn**
The rate at which existing customers cancel or fail to renew over a given period. Monthly churn of even small percentages compounds destructively at scale; churn is often the single most important metric for subscription and SaaS businesses.

**Cohort analysis**
A method of analyzing customer behavior by grouping customers who started in the same time period (a cohort) and tracking their behavior — retention, revenue, engagement — over subsequent periods. Cohort analysis reveals whether a business is improving or deteriorating over time.

**Contribution margin**
Revenue minus variable costs: what each additional unit of sale contributes toward covering fixed costs and generating profit. Contribution margin analysis determines which products or customer segments are worth scaling.

**EU AI Act**
The European Union's comprehensive regulatory framework for artificial intelligence, effective 2024–2026, which classifies AI systems by risk level (unacceptable, high, limited, minimal) and imposes transparency, documentation, and oversight requirements proportionate to risk. The highest-risk systems — biometric surveillance, credit scoring, hiring decisions — face the strictest requirements.

**Feedback loop (AI)**
A cycle in which an AI system's outputs influence the data on which future versions of the system are trained or the environment in which it operates, potentially amplifying biases or errors over time if not monitored. Positive feedback loops can also accelerate improvement.

**Fiduciary rule**
The legal and ethical obligation of a professional (financial advisor, attorney, physician) to act in the client's best interest rather than their own. As AI takes on advisory functions, the question of whether AI systems bear fiduciary-equivalent obligations is an emerging governance challenge.

**GDPR (General Data Protection Regulation)**
The European Union's primary data privacy law, which grants individuals rights over their personal data and imposes obligations on organizations that collect or process it — including the right to explanation of automated decisions.

**Gross margin**
Revenue minus cost of goods sold (COGS), expressed as a percentage of revenue. High gross margin (>70% for software) indicates that the core product scales efficiently; low gross margin constrains the ability to fund growth through operations.

**ICP (Ideal Customer Profile)**
A detailed description of the specific type of customer — defined by industry, company size, role, behavior, pain points, and budget — for whom a product creates the most value and who is most likely to buy, retain, and expand. A precise ICP is the foundation of effective sales and marketing.

**Imago Dei governance**
An ethics framework, developed in Chapter 10, grounded in the Christian theological claim that human beings bear the image of God (*imago Dei*) — and that AI systems must therefore be designed and governed in ways that respect human dignity, preserve meaningful human agency, and avoid reducing persons to data points.

**Information tax**
The hidden cost imposed on individuals and organizations by information asymmetry — the overhead of not knowing what a counterparty knows. AI is collapsing information taxes across industries (real estate, law, medicine, finance), restructuring the value of expertise.

**Interpretation asymmetry**
The gap between two parties' ability to understand, contextualize, and act on the same information. AI dramatically widens interpretation asymmetry in favor of users who understand how to deploy it — creating new categories of competitive advantage and professional risk.

**Jobs to Be Done (JTBD)**
A framework for understanding customer motivation: customers do not buy products, they hire them to accomplish a specific job — a progress they are trying to make in their lives. Understanding the job illuminates what a product must do to succeed and what alternatives it actually competes against.

**LTV (Lifetime Value)**
The total net revenue a business can expect from a single customer over the full duration of the relationship. LTV is the ceiling on rational customer acquisition spending; the LTV:CAC ratio is a primary indicator of business model health.

**Meta-prompting**
The practice of designing prompts with explicit structure — specifying role, context, constraints, output format, and iteration criteria — before asking an AI system to generate output. Meta-prompting treats prompt design as an engineering discipline rather than a conversational act.

**NRR (Net Revenue Retention)**
The percentage of revenue retained from an existing customer cohort over a period, including expansions and upgrades but excluding new customer acquisitions. NRR above 100% indicates the existing customer base is growing on its own — a key indicator of product-market fit durability.

**Orchestrator/subagent**
An agent architecture pattern in which a master agent (orchestrator) decomposes a complex goal into subtasks and delegates them to specialized agents (subagents), then synthesizes results. The orchestrator maintains goal coherence; subagents execute specific operations without needing to understand the full objective.

**Pipeline (GHL)**
In GoHighLevel, a visual representation of a sales or fulfillment process as a series of stages through which opportunities move. Pipelines enable tracking, forecasting, and automation triggers based on deal stage changes.

**Prompt IP**
The intellectual property embedded in a well-designed, proprietary prompt — including role specification, context, constraints, and output format — that consistently produces valuable outputs. As AI becomes operationally central, prompt libraries represent a form of organizational knowledge asset.

**Synthetic employee**
An AI agent configured with a specific persona, role, and set of capabilities that executes defined business functions — lead qualification, customer follow-up, content drafting — autonomously, without human intervention at each step. Synthetic employees do not replace human judgment at system design; they replace human execution at scale.

**Trust premium**
The price premium, customer loyalty, or competitive advantage that accrues to organizations perceived as trustworthy stewards of AI — those that are transparent about AI use, accountable for AI decisions, and demonstrably safe in how they deploy automation. In an era of AI skepticism, trust is a differentiator.

**Unit economics**
The revenue and cost associated with a single unit of business — one customer, one transaction, one subscription — used to evaluate whether a business model is fundamentally profitable before scaling. Strong unit economics are a prerequisite for healthy growth; scaling poor unit economics accelerates losses.

**Value Proposition Canvas**
A strategic tool (Osterwalder) for aligning a product's features with customer needs by mapping customer jobs, pains, and gains against the product's pain relievers, gain creators, and features. Used in Chapters 2–3 to validate that product design solves real problems customers are willing to pay to resolve.

**Vibe coding**
A mode of software development in which a non-engineer directs an AI coding agent (Claude Code, Cursor, Windsurf) using natural language and iterative feedback rather than writing code directly. Vibe coding compresses the time from idea to working prototype and democratizes product development.

**Workflow trigger**
In GoHighLevel and other automation platforms, the specific event that initiates an automated workflow — a form submission, a tag applied, a pipeline stage change, a date reached, or an inbound message. Trigger design is the foundation of reliable automation architecture.

---

## Appendix E — Recommended Reading List

The following books are organized by theme and selected for their relevance to the course's intellectual agenda. Each is chosen because it extends or challenges ideas introduced in the chapters — these are not summaries of the course but provocations to go deeper.

---

### Foundational AI Strategy

**Erik Brynjolfsson and Andrew McAfee** — *The Second Machine Age: Work, Progress, and Prosperity in a Time of Brilliant Technologies*
The clearest economic account of how digital intelligence differs from prior general-purpose technologies, and what that difference means for labor markets and growth.

**Mustafa Suleyman** — *The Coming Wave: Technology, Power, and the Twenty-First Century's Greatest Dilemma*
A first-person account from an AI founder on the dual-use nature of AI capabilities and the governance challenges that advanced systems will force upon every institution.

**Ben Thompson** — *Stratechery (subscription newsletter)*
Not a book, but the most rigorous ongoing analysis of how AI is restructuring industry competitive dynamics; the aggregation theory framework is essential for understanding platform-era business models.

**Ethan Mollick** — *Co-Intelligence: Living and Working with AI*
A Wharton professor's accessible and empirically grounded guide to what the research actually shows about how AI augments human performance — and where it falls short.

**Reid Hoffman and GPT-4** — *Impromptu: Amplifying Our Humanity Through AI*
A thought experiment and provocation on AI's potential, written in collaboration with GPT-4 itself — useful for understanding the current ceiling of large-language-model reasoning.

---

### Entrepreneurship & Business Model Design

**Alex Osterwalder and Yves Pigneur** — *Business Model Generation*
The foundational text for the Business Model Canvas framework used throughout this course; essential reading for any student who wants to use the BMC as a strategic tool rather than a fill-in-the-blank template.

**Clayton Christensen** — *The Innovator's Dilemma*
The definitive account of why successful companies fail when disruptive technologies arrive — a framework that applies directly to the AI disruption analysis in Chapter 1.

**Eric Ries** — *The Lean Startup*
The standard reference for the build-measure-learn cycle underlying the MVP development approach in Chapters 5 and 6; read alongside the vibe coding lab for maximum application.

**Bob Moesta** — *Demand-Side Sales 101*
The clearest practical application of Jobs to Be Done theory to sales and product development; Moesta is the practitioner who built the JTBD methodology alongside Christensen.

---

### Faith & Technology

**Andy Crouch** — *The Life We're Looking For: Reclaiming Relationship in a Technological World*
A theologically sophisticated account of how technology reshapes the conditions for human flourishing — and what the Christian tradition offers as a corrective to techno-optimism and techno-panic alike.

**Albert Borgmann** — *Technology and the Character of Contemporary Life*
A philosophical examination of how devices and systems hide their operations from users, creating what Borgmann calls the "device paradigm" — essential background for thinking about AI as embedded infrastructure.

**Shoshana Zuboff** — *The Age of Surveillance Capitalism*
A detailed account of how attention and behavioral data became the raw material of a new economic logic — relevant to every chapter on AI data, ethics, and platform power.

**Francis Schaeffer** — *How Should We Then Live?*
A sweeping cultural history and theological argument about the relationship between Christian values and Western civilization — a foundational text for students who want to think seriously about the faith dimensions raised in Chapter 10.

---

### Economics of AI & Labor

**Daron Acemoglu and Simon Johnson** — *Power and Progress: Our Thousand-Year Struggle Over Technology and Prosperity*
An economic history of technological change and its distributional consequences, culminating in a sober argument about why AI's benefits will not automatically flow to workers without deliberate institutional choices.

**David Autor** — *The Work of the Future: Building Better Jobs in an Age of Intelligent Machines*
The clearest account of labor market polarization from the economist who defined it; essential for understanding the barbell economy thesis in Chapter 1.

**Tyler Cowen** — *Average Is Over: Powering America Beyond the Age of the Great Stagnation*
A provocative prediction of a bifurcated labor market in which those who can collaborate effectively with intelligent machines capture disproportionate rewards — written before ChatGPT and now empirically prescient.

**Kai-Fu Lee** — *AI Superpowers: China, Silicon Valley, and the New World Order*
A comparison of AI development strategies in the United States and China, useful for understanding AI as a geopolitical phenomenon with implications for international business and regulatory divergence.

---

### Ethics & Governance

**Virginia Eubanks** — *Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor*
Case studies of algorithmic decision-making systems deployed in public services — welfare, child protective services, policing — and the concrete harms they produce; the most grounded critique of algorithmic accountability failures available.

**Kate Crawford** — *Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence*
An examination of the physical, political, and social infrastructure underlying AI — mines, data centers, labor — that makes visible what is usually rendered invisible in discussions of AI capability.

**Cathy O'Neil** — *Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy*
An accessible account of how opaque algorithmic systems embedded in hiring, lending, insurance, and criminal justice produce discriminatory outcomes at scale — essential reading before the ethics audit in Chapter 10.

---
