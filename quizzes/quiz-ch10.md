# Quiz: Chapter 10 — AI Ethics, Governance, and the Responsible Enterprise

**Instructions:** Select the best answer(s) for each question. Some questions have two correct answers. Questions are drawn from the chapter readings and content.

---

## Question 1

The chapter defines the "ethics gap" as a structural feature of AI governance — not simply a failure of will or regulatory laziness. Which of the following correctly identifies TWO of the three structural reasons the chapter gives for why governance consistently lags AI capability?

- A) Technical opacity — AI systems produce outputs that even their designers cannot fully explain, making traditional accountability frameworks (audit trails, documented decision logic) difficult to apply
- B) Market saturation — AI companies face too much competition to invest in governance infrastructure
- C) Jurisdictional fragmentation — AI systems operate globally while regulatory bodies operate nationally, creating enforcement gaps that no single jurisdiction can close
- D) Consumer indifference — customers consistently prefer convenience over privacy and ethics, removing commercial incentive for responsible AI development
- E) Developer laziness — AI engineers are uninterested in building explainable systems

<details>
<summary>Show Answer & Explanations</summary>

- ⭐ A) ✅ The chapter explicitly identifies technical opacity as the first structural reason governance lags: "A law cannot hold a system accountable if no one can explain how it reached its conclusion. The black-box problem... means that traditional accountability frameworks cannot be straightforwardly applied. Regulatory agencies are not being lazy. They are writing rules for systems whose designers cannot fully explain."
- B) ❌ Market saturation is not identified as a structural cause of the ethics gap. The chapter points to regulatory capture (the interlocutor problem, where technical experts whose interests favor permissive governance are the natural bridge to policymakers) — not competition dynamics.
- ⭐ C) ✅ Jurisdictional fragmentation is the chapter's second structural reason: "AI systems operate globally; regulatory bodies operate nationally. A model trained in the United States on data scraped from a hundred countries, deployed via an API accessed from the European Union, and used to make decisions affecting customers in Brazil, is subject to — in theory — the laws of all those jurisdictions and, in practice, often the laws of none of them."
- D) ❌ Consumer indifference is not named as one of the three structural reasons. The chapter does not present this as a factor.
- E) ❌ Developer laziness is explicitly rejected by the chapter, which notes that regulatory agencies are "not being lazy" and frames the opacity problem as a genuine technical challenge rather than a motivation problem.

</details>

---

## Question 2

The EU AI Act assigns AI applications to risk tiers with proportional compliance obligations. Under the Act's classification system, which of the following uses of AI would most likely be classified as **high risk**, triggering the most intensive compliance requirements?

- A) A grammar-checking AI tool embedded in a company's internal email client
- B) A spam filter that automatically routes marketing emails to a junk folder
- C) An AI system used by a regional bank to pre-screen small business loan applications
- D) A customer service chatbot that answers frequently asked questions about product features
- E) An AI-generated product description writer for an e-commerce platform

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ A grammar-checking tool that operates on internal email drafts does not make consequential decisions affecting individuals and would likely fall in the minimal risk tier — no specific EU AI Act compliance obligations would apply.
- B) ❌ A spam filter is a classic minimal-risk application. It makes low-stakes, easily reversible decisions (email routing) with minimal individual consequences. The chapter notes "spam filters" as an example of minimal-risk AI.
- ⭐ C) ✅ The chapter explicitly identifies credit and insurance underwriting as a high-risk domain under the EU AI Act: "If your company is using AI to screen résumés, score loan applications, assess insurance claims, or set prices that affect essential services, you are operating in the high-risk tier. Full stop." A small business loan pre-screening tool makes consequential financial decisions affecting individuals and would trigger full high-risk compliance obligations including pre-market conformity assessment, bias testing, transparency requirements, and human oversight mechanisms.
- D) ❌ A customer service chatbot falls in the limited risk tier — it must disclose its AI nature (the transparency obligation for systems that interact with humans) but does not trigger high-risk compliance requirements.
- E) ❌ An AI content writer for product descriptions is a minimal-risk application — it produces marketing copy with no direct consequential effect on individuals.

