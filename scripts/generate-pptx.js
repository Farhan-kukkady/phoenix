const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

async function generateDeck() {
  const pres = new pptxgen();

  // Widescreen 16:9 (13.33" x 7.5") — standard modern presentation dimensions
  pres.defineLayout({ name: "WIDESCREEN_16_9", width: 13.33, height: 7.5 });
  pres.layout = "WIDESCREEN_16_9";
  pres.author = "Phoenix Colour Technologies";
  pres.company = "Phoenix Colour Technologies";
  pres.title = "Transforming Phoenix Colour Technologies with AI";

  // Brand Palette
  const NAVY = "0F1742";
  const NAVY_CARD = "18235A";
  const CRIMSON = "C41E3A";
  const LIGHT_BG = "F8FAFC";
  const WHITE = "FFFFFF";
  const SLATE_DARK = "0F172A";
  const SLATE_MUTED = "475569";
  const EMERALD = "059669";
  const BORDER_COLOR = "E2E8F0";

  const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");
  const imgChatbot = path.join(SCREENSHOTS_DIR, "01_chatbot.png");
  const imgSelector = path.join(SCREENSHOTS_DIR, "02_selector.png");
  const imgSelectorResult = path.join(SCREENSHOTS_DIR, "03_selector_result.png");
  const imgRoi = path.join(SCREENSHOTS_DIR, "04_roi_calculator.png");
  const imgToolsHub = path.join(SCREENSHOTS_DIR, "05_tools_hub.png");

  // Helper: Slide Header
  function addSlideHeader(slide, category, title) {
    slide.background = { color: LIGHT_BG };

    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.45,
      w: 11.5,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: CRIMSON,
      letterSpacing: 2,
    });

    slide.addText(title, {
      x: 0.8,
      y: 0.8,
      w: 11.7,
      h: 0.65,
      fontSize: 22,
      bold: true,
      color: NAVY,
    });
  }

  // ==========================================
  // SLIDE 1: TITLE SLIDE
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };

    // Pill badge
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0,
      y: 1.8,
      w: 4.8,
      h: 0.45,
      fill: { color: "1E2958" },
      line: { color: "334185", width: 1 },
      rectRadius: 0.2,
    });
    slide.addText("INDUSTRIAL AI & COMMERCE TRANSFORMATION", {
      x: 1.0,
      y: 1.8,
      w: 4.8,
      h: 0.45,
      fontSize: 10,
      bold: true,
      color: "F43F5E",
      align: "center",
      valign: "middle",
      letterSpacing: 1.5,
    });

    slide.addText("Transforming Phoenix Colour Technologies with AI", {
      x: 1.0,
      y: 2.5,
      w: 11.3,
      h: 1.8,
      fontSize: 38,
      bold: true,
      color: WHITE,
      lineSpacing: 46,
    });

    slide.addText(
      "How intelligent diagnostic tools, 24/7 AI consultation, and financial ROI modelers turn a 200+ product catalog into a high-converting lead generation engine for the UAE, Saudi Arabia, GCC & Africa.",
      {
        x: 1.0,
        y: 4.4,
        w: 11.0,
        h: 0.9,
        fontSize: 15,
        color: "CBD5E1",
        lineSpacing: 24,
      }
    );

    slide.addShape(pres.shapes.LINE, {
      x: 1.0,
      y: 5.9,
      w: 11.33,
      h: 0,
      line: { color: "334185", width: 1 },
    });

    slide.addText("Presented by: Technical Solutions & AI Architecture Team", {
      x: 1.0,
      y: 6.1,
      w: 6.0,
      h: 0.4,
      fontSize: 11,
      color: "94A3B8",
    });
    slide.addText("Confidential • Phoenix Colour Technologies 2026", {
      x: 6.3,
      y: 6.1,
      w: 6.0,
      h: 0.4,
      fontSize: 11,
      color: "94A3B8",
      align: "right",
    });
  }

  // ==========================================
  // SLIDE 2: THE EXECUTIVE PROBLEM
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Market Opportunity", "The Problem: Why Traditional B2B Industrial Catalogs Lose Deals");

    // Left Column Card: The Reality
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("The B2B Buyer's Dilemma Today", {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 17,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• 21 Global Brands & 200+ Products: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Too many options cause 'catalog paralysis'. Packaging managers don't know where to click.\n\n", options: { color: SLATE_MUTED } },
        { text: "• High Technical Jargon Barrier: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Buyers don't know which optical geometry (45°:0°, Sphere d/8°, Multi-Angle) fits their substrate.\n\n", options: { color: SLATE_MUTED } },
        { text: "• $15,000 - $25,000+ Price Barrier: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Without immediate proof of waste savings and payback, factory CFOs delay purchasing.\n\n", options: { color: SLATE_MUTED } },
        { text: "• 98% Silent Drop-Off: ", options: { bold: true, color: CRIMSON } },
        { text: "Busy plant managers research at night and leave because generic contact forms are too slow.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 5.0, h: 4.1, fontSize: 12, lineSpacing: 21 }
    );

    // Right Column Card: The AI Opportunity
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.7,
      h: 5.2,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("The AI Transformation Solution", {
      x: 7.1,
      y: 1.9,
      w: 5.1,
      h: 0.4,
      fontSize: 17,
      bold: true,
      color: WHITE,
    });
    slide.addText(
      [
        { text: "1. 24/7 AI Technical Advisor (Phoenix AI)\n", options: { bold: true, color: "F43F5E" } },
        { text: "Instant technical answers for buyers in UAE, Saudi Arabia, Kuwait & Africa—even after hours.\n\n", options: { color: "CBD5E1" } },
        { text: "2. 3-Step AI Substrate Selector\n", options: { bold: true, color: "38BDF8" } },
        { text: "Diagnoses customer material (film, foil, paper, plastics) and gives exact certified machine match.\n\n", options: { color: "CBD5E1" } },
        { text: "3. Makeready & Waste ROI Modeler\n", options: { bold: true, color: "34D399" } },
        { text: "Proves equipment pays for itself in ~3.2 months with 40% substrate waste reduction.\n\n", options: { color: "CBD5E1" } },
        { text: "4. One-Click WhatsApp Lead Handoff\n", options: { bold: true, color: WHITE } },
        { text: "Delivers pre-qualified buyers directly to sales engineers with their exact plant numbers attached.", options: { color: "94A3B8" } },
      ],
      { x: 7.1, y: 2.5, w: 5.1, h: 4.1, fontSize: 12, lineSpacing: 21 }
    );
  }

  // ==========================================
  // SLIDE 3: PROBLEM 1 & 2 (Catalog Paralysis)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Problem Analysis", "The Catalog Dilemma: Too Many Products & Too Much Technical Jargon");

    // Card 1
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Problem #1: Catalog Paralysis", {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: CRIMSON,
    });
    slide.addText(
      "\"I don't know where to find what I need—there are too many products and categories.\"",
      { x: 1.1, y: 2.4, w: 5.0, h: 0.6, fontSize: 12, italic: true, color: SLATE_MUTED }
    );
    slide.addText(
      [
        { text: "• 21 Global Brands: ", options: { bold: true, color: SLATE_DARK } },
        { text: "X-Rite, GMG, GlobalVision, Hybrid Software, Valiani, Hanatek, Miraclon...\n\n", options: { color: SLATE_MUTED } },
        { text: "• 200+ Specialized Hardware & Software SKUs: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Spectrophotometers, densitometers, ink formulation software, proofers, cutting tables.\n\n", options: { color: SLATE_MUTED } },
        { text: "• The Customer Frustration: ", options: { bold: true, color: CRIMSON } },
        { text: "A customer who simply wants to inspect labels or calibrate flexo presses gets lost in multi-tiered menus and bounces.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 3.1, w: 5.0, h: 3.4, fontSize: 12, lineSpacing: 21 }
    );

    // Card 2
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.7,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Problem #2: The Technical Jargon Wall", {
      x: 7.1,
      y: 1.9,
      w: 5.1,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: CRIMSON,
    });
    slide.addText(
      "\"Which optical geometry is mandatory for my substrate so I don't waste $20,000?\"",
      { x: 7.1, y: 2.4, w: 5.1, h: 0.6, fontSize: 12, italic: true, color: SLATE_MUTED }
    );
    slide.addText(
      [
        { text: "• Optical Physics Confusion: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Does flexible plastic film need a 45°:0° or a d/8° sphere? What about metallic foil?\n\n", options: { color: SLATE_MUTED } },
        { text: "• The Cost of a Guess: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Buying a standard device for metallic film produces false readings due to surface glare.\n\n", options: { color: SLATE_MUTED } },
        { text: "• The Customer Freeze: ", options: { bold: true, color: CRIMSON } },
        { text: "Non-color scientists are afraid to commit to a formal quote because they fear making an expensive mistake.", options: { color: SLATE_MUTED } },
      ],
      { x: 7.1, y: 3.1, w: 5.1, h: 3.4, fontSize: 12, lineSpacing: 21 }
    );
  }

  // ==========================================
  // SLIDE 4: THE 3-PILLAR AI SOLUTION OVERVIEW
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Architecture", "The 3 Pillars of Phoenix AI: Instant Answers, Diagnostics & ROI");

    const pillars = [
      {
        num: "PILLAR 1",
        title: "Phoenix Color AI",
        sub: "24/7 Solution Consultant",
        desc: "Interactive assistant on every page. Understands X-Rite, GMG, GlobalVision, and ISO/G7 standards. Provides consultative product guidance 24/7.",
        badge: "Live Across Website",
        color: CRIMSON,
      },
      {
        num: "PILLAR 2",
        title: "AI Substrate Selector",
        sub: "Optical Diagnostic Engine",
        desc: "3-step interactive wizard matching customer substrate (paper, foil, plastic, liquid) to the exact spectrophotometer with plain-English reasons.",
        badge: "Route: /tools/selector",
        color: NAVY,
      },
      {
        num: "PILLAR 3",
        title: "Makeready ROI Modeler",
        sub: "Financial Profit Engine",
        desc: "Calculates annual scrap reduction, recovered press hours, and equipment payback in USD and AED with instant WhatsApp lead generation.",
        badge: "Route: /tools/roi-calculator",
        color: EMERALD,
      },
    ];

    pillars.forEach((p, idx) => {
      const px = 0.8 + idx * 3.95;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px,
        y: 1.6,
        w: 3.7,
        h: 5.2,
        fill: { color: WHITE },
        line: { color: BORDER_COLOR, width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(p.num, {
        x: px + 0.3,
        y: 1.9,
        w: 3.1,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: p.color,
        letterSpacing: 1.5,
      });

      slide.addText(p.title, {
        x: px + 0.3,
        y: 2.3,
        w: 3.1,
        h: 0.45,
        fontSize: 17,
        bold: true,
        color: NAVY,
      });

      slide.addText(p.sub, {
        x: px + 0.3,
        y: 2.8,
        w: 3.1,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: SLATE_MUTED,
      });

      slide.addText(p.desc, {
        x: px + 0.3,
        y: 3.3,
        w: 3.1,
        h: 2.6,
        fontSize: 11,
        color: SLATE_DARK,
        lineSpacing: 19,
      });

      // Bottom pill
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3,
        y: 6.0,
        w: 3.1,
        h: 0.4,
        fill: { color: "F1F5F9" },
        rectRadius: 0.1,
      });
      slide.addText(p.badge, {
        x: px + 0.3,
        y: 6.0,
        w: 3.1,
        h: 0.4,
        fontSize: 10,
        bold: true,
        color: SLATE_DARK,
        align: "center",
        valign: "middle",
      });
    });
  }

  // ==========================================
  // SLIDE 5: SOLUTION 1 — CHATBOT (WITH SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 1", "Phoenix Color Intelligence AI: 24/7 Technical Consultant");

    // Left Column: Capabilities
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Live Technical Consultation on Every Page", {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• Deep Catalog Knowledge: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Trained on all 21 partner brands, instrument geometries, and software modules.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Real Technical Consultation: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Understands ISO 12647, G7 Master standards, M0/M1/M2/M3 polarization, and Delta E tolerances.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Verified UAE Business Information: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Accurately provides Dubai HQ address in Al Quoz, Mumbai office, and official UAE hours (Mon-Fri 8am-6pm).\n\n", options: { color: SLATE_MUTED } },
        { text: "• Interactive Product Cards: ", options: { bold: true, color: EMERALD } },
        { text: "Directly renders product renders and spec links right inside the conversation.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 4.8, h: 4.1, fontSize: 11, lineSpacing: 19 }
    );

    // Right Column: Live Screenshot
    if (fs.existsSync(imgChatbot)) {
      slide.addImage({
        path: imgChatbot,
        x: 6.5,
        y: 1.6,
        w: 6.0,
        h: 5.2,
        sizing: { type: "contain" },
      });
    }
  }

  // ==========================================
  // SLIDE 6: SOLUTION 2 — SUBSTRATE SELECTOR (DIAGNOSTIC WIZARD SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 2", "AI Instrument Selector: The 3-Step Substrate Diagnostic");

    // Left Column: The 3 Steps
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Interactive Diagnostic Workflow", {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });

    const steps = [
      {
        num: "1",
        title: "Substrate & Surface Type",
        desc: "Paperboard, Flexible Film, Plastics/Masterbatch, Metallic Foil, or Printed Artwork/Pharma.",
      },
      {
        num: "2",
        title: "Measurement Environment",
        desc: "Pressroom production floor (fast handheld), QC lab (benchtop formulation), or Prepress QA.",
      },
      {
        num: "3",
        title: "Quality Objective",
        desc: "Delta E00 pass/fail, Formulation with gloss isolation (SPIN/SPEX), or Flake flop analysis.",
      },
    ];

    steps.forEach((st, idx) => {
      const sy = 2.4 + idx * 1.25;
      slide.addText(`Step ${st.num}: ${st.title}`, { x: 1.1, y: sy, w: 4.8, h: 0.3, fontSize: 12, bold: true, color: CRIMSON });
      slide.addText(st.desc, { x: 1.1, y: sy + 0.3, w: 4.8, h: 0.7, fontSize: 11, color: SLATE_MUTED, lineSpacing: 16 });
    });

    // Right Column: Live Screenshot of Selector
    if (fs.existsSync(imgSelector)) {
      slide.addImage({
        path: imgSelector,
        x: 6.5,
        y: 1.6,
        w: 6.0,
        h: 5.2,
        sizing: { type: "contain" },
      });
    }
  }

  // ==========================================
  // SLIDE 7: SOLUTION 2 — SUBSTRATE SELECTOR (RECOMMENDATION RESULT SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 2 (Cont.)", "AI Recommendation Engine: 99% Certified Optical Match");

    // Left Column: Result Value
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Instant Certified Clarity for Buyers", {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• Match Confidence Score: ", options: { bold: true, color: EMERALD } },
        { text: "Renders exact compatibility percentage (e.g. 99% Match).\n\n", options: { color: SLATE_MUTED } },
        { text: "• Plain-English Science: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Explains *why* that geometry is mandatory (e.g., 'Flexible foil produces glare; this machine's M3 polarization filter removes surface glare so colors match brand targets').\n\n", options: { color: SLATE_MUTED } },
        { text: "• Optical Geometry Guidance: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Educates non-experts on 45°:0° vs d/8° sphere vs multi-angle.\n\n", options: { color: SLATE_MUTED } },
        { text: "• 1-Click WhatsApp Quote: ", options: { bold: true, color: CRIMSON } },
        { text: "Pre-fills the recommended machine model directly into WhatsApp inquiry.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 4.8, h: 4.1, fontSize: 11, lineSpacing: 19 }
    );

    // Right Column: Live Screenshot of Result Card
    if (fs.existsSync(imgSelectorResult)) {
      slide.addImage({
        path: imgSelectorResult,
        x: 6.5,
        y: 1.6,
        w: 6.0,
        h: 5.2,
        sizing: { type: "contain" },
      });
    }
  }

  // ==========================================
  // SLIDE 8: SOLUTION 3 — ROI CALCULATOR (SCREENSHOT & METRICS)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 3", "Makeready & Waste ROI Calculator: Proving Payback to CFOs");

    // Left Column: Controls & Metrics
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Live Industrial Financial Modeler", {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• Dual Currency (USD / AED): ", options: { bold: true, color: SLATE_DARK } },
        { text: "Clients model returns in Dirhams (AED) or US Dollars with one click.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Pressroom Controls: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Sliders for 1 to 12 presses, job makereadies per day, and substrate scrap costs.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Real Savings Modeled: ", options: { bold: true, color: EMERALD } },
        { text: "Shows AED 458,000 annual profit recovery and ~3.2-month equipment payback.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Printable Report: ", options: { bold: true, color: CRIMSON } },
        { text: "Allows plant managers to print an executive summary for CFO approval.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 4.8, h: 4.1, fontSize: 11, lineSpacing: 19 }
    );

    // Right Column: Live Screenshot of ROI Calculator
    if (fs.existsSync(imgRoi)) {
      slide.addImage({
        path: imgRoi,
        x: 6.5,
        y: 1.6,
        w: 6.0,
        h: 5.2,
        sizing: { type: "contain" },
      });
    }
  }

  // ==========================================
  // SLIDE 9: THE LEAD CAPTURE LOOP
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "The Sales Handoff Engine", "How Every Customer Calculation Reaches the Sales Desk");

    const flow = [
      {
        num: "1",
        title: "Customer Calculates",
        desc: "Inputs 3 Offset presses running 4 jobs/day on the website.",
      },
      {
        num: "2",
        title: "AI Computes Payback",
        desc: "Reveals AED 458,000 savings and a 3.2-month payback period.",
      },
      {
        num: "3",
        title: "1-Click WhatsApp",
        desc: "Customer taps 'Validate ROI with an Engineer'.",
      },
      {
        num: "4",
        title: "Pre-Filled Lead",
        desc: "Sales receives WhatsApp message with the exact plant details!",
      },
    ];

    flow.forEach((fsItem, i) => {
      const fx = 0.8 + i * 2.95;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: fx,
        y: 1.6,
        w: 2.7,
        h: 4.0,
        fill: { color: WHITE },
        line: { color: BORDER_COLOR, width: 1 },
        rectRadius: 0.15,
      });

      slide.addShape(pres.shapes.OVAL, {
        x: fx + 1.05,
        y: 1.9,
        w: 0.6,
        h: 0.6,
        fill: { color: NAVY },
      });
      slide.addText(fsItem.num, {
        x: fx + 1.05,
        y: 1.9,
        w: 0.6,
        h: 0.6,
        fontSize: 14,
        bold: true,
        color: WHITE,
        align: "center",
        valign: "middle",
      });

      slide.addText(fsItem.title, {
        x: fx + 0.2,
        y: 2.7,
        w: 2.3,
        h: 0.4,
        fontSize: 13,
        bold: true,
        color: NAVY,
        align: "center",
      });

      slide.addText(fsItem.desc, {
        x: fx + 0.2,
        y: 3.2,
        w: 2.3,
        h: 2.0,
        fontSize: 11,
        color: SLATE_MUTED,
        align: "center",
        lineSpacing: 18,
      });
    });

    // Bottom banner
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 5.9,
      w: 11.6,
      h: 0.9,
      fill: { color: NAVY },
      rectRadius: 0.1,
    });
    slide.addText(
      "Why Sales Teams Love This: Zero cold calls. Inbound leads arrive pre-educated on the exact machine model and pre-sold on the financial payback timeline.",
      {
        x: 1.1,
        y: 5.9,
        w: 11.0,
        h: 0.9,
        fontSize: 12,
        bold: true,
        color: WHITE,
        valign: "middle",
      }
    );
  }

  // ==========================================
  // SLIDE 10: BUSINESS ROI FOR PHOENIX
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Conclusion & Impact", "Measurable Business ROI & Strategic Market Leadership");

    const stats = [
      { val: "+35%", label: "Conversion Lift", desc: "Turns passive datasheet readers into active inbound inquiries." },
      { val: "40-50%", label: "Shorter Sales Cycles", desc: "Buyers arrive already knowing their matching model and payback." },
      { val: "24 / 7", label: "Consulting Coverage", desc: "Captures buyers in Saudi, Kuwait, Egypt & GCC outside office hours." },
      { val: "#1", label: "Regional Market Leader", desc: "First industrial color partner in the GCC with interactive AI tools." },
    ];

    stats.forEach((st, i) => {
      const sx = 0.8 + i * 2.95;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: sx,
        y: 1.6,
        w: 2.7,
        h: 3.0,
        fill: { color: WHITE },
        line: { color: BORDER_COLOR, width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(st.val, {
        x: sx + 0.2,
        y: 1.9,
        w: 2.3,
        h: 0.6,
        fontSize: 28,
        bold: true,
        color: CRIMSON,
        align: "center",
      });
      slide.addText(st.label, {
        x: sx + 0.2,
        y: 2.6,
        w: 2.3,
        h: 0.35,
        fontSize: 13,
        bold: true,
        color: NAVY,
        align: "center",
      });
      slide.addText(st.desc, {
        x: sx + 0.2,
        y: 3.1,
        w: 2.3,
        h: 1.3,
        fontSize: 11,
        color: SLATE_MUTED,
        align: "center",
        lineSpacing: 17,
      });
    });

    // Bottom Action Banner
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 4.9,
      w: 11.6,
      h: 1.8,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("Live Tools Ready for Client Demo Today", {
      x: 1.2,
      y: 5.1,
      w: 10.8,
      h: 0.4,
      fontSize: 17,
      bold: true,
      color: WHITE,
    });
    slide.addText(
      "1. Central Tools Hub: /tools  •  2. AI Instrument Selector: /tools/selector  •  3. Makeready ROI Calculator: /tools/roi-calculator\nAll tools are live, mobile-responsive, synchronized with official Dubai hours, and ready for sales enablement.",
      {
        x: 1.2,
        y: 5.6,
        w: 10.8,
        h: 0.9,
        fontSize: 12,
        color: "CBD5E1",
        lineSpacing: 20,
      }
    );
  }

  // Save the presentation with a fresh version name so it doesn't conflict with any open file
  const outputPath = path.join(process.cwd(), "Phoenix_AI_Pitch_Deck_v2.pptx");
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);

  // Also try updating the main name if not locked
  try {
    const mainPath = path.join(process.cwd(), "Phoenix_AI_Pitch_Deck.pptx");
    fs.copyFileSync(outputPath, mainPath);
  } catch (e) {
    console.log("Main file is currently open in PowerPoint; updated v2 file created.");
  }
}

generateDeck().catch((err) => {
  console.error("Error generating presentation:", err);
  process.exit(1);
});
