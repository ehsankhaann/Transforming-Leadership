import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = process.env.BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const paths = [
  '/',
  '/executive-coaching',
  '/mastermind-groups',
  '/mastermind-groups/',
  '/about',
  '/about/',
  '/insights',
  '/insights/behaviors-vs-outcomes'
];

function ensure(value, message) {
  if (!value) throw new Error(message);
}

try {
  for (const width of [375, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 820 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    for (const path of paths) {
      await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
      await page.locator('h1').first().waitFor();
      ensure(await page.locator('h1').count() === 1, `${width}px ${path}: expected exactly one H1`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      ensure(!overflow, `${width}px ${path}: horizontal overflow detected`);
      ensure(!errors.length, `${width}px ${path}: JS errors: ${errors.join('; ')}`);
    }

    await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    const stevePhoto = page.getByRole('img', { name: 'Dr. Steve Steff, founder and executive coach at Transforming Leadership' }).first();
    await stevePhoto.waitFor();
    ensure((await stevePhoto.getAttribute('src')) === '/images/steve-steff.jpg',
      `${width}px: supplied Steve portrait not in use`);
    await stevePhoto.evaluate((img) => img.decode());
    ensure(await page.getByText('Ron Kuehl', { exact: true }).count() === 1,
      `${width}px: sourced Ron Kuehl testimonial missing`);
    ensure(await page.getByText('40%', { exact: false }).count() === 0,
      `${width}px: unsupported 40% claim remains`);

    await page.goto(`${base}/insights`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { name: 'Insights', exact: true }).waitFor();
    ensure(await page.getByRole('link', { name: 'Behaviors vs. Outcomes', exact: true }).count() === 1,
      `${width}px: authentic article missing`);
    await page.getByRole('button', { name: 'Strategic Alignment' }).click();
    ensure(await page.getByRole('link', { name: 'Gaining Alignment to Your Vision', exact: true }).count() === 1,
      `${width}px: category filtering failed`);
    ensure(await page.getByRole('link', { name: 'Behaviors vs. Outcomes', exact: true }).count() === 0,
      `${width}px: category filtering did not hide unrelated posts`);

    await page.goto(`${base}/mastermind-groups`, { waitUntil: 'domcontentloaded' });
    ensure(await page.getByRole('heading', { name: 'VP & Division Leader Circle' }).count() === 1,
      `${width}px: Option A third circle missing`);
    ensure(await page.getByText('Emerging Leader Circle').count() === 0,
      `${width}px: old third circle still visible`);

    if (width === 375) {
      const firstFaq = page.getByRole('button', { name: 'Is it confidential?' });
      const secondFaq = page.getByRole('button', { name: 'How much time does it take?' });
      await firstFaq.focus();
      await page.keyboard.press('ArrowDown');
      ensure(await secondFaq.evaluate((el) => el === document.activeElement), 'FAQ ArrowDown focus failed');
      await page.keyboard.press('Enter');
      ensure(await secondFaq.getAttribute('aria-expanded') === 'true', 'FAQ keyboard open failed');
      ensure(await firstFaq.getAttribute('aria-expanded') === 'false', 'FAQ did not close previous item');
    }

    if (width < 1280) {
      await page.locator('header').getByRole('button', { name: 'Book a Call' }).waitFor({ state: 'visible' });
      await page.getByRole('button', { name: 'Open navigation menu' }).click();
      ensure(await page.getByRole('dialog', { name: 'Site navigation' }).isVisible(),
        `${width}px: mobile navigation did not open`);
      await page.keyboard.press('Escape');
      ensure(await page.getByRole('dialog', { name: 'Site navigation' }).count() === 0,
        `${width}px: mobile navigation did not close on Escape`);
    }

    await page.getByRole('button', { name: "See if I'm a fit" }).nth(2).click();
    const selectedCircle = await page.locator('#app-circle').inputValue();
    ensure(selectedCircle === 'VP & Division Leader Circle',
      `${width}px: third circle was not preselected in application`);

    await page.locator('#app-name').fill('Jordan Taylor');
    await page.locator('#app-email').fill('jordan@example.com');
    await page.locator('#app-phone').fill('5551234567');
    await page.locator('#app-title').fill('VP Operations, Example Co');
    await page.locator('#app-people').selectOption('51–200');
    await page.locator('#app-challenge').fill('I want to delegate operational decisions to my leadership team.');
    await page.getByRole('button', { name: 'Submit My Application' }).click();
    await page.getByRole('link', { name: 'Open email app to send' }).waitFor();
    ensure((await page.getByRole('link', { name: 'Open email app to send' }).getAttribute('href'))?.startsWith('mailto:info@tleadership.com?'),
      `${width}px: fallback email draft missing`);

    if (width < 1280) {
      await page.getByRole('button', { name: 'Open navigation menu' }).click();
      await page.getByRole('dialog', { name: 'Site navigation' }).getByRole('link', { name: 'Contact' }).click();
    } else {
      await page.locator('header').getByRole('link', { name: 'Contact' }).click();
    }
    await page.getByRole('heading', { name: 'A real conversation starts here.' }).waitFor();
    ensure(page.url().includes('/about#contact'), `${width}px: contact anchor navigation failed`);
    ensure((await page.getByRole('link', { name: 'info@tleadership.com' }).first().getAttribute('href'))?.startsWith('mailto:'),
      `${width}px: contact email is not clickable`);
    ensure((await page.getByRole('link', { name: 'LinkedIn (opens in a new tab)' }).first().getAttribute('href')) === 'https://www.linkedin.com/in/ssteff/',
      `${width}px: LinkedIn profile link is incorrect`);

    await page.locator('header').getByRole('button', { name: 'Book a Call' }).click();
    const dialog = page.getByRole('dialog', { name: 'Book a 20-minute call with Steve.' });
    await dialog.waitFor();
    ensure(await dialog.getByRole('link', { name: 'info@tleadership.com' }).count() === 1,
      `${width}px: booking dialog lacks direct email fallback`);
    await dialog.locator('#call-name').fill('Jordan Taylor');
    await dialog.locator('#call-email').fill('jordan@example.com');
    await dialog.locator('#call-role').fill('VP Operations, Example Co');
    await dialog.getByRole('button', { name: 'Request my 20-minute call' }).click();
    await dialog.getByRole('link', { name: 'Open email app to send request' }).waitFor();
    await page.keyboard.press('Escape');
    ensure(await dialog.count() === 0, `${width}px: booking dialog did not close on Escape`);

    if (width === 375 || width === 1440) {
      await mkdir('.tmp-preview', { recursive: true });
      await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `.tmp-preview/home-${width}.png`, fullPage: false });
      await page.goto(`${base}/mastermind-groups`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `.tmp-preview/mastermind-${width}.png`, fullPage: false });
    }

    console.log(`PASS ${width}px: ${paths.length} routes, menu, option A, form, contact, booking`);
    await page.close();
  }
} finally {
  await browser.close();
}