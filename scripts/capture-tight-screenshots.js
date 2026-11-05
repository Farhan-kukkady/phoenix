const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "https://phoenix-zeta-beige.vercel.app";
const OUTPUT_DIR = path.join(process.cwd(), "public", "screenshots");
const USER_DATA = path.join(process.cwd(), ".temp_tight_profile");

async function captureTight() {
  if (fs.existsSync(USER_DATA)) {
    try { fs.rmSync(USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }

  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    userDataDir: USER_DATA,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,1100"],
    defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();

  try {
    // 1. Capture ROI Calculator - TIGHT CARD ONLY
    console.log("Capturing ROI Calculator element...");
    await page.goto(`${BASE_URL}/tools/roi-calculator`, { waitUntil: "networkidle2", timeout: 40000 });
    await page.waitForSelector("input[type='range']", { timeout: 20000 });
    
    // Click AED button to show Dirhams
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const aed = btns.find(b => b.textContent && b.textContent.includes("AED"));
      if (aed) aed.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Find the tool card container
    const roiCard = await page.$(".shadow-2xl.overflow-hidden");
    if (roiCard) {
      await roiCard.screenshot({ path: path.join(OUTPUT_DIR, "tight_roi_calculator.png") });
      console.log("Saved: tight_roi_calculator.png");
    }

    // 2. Capture Selector Step 1 - TIGHT CARD ONLY
    console.log("Capturing Selector Step 1 element...");
    await page.goto(`${BASE_URL}/tools/selector`, { waitUntil: "networkidle2", timeout: 40000 });
    await page.waitForSelector("h2", { timeout: 20000 });
    await new Promise(r => setTimeout(r, 1000));

    const selectorCard = await page.$(".shadow-2xl.overflow-hidden");
    if (selectorCard) {
      await selectorCard.screenshot({ path: path.join(OUTPUT_DIR, "tight_selector.png") });
      console.log("Saved: tight_selector.png");
    }

    // 3. Complete Selector to get 99% Match Card
    console.log("Clicking through selector to recommendation...");
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

    const resultCard = await page.$(".shadow-2xl.overflow-hidden");
    if (resultCard) {
      await resultCard.screenshot({ path: path.join(OUTPUT_DIR, "tight_selector_result.png") });
      console.log("Saved: tight_selector_result.png");
    }

    // 4. Capture Chatbot Dialog Open - TIGHT DIALOG ONLY
    console.log("Capturing Chatbot dialog...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise(r => setTimeout(r, 1500));

    // Open chat
    await page.evaluate(() => {
      const allBtns = Array.from(document.querySelectorAll("button"));
      const botBtn = allBtns.find(b => {
        const cls = b.className || "";
        return cls.includes("fixed") || cls.includes("bottom") || b.innerHTML.includes("svg") || b.textContent.includes("Chat");
      });
      if (botBtn) botBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Type a sample question into chat so it looks like a real conversation
    await page.evaluate(() => {
      const input = document.querySelector("input[placeholder*='Ask about']");
      if (input) {
        input.value = "We print flexible film pouches. Which machine do you recommend?";
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    // Capture the open chat window
    const chatWindow = await page.$("div[role='dialog'], div[class*='fixed bottom'] div[class*='shadow-2xl'], div[class*='rounded-3xl'][class*='shadow-']");
    if (chatWindow) {
      await chatWindow.screenshot({ path: path.join(OUTPUT_DIR, "tight_chatbot.png") });
      console.log("Saved: tight_chatbot.png");
    } else {
      // Fallback: take bottom-right screenshot
      await page.screenshot({
        path: path.join(OUTPUT_DIR, "tight_chatbot.png"),
        clip: { x: 800, y: 350, width: 620, height: 720 },
      });
      console.log("Saved: tight_chatbot.png (fallback clip)");
    }

  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
    try { fs.rmSync(USER_DATA, { recursive: true, force: true }); } catch (e) {}
    console.log("Done capturing razor-sharp screenshots!");
  }
}

captureTight();

