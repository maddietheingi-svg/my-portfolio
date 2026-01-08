import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Procter & Gamble Investment Report",
    category: "Business Valuation",
    description: "Comprehensive equity research and valuation of P&G analyzing strategic positioning, financial trajectory, and valuation outlook. Built complete DCF model with 5-year projections, WACC calculation, ROIC analysis, and comparable company valuation against Unilever. Delivered HOLD recommendation with $150.25 target price.",
    metrics: ["DCF: $150.25", "WACC: 5.64%", "ROIC: 18.1%"],
    tools: ["Excel", "Financial Modeling"],
    color: "#1a365d",
    files: [
      { name: "Investment Report", type: "pdf" },
      { name: "P&G Financial Model", type: "xlsx" }
    ],
    detailedView: "pg"
  },
  {
    id: 2,
    title: "Nike Financial Valuation Model",
    category: "Business Valuation",
    description: "Built comprehensive financial model for Nike (NKE) including 3-statement model, DCF valuation, and EBITD multiple analysis. Analyzed 7 years of historical data with 2-year projections across all business segments. Compared valuation metrics against Lululemon and Colgate-Palmolive.",
    metrics: ["DCF: $63.79", "WACC: 8.36%", "ROIC: 18.1%"],
    tools: ["Excel", "Financial Modeling"],
    color: "#f97316",
    files: [
      { name: "Nike Financial Model", type: "xlsx" }
    ],
    detailedView: "nike"
  },
  {
    id: 3,
    title: "Brookfield Renewable Investment Pitch",
    category: "Business Valuation",
    description: "Full equity research and investment pitch for Brookfield Renewable Corp (BEPC). Built 3-statement financial model with DCF and comparable company analysis. Evaluated capital allocation strategy, portfolio diversification across hydro/wind/solar, and competitive positioning. Delivered BUY recommendation with 32% upside.",
    metrics: ["Target: $35.33", "WACC: 6.46%", "EBITDA Margin: 63.5%"],
    tools: ["Excel", "PowerPoint", "Bloomberg"],
    color: "#059669",
    files: [
      { name: "Investment Pitch", type: "pptx" },
      { name: "Brookfield Financial Model", type: "xlsx" }
    ],
    detailedView: "brookfield"
  },
  {
    id: 4,
    title: "Dream Drops: Soundtrack Generation System",
    category: "Systems Analysis",
    description: "Designed end-to-end system architecture for an AI-powered music platform that generates personalized soundtracks from user memories. Created comprehensive documentation including functional requirements, use cases, DFDs, ERD, interface structure diagrams, and UI mockups. Led JAD sessions and managed project timeline with detailed Gantt charts and resource allocation.",
    metrics: ["9 Functional Modules", "32-Page Documentation", "7-Month Timeline"],
    tools: ["MS Project", "Lucidchart", "Figma", "UML"],
    color: "#9d6b7d",
    files: [
      { name: "System Documentation", type: "pdf" }
    ],
    detailedView: "dreamdrops"
  },
  {
    id: 5,
    title: "Gym Management Database System",
    category: "Database Design",
    description: "Designed and implemented a relational database to manage gym operations including members, trainers, workout plans, and fitness tracking. Created comprehensive ERD with 10 entities and 3 junction tables handling complex many-to-many relationships. Wrote 6 optimized SQL queries using JOINs, aggregations, and subqueries for business intelligence reporting.",
    metrics: ["10 Entities", "6 SQL Queries", "3 Junction Tables"],
    tools: ["PostgreSQL", "SQL", "ERD Design"],
    color: "#2563eb",
    files: [],
    detailedView: "gymdb"
  },
  {
    id: 6,
    title: "Disney+ Content Strategy: 5-Year Plan",
    category: "Strategy Consulting",
    description: "Developed a comprehensive 5-year implementation plan for Disney+ to mitigate operational losses through content optimization strategy. Conducted market analysis, consumer surveys, and financial feasibility assessment. Recommended data-driven content production prioritizing high-return projects, achieving projected breakeven by 2024.",
    metrics: ["15% Market Share", "$2.5B Cost Reduction", "5-Year Roadmap"],
    tools: ["PowerPoint", "Market Research", "Financial Analysis"],
    color: "#0c4a6e",
    files: [
      { name: "Strategy Presentation", type: "pptx" }
    ],
    detailedView: "disneyplus"
  }
];

// P&G Financial Data
const pgData = {
  recommendation: "HOLD",
  valuation: {
    dcf: { targetPrice: 150.25, currentPrice: 145, upside: 3.6 },
    ebitdMultiple: { targetPrice: 147.74, currentPrice: 145, upside: 1.9 },
    costOfCapital: 5.64,
    ltGrowthRate: 1.0,
    beta: 0.43
  },
  keyMetrics2025: {
    revenue: 84283,
    ebitd: 23297,
    ebitdMargin: 27.6,
    grossMargin: 51.2,
    roic: 18.1,
    evEbitd: 16.3,
    netIncome: 14900
  },
  revenueBreakdown: [
    { segment: "Fabric & Home Care", value: 29617, percent: 35.1, color: "#1a365d" },
    { segment: "Baby/Fem/Family Care", value: 20248, percent: 24.0, color: "#2c5282" },
    { segment: "Beauty", value: 14964, percent: 17.8, color: "#3182ce" },
    { segment: "Health Care", value: 11998, percent: 14.2, color: "#63b3ed" },
    { segment: "Grooming", value: 6662, percent: 7.9, color: "#90cdf4" }
  ],
  historicalROIC: [
    { year: "2021", value: 16.7 },
    { year: "2022", value: 17.2 },
    { year: "2023", value: 17.6 },
    { year: "2024", value: 17.0 },
    { year: "2025", value: 18.1 },
    { year: "2026E", value: 19.4 },
    { year: "2027E", value: 20.0 }
  ],
  comparables: [
    { company: "P&G", evEbitd: 16.3, roic: 18.1, ebitdMargin: 27.6, growth: 1.0, marketCap: "$356B" },
    { company: "Unilever", evEbitd: 13.0, roic: 14.2, ebitdMargin: 17.8, growth: 2.0, marketCap: "$143B" },
    { company: "Colgate-Palmolive", evEbitd: 14.4, roic: 26.9, ebitdMargin: 24.5, growth: 1.0, marketCap: "$62B" },
    { company: "Kimberly-Clark", evEbitd: 12.5, roic: 14.6, ebitdMargin: 18.5, growth: 1.5, marketCap: "$44B" }
  ],
  summaryFindings: `P&G's current valuation appears fair when evaluated against its projected growth, return profile, and comparison to industry peers. The company demonstrates stable cash flows, improving margins, and high return on invested capital—strengths that support rather than exceed the current market valuation.

Using a 1% terminal growth rate and a 16x EBITD multiple, both valuation approaches yield estimated stock prices slightly above the current $145 price. The DCF model suggests $150.25 (3.6% upside) while the EBITD multiple approach yields $147.74 (1.9% upside). This convergence provides confidence in the valuation range.

The narrow 2-4% implied upside is insufficient to warrant a BUY recommendation given execution risks and competitive pressures from private label alternatives. However, the stock does not appear materially overvalued. P&G's consistent dividend growth (69 consecutive years), defensive characteristics (0.43 beta), and economic moat support a HOLD rating.`,
  assumptions: `The terminal growth rate of 1.0% reflects conservative assumptions appropriate for a mature consumer staples company. This rate slightly exceeds long-term population growth (0.5-0.7% globally) but falls below historical nominal GDP growth (2-3%), acknowledging P&G's exposure to developed markets with slower growth profiles.

Near-term projections assume NOPAT growth of 6-8% annually through 2028, driven by operating margin expansion toward 27% and modest revenue growth of 2-3%. These assumptions reflect management guidance for productivity savings ($1.5B annually) and market share gains, partially offset by currency headwinds.

ROIC is projected to improve from 18.1% in 2025 to 20.3% by 2028, reflecting continued margin improvement and disciplined capital allocation. The company benefits from negative working capital, reducing invested capital requirements and boosting returns.`
};

