/// <reference types="cypress" />

const SEARCH_CAPTION = 'Enter search query';

const TEXT_SORT_BUTTON = 'Push to sort by price!';
const TEXT_PAGE_LEFT = '«';
const TEXT_PAGE_RIGHT = '»';

describe('Main page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('getCards');
    cy.visit('/');
    waitForQuery();
  });

  it('check that important parts are present', function () {
    checkImportantBits();
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
    validateLoadedCardCount();
  });

  it('it should list some cards on load', function () {
    checkImportantBits();
    validateLoadedCardCount();
  });

  it('it should sort', function () {
    checkImportantBits();
    validateLoadedCardCount();
    checkApiSort('');

    getSortButton().should('be.enabled').click();
    waitForQuery();
    checkApiSort('↑Price');
    validatePriceOrder(true);

    getSortButton().should('be.enabled').click();
    waitForQuery();
    checkApiSort('↓Price');
    validatePriceOrder(false);
  });

  it('it should open on click', function () {
    checkImportantBits();
    validateLoadedCardCount();

    const firstCard = cy.get('main .card-container > .card').first().should('exist');
    firstCard.click();
    waitForQuery();

    cy.get('[data-testid="overlay-content"]').should('be.visible');

    cy.get(':nth-child(2) > .card .bigpic').should('be.visible');
    cy.get(':nth-child(2) > .card .minipic').should('be.visible');
    cy.get(':nth-child(2) > .card > .inner > .title').should('exist');
    cy.get(':nth-child(2) > .card > .inner > .smalltitle').should('exist');
    cy.get(':nth-child(2) > .card > .inner > .price').should('exist');
    cy.get(':nth-child(2) > .card > .inner > .date').should('exist');

    cy.get('.close').should('be.visible').click();
    cy.get('[data-testid="overlay-content"]').should('not.exist');
  });

  function getNextButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get('.buttonland > button:nth-child(3)')
      .should('exist')
      .and('contain.text', TEXT_PAGE_RIGHT);
  }

  function getPrevButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get('.buttonland > button:nth-child(2)')
      .should('exist')
      .and('contain.text', TEXT_PAGE_LEFT);
  }

  function getSortButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get('.buttonland > button:nth-child(1)')
      .should('exist')
      .and('contain.text', TEXT_SORT_BUTTON);
  }

  function checkApiSort(value: string): Cypress.Chainable<Chai.Assertion> {
    return sortState().then((val) => expect(val.trim()).to.be.eq(value));
  }

  function checkApiNext(value: string): Cypress.Chainable<Chai.Assertion> {
    return nextPageState().then((val) => expect(val.toUpperCase().trim()).to.be.eq(value));
  }

  function checkApiPrev(value: string): Cypress.Chainable<Chai.Assertion> {
    return prevPageState().then((val) => expect(val.toUpperCase().trim()).to.be.eq(value));
  }

  it('it should flip through pages', function () {
    checkImportantBits();
    validateLoadedCardCount();

    getPrevButton().should('be.disabled');
    getNextButton().should('be.enabled');
    checkApiPrev('');
    checkApiNext('YES');
    validateOffset(0);

    checkApiNext('YES');
    getNextButton().click();
    waitForQuery();

    getNextLimit().then((limit) => validateOffset(limit));

    checkApiPrev('YES');
    getPrevButton().should('be.enabled');
    getPrevButton().click().wait(50); // caching should work
    validateOffset(0);
  });

  function sortState(): Cypress.Chainable<string> {
    cy.get('.api-state-container > :nth-child(5)').should('contain.text', 'Sorting:');
    return cy.get('.api-state-container > :nth-child(5) > span').should('exist').invoke('text');
  }

  function nextPageState(): Cypress.Chainable<string> {
    cy.get('.api-state-container > :nth-child(7)').should('contain.text', 'Has Next?:');
    return cy.get('.api-state-container > :nth-child(7) > span').should('exist').invoke('text');
  }

  function prevPageState(): Cypress.Chainable<string> {
    cy.get('.api-state-container > :nth-child(6)').should('contain.text', 'Has Prev?:');
    return cy.get('.api-state-container > :nth-child(6) > span').should('exist').invoke('text');
  }

  function getNextLimit(): Cypress.Chainable<number> {
    cy.get('.api-state-container > :nth-child(4)').should('contain.text', 'Limit:');
    return cy
      .get('.api-state-container > :nth-child(4) > span')
      .should('exist')
      .invoke('text')
      .then(parseInt);
  }

  function validateOffset(offset: number) {
    cy.get('.api-state-container > :nth-child(3)').should('contain.text', 'Offset');
    const offsetChain = cy.get('.api-state-container > :nth-child(3) > span').should('exist');
    offsetChain.invoke('text').then(parseInt).should('be.eq', offset);
  }

  function validateLoadedCardCount(allowEmpty: boolean = false) {
    const minCount = allowEmpty ? 0 : 1;
    cy.get('.api-state-container > :nth-child(2)').should('contain.text', 'Total results');
    cy.get('.api-state-container > :nth-child(4)').should('contain.text', 'Limit');

    const { valLimitResult, valTotalResult } = getCards(minCount);

    valLimitResult.then((limit) => {
      valTotalResult.then((total) => {
        const shouldDisplay = Math.min(limit, total);
        cy.get('main .card-container > .card').should('have.length', shouldDisplay);
        cy.get('main .card-container > .card img').should('have.length', shouldDisplay);
        cy.get('main .card-container > .card .price').should('have.length', shouldDisplay);
      });
    });
  }

  function validatePriceOrder(ascending: boolean) {
    const { _: dollar } = Cypress;

    const { valLimitResult, valTotalResult } = getCards(2);

    valLimitResult.then((limit) => {
      valTotalResult.then((total) => {
        const shouldDisplay = Math.min(limit, total);
        const prices = cy
          .get('main .card-container > .card .price')
          .should('have.length', shouldDisplay);
        prices.then((p) => {
          const priceList = dollar
            .chain(p)
            .map((e) => e.textContent)
            .value()
            .filter((e) => e !== null)
            .map((e) => String(e).replace('$', ''))
            .map((e) => parseFloat(e));

          const isSorted = priceList.every((val, i, arr) => {
            if (i === 0) {
              return true;
            } else {
              return ascending ? val >= arr[i - 1] : val <= arr[i - 1];
            }
          });
          expect(isSorted).to.be.true;
        });
      });
    });
  }

  function getCards(minCount: number) {
    const totalResult = cy.get('.api-state-container > :nth-child(2) > span').should('exist');
    const valTotalResult = totalResult.invoke('text').then(parseInt).should('be.gte', minCount);

    const limitResult = cy.get('.api-state-container > :nth-child(4) > span').should('exist');
    const valLimitResult = limitResult.invoke('text').then(parseInt).should('be.gt', 0);
    return { valLimitResult, valTotalResult };
  }

  function waitForQuery() {
    cy.wait('@getCards').wait(50);
  }
});
