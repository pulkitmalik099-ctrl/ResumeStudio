import puppeteer from 'puppeteer';

export async function htmlToPdf(html: string): Promise<Buffer> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.createPage();

    // Set viewport to A4 standard
    await page.setViewport({ width: 1200, height: 1600 });

    // Load HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF (A4 standard)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
      printBackground: true,
    });

    return pdfBuffer as Buffer;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