// Nike Financial Data
const nikeData = {
  recommendation: "HOLD",
  valuation: {
    dcf: { targetPrice: 63.79, currentPrice: 64, upside: -0.3 },
    ebitdMultiple: { targetPrice: 73.40, currentPrice: 64, upside: 14.7 },
    costOfCapital: 8.36,
    ltGrowthRate: 4.0
  },
  keyMetrics2025: {
    revenue: 46309,
    ebitd: 4477,
    ebitdMargin: 9.67,
    roic: 18.1,
    evEbitd: 20.5,
    netIncome: 3219
  },
  revenueBreakdown: [
    { segment: "Footwear", value: 29510, percent: 63.7, color: "#f97316" },
    { segment: "Apparel", value: 12965, percent: 28.0, color: "#fb923c" },
    { segment: "Equipment", value: 2191, percent: 4.7, color: "#fdba74" },
    { segment: "Converse", value: 1692, percent: 3.7, color: "#fed7aa" }
  ],
  historicalROIC: [
    { year: "2020", value: 21.3 },
    { year: "2021", value: 41.0 },
    { year: "2022", value: 38.3 },
    { year: "2023", value: 27.9 },
    { year: "2024", value: 31.1 },
    { year: "2025", value: 18.1 },
    { year: "2026E", value: 14.9 },
    { year: "2027E", value: 23.3 }
  ],
  comparables: [
    { company: "Nike", evEbitd: 20.5, roic: 18.1, ebitdMargin: 9.7, growth: 4.0, fcfYield: "2.9%" },
    { company: "Lululemon", evEbitd: 10.1, roic: 50.5, ebitdMargin: 27.9, growth: 6.5, fcfYield: "3.3%" },
    { company: "Colgate", evEbitd: 14.4, roic: 33.5, ebitdMargin: 24.5, growth: 1.0, fcfYield: "4.5%" }
  ],
  summaryFindings: `Nike's valuation presents a mixed picture. The DCF analysis suggests the stock is fairly valued at $63.79, essentially in line with the current $64 price. However, the EBITD multiple approach indicates potential upside to $73.40, representing a 14.7% premium to current levels.

The company faces significant near-term headwinds. FY2025 revenue declined 9.8% year-over-year to $46.3B, with EBITD margins compressing to 9.7% from historical levels above 14%. ROIC has dropped sharply from a peak of 41% in 2021 to 18.1% in 2025, reflecting both margin pressure and increased competition in the athletic footwear space.

Despite these challenges, Nike maintains category leadership with 64% of revenue from Footwear and strong brand equity globally. The company trades at a premium (20.5x EV/EBITD) compared to peers like Lululemon (10.1x), though Nike's lower margins and ROIC relative to Lululemon raise questions about whether this premium is justified.`,
  assumptions: `The model assumes a 4% long-term growth rate, reflecting Nike's exposure to secular growth trends in athletic wear and emerging market expansion. This is higher than mature consumer staples companies but appropriate for the athletic apparel industry.

Near-term projections assume a recovery trajectory with revenue stabilizing in FY2026 at $45.9B before returning to modest growth of 8.6% in FY2027. EBITD margins are expected to remain compressed at 8.5% in 2026E before recovering to 11.4% by 2027E as cost restructuring initiatives take hold.

ROIC is projected to trough at 14.9% in 2026E before recovering to 23.3% by 2027E. This recovery is predicated on successful execution of Nike's direct-to-consumer strategy, inventory normalization, and margin recovery through reduced promotional activity. Key risks include continued market share losses to competitors like On Running and Hoka, and weakness in the Greater China market.`
};

// Brookfield Financial Data
const brookfieldData = {
  recommendation: "BUY",
  valuation: {
    multipleTarget: { targetPrice: 35.33, currentPrice: 26.75, upside: 32.1 },
    dcf: { targetPrice: 45.63, currentPrice: 26.75, upside: 70.6 },
    hModel: { targetPrice: 39.07, currentPrice: 26.75, upside: 46.1 },
    costOfCapital: 6.46,
    costOfEquity: 8.91,
    costOfDebt: 5.7,
    ltGrowthRate: 2.5,
    forwardMultiple: 11.4
  },
  keyMetrics2024: {
    revenue: 3747,
    ebitda: 2379,
    ebitdaMargin: 63.5,
    ebitMargin: 35.5,
    roic: 3.9,
    evEbitda: 11.4,
    netIncome: 1353,
    energyGenerated: 31904
  },
  revenueBreakdown: [
    { segment: "Hydroelectric", value: 2098, percent: 56, color: "#059669" },
    { segment: "Wind", value: 637, percent: 17, color: "#10b981" },
    { segment: "Utility-scale Solar", value: 525, percent: 14, color: "#34d399" },
    { segment: "Distributed Energy", value: 487, percent: 13, color: "#6ee7b7" }
  ],
  historicalROIC: [
    { year: "2020", value: 2.1 },
    { year: "2021", value: 4.1 },
    { year: "2022", value: 3.8 },
    { year: "2023", value: 2.8 },
    { year: "2024E", value: 3.9 },
    { year: "2025E", value: 4.2 },
    { year: "2026E", value: 4.5 }
  ],
  growthMetrics: [
    { metric: "Revenue CAGR", value: "5%" },
    { metric: "EBITDA CAGR", value: "5%" },
    { metric: "Energy Generation CAGR", value: "9%" },
    { metric: "PP&E CAGR", value: "7%" }
  ],
  comparables: [
    { company: "Brookfield Renewable", evEbitda: 11.4, roic: 3.9, ebitdaMargin: 63.5, ebitMargin: 35.5 },
    { company: "Clearway Energy", evEbitda: 14.9, roic: 2.4, ebitdaMargin: 60.7, ebitMargin: 20.8 },
    { company: "NextEra Partners", evEbitda: 24.9, roic: 0.2, ebitdaMargin: 56.9, ebitMargin: 9.1 },
    { company: "Ormat Technologies", evEbitda: 11.1, roic: 3.3, ebitdaMargin: 58.9, ebitMargin: 10.6 },
    { company: "Algonquin Power", evEbitda: 12.7, roic: 3.3, ebitdaMargin: 38.7, ebitMargin: 22.1 }
  ],
  scenarioAnalysis: {
    bear: { price: 6.47, upside: -75.8 },
    base: { price: 35.33, upside: 32.1 },
    bull: { price: 61.00, upside: 128.0 },
    rrRatio: 1.66
  },
  summaryFindings: `We recommend a BUY on Brookfield Renewable Corp (BEPC) with a target price of $35.33, representing 32% upside from the current $26.75 price. The market does not fully appreciate BEPC's extensive technological and geographical diversification, industry-leading margins, and disciplined capital allocation strategy.

BEPC operates a diversified portfolio of 6,764 renewable energy facilities across hydroelectric, wind, solar, and distributed energy segments spanning North America, South America, Europe, and Asia. The company maintains a strong investment grade credit rating of BBB+ (vs. industry average of BB-/B), enabling access to cheaper financing for growth projects.

BEPC's EBITDA and EBIT margins of 63.5% and 35.5% respectively are well above peer group averages, reflecting exceptional operational efficiency. The EV/EBITDA multiple of 11.4x is below the peer group average, indicating an attractive and undervalued entry point. With the highest ROIC in its peer group at 3.9% and strong fundamentals, a re-rating is warranted as the market recognizes BEPC's competitive advantages.`,
  assumptions: `The model assumes a 2.5% long-term growth rate, reflecting the renewable energy industry's structural tailwinds including government incentives, declining solar costs, and global decarbonization commitments. The renewable energy market is projected to grow at 9.6% CAGR reaching $2,025B by 2030.

Revenue projections assume 5% CAGR through 2027, driven by a 9% CAGR in energy generation (from 31,904 GWh to 42,289 GWh) partially offset by pricing normalization. The segment mix is expected to shift toward solar and distributed energy, with hydroelectric declining from 56% to 54% of revenue by 2027.

EBITDA margins are projected to remain stable at 63-64% as operational efficiencies offset the revenue mix shift toward lower-margin segments. BEPC's capital allocation strategy—acquiring distressed assets and improving returns through cost, revenue, and strategy optimization—targets 12-15% returns through operating cash flows and asset base expansion.

Key risks include: (1) reliance on sourcing and improving distressed acquisitions, (2) dependence on Brookfield Corporation's overall strategy, and (3) execution risk on large-scale projects. However, 90% project-level non-recourse debt and only 3% floating rate exposure provide resilience to interest rate volatility.`
};

