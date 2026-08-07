import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPdf = async (element, billNumber) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 6;
  const availableWidth = pdfWidth - margin * 2;
  const availableHeight = pdfHeight - margin * 2;

  const canvas = await html2canvas(element, {
    scale: Math.max(2, window.devicePixelRatio || 2),
    useCORS: true,
    backgroundColor: '#ffffff',
    width: 794,
    height: 1123,
    windowWidth: 794,
    windowHeight: 1123,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL('image/png');
  const scale = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
  const finalWidth = canvas.width * scale;
  const finalHeight = canvas.height * scale;
  const left = margin + (availableWidth - finalWidth) / 2;
  const top = margin + (availableHeight - finalHeight) / 2;

  pdf.addImage(imgData, 'PNG', left, top, finalWidth, finalHeight);
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
