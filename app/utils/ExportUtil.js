const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

class ExportUtil {
  static async buildExcel(users) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');
    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Username', key: 'username', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 30 },
      { header: 'Company', key: 'company', width: 15 },
      { header: 'Website', key: 'website', width: 15 },
      { header: 'Address', key: 'address', width: 15 }
    ];

    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F46E5' }
      };
      cell.alignment = { horizontal: 'center' };
    });

    users.forEach((user) => {
      sheet.addRow({
        id: user._id || user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        company: user.company,
        website: user.website,
        address: user.address,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  static async buildPdf(users) {
    const rows = users.map((user, index) => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name || ''}</td>
        <td>${user.username || ''}</td>
        <td>${user.email || ''}</td>
        <td>${user.phone || ''}</td>
        <td>${user.website || ''}</td>
      </tr>
    `).join('');

    const templatePath = path.join(__dirname, '..', 'views', 'pdf', 'users-report.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{rows}}', rows);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return pdfBuffer;
  }
}

module.exports = ExportUtil;
