const pptxgen = require("pptxgenjs");
const path = require("path");

async function generateDeck() {
  const pres = new pptxgen();

  pres.layout = "LAYOUT_16x9";
  pres.author = "Phoenix Colour Technologies";
  pres.company = "Phoenix Colour Technologies";
  pres.title = "Transforming Phoenix with AI: Pitch Deck";

  // Brand Colors
  const NAVY = "0F1742";
  const CRIMSON = "C41E3A";
  const LIGHT_BG = "F8FAFC";
  const WHITE = "FFFFFF";
  const SLATE_DARK = "1E293B";
  const SLATE_MUTED = "64748B";
  const EMERALD = "059669";
  const CARD_BG = "FFFFFF";

  // Helper to add header to content slides
  function addSlideHeader(slide, category, title) {
    slide.background = { color: LIGHT_BG };
    
    // Top category badge
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: CRIMSON,
      letterSpacing: 2,
    });

    // Main slide title
    slide.addText(title, {
      x: 0.8,
      y: 0.8,
      w: 11.5,
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: NAVY,
    });
  }

  // ==========================================
  // SLIDE 1: TITLE SLIDE (Dark Navy)
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };

    // Tagline Pill
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0,
      y: 1.6,
      w: 4.8,
      h: 0.45,
      fill: { color: "1E2958" },
      line: { color: "334185", width: 1 },
      rectRadius: 0.2,
    });
    slide.addText("INDUSTRIAL AI & COMMERCE TRANSFORMATION", {
      x: 1.0,
      y: 1.6,
      w: 4.8,
      h: 0.45,
      fontSize: 10,
      bold: true,
      color: "F43F5E",
      align: "center",
      valign: "middle",
      letterSpacing: 1.5,
    });

    // Main Title
    slide.addText("Transforming Phoenix Colour Technologies with AI", {
      x: 1.0,
      y: 2.3,
      w: 10.5,
      h: 1.6,
      fontSize: 34,
      bold: true,
      color: WHITE,
      lineSpacing: 42,
    });

    // Subtitle
    slide.addText(
      "How intelligent diagnostic tools and financial modelers turn a 200+ product catalog into a 24/7 lead generation engine for the UAE, Saudi Arabia, GCC & Africa.",
      {
        x: 1.0,
        y: 4.1,
        w: 9.5,
        h: 0.9,
        fontSize: 14,
        color: "94A3B8",
        lineSpacing: 22,
      }
    );

    // Footer divider & info
    slide.addShape(pres.shapes.LINE, {
      x: 1.0,
      y: 5.6,
      w: 11.3,
      h: 0,
      line: { color: "334185", width: 1 },
    });
    slide.addText("Presented by: Technical Solutions & AI Architecture Team", {
      x: 1.0,
      y: 5.8,
      w: 6.0,
      h: 0.4,
      fontSize: 11,
      color: "64748B",
    });
    slide.addText("Confidential • Phoenix Colour Technologies 2026", {
      x: 7.3,
      y: 5.8,
      w: 5.0,
      h: 0.4,
      fontSize: 11,
      color: "64748B",
      align: "right",
    });
  }

  // ==========================================
  // SLIDE 2: THE EXECUTIVE CHALLENGE
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Market Opportunity", "The Challenge: Why Traditional B2B Catalogs Lose Deals");

    // Left Column Card: The Reality
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("The B2B Buyer's Dilemma Today", {
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
        { text: "• 21 Global Brands & 200+ Products: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Too many options cause 'analysis paralysis'. Customers don't know where to start.\n\n", options: { color: SLATE_MUTED } },
        { text: "• High Technical Barrier: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Packaging managers don't know optical geometries (45°:0° vs d/8° sphere vs multi-angle).\n\n", options: { color: SLATE_MUTED } },
        { text: "• High Capital Cost ($15k - $25k): ", options: { bold: true, color: SLATE_DARK } },
        { text: "Without immediate financial proof, buyers delay purchasing for months.\n\n", options: { color: SLATE_MUTED } },
        { text: "• 98% Silent Drop-Off: ", options: { bold: true, color: CRIMSON } },
        { text: "Factory managers leave without contacting sales because forms are too slow.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.4, w: 4.8, h: 3.7, fontSize: 12, lineSpacing: 20 }
    );

    // Right Column Card: The AI Opportunity
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.6,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("The AI Transformation Solution", {
      x: 6.9,
      y: 1.9,
      w: 5.2,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: WHITE,
    });
    slide.addText(
      [
        { text: "1. 24/7 AI Technical Advisor\n", options: { bold: true, color: "F43F5E" } },
        { text: "Instant answers for buyers in UAE, Saudi Arabia, Kuwait & Africa—even at night.\n\n", options: { color: "CBD5E1" } },
        { text: "2. 3-Step AI Substrate Selector\n", options: { bold: true, color: "38BDF8" } },
        { text: "Diagnoses customer material (film, foil, paper, plastics) and gives exact certified match.\n\n", options: { color: "CBD5E1" } },
        { text: "3. Makeready & Waste ROI Calculator\n", options: { bold: true, color: "34D399" } },
        { text: "Proves equipment pays for itself in ~3.2 months with 40% substrate waste reduction.\n\n", options: { color: "CBD5E1" } },
        { text: "4. One-Click WhatsApp Lead Handoff\n", options: { bold: true, color: WHITE } },
        { text: "Leads land directly on the sales engineer's phone pre-filled with customer plant specs.", options: { color: "94A3B8" } },
      ],
      { x: 6.9, y: 2.4, w: 5.2, h: 3.7, fontSize: 12, lineSpacing: 20 }
    );
  }

  // ==========================================
  // SLIDE 3: PROBLEM 1 & 2 IN DEPTH
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Problem Statement 1 & 2", "The 2 Biggest Customer Roadblocks on the Website");

    // Card 1: Catalog Paralysis
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 1.2,
      y: 1.9,
      w: 0.35,
      h: 0.35,
      fill: { color: CRIMSON },
    });
    slide.addText("Problem #1: Catalog Paralysis", {
      x: 1.7,
      y: 1.9,
      w: 4.4,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      "\"I don't know where to find what I need—there are too many products.\"",
      {
        x: 1.2,
        y: 2.4,
        w: 4.8,
        h: 0.5,
        fontSize: 12,
        italic: true,
        color: SLATE_MUTED,
      }
    );
    slide.addText(
      [
        { text: "• Phoenix offers 21 brands: ", options: { bold: true, color: SLATE_DARK } },
        { text: "X-Rite, GMG, GlobalVision, Hybrid Software, Valiani, Hanatek, Miraclon...\n\n", options: { color: SLATE_MUTED } },
        { text: "• Over 200 specialized products: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Spectrophotometers, densitometers, RIP software, cutting tables, proofers.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Result: ", options: { bold: true, color: CRIMSON } },
        { text: "A busy packaging manager spends 3 minutes clicking menus, gets frustrated, and leaves without asking for help.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.2, y: 3.1, w: 4.8, h: 3.0, fontSize: 12, lineSpacing: 20 }
    );

    // Card 2: Technical Jargon Wall
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 7.2,
      y: 1.9,
      w: 0.35,
      h: 0.35,
      fill: { color: CRIMSON },
    });
    slide.addText("Problem #2: The Technical Jargon Wall", {
      x: 7.7,
      y: 1.9,
      w: 4.4,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      "\"Which optical geometry do I need for my substrate?\"",
      {
        x: 7.2,
        y: 2.4,
        w: 4.8,
        h: 0.5,
        fontSize: 12,
        italic: true,
        color: SLATE_MUTED,
      }
    );
    slide.addText(
      [
        { text: "• Optical Geometry Confusion: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Does flexible film need 45°:0° or Sphere d/8°? What about metallic foil?\n\n", options: { color: SLATE_MUTED } },
        { text: "• Cost of a Wrong Guess: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Buying a standard device for metallic film produces false readings because of surface glare.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Result: ", options: { bold: true, color: CRIMSON } },
        { text: "Buyers freeze because they are terrified of making an expensive $20,000 ordering mistake.", options: { color: SLATE_MUTED } },
      ],
      { x: 7.2, y: 3.1, w: 4.8, h: 3.0, fontSize: 12, lineSpacing: 20 }
    );
  }

  // ==========================================
  // SLIDE 4: PROBLEM 3 & 4 IN DEPTH
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Problem Statement 3 & 4", "The Financial Hesitation & The After-Hours Blindspot");

    // Card 3: Financial Hesitation
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Problem #3: The Price Justification Gap", {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• High Initial Investment: ", options: { bold: true, color: SLATE_DARK } },
        { text: "X-Rite eXact 2 and Ci7800 systems range from $12,000 to $25,000+.\n\n", options: { color: SLATE_MUTED } },
        { text: "• CFO Resistance: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Plant managers want it, but cannot prove to their finance department how it saves money.\n\n", options: { color: SLATE_MUTED } },
        { text: "• The Missing Link: ", options: { bold: true, color: CRIMSON } },
        { text: "Unless the website shows how many scrap sheets and press hours are saved, the quote request never happens.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 5.0, h: 3.6, fontSize: 12, lineSpacing: 21 }
    );

    // Card 4: After-Hours Blindspot
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Problem #4: The 24/7 Regional Buying Reality", {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• Multi-Country Market: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Clients in Saudi Arabia, UAE, Qatar, Egypt, and Africa operate on different schedules and night shifts.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Slow Response Kills Inquiries: ", options: { bold: true, color: SLATE_DARK } },
        { text: "A customer researching at 9:00 PM will not wait until 9:00 AM the next day for basic answers.\n\n", options: { color: SLATE_MUTED } },
        { text: "• The Solution: ", options: { bold: true, color: EMERALD } },
        { text: "An AI system that provides authoritative technical answers and captures buyer contact data around the clock.", options: { color: SLATE_MUTED } },
      ],
      { x: 7.1, y: 2.5, w: 5.0, h: 3.6, fontSize: 12, lineSpacing: 21 }
    );
  }

  // ==========================================
  // SLIDE 5: THE STRATEGIC AI ARCHITECTURE
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "The Solution Architecture", "How the 3 AI Engines Solve Every Friction Point");

    const tools = [
      {
        num: "01",
        title: "Phoenix Color AI",
        sub: "24/7 Solution Consultant",
        desc: "Understands X-Rite, GMG, GlobalVision, G7 & ISO standards. Answers complex technical questions instantly and guides buyers.",
        badge: "Live on Every Page",
        badgeColor: CRIMSON,
      },
      {
        num: "02",
        title: "AI Substrate Selector",
        sub: "Optical Diagnostic Engine",
        desc: "3-step interactive wizard matching customer substrate (paper, foil, plastic, liquid) to the exact spectrophotometer geometry.",
        badge: "Route: /tools/selector",
        badgeColor: NAVY,
      },
      {
        num: "03",
        title: "Makeready ROI Modeler",
        sub: "Financial Profit Engine",
        desc: "Calculates annual scrap reduction, recovered press hours, and equipment payback in USD and AED with instant WhatsApp handoff.",
        badge: "Route: /tools/roi-calculator",
        badgeColor: EMERALD,
      },
    ];

    tools.forEach((t, i) => {
      const x = 0.8 + i * 3.9;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.6,
        w: 3.6,
        h: 4.8,
        fill: { color: CARD_BG },
        line: { color: "E2E8F0", width: 1 },
        rectRadius: 0.15,
      });

      // Number badge
      slide.addText(t.num, {
        x: x + 0.3,
        y: 1.9,
        w: 1.0,
        h: 0.4,
        fontSize: 20,
        bold: true,
        color: t.badgeColor,
      });

      slide.addText(t.title, {
        x: x + 0.3,
        y: 2.4,
        w: 3.0,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: NAVY,
      });

      slide.addText(t.sub, {
        x: x + 0.3,
        y: 2.8,
        w: 3.0,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: SLATE_MUTED,
      });

      slide.addText(t.desc, {
        x: x + 0.3,
        y: 3.3,
        w: 3.0,
        h: 2.0,
        fontSize: 11,
        color: SLATE_DARK,
        lineSpacing: 18,
      });

      // Pill at bottom
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.3,
        y: 5.6,
        w: 3.0,
        h: 0.35,
        fill: { color: "F1F5F9" },
        rectRadius: 0.1,
      });
      slide.addText(t.badge, {
        x: x + 0.3,
        y: 5.6,
        w: 3.0,
        h: 0.35,
        fontSize: 10,
        bold: true,
        color: SLATE_DARK,
        align: "center",
        valign: "middle",
      });
    });
  }

  // ==========================================
  // SLIDE 6: SOLUTION 1 — PHOENIX COLOR AI
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 1", "Phoenix Color Intelligence AI: 24/7 Technical Consultant");

    // Left Box: Capabilities
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 6.2,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Core Intelligence Features", {
      x: 1.1,
      y: 1.9,
      w: 5.6,
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
        { text: "Accurately answers official working hours (Mon-Fri 8am-6pm, Sat 9am-2pm), Dubai Al Quoz headquarters, and Mumbai office.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Active Product Cards: ", options: { bold: true, color: EMERALD } },
        { text: "Dynamically returns clickable product cards with photos and links directly inside chat.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.4, w: 5.6, h: 3.7, fontSize: 12, lineSpacing: 20 }
    );

    // Right Box: Sample Queries
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.4,
      y: 1.6,
      w: 5.0,
      h: 4.8,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("Sample Customer Interactions", {
      x: 7.7,
      y: 1.9,
      w: 4.4,
      h: 0.4,
      fontSize: 15,
      bold: true,
      color: WHITE,
    });
    slide.addText(
      [
        { text: "Customer: ", options: { bold: true, color: "F43F5E" } },
        { text: "\"We measure transparent BOPP film pouches. Will eXact 2 scratch the wet ink?\"\n", options: { color: WHITE } },
        { text: "Phoenix AI: ", options: { bold: true, color: "38BDF8" } },
        { text: "\"For flexible films, we recommend the eXact 2 Plus or eXact 2 Xp. They feature Mantis video targeting and non-contact apertures...\"\n\n", options: { color: "CBD5E1" } },
        { text: "Customer: ", options: { bold: true, color: "F43F5E" } },
        { text: "\"What is your working hours?\"\n", options: { color: WHITE } },
        { text: "Phoenix AI: ", options: { bold: true, color: "38BDF8" } },
        { text: "\"Our Dubai headquarters operates Mon-Fri 8:00 AM - 6:00 PM (GST) with Saturday emergency dispatch...\"", options: { color: "CBD5E1" } },
      ],
      { x: 7.7, y: 2.4, w: 4.4, h: 3.7, fontSize: 11, lineSpacing: 18 }
    );
  }

  // ==========================================
  // SLIDE 7: SOLUTION 2 — AI SUBSTRATE SELECTOR
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 2", "AI Instrument & Substrate Selector: Eliminating Buying Mistakes");

    // Left 3 Steps Flow
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("3-Step Diagnostic Wizard", {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });

    const steps = [
      { step: "Step 1: Substrate Material", desc: "Paperboard, Flexible Film, Plastics/Masterbatch, Metallic Foil, or Artwork/Pharma Leaflets." },
      { step: "Step 2: Operating Environment", desc: "Pressroom production floor (fast handheld), QC lab (benchtop formulation), or Prepress QA." },
      { step: "Step 3: Quality Objective", desc: "Delta E00 pass/fail, Formulation with gloss isolation (SPIN/SPEX), or Flake flop analysis." },
    ];
    steps.forEach((s, idx) => {
      const sy = 2.4 + idx * 1.25;
      slide.addText(s.step, { x: 1.1, y: sy, w: 5.0, h: 0.3, fontSize: 13, bold: true, color: CRIMSON });
      slide.addText(s.desc, { x: 1.1, y: sy + 0.3, w: 5.0, h: 0.7, fontSize: 11, color: SLATE_MUTED });
    });

    // Right Result Box
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "CBD5E1", width: 1 },
      rectRadius: 0.15,
    });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fill: { color: "ECFDF5" },
      rectRadius: 0.1,
    });
    slide.addText("✓ 99% Compatibility Match Generated", {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 11,
      bold: true,
      color: EMERALD,
      align: "center",
      valign: "middle",
    });

    slide.addText("Certified Instrument Match", {
      x: 7.1,
      y: 2.5,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• eXact 2 Plus: ", options: { bold: true, color: SLATE_DARK } },
        { text: "For flexible film converters requiring switchable M3 polarization.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Ci7800 Benchtop: ", options: { bold: true, color: SLATE_DARK } },
        { text: "For plastics, liquid inks & formulation labs requiring d/8° diffuse sphere.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Plain-English Science: ", options: { bold: true, color: CRIMSON } },
        { text: "Explains optical physics in simple terms so the plant manager feels confident ordering.", options: { color: SLATE_MUTED } },
      ],
      { x: 7.1, y: 3.0, w: 5.0, h: 3.1, fontSize: 12, lineSpacing: 20 }
    );
  }

  // ==========================================
  // SLIDE 8: SOLUTION 3 — ROI CALCULATOR
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 3", "Makeready & Waste ROI Calculator: Proving the Payback");

    // Left Controls
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Interactive Plant Controls", {
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
        { text: "• Press Technology: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Offset Sheetfed, Flexo Wide Web, Narrow Web Labels, Gravure Packaging.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Operating Fleet: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Sliders for 1 to 12 presses and 1 to 10 makereadies per day.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Dual Currency Engine: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Real-time toggle between USD ($) and AED (Dirhams).\n\n", options: { color: SLATE_MUTED } },
        { text: "• Certified Benchmarks: ", options: { bold: true, color: CRIMSON } },
        { text: "Derived from ISO 12647-2 & G7 global press audit datasets.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.4, w: 4.8, h: 3.7, fontSize: 12, lineSpacing: 20 }
    );

    // Right Big Metrics
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.6,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("Average Plant Returns Modeled", {
      x: 6.9,
      y: 1.9,
      w: 5.2,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: WHITE,
    });

    const metrics = [
      { val: "AED 458,000 / yr", label: "Projected Annual Profit Recovery" },
      { val: "~3.2 Months", label: "Estimated Equipment Payback Horizon" },
      { val: "780+ Hours", label: "Recovered Press Capacity for Extra Jobs" },
      { val: "187,000+ Sheets", label: "Substrate Scrap Diverted from Landfill" },
    ];
    metrics.forEach((m, idx) => {
      const my = 2.4 + idx * 0.95;
      slide.addText(m.val, { x: 6.9, y: my, w: 5.2, h: 0.4, fontSize: 18, bold: true, color: "34D399" });
      slide.addText(m.label, { x: 6.9, y: my + 0.35, w: 5.2, h: 0.3, fontSize: 11, color: "CBD5E1" });
    });
  }

  // ==========================================
  // SLIDE 9: LEAD CAPTURE & INTEGRATION
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Lead Generation Loop", "How Every Customer Calculation Reaches the Sales Desk");

    // Sequence Diagram Box
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 11.6,
      h: 4.8,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.15,
    });

    const flowSteps = [
      {
        num: "1",
        title: "Customer Calculates",
        desc: "Inputs 3 Offset presses running 4 jobs/day on the website.",
      },
      {
        num: "2",
        title: "AI Computes Payback",
        desc: "Reveals AED 450,000 savings and a 3.2-month payback period.",
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

    flowSteps.forEach((fs, i) => {
      const fx = 1.1 + i * 2.85;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: fx,
        y: 2.1,
        w: 2.6,
        h: 3.8,
        fill: { color: "F8FAFC" },
        line: { color: "CBD5E1", width: 1 },
        rectRadius: 0.15,
      });

      slide.addShape(pres.shapes.OVAL, {
        x: fx + 1.0,
        y: 2.4,
        w: 0.6,
        h: 0.6,
        fill: { color: NAVY },
      });
      slide.addText(fs.num, {
        x: fx + 1.0,
        y: 2.4,
        w: 0.6,
        h: 0.6,
        fontSize: 14,
        bold: true,
        color: WHITE,
        align: "center",
        valign: "middle",
      });

      slide.addText(fs.title, {
        x: fx + 0.2,
        y: 3.2,
        w: 2.2,
        h: 0.4,
        fontSize: 13,
        bold: true,
        color: NAVY,
        align: "center",
      });

      slide.addText(fs.desc, {
        x: fx + 0.2,
        y: 3.7,
        w: 2.2,
        h: 1.8,
        fontSize: 11,
        color: SLATE_MUTED,
        align: "center",
        lineSpacing: 18,
      });
    });
  }

  // ==========================================
  // SLIDE 10: BUSINESS IMPACT & CONCLUSION
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Conclusion & Impact", "The Bottom-Line ROI for Phoenix Colour Technologies");

    // 4 Key Stat Callouts
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
        h: 2.8,
        fill: { color: CARD_BG },
        line: { color: "E2E8F0", width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(st.val, {
        x: sx + 0.2,
        y: 1.9,
        w: 2.3,
        h: 0.6,
        fontSize: 26,
        bold: true,
        color: CRIMSON,
        align: "center",
      });
      slide.addText(st.label, {
        x: sx + 0.2,
        y: 2.5,
        w: 2.3,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: NAVY,
        align: "center",
      });
      slide.addText(st.desc, {
        x: sx + 0.2,
        y: 2.9,
        w: 2.3,
        h: 1.3,
        fontSize: 10,
        color: SLATE_MUTED,
        align: "center",
        lineSpacing: 16,
      });
    });

    // Bottom Action Banner
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 4.7,
      w: 11.6,
      h: 1.7,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("Live Tools Ready for Client Demo Today", {
      x: 1.2,
      y: 4.9,
      w: 10.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: WHITE,
    });
    slide.addText(
      "1. Central Tools Hub: /tools  •  2. AI Instrument Selector: /tools/selector  •  3. Makeready ROI Calculator: /tools/roi-calculator\nAll tools are live, mobile-responsive, synchronized with official Dubai hours, and ready for sales enablement.",
      {
        x: 1.2,
        y: 5.4,
        w: 10.8,
        h: 0.8,
        fontSize: 11,
        color: "CBD5E1",
        lineSpacing: 18,
      }
    );
  }

  // Save the presentation
  const outputPath = path.join(process.cwd(), "Phoenix_AI_Pitch_Deck.pptx");
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);
}

generateDeck().catch((err) => {
  console.error("Error generating presentation:", err);
  process.exit(1);
});