</details>

---

## Question 3

The chapter describes three primary entry points for bias in AI systems. The Amazon résumé screening case is used to illustrate which entry point?

- A) Proxy variable bias — Amazon's model used ZIP code as a proxy for race, producing discriminatory outcomes
- B) Feedback loop bias — the model's outputs influenced future hiring data, reinforcing initial patterns
- C) Training data bias — the model was trained on ten years of historically male-dominated résumé submissions and learned to replicate that historical pattern
- D) Algorithmic amplification bias — Amazon intentionally programmed the model to favor male candidates
- E) Measurement bias — Amazon used inaccurate salary data that overstated the compensation gap

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ The Amazon case is not described in the chapter as a proxy variable case — the model did not use ZIP code. The bias entered through the demographic composition of the training data itself, not through a correlated proxy feature.
- B) ❌ The feedback loop entry point describes a dynamic where model outputs influence future data collection in a self-reinforcing cycle (the predictive policing example). The Amazon case occurred before deployment and was not a feedback loop problem.
- ⭐ C) ✅ The chapter uses the Amazon case to illustrate training data bias: "Amazon had built a machine learning system to screen engineering job applicants, trained on résumés submitted over a ten-year period. The vast majority of those résumés came from men. The system learned that 'men's résumés'... were the desirable pattern." The model did not know about sex — it learned from historical hiring patterns that were discriminatory and replicated those patterns with technical precision.
- D) ❌ The chapter explicitly notes there was no intentional programming for discrimination. The chapter's point is precisely that bias can arise without discriminatory intent — through the choice of training data.
- E) ❌ Salary data and measurement inaccuracy are not described in the chapter's account of the Amazon case.

</details>

---

## Question 4

The chapter explains that the COMPAS recidivism tool controversy revealed a fundamental conflict in definitions of algorithmic fairness. What is the core insight the chapter draws from this case?

- A) COMPAS was deliberately designed by its developers to discriminate against Black defendants
- B) Multiple mathematically valid definitions of fairness are mutually incompatible when base rates differ across groups — meaning "fair" is a policy choice, not a technical solution
- C) AI systems used in criminal justice should be banned because they cannot be made accurate
- D) The ProPublica analysis was methodologically flawed and COMPAS was actually unbiased
- E) Recidivism prediction is impossible because human behavior is inherently unpredictable

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ The chapter does not describe intentional discrimination. It makes the opposite point — that the developers used a technically valid fairness definition (calibration) and were not lying when they claimed accuracy. The fairness failure was structural, not intentional.
- ⭐ B) ✅ The chapter states: "The tool's developer argued that their model was calibrated and accurate in aggregate. ProPublica's analysis showed that the calibration was achieved by distributing errors unequally across racial groups. Both claims were mathematically accurate. They were describing different definitions of fairness — definitions that cannot be simultaneously satisfied when base rates differ across groups. This is not a technical footnote. It is a fundamental conflict in what 'fair' means, with life-altering consequences for real people."
- C) ❌ The chapter does not recommend banning AI in criminal justice as a conclusion — it argues that the fairness definition problem requires a governance response (a policy choice about which definition governs), not prohibition.
- D) ❌ The chapter does not characterize the ProPublica analysis as flawed. It presents both the developer's argument and ProPublica's findings as mathematically accurate descriptions of different fairness properties.
- E) ❌ The chapter is not arguing that prediction is impossible — it is arguing about which definition of prediction accuracy is morally appropriate, not about the fundamental possibility of prediction.

</details>

---

## Question 5

The chapter describes "proxy variable bias" as a distinct entry point for AI discrimination. Which of the following is the most accurate description of how proxy variable bias works?

