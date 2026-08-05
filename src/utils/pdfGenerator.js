import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPdf = async (element, billNumber) => {
  const elementWidth = Math.max(element.scrollWidth || element.offsetWidth, element.clientWidth || 0);
  const elementHeight = Math.max(element.scrollHeight || element.offsetHeight, element.clientHeight || 0);

  const canvas = await html2canvas(element, {
    scale: Math.max(2, window.devicePixelRatio || 2),
    useCORS: true,
    backgroundColor: '#ffffff',
    width: elementWidth,
    height: elementHeight,
    windowWidth: elementWidth,
    windowHeight: elementHeight,
    scrollY: -window.scrollY,
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const availableWidth = pdfWidth - margin * 2;
  const availableHeight = pdfHeight - margin * 2;
  const scale = availableWidth / canvas.width;
  const fullHeight = canvas.height * scale;

  const imgData = canvas.toDataURL('image/png');

  if (fullHeight <= availableHeight) {
    pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, fullHeight);
    return pdf.output('blob');
  }

  // If content is taller than a single page, scale it down to fit on one page
  const shrink = availableHeight / fullHeight; // < 1
  const finalWidth = availableWidth * shrink;
  const finalHeight = availableHeight; // fullHeight * shrink
  // center horizontally by calculating left margin
  const left = margin + (availableWidth - finalWidth) / 2;

  pdf.addImage(imgData, 'PNG', left, margin, finalWidth, finalHeight);
  return pdf.output('blob');
};

export const downloadPdf = async (element, billNumber) => {
  const pdfBlob = await generateReceiptPdf(element, billNumber);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Taxi_Receipt_${billNumber}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
