import { NextResponse } from "next/server";
import { getCatalogSummaries, SYSTEM_PROMPT, type AIProductSummary } from "@/lib/ai/catalog-knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1].content;
    const catalog = getCatalogSummaries();
    const catalogLookup = new Map<string, AIProductSummary>(catalog.map((p) => [p.id, p]));

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API Key is present, call Gemini 2.5 Flash
    if (apiKey) {
      try {
        const compactCatalogList = catalog.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          desc: p.shortDescription,
          tags: p.tags,
        }));

        const systemInstruction = `${SYSTEM_PROMPT}\n\nAvailable Products Catalog:\n${JSON.stringify(
          compactCatalogList
        )}`;

        const geminiHistory = messages.slice(0, -1).map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: systemInstruction }],
              },
              contents: [
                ...geminiHistory,
                {
                  role: "user",
                  parts: [{ text: lastUserMessage }],
                },
              ],
              generationConfig: {
                response_mime_type: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            const recommendedProducts = (parsed.recommendedProductIds || [])
              .map((id: string) => catalogLookup.get(id))
              .filter(Boolean);

            return NextResponse.json({
              reply: parsed.reply,
              products: recommendedProducts,
              source: "gemini",
            });
          }
        } else {
          console.warn("Gemini API call returned non-200, falling back to local reasoning engine.");
        }
      } catch (geminiError) {
        console.error("Gemini API error, using local fallback engine:", geminiError);
      }
    }

    // 2. Intelligent Local Reasoning Engine (Fallback if no key is set yet)
    const localResult = generateLocalResponse(lastUserMessage, catalog);
    return NextResponse.json({
      reply: localResult.reply,
      products: localResult.recommendedProducts,
      source: "local-intelligence",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing your request." },
      { status: 500 }
    );
  }
}

