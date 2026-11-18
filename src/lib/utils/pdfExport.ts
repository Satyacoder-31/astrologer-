import jsPDF from 'jspdf';
import { KundliData } from '@/lib/astrology/engine';

export async function exportKundliToPDF(kundli: KundliData, userName: string = 'Seeker', dob: string = '', tob: string = '', birthplace: string = '') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryGold = [212, 175, 98]; // #D4AF62
  const deepNavy = [16, 26, 56]; // #101A38
  const darkCosmic = [8, 13, 36]; // #080D24

  // Page 1: Header & Cover
  doc.setFillColor(darkCosmic[0], darkCosmic[1], darkCosmic[2]);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative Golden Border
  doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.4);
  doc.rect(12, 12, 186, 273);

  // Title
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('KRISHNA JYOTISH', 105, 30, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(245, 241, 232);
  doc.text('Cosmic Vedic Horoscope & Kundli Report', 105, 38, { align: 'center' });

  // Divider
  doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.line(30, 44, 180, 44);

  // User Details Box
  doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
  doc.roundedRect(20, 52, 170, 45, 3, 3, 'F');
  doc.rect(20, 52, 170, 45);

  doc.setFontSize(10);
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.text('NATAL BIRTH PARTICULARS', 25, 60);

  doc.setTextColor(245, 241, 232);
  doc.text(`Name: ${userName}`, 25, 68);
  doc.text(`Date of Birth: ${dob}`, 25, 76);
  doc.text(`Time of Birth: ${tob}`, 25, 84);

  doc.text(`Birthplace: ${birthplace}`, 110, 68);
  doc.text(`Ayanamsa: ${kundli.ayanamsa.name} (${kundli.ayanamsa.formatted})`, 110, 76);
  doc.text(`Lagna (Ascendant): ${kundli.lagna.sign}`, 110, 84);

  // Panchang Snapshot
  doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
  doc.roundedRect(20, 105, 170, 35, 3, 3, 'F');
  doc.rect(20, 105, 170, 35);

  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.text('PANCHANG AT BIRTH', 25, 113);

  doc.setTextColor(245, 241, 232);
  doc.text(`Tithi: ${kundli.panchangSummary.tithi}`, 25, 122);
  doc.text(`Nakshatra: ${kundli.panchangSummary.nakshatra} (Pada ${kundli.lagna.nakshatraPada})`, 25, 130);
  doc.text(`Moon Rashi: ${kundli.panchangSummary.rashi}`, 110, 122);
  doc.text(`Gana: ${kundli.panchangSummary.gan} | Nadi: ${kundli.panchangSummary.nadi}`, 110, 130);

  // Planetary Table
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PLANETARY POSITIONS (NIRAYANA SIDEREAL)', 20, 150);

  // Table header
  doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
  doc.rect(20, 155, 170, 8, 'F');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.text('Planet', 24, 160);
  doc.text('Sign', 55, 160);
  doc.text('Degree', 95, 160);
  doc.text('Nakshatra', 125, 160);
  doc.text('House', 160, 160);
  doc.text('Dignity', 175, 160);

  let currentY = 168;
  doc.setFont('helvetica', 'normal');
  kundli.planets.forEach((p, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(16, 26, 56, 0.4);
      doc.rect(20, currentY - 5, 170, 7, 'F');
    }
    doc.setTextColor(245, 241, 232);
    const retro = p.isRetrograde ? ' (R)' : '';
    doc.text(`${p.name} (${p.sanskritName})${retro}`, 24, currentY);
    doc.text(p.sign, 55, currentY);
    doc.text(`${p.degrees}° ${p.minutes}' ${p.seconds}"`, 95, currentY);
    doc.text(`${p.nakshatra} (P${p.nakshatraPada})`, 125, currentY);
    doc.text(`H${p.house}`, 162, currentY);
    doc.text(p.dignity, 175, currentY);
    currentY += 7.5;
  });

  // Doshas & Remedies Summary
  currentY += 6;
  doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
  doc.roundedRect(20, currentY, 170, 35, 3, 3, 'F');
  doc.rect(20, currentY, 170, 35);

  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('DOSHA & TRANSIT ASSESSMENT', 25, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(245, 241, 232);
  doc.setFontSize(9);
  doc.text(`Manglik Dosha: ${kundli.doshas.isManglik ? `Present (${kundli.doshas.manglikSeverity})` : 'Not Present (Kuja Dosha Free)'}`, 25, currentY + 16);
  doc.text(`Sade Sati Status: ${kundli.doshas.isSadeSatiActive ? `Active (${kundli.doshas.sadeSatiPhase})` : 'Inactive'}`, 25, currentY + 23);
  doc.text(`Kaal Sarp Yoga: ${kundli.doshas.hasKaalSarp ? 'Present' : 'Not Present'}`, 25, currentY + 30);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2]);
  doc.text('Calculated using authentic Ephemeris algorithms by Krishna Cosmic Universe (Krishna Jyotish)', 105, 280, { align: 'center' });
  doc.text('https://krishnajyotish.com • Certified Vedic Jyotish Consultation', 105, 284, { align: 'center' });

  // Save the PDF
  doc.save(`Kundli_Report_${userName.replace(/\s+/g, '_')}.pdf`);
}
