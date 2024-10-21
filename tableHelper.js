  Cypress.Commands.add("check_table_values_for_the_new_item", (textValueInTh, expectedValueBellowTh) => {
    cy.get('th')
      .filter((index, element) => {
        const thText = Cypress.$(element).text().trim();
        return thText === textValueInTh; // Filter based on exact match of the text
      })
      .invoke('index') // Get the index of the element
      .then((indexLocOfOurValue) => {
        cy.get('tbody') // Find the tbody element
          .find('tr')
          .first() // Find the first tr elements within tbody
          .find('td') // Find the td elements within the first tr
          .eq(indexLocOfOurValue) // Select the td element at the same index as the "textValueInTh" 
          .then((td) => {
            const tdText = td.text().trim().replace(/\sWORDtoREPLACE/g, ''); 
            cy.log(tdText);
            expect(tdText).to.eq(expectedValueBellowTh);
          });
      });
  });

  Cypress.Commands.add("check_table_values", (textValueInTh, expectedValueBellowTh, trIndex) => {
    cy.get('th')
      .filter((index, element) => {
        const thText = Cypress.$(element).text().trim();
        return thText === textValueInTh; // Filter based on exact match of the text
      })
      .invoke('index') // Get the index of the element
      .then((indexLocOfOurValue) => {
        cy.get('tbody') // Find the tbody element
          .find('tr')
          .eq(trIndex) // Select the specified tr index
          .find('td') // Find the td elements within the selected tr
          .eq(indexLocOfOurValue) // Select the td element at the same index as the "textValueInTh" 
          .then((td) => {
            const tdText = td.text().trim().replace(/\sWORDtoREPLACE/g, ''); 
            cy.log(tdText);
            expect(tdText).to.eq(expectedValueBellowTh);
          });
      });
  });

  Cypress.Commands.add("check_table_values_for_the_new_item_plus_selectors", (selectorForTH, selectorForTABLE, textValueInTh, expectedValueBellowTh) => {
    cy.contains(selectorForTH, textValueInTh, { matchCase: true, exactMatch: true }) // Find the specified text within thead
     .invoke('index')            // Get the index of the element
     .then((indexLocOfOurValue) => {
      cy.get(selectorForTABLE)            // Find the tbody element
       .find('tr')              
       .first()       				// Find the first tr elements within tbody
       .find('td')            // Find the td elements within the first tr
       .eq(indexLocOfOurValue)       // Select the td element at the same index as the "textValueInTh" 
       .then((td) => {
        const tdText = td.text().trim().replace(/\sWORDtoREPLACE/g, ''); 
        cy.log(tdText);
        expect(tdText).to.eq(expectedValueBellowTh);
      });
     });
    })