// Dream Drops System Design Data
const dreamDropsData = {
  projectOverview: `Dream Drops is an AI-powered music platform that automatically generates personalized soundtracks based on users' memories, events, or emotions. The system allows users to input memories through photos, journal entries, or dates, and generates playlists that reflect the mood, era, or context of those memories.

By integrating with music streaming services and leveraging AI-driven analysis (image recognition for photos, sentiment analysis for text), the system curates songs that resonate emotionally and contextually with user input. This addresses the challenge of manually creating meaningful playlists and bridges the gap between music and personal storytelling.`,
  businessValue: `This system revolutionizes how users interact with music by transforming personal memories into auditory experiences. Unlike generic playlist generators, it leverages AI to create deeply personalized soundtracks, fostering emotional connections and nostalgia. By automating playlist creation, users save time and gain a unique tool for reliving moments.

The integration with streaming platforms ensures accessibility, while features like mood-based filtering and sharing options enhance user engagement. This positions the application as a leader in personalized digital experiences, appealing to music enthusiasts, storytellers, and casual users alike.`,
  functionalModules: [
    { id: 1, name: "User Registration & Authentication", description: "Secure signup, login, password reset, 2FA", color: "#9d6b7d" },
    { id: 2, name: "User Login Validation", description: "Credential verification, session management", color: "#b4838f" },
    { id: 3, name: "User Preferences", description: "Genre, mood, instrumentation, intensity settings", color: "#c99da6" },
    { id: 4, name: "Home Dashboard", description: "Recent memories, trending soundtracks, navigation", color: "#9d6b7d" },
    { id: 5, name: "Memory Upload", description: "Photo/video/text input with emotional tagging", color: "#b4838f" },
    { id: 6, name: "Soundtrack Generation", description: "AI-driven music matching and customization", color: "#c99da6" },
    { id: 7, name: "Playlist Compilation", description: "Track management, editing, organization", color: "#9d6b7d" },
    { id: 8, name: "Sharing & Collaboration", description: "Social sharing, collaborative playlists, privacy", color: "#b4838f" },
    { id: 9, name: "Saved Drafts", description: "Draft management, auto-save, version control", color: "#c99da6" }
  ],
  databaseEntities: [
    { name: "User", fields: "UserID, Username, Email, Password, DOB, Phone, NotificationPref", records: "Core" },
    { name: "Memory", fields: "MemoryID, UserID, Title, FileType, Content, EmotionalTags", records: "Core" },
    { name: "Playlist", fields: "PlaylistID, UserID, Title, CoverImage, TrackOrder, Duration", records: "Core" },
    { name: "Music", fields: "SongID, Title, Artist, Genre, Mood, Tempo, Instrument", records: "External" },
    { name: "Preferences", fields: "PreferenceID, UserID, GenrePref, MoodPref, InstrumentPref", records: "Core" },
    { name: "Collaborators", fields: "CollabID, PlaylistID, UserID, AccessLevel, InviteStatus", records: "Core" },
    { name: "Sharing", fields: "ShareID, UserID, PlaylistID, ShareMethod, ExpiryDate", records: "Core" },
    { name: "Drafts", fields: "DraftID, UserID, PlaylistName, LastEdited, TrackDuration", records: "Core" }
  ],
  projectTimeline: [
    { phase: "System Request", duration: "3.5 days", status: "Complete", percent: 100 },
    { phase: "Functional Requirements", duration: "41 days", status: "Complete", percent: 100 },
    { phase: "JAD Sessions", duration: "19 days", status: "Complete", percent: 100 },
    { phase: "Use Cases (2)", duration: "13 days", status: "In Progress", percent: 45 },
    { phase: "DFD Diagrams (2)", duration: "12 days", status: "In Progress", percent: 48 },
    { phase: "Context & ERD", duration: "53 days", status: "In Progress", percent: 35 },
    { phase: "Interface Design", duration: "47 days", status: "Pending", percent: 0 },
    { phase: "Storyboard & Screenshots", duration: "58 days", status: "Pending", percent: 0 }
  ],
  resourceAllocation: [
    { role: "Business Analysts", count: 7, rate: "$75/hr" },
    { role: "System Analysts", count: 5, rate: "$85/hr" },
    { role: "Project Manager", count: 1, rate: "$80/hr" },
    { role: "Database Admins", count: 2, rate: "$70/hr" },
    { role: "Frontend Developer", count: 1, rate: "$75/hr" },
    { role: "Backend Developer", count: 1, rate: "$75/hr" },
    { role: "Web Designers", count: 2, rate: "$85/hr" },
    { role: "JAD Facilitator", count: 1, rate: "$60/hr" }
  ],
  useCaseSummary: [
    { id: 6, name: "Generate Soundtrack", priority: "High", actors: "Users", triggers: "Click 'Generate Soundtrack'", outputs: "Playlist DB, Music DB" },
    { id: 8, name: "Share/Collab Playlists", priority: "High", actors: "Users, Collaborators", triggers: "Click 'Share'", outputs: "Sharing DB, Collaborator DB" }
  ],
  specialIssues: [
    { issue: "Compliance & Regulations", detail: "Legal agreements with music streaming platforms required" },
    { issue: "Data Privacy", detail: "User memories require encryption and strict access controls" },
    { issue: "Storage", detail: "Large media files demand robust cloud storage solutions" },
    { issue: "User Experience", detail: "Accessibility features, cultural sensitivity, intuitive interface" }
  ],
  deliverables: [
    { name: "System Request Document", pages: 2, status: "Complete" },
    { name: "Requirements Definition", pages: 8, status: "Complete" },
    { name: "Use Case Documents (2)", pages: 4, status: "Complete" },
    { name: "DFD Level 0 Diagrams (2)", pages: 2, status: "Complete" },
    { name: "Context Diagram", pages: 1, status: "Complete" },
    { name: "Entity Relationship Diagram", pages: 1, status: "Complete" },
    { name: "Interface Structure Design", pages: 1, status: "Complete" },
    { name: "System Storyboard", pages: 2, status: "Complete" },
    { name: "UI Screenshots (6)", pages: 5, status: "Complete" },
    { name: "Gantt Chart & Resources", pages: 6, status: "Complete" }
  ]
};