- A) AI developers deliberately encode protected characteristics like race or sex into model inputs, disguising them as neutral variables
- B) Even when protected characteristics are excluded from a model, neutral-seeming features that are statistically correlated with those characteristics because of historical discrimination can reproduce discriminatory outcomes
- C) Proxy variables are placeholders in the training data that are filled in after training, allowing the developer to modify the model's behavior post-hoc
- D) Proxy bias only occurs in natural language models, not in structured data models used for credit or insurance
- E) The solution to proxy variable bias is to increase the size of the training dataset so that all demographic groups are proportionally represented

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ The chapter explicitly frames proxy variable bias as arising without deliberate intent — it is a structural property of the relationship between features and protected characteristics caused by historical discrimination, not a concealment strategy.
- ⭐ B) ✅ The chapter defines proxy variable bias directly: "Even when protected characteristics (race, sex, religion, national origin) are excluded from an AI model's inputs, bias can enter through proxy variables — innocuous-seeming features that are statistically correlated with protected characteristics because of historical patterns of discrimination." The examples given — ZIP code correlating with race due to residential segregation, credit history correlating with race due to discriminatory lending, employment gap correlating with sex due to caregiving norms — all illustrate this mechanism.
- C) ❌ This description does not match the chapter's definition of proxy variables. Proxy variables are training features, not post-training modification mechanisms.
- D) ❌ The chapter does not limit proxy variable bias to language models. The examples given (credit history, ZIP code, employment gaps) are all features in structured data models for credit and insurance — precisely the domain where proxy bias has generated the most significant regulatory enforcement.
- E) ❌ The chapter notes that proxy bias is particularly intractable because the correlated variables are correlated with outcomes due to historical discrimination — meaning the correlation is real, and removing all correlated proxies would remove the model's predictive power. Increasing dataset size does not resolve the fundamental correlation problem.

</details>

---

## Question 6

Under GDPR, consent for personal data processing must satisfy four requirements. Which TWO of the following are among the four requirements the chapter identifies?

- A) Freely given — not bundled with terms of service or conditioned on access to a product
- B) Anonymized — the data subject's identity must not be traceable from the consent record
- C) Specific — granular to the particular processing purpose, not a blanket authorization
- D) Verified — the data controller must obtain a government-issued ID to confirm consent
- E) Retroactive — consent for past data collection can be obtained after processing has begun

<details>
<summary>Show Answer & Explanations</summary>

- ⭐ A) ✅ The chapter explicitly lists "freely given (no bundling with terms of service)" as one of the four GDPR consent requirements: "consent for AI training data be freely given, specific, informed, and unambiguous." Conditional consent — where accessing a service requires accepting data processing — does not satisfy GDPR's freely given standard.
- B) ❌ Anonymization is a data minimization and security technique under GDPR, but it is not listed as one of the four consent requirements. The chapter describes freely given, specific, informed, and unambiguous as the four criteria.
- ⭐ C) ✅ The chapter lists "specific (granular, not blanket)" as the second of four GDPR consent requirements. A privacy policy checkbox that authorizes all data processing for all purposes does not satisfy specificity — consent must be tied to clearly described, discrete processing activities.
- D) ❌ GDPR does not require government ID verification for consent. Identity verification is a separate compliance question in some financial services contexts, but it is not a GDPR consent requirement.
- E) ❌ Retroactive consent is not valid under GDPR. Consent must be obtained before processing begins. The chapter notes that "a consent architecture that was built for analytics data collected in 2019 is almost certainly inadequate for AI training data collected in 2025" — not because retroactive consent could fix it, but because the purposes are incompatible.

</details>

---

## Question 7

The chapter describes the enterprise AI governance stack as five layers. What is Layer 1, and why does the chapter argue it must come before the others?

