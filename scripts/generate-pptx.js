const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

async function generateDeck() {
  const pres = new pptxgen();

  // Modern Widescreen 16:9 (13.33" x 7.5")
  pres.defineLayout({ name: "WIDESCREEN_16_9", width: 13.33, height: 7.5 });
  pres.layout = "WIDESCREEN_16_9";
  pres.author = "Phoenix Colour Technologies";
  pres.company = "Phoenix Colour Technologies";
  pres.title = "Why Phoenix Needs AI: Executive Pitch Deck";

  // Brand Palette
  const NAVY = "0F1742";
  const CRIMSON = "C41E3A";
  const LIGHT_BG = "F8FAFC";
  const WHITE = "FFFFFF";
  const SLATE_DARK = "0F172A";
  const SLATE_MUTED = "475569";
  const EMERALD = "059669";
  const BORDER_COLOR = "E2E8F0";

  const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");
  const imgChatbot = path.join(SCREENSHOTS_DIR, "tight_chatbot.png");
  const imgSelector = path.join(SCREENSHOTS_DIR, "tight_selector.png");
  const imgSelectorResult = path.join(SCREENSHOTS_DIR, "tight_selector_result.png");
  const imgRoi = path.join(SCREENSHOTS_DIR, "tight_roi_calculator.png");

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

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0,
      y: 1.8,
      w: 4.8,
      h: 0.45,
      fill: { color: "1E2958" },
      line: { color: "334185", width: 1 },
      rectRadius: 0.2,
    });
    slide.addText("EXECUTIVE CLIENT PITCH DECK", {
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

    slide.addText("Why Phoenix Colour Technologies Needs AI", {
      x: 1.0,
      y: 2.5,
      w: 11.3,
      h: 1.6,
      fontSize: 38,
      bold: true,
      color: WHITE,
      lineSpacing: 46,
    });

    slide.addText(
      "Turning a confusing 200+ product catalog into a simple, 24/7 virtual sales consultant that guides customers, proves financial savings, and captures ready-to-buy leads across the UAE, Saudi Arabia, GCC & Africa.",
      {
        x: 1.0,
        y: 4.3,
        w: 11.0,
        h: 0.9,
        fontSize: 15,
        color: "CBD5E1",
        lineSpacing: 24,
      }
    );

    slide.addShape(pres.shapes.LINE, {
      x: 1.0,
      y: 5.8,
      w: 11.33,
      h: 0,
      line: { color: "334185", width: 1 },
    });

    slide.addText("Prepared for: Phoenix Executive Leadership & Sales Directors", {
      x: 1.0,
      y: 6.0,
      w: 6.0,
      h: 0.4,
      fontSize: 11,
      color: "94A3B8",
    });
    slide.addText("Confidential • Dubai, UAE • 2026", {
      x: 6.3,
      y: 6.0,
      w: 6.0,
      h: 0.4,
      fontSize: 11,
      color: "94A3B8",
      align: "right",
    });
  }

  // ==========================================
  // SLIDE 2: HUMAN-UNDERSTANDABLE DETAILED PROBLEMS
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "The Real-World Problem", "What Happens When a Customer Visits the Website Today?");

    const problems = [
      {
        num: "1",
        title: "The '200-Door Maze' (Too Many Products)",
        desc: "Imagine walking into a hardware store with 200 unlabeled tools and no staff to help you. A packaging manager visits wanting to inspect perfume boxes. Instead of guidance, they see 21 brand logos and 200+ machines. Overwhelmed, they close the tab in 30 seconds and leave.",
      },
      {
        num: "2",
        title: "The 'Physics Degree Required' (Technical Jargon)",
        desc: "The website was speaking like a science textbook: '45°:0° annular optics, M3 polarization, d/8 integrating spheres.' Real factory managers don't care about physics terms—they just want to know: 'Will this machine work on my shiny candy foil without making mistakes?'",
      },
      {
        num: "3",
        title: "The '$20,000 Sticker Shock' (Price Hesitation)",
        desc: "These instruments cost $15,000 to $25,000. When a customer sees that price tag with no explanation of how much money it will save them, their CFO immediately kills the project. They see it as an expensive cost instead of a money-saving investment.",
      },
      {
        num: "4",
        title: "The 'Ghost Town After 6 PM' (Lost Night Shifts)",
        desc: "Printing factories run 24 hours a day. When a plant manager looks for a solution at 9:00 PM and only sees a contact form saying 'We are open Mon-Fri 8am-6pm', they won't wait 12 hours. They click the next Google link and buy from a competitor.",
      },
    ];

    problems.forEach((pr, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const px = 0.8 + col * 5.95;
      const py = 1.6 + row * 2.65;

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px,
        y: py,
        w: 5.7,
        h: 2.5,
        fill: { color: WHITE },
        line: { color: BORDER_COLOR, width: 1 },
        rectRadius: 0.15,
      });

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3,
        y: py + 0.25,
        w: 0.45,
        h: 0.45,
        fill: { color: "FEE2E2" },
        rectRadius: 0.1,
      });
      slide.addText(pr.num, {
        x: px + 0.3,
        y: py + 0.25,
        w: 0.45,
        h: 0.45,
        fontSize: 14,
        bold: true,
        color: CRIMSON,
        align: "center",
        valign: "middle",
      });

      slide.addText(pr.title, {
        x: px + 0.9,
        y: py + 0.25,
        w: 4.5,
        h: 0.45,
        fontSize: 13,
        bold: true,
        color: NAVY,
        valign: "middle",
      });

      slide.addText(pr.desc, {
        x: px + 0.3,
        y: py + 0.8,
        w: 5.1,
        h: 1.5,
        fontSize: 11,
        color: SLATE_MUTED,
        lineSpacing: 17,
      });
    });
  }

  // ==========================================
  // SLIDE 3: THE STRATEGIC SHIFT
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "The Strategic Solution", "From a 'Boring Online Catalog' to a '24/7 Virtual Salesman'");

    // Left Column Card: Old Way
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("The Old Way (Before AI): Passive Brochure", {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: CRIMSON,
    });
    slide.addText(
      [
        { text: "• Customer Must Guess: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Forced to search through 21 brands and 200 datasheets alone.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Scientific Jargon Barrier: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Confusing physics acronyms (M0/M1/M2/M3, SPIN vs SPEX) that scare buyers.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Zero Financial Proof: ", options: { bold: true, color: SLATE_DARK } },
        { text: "No way for a buyer to justify the $20,000 cost to their finance department.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Dead Contact Forms: ", options: { bold: true, color: CRIMSON } },
        { text: "Customer fills a blank form and waits 24 hours for a response.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 5.0, h: 4.1, fontSize: 12, lineSpacing: 21 }
    );

    // Right Column Card: New AI Way
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.7,
      h: 5.2,
      fill: { color: NAVY },
      rectRadius: 0.15,
    });
    slide.addText("The New Way (With AI): Intelligent Advisor", {
      x: 7.1,
      y: 1.9,
      w: 5.1,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: "34D399",
    });
    slide.addText(
      [
        { text: "✓ Phoenix Color AI (24/7 Virtual Consultant): ", options: { bold: true, color: WHITE } },
        { text: "Answers any technical question instantly in plain, human English.\n\n", options: { color: "CBD5E1" } },
        { text: "✓ 3-Step AI Substrate Selector: ", options: { bold: true, color: WHITE } },
        { text: "Guides the customer to the exact certified machine for their cardboard, foil, or film.\n\n", options: { color: "CBD5E1" } },
        { text: "✓ Makeready ROI Calculator: ", options: { bold: true, color: WHITE } },
        { text: "Proves they will save AED 458,000 and get their money back in ~3.2 months.\n\n", options: { color: "CBD5E1" } },
        { text: "✓ 1-Click WhatsApp Lead Generator: ", options: { bold: true, color: "F43F5E" } },
        { text: "Sends pre-qualified buyer plant specs directly to the sales engineer's phone!", options: { color: "CBD5E1" } },
      ],
      { x: 7.1, y: 2.5, w: 5.1, h: 4.1, fontSize: 12, lineSpacing: 21 }
    );
  }

  // ==========================================
  // SLIDE 4: SOLUTION 1 — CHATBOT (TIGHT SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 1", "Phoenix Color AI: The 24/7 Virtual Technical Salesman");

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("Like Cloning Your Smartest Sales Engineer", {
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
        { text: "• Speaks Human, Not Jargon: ", options: { bold: true, color: SLATE_DARK } },
        { text: "When a customer asks, 'We print shiny snack pouches, which machine won't scratch wet ink?', Phoenix AI immediately explains which model has non-contact wheels and anti-glare filters.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Trained on All 21 Global Brands: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Knows every detail about X-Rite, GMG color proofing, and GlobalVision inspection software.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Real Dubai Office Information: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Accurately gives the Dubai HQ Al Quoz address, Mumbai office, and official UAE hours (Mon-Fri 8am-6pm).\n\n", options: { color: SLATE_MUTED } },
        { text: "• Live Interactive Product Cards: ", options: { bold: true, color: EMERALD } },
        { text: "Directly shows product photos and clickable links inside the chat conversation.", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 4.8, h: 4.1, fontSize: 11, lineSpacing: 19 }
    );

    // Tight Chatbot Screenshot
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
  // SLIDE 5: SOLUTION 2 — SUBSTRATE SELECTOR (TIGHT SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 2", "AI Substrate Selector: 'Which Machine Do I Need?'");

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("A Simple 3-Question Diagnostic", {
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
        num: "1. What are you printing on?",
        desc: "Cardboard boxes, plastic film pouches, metallic foil, molded plastics, or liquid inks.",
      },
      {
        num: "2. Where will it be used?",
        desc: "On the busy printing press floor (handheld) or in a climate-controlled QC laboratory (benchtop).",
      },
      {
        num: "3. What is your goal?",
        desc: "Fast color pass/fail, creating ink recipes from scratch, or scanning barcodes for defects.",
      },
    ];

    steps.forEach((st, idx) => {
      const sy = 2.4 + idx * 1.25;
      slide.addText(st.num, { x: 1.1, y: sy, w: 4.8, h: 0.3, fontSize: 12, bold: true, color: CRIMSON });
      slide.addText(st.desc, { x: 1.1, y: sy + 0.3, w: 4.8, h: 0.7, fontSize: 11, color: SLATE_MUTED, lineSpacing: 16 });
    });

    slide.addText("Takes under 30 seconds. No physics degree needed.", {
      x: 1.1,
      y: 6.0,
      w: 4.8,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: EMERALD,
    });

    // Tight Selector Screenshot
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
  // SLIDE 6: SOLUTION 2 (CONT.) — RECOMMENDATION (TIGHT RESULT SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 2 (Cont.)", "The Recommendation: Plain-English Technical Proof");

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.35,
      fill: { color: "ECFDF5" },
      rectRadius: 0.1,
    });
    slide.addText("✓ 99% Compatibility Match Generated", {
      x: 1.1,
      y: 1.9,
      w: 4.8,
      h: 0.35,
      fontSize: 11,
      bold: true,
      color: EMERALD,
      align: "center",
      valign: "middle",
    });

    slide.addText("Why Customers Love This Result", {
      x: 1.1,
      y: 2.4,
      w: 4.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });
    slide.addText(
      [
        { text: "• Clear Machine Recommendation: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Immediately displays the certified matching machine (e.g. X-Rite eXact™ 2 Plus) with real HD photo.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Plain-English Science: ", options: { bold: true, color: SLATE_DARK } },
        { text: "Explains the physics simply: 'Measuring shiny metallic foil creates harsh glare that blinds standard devices. The eXact 2 Plus has a built-in anti-glare polarization filter to make sure your brand colors match perfectly.'\n\n", options: { color: SLATE_MUTED } },
        { text: "• 1-Click WhatsApp Quote Request: ", options: { bold: true, color: CRIMSON } },
        { text: "Customer clicks one green button, and their WhatsApp opens pre-filled with the exact machine model ready to send to sales!", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.9, w: 4.8, h: 3.7, fontSize: 11, lineSpacing: 19 }
    );

    // Tight Result Screenshot
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
  // SLIDE 7: SOLUTION 3 — ROI CALCULATOR (TIGHT ROI SCREENSHOT)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 3", "Makeready ROI Calculator: 'How Much Money Will I Save?'");

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 1.6,
      w: 5.4,
      h: 5.2,
      fill: { color: WHITE },
      line: { color: BORDER_COLOR, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText("The Ultimate CFO Convincer", {
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
        { text: "• Simple Interactive Sliders: ", options: { bold: true, color: SLATE_DARK } },
        { text: "The factory owner moves sliders for: How many presses do they run? (e.g. 3 machines). How many jobs a day? (e.g. 4 jobs).\n\n", options: { color: SLATE_MUTED } },
        { text: "• Currency in Dirhams (AED) or USD ($): ", options: { bold: true, color: SLATE_DARK } },
        { text: "Tailored specifically for UAE, Saudi, and GCC clients with live conversion.\n\n", options: { color: SLATE_MUTED } },
        { text: "• Giant Financial Proof: ", options: { bold: true, color: EMERALD } },
        { text: "Calculates that an average 3-press packaging plant saves AED 458,000 every year in raw materials and recovered press time!\n\n", options: { color: SLATE_MUTED } },
        { text: "• Equipment Payback in ~3.2 Months: ", options: { bold: true, color: CRIMSON } },
        { text: "Proves that after ~100 days, the machine pays for itself completely—and every month after is pure profit!", options: { color: SLATE_MUTED } },
      ],
      { x: 1.1, y: 2.5, w: 4.8, h: 4.1, fontSize: 11, lineSpacing: 19 }
    );

    // Tight ROI Screenshot
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
  // SLIDE 8: SOLUTION 3 (CONT.) — BREAKING DOWN THE SAVINGS
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "Solution Pillar 3 (Cont.)", "Where Does the AED 458,000 Savings Come From?");

    const savingsPillars = [
      {
        num: "1",
        title: "Cutting Setup Time by 38%",
        desc: "Without Phoenix tools, workers spend 45 minutes per job tweaking ink keys by eye and arguing over color shades under room lights.\n\nWith Phoenix eXact 2: The machine prescribes the exact ink adjustments on the very first pull. Setup drops to 25 minutes.",
      },
      {
        num: "2",
        title: "187,000+ Sheets Out of Trash",
        desc: "During trial-and-error setups, hundreds of expensive cardboard sheets and plastic film rolls are ruined and tossed into the dumpster.\n\nRaw Material Bottom-Line: Cuts setup scrap by 40%, saving over 187,000 sheets or meters of substrate every year per plant.",
      },
      {
        num: "3",
        title: "780+ Extra Machine Hours",
        desc: "Because the factory saves 16 to 20 minutes on every job changeover, they recover hundreds of hours of press machine time.\n\nExtra Billable Capacity: The factory can print and sell dozens of extra client orders without needing to buy another multimillion-dollar press!",
      },
    ];

    savingsPillars.forEach((sp, idx) => {
      const spx = 0.8 + idx * 3.95;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: spx,
        y: 1.6,
        w: 3.7,
        h: 5.2,
        fill: { color: WHITE },
        line: { color: BORDER_COLOR, width: 1 },
        rectRadius: 0.15,
      });

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: spx + 0.3,
        y: 1.9,
        w: 0.5,
        h: 0.5,
        fill: { color: "F1F5F9" },
        rectRadius: 0.1,
      });
      slide.addText(sp.num, {
        x: spx + 0.3,
        y: 1.9,
        w: 0.5,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: NAVY,
        align: "center",
        valign: "middle",
      });

      slide.addText(sp.title, {
        x: spx + 0.3,
        y: 2.6,
        w: 3.1,
        h: 0.6,
        fontSize: 15,
        bold: true,
        color: CRIMSON,
      });

      slide.addText(sp.desc, {
        x: spx + 0.3,
        y: 3.3,
        w: 3.1,
        h: 3.3,
        fontSize: 11,
        color: SLATE_DARK,
        lineSpacing: 18,
      });
    });
  }

  // ==========================================
  // SLIDE 9: THE LEAD CAPTURE LOOP
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(slide, "The Sales Handoff Engine", "How Every Calculation Turns into a Hot Lead for Sales");

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

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8,
      y: 5.9,
      w: 11.6,
      h: 0.9,
      fill: { color: NAVY },
      rectRadius: 0.1,
    });
    slide.addText(
      "What the Sales Engineer Receives on WhatsApp: 'Hello Phoenix, I run 3 Offset presses doing 4 jobs/day, saving AED 458,000 with a 3.2-month payback. Can we schedule an on-site audit?'",
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
    addSlideHeader(slide, "Executive Summary & Next Steps", "Measurable Business ROI & Strategic Market Leadership");

    const stats = [
      { val: "+35%", label: "Conversion Lift", desc: "Turns passive datasheet readers into active inbound inquiries." },
      { val: "40-50%", label: "Shorter Sales Cycles", desc: "Buyers arrive already knowing their matching model and payback." },
      { val: "24 / 7", label: "Regional Coverage", desc: "Captures buyers in Saudi, Kuwait, Egypt outside office hours." },
      { val: "#1", label: "Market Leadership", desc: "First industrial color partner in the GCC with interactive AI tools." },
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

  // Save the presentation
  const outputPath = path.join(process.cwd(), "Phoenix_AI_Pitch_Deck_FINAL.pptx");
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);
}

generateDeck().catch((err) => {
  console.error("Error generating presentation:", err);
  process.exit(1);
});