// Gym Management Database Data
const gymDbData = {
  projectOverview: `This application manages gym members, personal trainers, workout plans, and fitness progress tracking. It stores member profiles (age, fitness level), custom workout routines (exercises, sets/reps), nutrition logs, and goal milestones (target weight, strength gains).

Relationships link trainers to clients, track exercise performance over time, and match routines to member goals (weight loss vs. muscle building). The database handles complex challenges including progress tracking with varying structures (3 sets of 12 reps vs 30-minute cardio sessions) and trainer-client scheduling conflicts.`,
  designChallenges: `One of the main challenges encountered during the design process was identifying and modeling the many-to-many relationships, and creating intermediary tables such as Attends or Includes. These junction tables were essential for capturing the complexity of real-world interactions in a gym setting.

Features like super-sub types differentiate member roles (Premium vs. Basic access) and categorize exercises (Cardio, Strength, Flexibility). It took iteration to determine the right structure and attributes for each junction table.`,
  entities: [
    { name: "Member", pk: "member_id", attributes: "name, date_of_birth, contact_info, membership_type", description: "A gym user like John with premium membership attending yoga classes" },
    { name: "Trainer", pk: "trainer_id", attributes: "name, certifications, contact_info, specialty, salary", description: "A certified personal trainer like Jamie specializing in strength training" },
    { name: "WorkoutPlan", pk: "workout_id", attributes: "name, goal, duration, difficulty_level", description: "A 6-week muscle gain plan tailored to intermediate members" },
    { name: "TrainingSession", pk: "session_id", attributes: "trainer_id, member_id, date, time, location, status", description: "A one-on-one training session on April 5th at 11:00 AM" },
    { name: "Equipment", pk: "equipment_id", attributes: "name, type, status, last_maintenance", description: "A treadmill last serviced on March 1, marked operational" },
    { name: "FitnessClass", pk: "class_id", attributes: "name, category, schedule, trainer_id", description: "A 'Beginner HIIT' class held Friday and Sunday at 5 PM" },
    { name: "MembershipType", pk: "membership_type", attributes: "name, cost, duration_months, access_level", description: "The 'Platinum' plan at $75/month with full access" },
    { name: "Payment", pk: "payment_id", attributes: "member_id, amount, date, payment_method, installment", description: "A monthly $75 credit card payment on the 1st" },
    { name: "Exercise", pk: "exercise_id", attributes: "name, muscle_group, equipment_id, reps", description: "Bench press targeting chest muscles using barbell bench" },
    { name: "Feedback", pk: "feedback_id", attributes: "member_id, rating, comment, date", description: "A 5-star rating left by John for trainer Jamie" }
  ],
  relationships: [
    { from: "Member", to: "MembershipType", type: "Many-to-One", description: "Each Member has one MembershipType" },
    { from: "Payment", to: "Member", type: "Many-to-One", description: "Each Payment is made by one Member" },
    { from: "Feedback", to: "Member", type: "Many-to-One", description: "Each Feedback is given by one Member" },
    { from: "Member", to: "FitnessClass", type: "Many-to-Many", junction: "Attends", description: "Members attend multiple classes; classes have multiple members" },
    { from: "FitnessClass", to: "Trainer", type: "Many-to-One", description: "Each FitnessClass is conducted by one Trainer" },
    { from: "TrainingSession", to: "Member", type: "Many-to-One", description: "Each TrainingSession is for one Member" },
    { from: "TrainingSession", to: "Trainer", type: "Many-to-One", description: "Each TrainingSession is conducted by one Trainer" },
    { from: "TrainingSession", to: "WorkoutPlan", type: "Many-to-One", description: "Each TrainingSession follows one WorkoutPlan" },
    { from: "WorkoutPlan", to: "Exercise", type: "Many-to-Many", junction: "Includes", description: "WorkoutPlans include multiple Exercises" },
    { from: "Exercise", to: "Equipment", type: "Many-to-One", description: "Each Exercise uses one Equipment item" }
  ],
  junctionTables: [
    { name: "Attends", keys: "member_id, class_id", purpose: "Links Members to FitnessClasses they attend" },
    { name: "Includes", keys: "workout_id, exercise_id", purpose: "Links WorkoutPlans to Exercises they contain" },
    { name: "ClassAssignment", keys: "trainer_id, class_id", purpose: "Assigns Trainers to FitnessClasses" }
  ],
  foreignKeys: [
    "Member(membership_type) → MembershipType(membership_type)",
    "Payment(member_id) → Member(member_id)",
    "Feedback(member_id) → Member(member_id)",
    "Attends(member_id) → Member(member_id)",
    "Attends(class_id) → FitnessClass(class_id)",
    "FitnessClass(trainer_id) → Trainer(trainer_id)",
    "TrainingSession(member_id) → Member(member_id)",
    "TrainingSession(trainer_id) → Trainer(trainer_id)",
    "TrainingSession(workout_id) → WorkoutPlan(workout_id)",
    "Includes(workout_id) → WorkoutPlan(workout_id)",
    "Includes(exercise_id) → Exercise(exercise_id)",
    "Exercise(equipment_id) → Equipment(equipment_id)"
  ],
  queries: [
    {
      id: 1,
      title: "Member Class Enrollment",
      type: "JOIN",
      purpose: "Shows which fitness class each member is signed up for",
      sql: `SELECT m.member_id, m.name AS member_name,
       fc.class_id, fc.name AS class_name, fc.schedule
FROM Attends a
JOIN Member m ON a.member_id = m.member_id
JOIN FitnessClass fc ON a.class_id = fc.class_id
ORDER BY m.member_id;`,
      results: [
        { member_id: 1, member_name: "Emily Johnson", class_id: 1, class_name: "HIIT Express", schedule: "Mon 18:00" },
        { member_id: 2, member_name: "Michael Brown", class_id: 1, class_name: "HIIT Express", schedule: "Mon 18:00" },
        { member_id: 3, member_name: "Sophia Chen", class_id: 2, class_name: "Sunrise Yoga", schedule: "Wed 07:00" },
        { member_id: 4, member_name: "James Wilson", class_id: 3, class_name: "Strength Circuit", schedule: "Fri 17:00" },
        { member_id: 5, member_name: "Olivia Davis", class_id: 3, class_name: "Strength Circuit", schedule: "Fri 17:00" }
      ]
    },
    {
      id: 2,
      title: "Inactive Members",
      type: "LEFT JOIN",
      purpose: "Find members who haven't booked any classes",
      sql: `SELECT m.member_id, m.name
FROM Member m
LEFT JOIN Attends a ON a.member_id = m.member_id
WHERE a.class_id IS NULL;`,
      results: [
        { member_id: 10, name: "Ethan Clark" },
        { member_id: 8, name: "Noah Anderson" },
        { member_id: 6, name: "Liam Taylor" },
        { member_id: 9, name: "Isabella Moore" },
        { member_id: 7, name: "Ava Martinez" }
      ]
    },
    {
      id: 3,
      title: "Average Trainer Ratings",
      type: "Aggregation",
      purpose: "Calculate average feedback rating for each trainer",
      sql: `SELECT t.trainer_id, t.name, AVG(f.rating) AS avg_rating
FROM Trainer t
JOIN ClassAssignment ca ON ca.trainer_id = t.trainer_id
JOIN Attends a ON a.class_id = ca.class_id
JOIN Feedback f ON f.member_id = a.member_id
GROUP BY t.trainer_id, t.name
ORDER BY avg_rating DESC;`,
      results: [
        { trainer_id: 2, name: "Alice Lee", avg_rating: "4.50" },
        { trainer_id: 1, name: "John Smith", avg_rating: "4.50" },
        { trainer_id: 3, name: "Carlos Ruiz", avg_rating: "2.50" }
      ]
    },
    {
      id: 4,
      title: "Membership Revenue by Type",
      type: "Aggregation",
      purpose: "Calculate total revenue by membership type last quarter",
      sql: `SELECT mt.membership_type, mt.name, SUM(p.amount) AS revenue_last_q
FROM Payment p
JOIN Member m ON p.member_id = m.member_id
JOIN MembershipType mt ON mt.membership_type = m.membership_type
WHERE p.date >= date_trunc('quarter', current_date) - interval '3 months'
GROUP BY mt.membership_type, mt.name
ORDER BY revenue_last_q DESC;`,
      results: [
        { membership_type: "VIP", name: "VIP Annual", revenue: "$799.00" },
        { membership_type: "PREMIUM", name: "Premium Plan", revenue: "$359.94" },
        { membership_type: "BASIC", name: "Basic Plan", revenue: "$239.94" }
      ]
    },
    {
      id: 5,
      title: "Below-Average Attendance Classes",
      type: "Subquery",
      purpose: "Identify classes running below average attendance",
      sql: `SELECT fc.class_id, fc.name, COUNT(a.member_id) AS attend_cnt
FROM FitnessClass fc
LEFT JOIN Attends a ON a.class_id = fc.class_id
GROUP BY fc.class_id, fc.name
HAVING COUNT(a.member_id) < (
  SELECT AVG(cls_cnt) FROM (
    SELECT COUNT(a2.member_id) AS cls_cnt
    FROM FitnessClass fc2
    LEFT JOIN Attends a2 ON a2.class_id = fc2.class_id
    GROUP BY fc2.class_id
  ) x
)
ORDER BY attend_cnt;`,
      results: [
        { class_id: 7, name: "Kickboxing Basics", attend_cnt: 0 },
        { class_id: 8, name: "Meditation Hour", attend_cnt: 0 },
        { class_id: 9, name: "Bootcamp Burn", attend_cnt: 1 },
        { class_id: 4, name: "Pilates Core", attend_cnt: 1 },
        { class_id: 2, name: "Sunrise Yoga", attend_cnt: 1 }
      ]
    },
    {
      id: 6,
      title: "Equipment Maintenance Alert",
      type: "Subquery",
      purpose: "Find overdue equipment still heavily used",
      sql: `SELECT e.equipment_id, e.name, e.last_maintenance
FROM Equipment e
WHERE e.last_maintenance < current_date - interval '6 months'
AND (
  SELECT COUNT(*) FROM TrainingSession ts
  JOIN Includes i ON i.workout_id = ts.workout_id
  JOIN Exercise ex ON ex.exercise_id = i.exercise_id
  WHERE ex.equipment_id = e.equipment_id
  AND ts.time >= current_date - interval '3 months'
) >= 10;`,
      results: [
        { equipment_id: 5, name: "Elliptical Pro", last_maintenance: "2024-06-15" }
      ]
    }
  ]
};

// Disney+ Consulting Project Data
const disneyPlusData = {
  projectOverview: `Developed a comprehensive 5-year implementation plan for Disney+ to mitigate operational losses through content optimization strategy. The project addressed Disney's challenge of high production costs ($5.67B in 2023, up 14% YoY) while revenue only increased 11%.

Our team recommended optimizing content production to prioritize development and promotion of high-return content while minimizing expenditures on underperforming projects. The strategy leverages data analytics, AI, and feedback-driven iterations to achieve breakeven by 2024.`,
  objective: "Mitigate operational losses, break-even by end of 2024, and sustain profitability",
  recommendation: "Optimizing content production strategy that prioritizes the development and promotion of high-return content",
  marketShare: [
    { platform: "Prime Video", share: 22, color: "#00A8E1" },
    { platform: "Netflix", share: 21, color: "#E50914" },
    { platform: "Max", share: 15, color: "#741BD8" },
    { platform: "Disney+", share: 15, color: "#113CCF" },
    { platform: "Paramount+", share: 13, color: "#0064FF" },
    { platform: "Apple TV+", share: 7, color: "#555555" },
    { platform: "Other", share: 7, color: "#888888" }
  ],
  challenges: [
    { 
      category: "High Production Costs",
      points: [
        "Programming costs: $5,674M in 2023 (up from $4,466M in 2022)",
        "Operating expenses increased 14% while revenue only grew 11%",
        "Heavy investment in original content as differentiation strategy",
        "Balancing content volume with value dilutes quality"
      ]
    },
    {
      category: "Inefficient Content",
      points: [
        "Underutilized library where costly content doesn't reach viewership potential",
        "Redundant content targeting same audience without adding value",
        "Slow adaptation to changing viewer preferences",
        "Analytics and market insight currently underleveraged"
      ]
    }
  ],
  consumerSurvey: [
    { label: "Not at all Satisfied", value: 63.3, color: "#1e3a5f" },
    { label: "No Preference", value: 13.1, color: "#2d5a87" },
    { label: "Moderately Satisfied", value: 10.0, color: "#4a7fb0" },
    { label: "Very Satisfied", value: 8.6, color: "#7aacd4" },
    { label: "Extremely Satisfied", value: 5.0, color: "#a8d0f0" }
  ],
  implementationComponents: [
    { 
      title: "Data-Driven Decision Making",
      description: "Content Analytics, Predictive Modeling, Performance Metrics",
      icon: "📊"
    },
    {
      title: "Cost Management Initiatives", 
      description: "Streamline production process & scale back on underperforming content",
      icon: "💰"
    },
    {
      title: "Optimize Release Schedules",
      description: "Maintain consistent content flow using predictive analytics",
      icon: "📅"
    },
    {
      title: "Establish Continuous Feedback",
      description: "Real-time subscriber data on new releases",
      icon: "🔄"
    }
  ],
  financials: {
    investingActivities: 4969,
    operatingActivities: 32821,
    financingActivities: 48369,
    q3Revenue: 16420,
    revenueGrowth: 16,
    operatingLoss: -2496,
    targetCostReduction: 2496
  },
  risks: [
    { risk: "Over-Reliance on Data-Driven Decisions", mitigation: "Implement pilot projects for highly creative content that may not have solid data backing" },
    { risk: "Diminished Content Diversity", mitigation: "Schedule regular reviews of content portfolio to assess diversity and adjust plans" },
    { risk: "High Cost Implementation of Technology", mitigation: "Adopt phased approach starting with most critical areas" },
    { risk: "Consumer Privacy Concerns", mitigation: "Implement robust mechanisms for obtaining user consent regarding data collection" }
  ],
  fiveYearPlan: [
    { 
      year: "2024",
      initiatives: [
        "Conduct thorough audit of existing content performance",
        "Develop and begin pilot project based on data-driven insights"
      ]
    },
    {
      year: "2025", 
      initiatives: [
        "Start integrating analytics into content creation process",
        "Assess success of pilot projects and refine analytics",
        "Roll out from pilot projects across more content areas",
        "Begin systematic revisions of content scheduling"
      ]
    },
    {
      year: "2026",
      initiatives: [
        "Implement personalized content recommendations for different segments",
        "Use data to adjust content lifecycle management"
      ]
    },
    {
      year: "2027",
      initiatives: [
        "Deploy predictive analytics to forecast future trends",
        "Start integrating viewer feedback directly into content development"
      ]
    },
    {
      year: "2028",
      initiatives: [
        "Conduct comprehensive reviews of all strategies implemented",
        "Develop long-term strategies based on anticipated technology and viewer behavior changes"
      ]
    }
  ],
  caseStudy: {
    company: "HBO Max",
    headline: "HBO Max Overtakes Disney+ To Become The Third Largest Streaming Platform In The US",
    insights: [
      "Focused on producing original content directly informed by viewer preference data",
      "Data-driven personalization increased viewer engagement and reduced churn rates",
      "Strategic use of existing content and targeted originals drove subscriber growth"
    ]
  }
};

