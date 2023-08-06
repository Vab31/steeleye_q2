function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  let highlightedHtml = htmlContent;

  for (const position of plainTextPositions) {

    const start = position.start;
    const end = position.end;

    const openTag = '<mark>';
    const closeTag = '</mark>';

    // const openingTagOffset = highlightedHtml.indexOf(plainText, start);
    // const closingTagOffset = highlightedHtml.indexOf(plainText, end) + plainText.length;
    
    const openingTagOffset = start;
    const closingTagOffset = end;
    console.log('start', start)
    console.log('end', end)

    if (openingTagOffset !== -1 && closingTagOffset !== -1) {
      highlightedHtml =
        highlightedHtml.slice(0, openingTagOffset) +
        openTag +
        highlightedHtml.slice(openingTagOffset, closingTagOffset) +
        closeTag +
        highlightedHtml.slice(closingTagOffset);
    }
  }

  return highlightedHtml;
}


// Jest unit tests
describe('highlightHTMLContent', () => {
  it('should highlight plain text correctly', () => {
    const htmlContent = '<p><span>Hi David<br>Headline: Energix Closes $520 Million Financing...</span></p>';
    const plainText = 'Headline';
    const plainTextPositions = [
      { start: 21, end: 29 }
    ];
    const expectedResult = '<p><span>Hi David<br><mark>Headline</mark>: Energix Closes $520 Million Financing...</span></p>';
    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedResult);
  });

  it('should handle multiple plain text positions', () => {
    const htmlContent = '<p><span>Hi David<br>Headline: Energix Closes $520 Million Financing...</span></p>';
    const plainText = 'Energix';
    const plainTextPositions = [
      { start: 31, end: 38 }
    ];
    const expectedResult = '<p><span>Hi David<br>Headline: <mark>Energix</mark> Closes $520 Million Financing...</span></p>';
    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedResult);
  });

 
});
