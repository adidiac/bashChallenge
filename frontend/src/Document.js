
import { Document, Page } from 'react-pdf';
import {useState} from 'react';
// Create Document Component
export default function MyDocument () {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return   <div>
  <Document file="example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
    <Page pageNumber={pageNumber} />
  </Document>
  <p>
    Page {pageNumber} of {numPages}
  </p>
</div>
}