// File URLs - Replace with actual URLs when deploying
const fileUrls = {
  "Investment Report": "https://drive.google.com/file/d/1pZvsbMu9phaOqst1wPWA0XhnDXTtxxOH/view?usp=drive_link",
  "P&G Financial Model": "https://docs.google.com/spreadsheets/d/1lPjLkav9gMXBRqrL6wdlkeIqvK4EIfLM/edit?usp=drive_link&ouid=102480317172317890121&rtpof=true&sd=true",
  "Nike Financial Model": "https://docs.google.com/spreadsheets/d/1IaooIZX6LgxC8-4DoMWQoHWPhD9i9H_S/edit?usp=drive_link&ouid=102480317172317890121&rtpof=true&sd=true",
  "Investment Pitch": "https://docs.google.com/presentation/d/1xGYbFOts1zMvHF-5WTRh3bOOojE5y5ps/edit?usp=drive_link&ouid=102480317172317890121&rtpof=true&sd=true",
  "Brookfield Financial Model": "https://docs.google.com/spreadsheets/d/18MqXUrVuEH29TS1TTy-SIlOWaHICSIcw/edit?usp=drive_link&ouid=102480317172317890121&rtpof=true&sd=true",
  "System Documentation": "https://drive.google.com/file/d/1vlZ79WfsyCf8ITibZv9VpydRqsdikn-3/view?usp=drive_link",
  "Strategy Presentation": "https://drive.google.com/file/d/1_btXI81QnRIYMds6hozvQDFKXRnjR8wC/view?usp=drive_link"
};

