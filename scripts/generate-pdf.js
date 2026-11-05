const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const HTML_FILE = `file://${path.join(process.cwd(), "public", "print_deck.html").replace(/\\/g, "/")}`;
const PDF_OUTPUT = path.join(process.cwd(), "Phoenix_AI_Pitch_Deck.pdf");
const USER_DATA_DIR = path.join(process.cwd(), ".temp_pdf_profile");

async function generatePdf() {
  if (fs.existsSync(USER_DATA_DIR)) {
    fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
  }

  console.log("Launching Chrome with custom profile:", USER_DATA_DIR);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    userDataDir: USER_DATA_DIR,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log("Navigating to HTML file:", HTML_FILE);
  await page.goto(HTML_FILE, { waitUntil: "networkidle0", timeout: 35000 });

  // Give a short pause for all images to paint
  await new Promise(r => setTimeout(r, 1500));

  console.log("Saving PDF to:", PDF_OUTPUT);
  await page.pdf({
    path: PDF_OUTPUT,
    width: "1920px",
    height: "1080px",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
  });

  await browser.close();

  if (fs.existsSync(USER_DATA_DIR)) {
    try {
      fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
  }

  console.log("PDF generation completed successfully!");
}

generatePdf().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