- A) Model monitoring — you cannot govern what you cannot observe, so monitoring is the foundation
- B) Incident response — planning for failure is the most important governance investment because failures are inevitable
- C) AI use policy — a documented, board-approved policy that establishes which applications are permitted and who owns governance; without this foundation, everything above is improvisation
- D) Third-party audit — an independent external assessment is the only credible form of governance accountability
- E) Risk classification — until all AI systems are classified by risk tier, no other governance work is meaningful

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ Monitoring is Layer 4 in the chapter's governance stack, not the foundation. The chapter's argument is that monitoring without a policy foundation is operational without direction.
- B) ❌ Incident response is Layer 5 — the apex of the stack, not the foundation. The chapter argues it must be built before incidents occur, but it is built on top of the lower layers, not in place of them.
- ⭐ C) ✅ The chapter states: "The foundation. A documented, board-approved policy that establishes: (1) which AI applications are permitted, prohibited, or require special review; (2) what standards apply to AI systems that affect employees, customers, or third parties; (3) who owns AI governance — and what that ownership means in terms of budget, authority, and accountability. Without a policy foundation, everything above is improvisation." The chapter also specifies that a credible policy is specific — "We use AI responsibly" is not a policy.
- D) ❌ Third-party audit is described in Layer 4 (Monitoring and Audit) as a specific mechanism within that layer — not the foundational layer or the most important single governance investment.
- E) ❌ Risk classification is Layer 2. The chapter notes that not all AI systems warrant the same governance scrutiny, making classification necessary before applying higher governance layers — but the policy foundation must come first to establish the criteria and authority for classification.

</details>

---

## Question 8

The chapter's faith integration section argues that the *imago Dei* doctrine — that every person is made in the image of God — demands three specific governance standards for AI systems that affect people. Which of the following correctly names TWO of those three standards?

- A) Profitability — AI systems that affect people must generate sufficient returns to justify the investment in responsible development
- B) Transparency — people deserve to understand decisions made about them by AI systems, not as a regulatory right alone but as an expression of respect for persons
- C) Speed — AI systems that affect people must operate faster than human review to be efficient enough to deploy responsibly
- D) Contestability — people deserve a meaningful opportunity to challenge AI decisions that affect them, reflecting the understanding that no system is beyond appeal
- E) Consensus — AI systems should only be deployed when all affected stakeholders have agreed to their deployment

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ Profitability is not named as one of the three imago Dei governance standards. The chapter's faith integration is explicitly about non-financial obligations — the dignity owed to persons — not about business case justifications.
- ⭐ B) ✅ Transparency is the first of three imago Dei governance standards: "A person who is subject to an automated decision has an interest — not merely a regulatory right, though that too — in understanding what was decided about them, on what basis, and by what authority. Black-box systems... do not merely violate GDPR Article 22. They treat persons as objects to be sorted rather than subjects to be engaged."
- C) ❌ Speed is not identified as a governance standard in the faith integration section. The chapter's imago Dei framework prioritizes dignity, accountability, and contestability — not operational efficiency.
- ⭐ D) ✅ Contestability is the second of three imago Dei governance standards: "Every legal system in the civilized world provides mechanisms for appeal... AI systems that do not provide contestability mechanisms — that do not allow individuals to flag errors, request human review, or challenge adverse outcomes — are making a claim that the machine is beyond appeal. That claim is always false and, theologically, is a form of idolatry."
- E) ❌ Consensus is not named as one of the three imago Dei standards. The chapter identifies transparency, contestability, and non-delegable accountability as the three governance implications of the doctrine.

</details>

---

## Question 9

The chapter's "feedback loop" entry point for AI bias is illustrated with the predictive policing example. What is the core mechanism that makes feedback loops a distinct form of bias beyond training data or proxy variables?