// Local consultative rule-based matching engine
function generateLocalResponse(
  query: string,
  catalog: AIProductSummary[]
): { reply: string; recommendedProducts: AIProductSummary[] } {
  const q = query.toLowerCase();

  // Helper to find products by keywords
  const findMatches = (...keywords: string[]): AIProductSummary[] => {
    return catalog
      .filter((p) => {
        const text = `${p.name} ${p.shortDescription} ${p.tags.join(" ")} ${p.brand}`.toLowerCase();
        return keywords.some((kw) => text.includes(kw.toLowerCase()));
      })
      .slice(0, 3);
  };

  // Case 0: Contact info / Phone / Email / Address / Location
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("email") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("office") ||
    q.includes("headquarter") ||
    q.includes("reach") ||
    q.includes("whatsapp")
  ) {
    return {
      reply: `You can reach Phoenix Colour Technologies directly through our regional headquarters or via our direct customer channels:

### Contact Details:
- **Phone & WhatsApp**: **+971 50 754 4559**
- **Email**: **sales@phoenixtecsol.com**

### Office Addresses:
- **Dubai Headquarters (UAE)**:  
  PO Box 391759, Warehouse 3B Plot No 368-0140, Behind Hyundai Showroom, Al Quoz 3, Dubai, UAE
- **India Office (Navi Mumbai)**:  
  Farb CMS Tech LLP, #1301, 13th Floor, CBD 61 Four Greenscape Shakti V, Plot No.12, Sector 15, CBD Belapur, Navi Mumbai, Maharashtra-400614, India

Our engineers serve clients across the UAE, Saudi Arabia, the GCC, and Africa. Feel free to message us on WhatsApp or call our Dubai team directly!`,
      recommendedProducts: [],
    };
  }

  // Case 0b: Working hours / operating timings / schedule
  if (
    q.includes("hour") ||
    q.includes("timing") ||
    q.includes("schedule") ||
    q.includes("working") ||
    q.includes("when are you open") ||
    q.includes("open")
  ) {
    return {
      reply: `Our official office and technical support hours are:

### Operating & Support Hours:
- **Monday – Friday**: 8:00 AM – 6:00 PM (GST)
- **Saturday**: 9:00 AM – 2:00 PM (Emergency Dispatch & Technical Support)
- **Sunday**: Closed

For urgent technical assistance outside standard hours, our engineering desk can be reached directly via WhatsApp at **+971 50 754 4559**.`,
      recommendedProducts: [],
    };
  }

  // Case 0c: Instrument Selector & "Which machine do I need?"
  if (
    q.includes("selector") ||
    q.includes("which machine") ||
    q.includes("which instrument") ||
    q.includes("choose") ||
    q.includes("recommend a machine") ||
    q.includes("recommend an instrument") ||
    q.includes("substrate")
  ) {
    const products = findMatches("exact-2-plus", "ci7800", "ma-5-qc");
    return {
      reply: `To find the exact spectrophotometer or QC system engineered for your specific substrate and environment, you can use our interactive **[AI Instrument & Substrate Selector](/tools/selector)**!

### Quick Optical Geometry Guide:
- **Paper & Folding Carton**: Handheld 45°:0° annular optics (**X-Rite eXact™ 2**) match human eye perception under D50 lighting.
- **Flexible Packaging & Metallic Foil**: Handheld with M3 switchable polarization (**X-Rite eXact™ 2 Plus**) eliminates surface glare.
- **Plastics, Liquids & Raw Pigments**: Diffuse / 8° integrating sphere benchtop (**X-Rite Ci7800**) measures true color regardless of texture.
- **Metallic & Pearlescent Coatings**: 5-Angle directional spectrophotometer (**X-Rite MA-5 QC**) measures color travel & flop.

You can launch our 3-step diagnostic directly here: **[Launch AI Instrument Selector →](/tools/selector)**`,
      recommendedProducts: products,
    };
  }

  // Case 0d: Makeready & Waste ROI Calculator / Savings
  if (
    q.includes("roi") ||
    q.includes("calculator") ||
    q.includes("saving") ||
    q.includes("savings") ||
    q.includes("waste") ||
    q.includes("makeready") ||
    q.includes("payback") ||
    q.includes("how much money")
  ) {
    const products = findMatches("exact", "gmg");
    return {
      reply: `You can model your plant's exact financial returns using our interactive **[Makeready & Waste ROI Calculator](/tools/roi-calculator)**!

### Typical Industrial Benchmarks:
- **Makeready Time Reduction**: 35% – 42% faster job changeovers (saving ~16 mins per press run).
- **Substrate Scrap Saved**: 150,000+ sheets or 120,000 meters of film diverted from waste annually per press.
- **Payback Horizon**: 2 to 4 months based on typical commercial packaging volumes in the UAE and GCC.
- **Currencies**: Real-time calculations in both **USD ($)** and **AED (Dirhams)**.

Test your plant parameters now: **[Open Makeready ROI Calculator →](/tools/roi-calculator)**`,
      recommendedProducts: products,
    };
  }

  // Case 1: Color accuracy / portable spectrophotometer
  if (
    q.includes("accuracy") ||
    q.includes("portable") ||
    q.includes("handheld") ||
    q.includes("exact") ||
    q.includes("spectrophotometer") ||
    q.includes("measure color") ||
    q.includes("press")
  ) {
    const products = findMatches("exact", "ci64", "ci62");
    return {
      reply: `For portable color measurement with the highest inter-instrument agreement on press and in packaging environments, the **X-Rite eXact™ 2** family is the industry benchmark.

### Why this is recommended:
- **Patented Mantis™ Video Targeting**: Features a built-in high-resolution digital loupe for precision targeting on narrow color bars and packaging patches.
- **$\Delta E$ Accuracy**: Conforms strictly to ISO 13655 M0, M1, M2, and M3 measurement conditions in a single pass.
- **Workflow Integration**: Connects directly with X-Rite ColorCert and PantoneLIVE cloud libraries for immediate pass/fail quality control.

Below are the recommended instruments for your evaluation:`,
      recommendedProducts: products,
    };
  }

  // Case 2: Benchtop / Formulation / Laboratory QC
  if (
    q.includes("benchtop") ||
    q.includes("formulation") ||
    q.includes("lab") ||
    q.includes("sphere") ||
    q.includes("ci7800") ||
    q.includes("opaque") ||
    q.includes("liquid") ||
    q.includes("plastic")
  ) {
    const products = findMatches("ci7800", "ci7600", "ci7860");
    return {
      reply: `For master color formulation, laboratory quality control, and strict supply chain compliance across plastics, coatings, and packaging, a **Reference-Grade Benchtop Sphere (d/8°) Spectrophotometer** is required.

### Why this is recommended:
- **Tolerancing ($\Delta E^* \le 0.08$)**: The Ci7800 delivers industry-leading inter-instrument agreement, ensuring color measurements match across suppliers and manufacturing sites worldwide.
- **Multi-Aperture Versatility**: Supports reflectance and optional transmission modes for opaque, translucent, and transparent materials.
- **Active Digital Targeting**: Onboard camera confirms exact sample positioning to eliminate operator alignment variance.

Here are the primary benchtop systems supported by Phoenix Colour Technologies:`,
      recommendedProducts: products,
    };
  }

  // Case 3: Inspection / Proofreading / GlobalVision / Defect detection
  if (
    q.includes("inspect") ||
    q.includes("proof") ||
    q.includes("barcode") ||
    q.includes("artwork") ||
    q.includes("defect") ||
    q.includes("globalvision") ||
    q.includes("global vision")
  ) {
    const products = findMatches("globalvision");
    return {
      reply: `For automated quality control across artwork, text, barcodes, and printed materials, **GlobalVision Automated Proofreading Systems** eliminate human error before production begins.

### Key Capabilities:
- **Pixel-Level Graphics Comparison**: Compares PDF revisions against master artwork down to individual pixel deviations.
- **Barcode & 2D Code Verification**: Instantly decodes and grades 1D/2D barcodes (QR, DataMatrix, EAN) against ISO/ANSI standards without requiring physical scanners.
- **Printed Sheet Inspection**: Scans physical printed sheets to detect smudges, hickeys, misregistrations, and font substitutions.

Recommended GlobalVision software solutions:`,
      recommendedProducts: products,
    };
  }

  // Case 4: Flexo / Gravure / Ink Testing
  if (
    q.includes("flexo") ||
    q.includes("ink") ||
    q.includes("igt") ||
    q.includes("rub") ||
    q.includes("viscosity") ||
    q.includes("dryer")
  ) {
    const products = findMatches("igt", "flexo", "hanatek");
    return {
      reply: `For printability testing, ink transfer consistency, and substrate durability evaluation, **IGT Printability Testers** and **Hanatek Instruments** provide standardized test replication.

### Solutions:
- **IGT Flexo & Offset Testers**: Precise ink film application and color reproduction testing before running full press jobs.
- **Hanatek Abrasion & Rub Testers**: Measure scuff resistance and coating adhesion on finished cartons and labels.

Recommended physical testing systems:`,
      recommendedProducts: products,
    };
  }

  // Case 5: Standards / ISO 12647 / G7 / Services
  if (
    q.includes("g7") ||
    q.includes("iso") ||
    q.includes("standard") ||
    q.includes("service") ||
    q.includes("calibration") ||
    q.includes("training") ||
    q.includes("dubai") ||
    q.includes("saudi") ||
    q.includes("phoenix")
  ) {
    const products = findMatches("exact", "ci7800", "gmg");
    return {
      reply: `Phoenix Colour Technologies is the premier partner for **G7 Master Qualification** and **ISO 12647 Process Standardization** across the UAE, Saudi Arabia, GCC, and Africa.

### Our Engineering Services:
- **Annual Instrument Certification & NetProfiler Calibration**: Official factory-standard recertification with NIST-traceable standards.
- **Press Fingerprinting & ICC Color Profiling**: Standardizing flexo, offset, gravure, and digital presses for predictable proof-to-press consistency.
- **Turnkey Ink Kitchens**: Formulating exact recipe libraries with X-Rite InkFormulation and GMG ColorServer.
- **Regional Support Hubs**: Dedicated technical service centers based in Dubai with rapid on-site deployment across GCC and Africa.

Explore our core instrument ranges or click **Contact / Request a Quote** to consult with our color application engineers:`,
      recommendedProducts: products,
    };
  }

  // Default Fallback
  const defaultProducts = findMatches("exact", "ci7800", "globalvision");
  return {
    reply: `Welcome to **Phoenix Colour Technologies**. I can assist you with instrument selection, color tolerances ($\Delta E$), spectrophotometer geometries, automated proofreading, or ISO 12647 / G7 press standardization.

Feel free to ask specific questions such as:
- *"I need a handheld device for packaging press checks"*
- *"What is the difference between 45:0 and sphere spectrophotometers?"*
- *"How can we inspect barcodes and artwork for packaging compliance?"*
- *"What benchtop instrument works best for plastics and formulation?"*

Here are our most frequently requested flagship instruments:`,
    recommendedProducts: defaultProducts,
  };
}

