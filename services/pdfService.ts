// Fix: Import React to resolve the 'Cannot find namespace 'React'' error.
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper function to add a footer to each page
const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    doc.setFontSize(8);
    doc.setTextColor(192, 192, 192); // Silver color for footer text
    const footerText = `MEMBER ACCESS | Page ${pageNumber} of ${totalPages}`;
    const textWidth = doc.getStringUnitWidth(footerText) * doc.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(footerText, (pageWidth - textWidth) / 2, doc.internal.pageSize.getHeight() - 10);
};

export const exportToPdf = async (elementRef: React.RefObject<HTMLDivElement>, fileName: string): Promise<void> => {
    const input = elementRef.current;
    if (!input) {
        console.error("Element to export not found!");
        return;
    }

    // Create a clone of the element to modify its styles for printing
    const clone = input.cloneNode(true) as HTMLElement;
    
    // Get the current theme's primary background color for a solid background
    const backgroundColor = getComputedStyle(document.body).getPropertyValue('--color-bg-primary').trim() || '#0a0a0a';

    // Apply print-friendly styles to the clone
    clone.style.padding = '20px'; // Ensure there's padding
    clone.style.background = backgroundColor;
    // Ensure the clone doesn't have a fixed width that might conflict with the PDF page
    clone.style.width = 'auto'; 
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: backgroundColor,
        logging: false,
    });
    
    // Remove the clone from the DOM after canvas is created
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4', // A standard page size
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calculate the aspect ratio to fit the image onto the PDF page
    const ratio = canvasWidth / pdfWidth;
    const imgHeight = canvasHeight / ratio;
    
    let heightLeft = imgHeight;
    let position = 0;
    let page = 1;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Calculate total pages
    const totalPages = Math.ceil(imgHeight / pdfHeight);

    // Add footer to the first page
    addFooter(pdf, page, totalPages);

    // Add new pages if content overflows
    while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        page++;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        addFooter(pdf, page, totalPages);
        heightLeft -= pdfHeight;
    }

    pdf.save(`${fileName}.pdf`);
};