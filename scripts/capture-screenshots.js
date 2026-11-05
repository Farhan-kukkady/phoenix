const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "https://phoenix-zeta-beige.vercel.app";
const OUTPUT_DIR = path.join(process.cwd(), "public", "screenshots");

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("Launching headless browser at:", CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,960"],
    defaultViewport: { width: 1440, height: 960 },
  });

  const page = await browser.newPage();

  try {
    // 1. Capture ROI Calculator
    console.log("Navigating to ROI Calculator...");
    await page.goto(`${BASE_URL}/tools/roi-calculator`, { waitUntil: "networkidle2", timeout: 40000 });
    await page.waitForSelector("input[type='range']", { timeout: 20000 });
    // Click AED button if present
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const aed = btns.find(b => b.textContent && b.textContent.includes("AED"));
      if (aed) aed.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "04_roi_calculator.png"),
      clip: { x: 100, y: 140, width: 1240, height: 780 },
    });
    console.log("Saved: 04_roi_calculator.png");

    // 2. Capture Selector Step 1
    console.log("Navigating to Instrument Selector...");
    await page.goto(`${BASE_URL}/tools/selector`, { waitUntil: "networkidle2", timeout: 40000 });
    await page.waitForSelector("h2", { timeout: 20000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "02_selector.png"),
      clip: { x: 100, y: 140, width: 1240, height: 780 },
    });
    console.log("Saved: 02_selector.png");

    // 3. Complete Selector to get Result Screenshot
    console.log("Clicking through selector...");
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const next = btns.find(b => b.textContent && b.textContent.includes("Continue to Next Step"));
      if (next) next.click();
    });
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const next = btns.find(b => b.textContent && b.textContent.includes("Continue to Next Step"));
      if (next) next.click();
    });
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const gen = btns.find(b => b.textContent && b.textContent.includes("Generate Official Recommendation"));
      if (gen) gen.click();
    });
    await new Promise(r => setTimeout(r, 1500));

    await page.screenshot({
      path: path.join(OUTPUT_DIR, "03_selector_result.png"),
      clip: { x: 100, y: 140, width: 1240, height: 780 },
    });
    console.log("Saved: 03_selector_result.png");

    // 4. Capture Tools Hub
    console.log("Navigating to Tools Hub...");
    await page.goto(`${BASE_URL}/tools`, { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "05_tools_hub.png"),
      clip: { x: 100, y: 140, width: 1240, height: 780 },
    });
    console.log("Saved: 05_tools_hub.png");

    // 5. Capture Chatbot on Homepage
    console.log("Navigating to Homepage with Chatbot...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise(r => setTimeout(r, 1500));
    // Click chat floating trigger (fixed bottom-right button)
    await page.evaluate(() => {
      const allBtns = Array.from(document.querySelectorAll("button"));
      const botBtn = allBtns.find(b => {
        const cls = b.className || "";
        return cls.includes("fixed") || cls.includes("bottom") || b.innerHTML.includes("svg") || b.textContent.includes("Chat");
      });
      if (botBtn) botBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "01_chatbot.png"),
      fullPage: false,
    });
    console.log("Saved: 01_chatbot.png");

  } catch (err) {
    console.error("Screenshot capture error:", err);
  } finally {
    await browser.close();
    console.log("All screenshots captured successfully!");
  }
}

capture();