export default function FinancePortfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(null);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileClick = (e, fileName) => {
    e.stopPropagation();
    const url = fileUrls[fileName];
    if (url && !url.includes('YOUR_')) {
      window.open(url, '_blank');
    } else {
      alert(`To enable this download:\n\n1. Host "${fileName}" on Google Drive or Dropbox\n2. Update the URL in the fileUrls object in the code`);
    }
  };

  const getFileIcon = (type) => {
    if (type === 'pdf') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <path d="M9 15h6"/><path d="M9 11h6"/>
        </svg>
      );
    }
    if (type === 'pptx') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <rect x="8" y="11" width="8" height="7" rx="1"/>
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <rect x="8" y="12" width="8" height="6" rx="1"/>
      </svg>
    );
  };

  const getDownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  // Recommendation Badge Component
  const RecBadge = ({ rec }) => {
    const colors = {
      BUY: { bg: '#10b981', text: '#fff' },
      HOLD: { bg: '#fbbf24', text: '#1a1a1a' },
      SELL: { bg: '#ef4444', text: '#fff' }
    };
    return (
      <span style={{
        background: colors[rec]?.bg || '#888',
        color: colors[rec]?.text || '#fff',
        padding: '0.25rem 0.75rem',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 600,
        fontFamily: '"DM Sans", sans-serif'
      }}>{rec}</span>
    );
  };

  // P&G Detailed View Component
  const PGDetailedView = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', overflow: 'auto'
    }} onClick={() => setShowDetailedView(null)}>
      <div style={{
        background: '#fff', borderRadius: '12px', maxWidth: '1100px',
        width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          padding: '2rem 2.5rem', color: '#fff', position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Business Valuation</p>
                <RecBadge rec="HOLD" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Procter & Gamble (PG)</h2>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Summary of Findings</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #1a365d' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{pgData.summaryFindings}</p>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Valuation Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>DCF Target Price</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1a365d', margin: 0 }}>${pgData.valuation.dcf.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{pgData.valuation.dcf.upside}% upside</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>EBITD Multiple Target</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1a365d', margin: 0 }}>${pgData.valuation.ebitdMultiple.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{pgData.valuation.ebitdMultiple.upside}% upside</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>Cost of Capital (WACC)</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1a365d', margin: 0 }}>{pgData.valuation.costOfCapital}%</p>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>Beta: {pgData.valuation.beta}</p>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Assumptions & Growth Trajectory</h3>
            <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{pgData.assumptions}</p>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>FY2025 Key Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Revenue", value: `$${(pgData.keyMetrics2025.revenue / 1000).toFixed(1)}B` },
                { label: "EBITD", value: `$${(pgData.keyMetrics2025.ebitd / 1000).toFixed(1)}B` },
                { label: "EBITD Margin", value: `${pgData.keyMetrics2025.ebitdMargin}%` },
                { label: "Gross Margin", value: `${pgData.keyMetrics2025.grossMargin}%` },
                { label: "ROIC", value: `${pgData.keyMetrics2025.roic}%` },
                { label: "EV/EBITD", value: `${pgData.keyMetrics2025.evEbitd}x` }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#eff6ff', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a365d', margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Revenue by Segment (FY2025)</h3>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
              {pgData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ width: `${seg.percent}%`, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 500 }}>
                  {seg.percent > 12 && `${seg.percent}%`}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {pgData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: seg.color }} />
                  <span style={{ fontSize: '0.85rem', color: '#333' }}>{seg.segment}</span>
                  <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 'auto' }}>${(seg.value / 1000).toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>ROIC Trend (%)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '150px', padding: '0 0.5rem' }}>
              {pgData.historicalROIC.map((item, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>{item.value}%</span>
                  <div style={{ width: '100%', height: `${(item.value / 25) * 120}px`, background: item.year.includes('E') ? '#93c5fd' : '#1a365d', borderRadius: '4px 4px 0 0', minHeight: '20px' }} />
                  <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.5rem' }}>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Comparable Companies Analysis</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Company</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Market Cap</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EV/EBITD</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>ROIC</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EBITD Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {pgData.comparables.map((comp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: comp.company === 'P&G' ? '#eff6ff' : 'transparent' }}>
                      <td style={{ padding: '0.75rem', fontWeight: comp.company === 'P&G' ? 600 : 400 }}>{comp.company}</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.marketCap}</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.evEbitd}x</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.roic}%</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.ebitdMargin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleFileClick(e, 'Investment Report')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#1a365d', color: '#fff', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('pdf')} Download Report (PDF)
            </button>
            <button onClick={(e) => handleFileClick(e, 'Financial Model')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fff', color: '#1a365d', border: '2px solid #1a365d', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('xlsx')} Download Model (Excel)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Nike Detailed View Component
  const NikeDetailedView = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflow: 'auto' }} onClick={() => setShowDetailedView(null)}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1100px', width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', padding: '2rem 2.5rem', color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Business Valuation</p>
                <RecBadge rec="HOLD" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Nike (NKE)</h2>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Summary of Findings</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #f97316' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{nikeData.summaryFindings}</p>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Valuation Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>DCF Target Price</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>${nikeData.valuation.dcf.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>vs. ${nikeData.valuation.dcf.currentPrice} current</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>EBITD Multiple Target</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#16a34a', margin: 0 }}>${nikeData.valuation.ebitdMultiple.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{nikeData.valuation.ebitdMultiple.upside}% upside</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>Cost of Capital (WACC)</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>{nikeData.valuation.costOfCapital}%</p>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>LT Growth: {nikeData.valuation.ltGrowthRate}%</p>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Assumptions & Growth Trajectory</h3>
            <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{nikeData.assumptions}</p>
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>FY2025 Key Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Revenue", value: `$${(nikeData.keyMetrics2025.revenue / 1000).toFixed(1)}B` },
                { label: "EBITD", value: `$${(nikeData.keyMetrics2025.ebitd / 1000).toFixed(1)}B` },
                { label: "EBITD Margin", value: `${nikeData.keyMetrics2025.ebitdMargin}%` },
                { label: "ROIC", value: `${nikeData.keyMetrics2025.roic}%` },
                { label: "EV/EBITD", value: `${nikeData.keyMetrics2025.evEbitd}x` },
                { label: "Net Income", value: `$${(nikeData.keyMetrics2025.netIncome / 1000).toFixed(1)}B` }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#fef7f0', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f97316', margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Revenue by Segment (FY2025)</h3>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
              {nikeData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ width: `${seg.percent}%`, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i < 2 ? '#fff' : '#333', fontSize: '0.7rem', fontWeight: 500 }}>
                  {seg.percent > 10 && `${seg.percent}%`}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {nikeData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: seg.color }} />
                  <span style={{ fontSize: '0.85rem', color: '#333' }}>{seg.segment}</span>
                  <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 'auto' }}>${(seg.value / 1000).toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>ROIC Trend (%)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '150px', padding: '0 0.5rem' }}>
              {nikeData.historicalROIC.map((item, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: '#666', marginBottom: '0.25rem' }}>{item.value}%</span>
                  <div style={{ width: '100%', height: `${(item.value / 50) * 120}px`, background: item.year.includes('E') ? '#fdba74' : '#f97316', borderRadius: '4px 4px 0 0', minHeight: '20px' }} />
                  <span style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.5rem' }}>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Comparable Companies Analysis</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Company</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EV/EBITD</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>ROIC</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EBITD Margin</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>FCF Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {nikeData.comparables.map((comp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: comp.company === 'Nike' ? '#fef7f0' : 'transparent' }}>
                      <td style={{ padding: '0.75rem', fontWeight: comp.company === 'Nike' ? 600 : 400 }}>{comp.company}</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.evEbitd}x</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.roic}%</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.ebitdMargin}%</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.fcfYield}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={(e) => handleFileClick(e, 'Financial Model')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f97316', color: '#fff', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getDownloadIcon()} Download Excel Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Brookfield Detailed View Component
  const BrookfieldDetailedView = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflow: 'auto' }} onClick={() => setShowDetailedView(null)}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1100px', width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', padding: '2rem 2.5rem', color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Business Valuation</p>
                <RecBadge rec="BUY" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Brookfield Renewable (BEPC)</h2>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          {/* Summary */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Summary of Findings</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #059669' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{brookfieldData.summaryFindings}</p>
            </div>
          </div>

          {/* Valuation Summary */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Valuation Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>Multiple-Based Target</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#059669', margin: 0 }}>${brookfieldData.valuation.multipleTarget.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{brookfieldData.valuation.multipleTarget.upside}% upside</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>DCF Target Price</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#059669', margin: 0 }}>${brookfieldData.valuation.dcf.targetPrice}</p>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{brookfieldData.valuation.dcf.upside}% upside</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 0.5rem' }}>WACC</p>
                <p style={{ fontSize: '2rem', fontWeight: 600, color: '#059669', margin: 0 }}>{brookfieldData.valuation.costOfCapital}%</p>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>LT Growth: {brookfieldData.valuation.ltGrowthRate}%</p>
              </div>
            </div>
          </div>

          {/* Scenario Analysis */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Scenario Analysis (2027)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', margin: '0 0 0.5rem', fontWeight: 500 }}>Bear Case</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 600, color: '#dc2626', margin: 0 }}>${brookfieldData.scenarioAnalysis.bear.price}</p>
                <p style={{ fontSize: '0.8rem', color: '#dc2626', margin: '0.25rem 0 0' }}>{brookfieldData.scenarioAnalysis.bear.upside}%</p>
              </div>
              <div style={{ background: '#ecfdf5', padding: '1.25rem', borderRadius: '8px', textAlign: 'center', border: '2px solid #059669' }}>
                <p style={{ fontSize: '0.75rem', color: '#065f46', margin: '0 0 0.5rem', fontWeight: 500 }}>Base Case</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 600, color: '#059669', margin: 0 }}>${brookfieldData.scenarioAnalysis.base.price}</p>
                <p style={{ fontSize: '0.8rem', color: '#059669', margin: '0.25rem 0 0' }}>+{brookfieldData.scenarioAnalysis.base.upside}%</p>
              </div>
              <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', margin: '0 0 0.5rem', fontWeight: 500 }}>Bull Case</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 600, color: '#16a34a', margin: 0 }}>${brookfieldData.scenarioAnalysis.bull.price}</p>
                <p style={{ fontSize: '0.8rem', color: '#16a34a', margin: '0.25rem 0 0' }}>+{brookfieldData.scenarioAnalysis.bull.upside}%</p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.75rem', textAlign: 'center' }}>Risk/Reward Ratio: <strong>{brookfieldData.scenarioAnalysis.rrRatio}x</strong></p>
          </div>

          {/* Assumptions */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Assumptions & Growth Trajectory</h3>
            <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{brookfieldData.assumptions}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>2024E Key Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Revenue", value: `$${(brookfieldData.keyMetrics2024.revenue / 1000).toFixed(2)}B` },
                { label: "EBITDA", value: `$${(brookfieldData.keyMetrics2024.ebitda / 1000).toFixed(2)}B` },
                { label: "EBITDA Margin", value: `${brookfieldData.keyMetrics2024.ebitdaMargin}%` },
                { label: "EBIT Margin", value: `${brookfieldData.keyMetrics2024.ebitMargin}%` },
                { label: "ROIC", value: `${brookfieldData.keyMetrics2024.roic}%` },
                { label: "EV/EBITDA", value: `${brookfieldData.keyMetrics2024.evEbitda}x` }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#ecfdf5', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#059669', margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Metrics */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>2023-2027 Growth Projections</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {brookfieldData.growthMetrics.map((item, i) => (
                <div key={i} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#059669', margin: 0 }}>{item.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{item.metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Revenue by Segment (2024E)</h3>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
              {brookfieldData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ width: `${seg.percent}%`, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 500 }}>
                  {seg.percent > 10 && `${seg.percent}%`}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {brookfieldData.revenueBreakdown.map((seg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: seg.color }} />
                  <span style={{ fontSize: '0.85rem', color: '#333' }}>{seg.segment}</span>
                  <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 'auto' }}>${seg.value}M</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROIC Trend */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>ROIC Trend (%)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '150px', padding: '0 0.5rem' }}>
              {brookfieldData.historicalROIC.map((item, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>{item.value}%</span>
                  <div style={{ width: '100%', height: `${(item.value / 6) * 120}px`, background: item.year.includes('E') ? '#6ee7b7' : '#059669', borderRadius: '4px 4px 0 0', minHeight: '20px' }} />
                  <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.5rem' }}>{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparables */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Comparable Companies Analysis</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Company</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EV/EBITDA</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>ROIC</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EBITDA Margin</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem', color: '#666', fontWeight: 500 }}>EBIT Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {brookfieldData.comparables.map((comp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: comp.company === 'Brookfield Renewable' ? '#ecfdf5' : 'transparent' }}>
                      <td style={{ padding: '0.75rem', fontWeight: comp.company === 'Brookfield Renewable' ? 600 : 400 }}>{comp.company}</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.evEbitda}x</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.roic}%</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.ebitdaMargin}%</td>
                      <td style={{ textAlign: 'right', padding: '0.75rem' }}>{comp.ebitMargin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Download Buttons */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleFileClick(e, 'Investment Pitch')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#059669', color: '#fff', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('pptx')} Download Pitch (PPTX)
            </button>
            <button onClick={(e) => handleFileClick(e, 'Financial Model')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fff', color: '#059669', border: '2px solid #059669', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('xlsx')} Download Model (Excel)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dream Drops Detailed View Component
  const DreamDropsDetailedView = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg, #9d6b7d 0%, #b4838f 100%)', color: '#fff', padding: '2rem 2.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Systems Analysis & Design</p>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>COMPLETE</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Dream Drops</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '0.5rem 0 0', fontFamily: '"DM Sans", sans-serif' }}>AI-Powered Soundtrack Generation System</p>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          {/* Project Overview */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Project Overview</h3>
            <div style={{ background: '#fdf2f4', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fce7eb', borderLeft: '4px solid #9d6b7d' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{dreamDropsData.projectOverview}</p>
            </div>
          </div>

          {/* Business Value */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Business Value</h3>
            <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{dreamDropsData.businessValue}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Project Scope</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Functional Modules", value: "9" },
                { label: "Database Entities", value: "8" },
                { label: "Use Cases", value: "9" },
                { label: "UI Screens", value: "6" },
                { label: "Team Members", value: "20+" },
                { label: "Documentation", value: "32 Pages" }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#fdf2f4', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#9d6b7d', margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Functional Modules */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Functional Requirements Modules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {dreamDropsData.functionalModules.map((module, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: module.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>{module.id}</div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#333', margin: 0 }}>{module.name}</p>
                    <p style={{ fontSize: '0.8rem', color: '#666', margin: '0.25rem 0 0' }}>{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Timeline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Project Timeline & Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {dreamDropsData.projectTimeline.map((phase, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '140px', fontSize: '0.85rem', color: '#333', fontWeight: 500 }}>{phase.phase}</div>
                  <div style={{ flex: 1, height: '24px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ width: `${phase.percent}%`, height: '100%', background: phase.percent === 100 ? '#10b981' : phase.percent > 0 ? '#9d6b7d' : '#cbd5e1', transition: 'width 0.3s ease' }} />
                    <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', fontWeight: 500, color: phase.percent > 50 ? '#fff' : '#666' }}>{phase.percent}%</span>
                  </div>
                  <div style={{ width: '80px', fontSize: '0.75rem', color: '#888', textAlign: 'right' }}>{phase.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Schema */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Database Entities (ERD)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Entity</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Key Attributes</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem', color: '#666', fontWeight: 500 }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {dreamDropsData.databaseEntities.map((entity, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 500, color: '#9d6b7d' }}>{entity.name}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#555' }}>{entity.fields}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <span style={{ background: entity.records === 'Core' ? '#ecfdf5' : '#eff6ff', color: entity.records === 'Core' ? '#059669' : '#2563eb', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 500 }}>{entity.records}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Use Cases Summary */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Key Use Cases Documented</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
              {dreamDropsData.useCaseSummary.map((uc, i) => (
                <div key={i} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>UC{uc.id}: {uc.name}</span>
                    <span style={{ background: '#fef2f2', color: '#dc2626', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 500 }}>{uc.priority}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    <p style={{ margin: '0.25rem 0' }}><strong>Actors:</strong> {uc.actors}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Trigger:</strong> {uc.triggers}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Outputs:</strong> {uc.outputs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Allocation */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Resource Allocation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
              {dreamDropsData.resourceAllocation.map((resource, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#9d6b7d', margin: 0 }}>{resource.count}</p>
                  <p style={{ fontSize: '0.8rem', color: '#333', margin: '0.25rem 0 0', fontWeight: 500 }}>{resource.role}</p>
                  <p style={{ fontSize: '0.7rem', color: '#888', margin: '0.25rem 0 0' }}>{resource.rate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Issues */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Special Considerations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {dreamDropsData.specialIssues.map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e', margin: 0 }}>{item.issue}</p>
                  <p style={{ fontSize: '0.8rem', color: '#666', margin: '0.5rem 0 0' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Project Deliverables</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {dreamDropsData.deliverables.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span style={{ fontSize: '0.85rem', color: '#333' }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{item.pages} pg</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleFileClick(e, 'System Documentation')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#9d6b7d', color: '#fff', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('pdf')} Download Full Documentation (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Gym Database Detailed View Component
  const GymDbDetailedView = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1100px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: '#fff', padding: '2rem 2.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Database Design & SQL</p>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>PostgreSQL</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Gym Management Database</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '0.5rem 0 0', fontFamily: '"DM Sans", sans-serif' }}>Relational Database Design & Implementation</p>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          {/* Project Overview */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Project Overview</h3>
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #dbeafe', borderLeft: '4px solid #2563eb' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{gymDbData.projectOverview}</p>
            </div>
          </div>

          {/* Design Challenges */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Design Challenges</h3>
            <div style={{ background: '#fffbeb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{gymDbData.designChallenges}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Database Schema Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Entities", value: "10" },
                { label: "Junction Tables", value: "3" },
                { label: "Foreign Keys", value: "12" },
                { label: "SQL Queries", value: "6" },
                { label: "Relationships", value: "10" },
                { label: "Phases", value: "2" }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#eff6ff', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2563eb', margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Entity Table */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Entity Definitions (ERD)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 600 }}>Entity</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 600 }}>Primary Key</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 600 }}>Attributes</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#666', fontWeight: 600 }}>Instance Example</th>
                  </tr>
                </thead>
                <tbody>
                  {gymDbData.entities.map((entity, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: '#2563eb' }}>{entity.name}</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#7c3aed' }}>{entity.pk}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#555' }}>{entity.attributes}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>{entity.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Junction Tables */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Junction Tables (Many-to-Many)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {gymDbData.junctionTables.map((jt, i) => (
                <div key={i} style={{ background: '#faf5ff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#7c3aed' }}>{jt.name}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#666', margin: '0 0 0.5rem', background: '#f3e8ff', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>({jt.keys})</p>
                  <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>{jt.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Relationships */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Entity Relationships</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
              {gymDbData.relationships.map((rel, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#2563eb', minWidth: '90px' }}>{rel.from}</span>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: rel.type.includes('Many-to-Many') ? '#faf5ff' : '#ecfdf5', color: rel.type.includes('Many-to-Many') ? '#7c3aed' : '#059669', borderRadius: '4px', fontWeight: 500 }}>{rel.type}</span>
                  <span style={{ color: '#888' }}>→</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#2563eb' }}>{rel.to}</span>
                  {rel.junction && <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontStyle: 'italic' }}>via {rel.junction}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* SQL Queries */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>SQL Queries & Results</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {gymDbData.queries.map((query, i) => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', color: '#fff', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Query {query.id}: {query.title}</span>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', marginLeft: '0.75rem' }}>{query.type}</span>
                    </div>
                  </div>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.75rem' }}><strong>Purpose:</strong> {query.purpose}</p>
                    <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', fontSize: '0.75rem', overflow: 'auto', margin: 0, fontFamily: '"Fira Code", monospace' }}>{query.sql}</pre>
                  </div>
                  <div style={{ padding: '1rem 1.25rem' }}>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#888', margin: '0 0 0.5rem', fontWeight: 500 }}>Sample Results</p>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ background: '#f1f5f9' }}>
                            {Object.keys(query.results[0]).map((key, j) => (
                              <th key={j} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: '#475569', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {query.results.slice(0, 5).map((row, j) => (
                            <tr key={j} style={{ borderBottom: '1px solid #e2e8f0' }}>
                              {Object.values(row).map((val, k) => (
                                <td key={k} style={{ padding: '0.5rem 0.75rem', color: '#334155' }}>{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foreign Keys */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Foreign Key Constraints</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {gymDbData.foreignKeys.map((fk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: '#f8fafc', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                  <span style={{ color: '#334155' }}>{fk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Disney+ Consulting Detailed View Component
  const DisneyPlusDetailedView = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1100px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)', color: '#fff', padding: '2rem 2.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Strategy Consulting</p>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>BU CONSULTING GROUP</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Disney+ Content Strategy</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: '0.5rem 0 0', fontFamily: '"DM Sans", sans-serif' }}>5-Year Implementation Plan</p>
            </div>
            <button onClick={() => setShowDetailedView(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>
        <div style={{ padding: '2rem 2.5rem', fontFamily: '"DM Sans", sans-serif' }}>
          {/* Executive Summary */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Executive Summary</h3>
            <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd', borderLeft: '4px solid #0284c7' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#444', margin: 0, whiteSpace: 'pre-line' }}>{disneyPlusData.projectOverview}</p>
            </div>
          </div>

          {/* Objective & Recommendation */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#ecfdf5', padding: '1.5rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#059669', margin: '0 0 0.5rem', fontWeight: 600 }}>Our Objective</p>
                <p style={{ fontSize: '1rem', color: '#065f46', margin: 0, fontWeight: 500 }}>{disneyPlusData.objective}</p>
              </div>
              <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563eb', margin: '0 0 0.5rem', fontWeight: 600 }}>Our Recommendation</p>
                <p style={{ fontSize: '1rem', color: '#1e40af', margin: 0, fontWeight: 500 }}>{disneyPlusData.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Market Share */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Streaming Market Share</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
                {disneyPlusData.marketShare.map((item, i) => (
                  <div key={i} style={{ width: `${item.share}%`, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 600 }}>
                    {item.share > 10 && `${item.share}%`}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {disneyPlusData.marketShare.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                    <span style={{ fontSize: '0.8rem', color: '#333' }}>{item.platform}</span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{item.share}%</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '1rem 0 0', fontStyle: 'italic' }}>Disney+ holds 15% market share, behind Netflix and Prime Video — presenting opportunity for growth</p>
            </div>
          </div>

          {/* Challenges */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Key Challenges Identified</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
              {disneyPlusData.challenges.map((challenge, i) => (
                <div key={i} style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#991b1b', margin: '0 0 0.75rem' }}>{challenge.category}</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {challenge.points.map((point, j) => (
                      <li key={j} style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '0.5rem', lineHeight: 1.5 }}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Consumer Survey */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Consumer Satisfaction Survey</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 1rem', fontStyle: 'italic' }}>"How satisfied are you with recent Disney content?"</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {disneyPlusData.consumerSurvey.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '140px', fontSize: '0.8rem', color: '#333' }}>{item.label}</div>
                    <div style={{ flex: 1, height: '24px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.value}%`, height: '100%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{item.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#dc2626', margin: '1rem 0 0', fontWeight: 500 }}>⚠️ 63.3% of respondents are "Not at all Satisfied" with recent content</p>
            </div>
          </div>

          {/* Implementation Components */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>4 Key Implementation Components</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {disneyPlusData.implementationComponents.map((comp, i) => (
                <div key={i} style={{ background: '#f0f9ff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #bae6fd', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{comp.icon}</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0c4a6e', margin: '0 0 0.5rem' }}>{comp.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#0369a1', margin: 0 }}>{comp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Feasibility */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Financial Feasibility</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: "Investing Activities", value: `$${(disneyPlusData.financials.investingActivities / 1000).toFixed(1)}B`, color: "#059669" },
                { label: "Operating Activities", value: `$${(disneyPlusData.financials.operatingActivities / 1000).toFixed(1)}B`, color: "#059669" },
                { label: "Q3 Revenue", value: `$${(disneyPlusData.financials.q3Revenue / 1000).toFixed(1)}B`, color: "#2563eb" },
                { label: "Revenue Growth", value: `+${disneyPlusData.financials.revenueGrowth}%`, color: "#059669" },
                { label: "Operating Loss", value: `$${(disneyPlusData.financials.operatingLoss / 1000).toFixed(1)}B`, color: "#dc2626" },
                { label: "Target Savings", value: `$${(disneyPlusData.financials.targetCostReduction / 1000).toFixed(1)}B`, color: "#7c3aed" }
              ].map((metric, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: metric.color, margin: 0 }}>{metric.value}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.25rem 0 0' }}>{metric.label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#059669', margin: 0 }}>✓ Disney+ can achieve breakeven by 2024 with this implementation plan</p>
            </div>
          </div>

          {/* 5 Year Timeline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>5-Year Implementation Roadmap</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {disneyPlusData.fiveYearPlan.map((year, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '70px', padding: '0.5rem', background: '#0c4a6e', color: '#fff', borderRadius: '6px', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>{year.year}</div>
                  <div style={{ flex: 1, background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {year.initiatives.map((initiative, j) => (
                        <li key={j} style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '0.25rem' }}>{initiative}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks & Mitigations */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Risks & Mitigations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {disneyPlusData.risks.map((item, i) => (
                <div key={i} style={{ background: '#fffbeb', padding: '1rem', borderRadius: '8px', border: '1px solid #fef3c7' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e', margin: '0 0 0.5rem' }}>⚠️ {item.risk}</p>
                  <p style={{ fontSize: '0.8rem', color: '#78350f', margin: 0 }}>→ {item.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Case Study: {disneyPlusData.caseStudy.company}</h3>
            <div style={{ background: '#faf5ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#7c3aed', margin: '0 0 1rem' }}>"{disneyPlusData.caseStudy.headline}"</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {disneyPlusData.caseStudy.insights.map((insight, i) => (
                  <li key={i} style={{ fontSize: '0.85rem', color: '#6b21a8', marginBottom: '0.5rem' }}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download Button */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleFileClick(e, 'Strategy Presentation')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#0c4a6e', color: '#fff', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
              {getFileIcon('pptx')} Download Presentation (PPTX)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #faf9f7 0%, #f5f3f0 100%)', fontFamily: '"Cormorant Garamond", Georgia, serif', color: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
      {showDetailedView === 'pg' && <PGDetailedView />}
      {showDetailedView === 'nike' && <NikeDetailedView />}
      {showDetailedView === 'brookfield' && <BrookfieldDetailedView />}
      {showDetailedView === 'dreamdrops' && <DreamDropsDetailedView />}
      {showDetailedView === 'gymdb' && <GymDbDetailedView />}
      {showDetailedView === 'disneyplus' && <DisneyPlusDetailedView />}

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.03, pointerEvents: 'none', zIndex: 0 }} />

      <header style={{ padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0, fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Myint Myat Theingi (Maddie)</h1>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0 0', letterSpacing: '0.1em', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Aspiring Financial Analyst</p>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} style={{ color: '#1a1a1a', textDecoration: 'none', cursor: 'pointer' }}>Projects</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} style={{ color: '#1a1a1a', textDecoration: 'none', cursor: 'pointer' }}>About</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{ color: '#1a1a1a', textDecoration: 'none', cursor: 'pointer' }}>Contact</a>
        </nav>
      </header>

      <section style={{ padding: '4rem 4rem 8rem', maxWidth: '900px', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Portfolio</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 400, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
          Finance, Strategy<br /><span style={{ fontStyle: 'italic', color: '#4a5568' }}>&amp; Information Systems</span>
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555', maxWidth: '600px', marginTop: '2rem', fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 300 }}>
          Early-career analyst with experience applying financial, strategic, and systems analysis to support decision-making. I use modeling, database design, and data analysis to evaluate business tradeoffs, helping teams make better decisions under uncertainty.
        </p>
        <div style={{ width: '60px', height: '1px', background: '#1a1a1a', marginTop: '3rem' }} />
      </section>

      <section id="projects" style={{ padding: '0 4rem 6rem', position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Featured Work</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>Selected Projects</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <div key={project.id} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}
              style={{ background: hoveredProject === project.id ? '#fff' : 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)', padding: '2.5rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: hoveredProject === project.id ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hoveredProject === project.id ? '0 20px 40px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: hoveredProject === project.id ? '100%' : '0%', height: '2px', background: project.color, transition: 'width 0.4s ease' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: project.color, fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 500 }}>{project.category}</span>
                <span style={{ fontSize: '0.85rem', color: '#999', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>0{index + 1}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400, margin: '0 0 1rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{project.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#666', margin: '0 0 1.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 300 }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.metrics.map((metric, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem', background: 'rgba(0,0,0,0.04)', letterSpacing: '0.05em', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>{metric}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {project.tools.map((tool, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', color: '#888', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>{tool}</span>
                ))}
              </div>
              {(project.files.length > 0 || project.detailedView) && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Project Files</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {project.detailedView && (
                      <button onClick={() => setShowDetailedView(project.detailedView)} onMouseEnter={() => setHoveredFile(`${project.id}-details`)} onMouseLeave={() => setHoveredFile(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: hoveredFile === `${project.id}-details` ? '#fff' : project.color, background: hoveredFile === `${project.id}-details` ? project.color : `${project.color}10`, border: `1px solid ${project.color}`, borderRadius: '6px', padding: '0.75rem 1rem', cursor: 'pointer', fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 500, transition: 'all 0.2s ease', textAlign: 'left' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span style={{ flex: 1 }}>View Detailed Analysis</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>→</span>
                      </button>
                    )}
                    {project.files.map((file, i) => (
                      <button key={i} onClick={(e) => handleFileClick(e, file.name)} onMouseEnter={() => setHoveredFile(`${project.id}-${i}`)} onMouseLeave={() => setHoveredFile(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: hoveredFile === `${project.id}-${i}` ? '#fff' : project.color, background: hoveredFile === `${project.id}-${i}` ? project.color : `${project.color}10`, border: `1px solid ${project.color}`, borderRadius: '6px', padding: '0.75rem 1rem', cursor: 'pointer', fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 500, transition: 'all 0.2s ease', textAlign: 'left' }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>{getFileIcon(file.type)}</span>
                        <span style={{ flex: 1 }}>{file.name}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>{getDownloadIcon()}{file.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{ padding: '6rem 4rem', background: '#1a1a1a', color: '#fff', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1200px' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>About</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 400, lineHeight: 1.4, margin: 0, letterSpacing: '-0.01em' }}>
              Translating ambiguous business questions into <span style={{ fontStyle: 'italic', color: '#a0aec0' }}> structured insights.</span>
            </p>
          </div>
          <div style={{ fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 300, lineHeight: 1.8, color: '#aaa' }}>
            <p style={{ marginTop: 0 }}>Recent graduate from Boston University with a BBA in Finance and Information Systems. My experience spans corporate finance, systems analysis, database design, and strategic analysis across diverse business environments.</p>
            <p style={{ marginTop: '1.5rem' }}>I specialize in modeling, forecasting, systems design, and scenario analysis—helping teams evaluate tradeoffs and make data-driven decisions. Comfortable working cross-functionally with finance, operations, and leadership stakeholders.</p>
          </div>
        </div>
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Education</h4>
          <p style={{ fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 400 }}>Boston University</p>
          <p style={{ fontSize: '0.9rem', color: '#888', margin: 0, fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Bachelor of Business Administration — Finance & Information Systems</p>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Skills & Certifications</h4>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['Financial Modeling', 'SQL & Database Design', 'Systems Analysis', 'Data Analysis', 'FP&A', 'Professional Scrum Master', 'Power BI', 'Bloomberg Terminal', 'Six Sigma'].map((skill, i) => (
              <span key={i} style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: '#999', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>{skill}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Languages</h4>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['English (Native)', 'Burmese (Native)', 'Korean', 'Chinese'].map((lang, i) => (
              <span key={i} style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: '#999', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>{lang}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '6rem 4rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem', fontFamily: '"DM Sans", Helvetica, sans-serif' }}>Get in Touch</h3>
        <p style={{ fontSize: '2rem', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>Let's connect.</p>
        <p style={{ fontSize: '1rem', color: '#666', margin: '0 0 2rem', fontFamily: '"DM Sans", Helvetica, sans-serif', fontWeight: 300 }}>Boston, MA • Open to relocation</p>
        <a href="mailto:maddietheingi@gmail.com" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#1a1a1a', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', fontFamily: '"DM Sans", Helvetica, sans-serif', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => { e.target.style.background = '#333'; e.target.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.target.style.background = '#1a1a1a'; e.target.style.transform = 'translateY(0)'; }}>
          maddietheingi@gmail.com
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
          <a href="https://www.linkedin.com/in/maddietheingi" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.85rem', fontFamily: '"DM Sans", Helvetica, sans-serif', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#1a1a1a'} onMouseLeave={(e) => e.target.style.color = '#666'}>LinkedIn</a>
        </div>
      </section>

      <footer style={{ padding: '2rem 4rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', fontFamily: '"DM Sans", Helvetica, sans-serif', position: 'relative', zIndex: 10 }}>
        <span>© 2025 Myint Myat Theingi</span>
        <span>Portfolio</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        button:focus { outline: 2px solid currentColor; outline-offset: 2px; }
      `}</style>
    </div>
  );
}
