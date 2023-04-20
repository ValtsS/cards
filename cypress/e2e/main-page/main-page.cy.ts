/// <reference types="cypress" />

const SEARCH_CAPTION = 'Enter search query';

const TEXT_SORT_BUTTON = 'Push to sort by price!';
const TEXT_PAGE_LEFT = '«';
const TEXT_PAGE_RIGHT = '»';

describe('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check that important parts are present', function () {
    checkImportantBits();
    validateLoadedCardCount();
  });

  function checkImportantBits() {
    cy.get('.search-container div').should('contain.text', SEARCH_CAPTION);
    cy.get('.search-container input[type="text"]').should('have.length', 1).and('be.enabled');
    const submit = cy.get('.search-container button').should('have.length', 1).and('be.enabled');
    submit.should('contain.text', 'Search');
    submit.should('have.length', 1);

    cy.get('.buttonland > button').and('contain.text', TEXT_SORT_BUTTON).and('be.enabled');

    cy.get('.buttonland > button').and('contain.text', TEXT_PAGE_LEFT).and('be.disabled');
    cy.get('.buttonland > button').should('exist').and('contain.text', TEXT_PAGE_RIGHT);
  }

  it('it should list some cards on load', function () {
    checkImportantBits();
  });

  function validateLoadedCardCount(allowEmpty: boolean = false) {
    const minCount = allowEmpty ? 0 : 1;
    cy.get('.api-state-container > :nth-child(2)').should('contain.text', 'Total results');
    cy.get('.api-state-container > :nth-child(4)').should('contain.text', 'Limit');

    const totalResult = cy.get('.api-state-container > :nth-child(2) > span').should('exist');
    const valTotalResult = totalResult.invoke('text').then(parseInt).should('be.gte', minCount);

    const limitResult = cy.get('.api-state-container > :nth-child(4) > span').should('exist');
    const valLimitResult = limitResult.invoke('text').then(parseInt).should('be.gt', 0);

    valLimitResult.then((limit) => {
      valTotalResult.then((total) => {
        const shouldDisplay = Math.min(limit, total);
        cy.get('main .card-container > .card').should('have.length', shouldDisplay);
        cy.get('main .card-container > .card img').should('have.length', shouldDisplay);
      });
    });
  }
});