- A) Feedback loops occur only in systems with reinforcement learning; supervised learning systems are immune to this type of bias
- B) Feedback loops cause the model to learn incorrect labels, producing outputs that contradict its training data
- C) The model's outputs influence future data collection in a self-reinforcing cycle — making predictions that drive behavior that produces data confirming the original prediction, compounding the initial bias without any single point of human intervention
- D) Feedback loops are caused by model developers re-using the same dataset for multiple training runs without refreshing the data
- E) Feedback loops only affect systems with real-time data inputs; batch-trained models cannot exhibit this behavior

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ The chapter does not limit feedback loop bias to reinforcement learning systems. The predictive policing example involves a system making predictions that guide resource deployment — a non-RL dynamic that still creates a self-reinforcing bias loop.
- B) ❌ Feedback loops do not produce outputs that contradict training data — they produce outputs that are consistent with the training data but cause the real-world evidence to shift toward the prediction, rather than the prediction reflecting an independent reality.
- ⭐ C) ✅ The chapter describes the mechanism precisely: "A model trained on historical arrest data predicts high-crime areas. Police are deployed to high-crime areas. Arrests happen in high-crime areas. Those arrests become new training data, reinforcing the original prediction... The model is measuring itself, not reality." The chapter then generalizes: "This feedback loop dynamic is not limited to policing. Content recommendation algorithms... credit algorithms... hiring algorithms..." all exhibit versions of the same self-reinforcing dynamic.
- D) ❌ Reusing the same dataset is a training methodology concern but is not the feedback loop mechanism described in the chapter. Feedback loops involve real-world deployment of model outputs changing the data environment.
- E) ❌ The chapter's examples include both real-time (content recommendation) and period-retrained (predictive policing, credit scoring) systems. The feedback loop dynamic is not limited by training cadence.

</details>

---

## Question 10

The chapter argues that the non-delegability of accountability is the most practically important implication of *imago Dei* for AI governance. What does this principle require of the business professional who deploys an AI system?

- A) The business professional must personally review every decision made by the AI system before it is communicated to affected individuals
- B) The vendor who built the AI system bears all moral and legal responsibility for its effects; the deploying organization's responsibility is limited to selection and payment
- C) Responsibility for the AI system's effects on real persons cannot be outsourced to a computational process — the engineers, product managers, executives, and board members who built, approved, and deployed the system retain moral accountability for its consequences
- D) Non-delegability requires that AI systems be designed by licensed professionals who can be individually held liable for system outputs, equivalent to the professional accountability model in law or medicine
- E) The principle only applies to AI systems that interact directly with consumers; back-office AI systems used for internal decisions are not covered by accountability obligations

<details>
<summary>Show Answer & Explanations</summary>

- A) ❌ Personal review of every AI decision would eliminate the operational purpose of AI deployment. The chapter does not require this — it requires organizational accountability for the system's behavior, which includes building oversight mechanisms, not manually reviewing each decision.
- B) ❌ The chapter explicitly rejects vendor-delegation of responsibility: the VP of HR in the reflection prompt scenario says "the vendor's contract says the model is fair and the vendor is responsible" — and the chapter's entire faith integration section is built around the argument that this deflection is morally unacceptable. The chapter states: "You cannot plead technological complexity. You cannot plead that you were following instructions. You cannot plead that the model is the vendor's problem. You are the deployer."
- ⭐ C) ✅ The chapter states the principle directly: "The engineer who trained the model, the product manager who approved deployment, the executive who set the business requirement, the board that approved the risk tolerance — all retain moral responsibility for the machine's effects on real persons." The theological argument is that "responsibility for the treatment of image-bearers cannot be outsourced to a computational process." The secular governance frameworks — GDPR's data controller requirement, the EU AI Act's deployer accountability — arrive at the same conclusion by a different path.
- D) ❌ The chapter does not argue for a licensed professional model for AI deployment. It argues for organizational accountability, not individual professional licensure as the accountability mechanism.
- E) ❌ The chapter's accountability principle applies to all AI systems that affect persons — the imago Dei doctrine does not distinguish between consumer-facing and back-office systems. The reflection prompt scenario involves a hiring tool (back-office, HR-facing) and the accountability obligation is presented as fully applicable.

</details>

---

*Quiz for Chapter 10 — Business Applications of Artificial Intelligence © Dr. Ernesto Lee, 2026.*
