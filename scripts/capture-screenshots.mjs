import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const EMAIL = process.env.NOVA_EMAIL;
const PASSWORD = process.env.NOVA_PASSWORD;
const OUT = "public/screenshots";

const LESSON_URL = `${BASE}/course/year-12-advanced/ma-c3-applications-of-differentiation/second-derivative-concavity`;
const DIAGNOSTIC_URL = `${BASE}/diagnostic/year-12-advanced`;

mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shotClip(page, clip, file) {
  await page.screenshot({ path: `${OUT}/${file}`, clip });
  console.log("saved", file, JSON.stringify(clip));
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 1000 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

try {
  // --- Login ---
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.locator('input[type="email"]').fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASSWORD);
  await page.getByRole("button", { name: /log in/i }).first().click();
  await page.waitForURL(/dashboard/, { timeout: 20000 }).catch(() => {});
  await sleep(2000);

  // --- Lesson: Learn (worked examples) ---
  await page.goto(LESSON_URL, { waitUntil: "networkidle" });
  await sleep(2500);
  const learnBtn = page.getByRole("button", { name: "Learn", exact: true });
  if (await learnBtn.count()) {
    await learnBtn.first().click();
    await sleep(1200);
  }

  const learnCard = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: /worked example/i }) })
    .first();
  const workedHeading = page.getByRole("heading", { name: /worked examples/i }).first();
  await workedHeading.scrollIntoViewIfNeeded();
  await sleep(500);
  const cardBox = await learnCard.boundingBox();
  const headBox = await workedHeading.boundingBox();
  if (cardBox && headBox) {
    await shotClip(page, {
      x: Math.max(cardBox.x, 0),
      y: Math.max(headBox.y - 28, 0),
      width: cardBox.width,
      height: 760,
    }, "lesson-worked-examples.png");
  }

  // --- Lesson: Guided Practice (advance via the Continue button) ---
  const continueGuided = page.getByRole("button", { name: /continue to guided practice/i });
  if (await continueGuided.count()) {
    await continueGuided.first().click();
    await sleep(1800);
  } else {
    const guidedStage = page.getByRole("button", { name: "Guided Practice", exact: true });
    if (await guidedStage.count()) {
      await guidedStage.first().click();
      await sleep(1800);
    }
  }
  const guidedHeading = page.getByRole("heading", { name: "Guided Practice", exact: true });
  await guidedHeading.first().waitFor({ state: "visible", timeout: 15000 });
  await guidedHeading.first().scrollIntoViewIfNeeded();
  await sleep(700);
  const gh = await guidedHeading.first().boundingBox();
  if (gh) {
    await shotClip(page, {
      x: 192,
      y: Math.max(gh.y - 28, 0),
      width: 896,
      height: 720,
    }, "lesson-guided-practice.png");
  } else {
    console.log("guided heading not found");
  }

  // --- Diagnostic results ---
  await page.goto(DIAGNOSTIC_URL, { waitUntil: "networkidle" });
  await sleep(1800);
  const selectAll = page.getByRole("button", { name: /select all/i });
  if (await selectAll.count()) {
    await selectAll.first().click();
    await sleep(400);
  }
  await page.getByRole("button", { name: /start diagnostic/i }).first().click();
  await sleep(1500);
  const questionSections = page.locator('section:has-text("Question")');
  const qCount = await questionSections.count();
  for (let i = 0; i < qCount; i++) {
    // Vary answers a little so the result has a mix of strong/weak topics.
    const choices = questionSections.nth(i).locator("button");
    const n = await choices.count();
    const pick = i % 3 === 0 ? 0 : i % 3 === 1 ? Math.min(1, n - 1) : 0;
    await choices.nth(pick).click();
    await sleep(50);
  }
  await page.getByRole("button", { name: /see my results/i }).first().click();
  await sleep(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);

  const planHeading = page.getByRole("heading", { name: /personalised study plan/i });
  await planHeading.first().waitFor({ state: "visible", timeout: 15000 });
  const rect = await planHeading.first().evaluate((el) => {
    let n = el;
    while (n && n.parentElement) {
      const cs = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      if (parseFloat(cs.borderTopLeftRadius) > 8 && r.width > 300) {
        return { x: r.x, y: r.y, width: r.width };
      }
      n = n.parentElement;
    }
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width };
  });
  await shotClip(page, {
    x: Math.max(rect.x - 1, 0),
    y: Math.max(rect.y - 1, 0),
    width: rect.width + 2,
    height: 812,
  }, "diagnostic-results.png");

  console.log("DONE");
} catch (err) {
  console.error("CAPTURE ERROR:", err.message);
  await page.screenshot({ path: `${OUT}/_error.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}
