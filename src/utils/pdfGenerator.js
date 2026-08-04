import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPdf = async (element, billNumber) => {
  const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const availableWidth = pdfWidth - margin * 2;
  const availableHeight = pdfHeight - margin * 2;

  let imgWidth = availableWidth;
  let imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight > availableHeight) {
    imgHeight = availableHeight;
    imgWidth = (canvas.width * imgHeight) / canvas.height;
  }

  pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
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
