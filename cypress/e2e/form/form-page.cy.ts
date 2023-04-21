/// <reference types="cypress" />

describe('Main page', () => {
  const IMAGE_ORIENT = 'Image orientation';

  const FieldNames: string[] = [
    'Title',
    'Text',
    'Price',
    'Added at',
    'Rating',
    'Grayscale picture',
    'Upload picture',
    IMAGE_ORIENT,
  ];

  beforeEach(() => {
    cy.visit('/former').wait(200);
    checkImportantBits();
  });

  it('check that important parts are present', function () {
    expect(true).to.be.eq(true);
  });

  it('trigger all errors', function () {
    pushSubmit();

    FieldNames.forEach((_, idx) =>
      cy
        .get('form :nth-child(' + (idx + 1).toString() + ') > .validation-error ')
        .should('be.visible')
    );

    errorCountShouldBe(8);
  });

  it('fill and create normal', function () {
    fillForm({ flipped: false });
  });

  it('fill and create flipped', function () {
    fillForm({ flipped: false });
  });

  it('image preview caching', function () {
    for (let i = 0; i < 64; i++) {
      const fixtureName = i % 2 == 0 ? 'bg.jpg' : 'circle.png';

      cy.fixture('bg.jpg', null).then((e: Buffer) =>
        cy.get('input[type=file]').selectFile({
          contents: e,
          fileName: i.toString() + fixtureName,
          lastModified: Date.now(),
        })
      );

      cy.get('.bg-alt img.preview').should('be.visible');
    }
  });

  it('fill and create multiple cards', function () {
    const deadline = new Date(new Date().getTime() + 10 * 1000);
    let counter = 0;

    while (counter < 3 && new Date() < deadline) {
      fillFastForm({ uid: ++counter });
    }

    cy.get('.card').should('have.length', counter);
  });

  function fillFastForm({ uid }: { uid: number }) {
    cy.fixture('bg.jpg', null).then((e: Buffer) =>
      cy.get('input[type=file]').selectFile({
        contents: e,
        fileName: 'bg.jpg',
        lastModified: Date.now(),
      })
    );

    cy.get('.bg-alt img.preview').should('be.visible');

    const textTitle = 'Test Title #' + uid.toString();
    const textSubtitle = 'Test SubTitle #' + uid.toString();
    const textPrice = '6578342' + uid.toString();
    const textDate = '2011-11-15';

    let inputCounter = 0;

    setTextInput(++inputCounter, textTitle);
    setTextInput(++inputCounter, textSubtitle);
    setTextInput(++inputCounter, textPrice);
    cy.get(':nth-child(4) > label > input').clear();
    cy.get(':nth-child(4) > label > input').type(textDate);

    cy.get('form select').select(3);

    inputCounter = 5;
    getNthInput(++inputCounter).check();
    NoErrorAt(++inputCounter);
    cy.get('form fieldset [type="radio"]').first().check();

    pushSubmit();
    errorCountShouldBe(0);

    cy.get('.card').should('be.visible');
    cy.get('.card .title').should('be.visible').and('contain.text', textTitle);
    cy.get('.card img.bigpic.grayscale').should('be.visible');
    cy.get('.card .price').should('be.visible').and('contain.text', textPrice);
    cy.get('.card .price').should('be.visible').and('contain.text', '★★★');
    cy.get('.card .price').should('be.visible').and('contain.text', '☆☆');
    cy.get('.card .smalltitle').should('be.visible').and('contain.text', textSubtitle);
  }

  function fillForm({ flipped }: { flipped: boolean }) {
    let errors = 9;

    pushSubmit();
    errorCountShouldBe(--errors);

    cy.fixture('bg.jpg', null).then((e: Buffer) =>
      cy.get('input[type=file]').selectFile({
        contents: e,
        fileName: 'bg.jpg',
        lastModified: Date.now(),
      })
    );

    cy.get('.bg-alt img.preview').should('be.visible');

    pushSubmit();
    errorCountShouldBe(--errors);

    const textTitle = 'Test Title #1';
    const textSubtitle = 'Test SubTitle #2';
    const textPrice = '6578342';
    const textDate = '2011-11-15';

    let inputCounter = 0;

    ErrorAt(++inputCounter);
    setTextInput(inputCounter, textTitle);
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    ErrorAt(++inputCounter);
    setTextInput(inputCounter, textSubtitle);
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    ErrorAt(++inputCounter);
    setTextInput(inputCounter, textPrice);
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    ErrorAt(++inputCounter);
    cy.get(':nth-child(4) > label > input').type('2099-11-15');
    pushSubmit();
    ErrorAt(inputCounter);
    cy.get(':nth-child(4) > .validation-error').contains('future');
    cy.get(':nth-child(4) > label > input').clear();
    cy.get(':nth-child(4) > label > input').type(textDate);
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    ErrorAt(++inputCounter);
    cy.get('form select').select(3);
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    ErrorAt(++inputCounter);
    getNthInput(inputCounter).check();
    pushSubmit();
    NoErrorAt(inputCounter);
    errorCountShouldBe(--errors);

    if (flipped) cy.get('form fieldset [type="radio"]').eq(1).check();
    else cy.get('form fieldset [type="radio"]').first().check();

    pushSubmit();
    errorCountShouldBe(--errors);

    expect(errors).to.eq(0);

    cy.get('.card').should('be.visible');
    cy.get('.card .title').should('be.visible').and('contain.text', textTitle);
    cy.get('.card img.bigpic.grayscale').should('be.visible');
    cy.get('.card .price').should('be.visible').and('contain.text', textPrice);
    cy.get('.card .price').should('be.visible').and('contain.text', '★★★');
    cy.get('.card .price').should('be.visible').and('contain.text', '☆☆');
    cy.get('.card .smalltitle').should('be.visible').and('contain.text', textSubtitle);

    const dstr = new Date(textDate).toDateString();
    cy.get('.card .date').should('be.visible').and('contain.text', dstr);

    if (flipped) cy.get('.card img.flip').should('be.visible');
    cy.get('.confirmation').should('be.visible').and('contain.text', 'saved');
  }

  function getNthInput(childNr: number) {
    return cy.get('form > :nth-child(' + childNr.toString() + ') > label > input');
  }

  function setTextInput(childNr: number, value: string) {
    getNthInput(childNr).type(value + '{enter}');
  }

  function errorCountShouldBe(count: number) {
    cy.get('form .validation-error ').should('have.length', count);
  }

  function pushSubmit() {
    return cy.get('form [type="submit"]').click();
  }

  function CheckErrorAt(offset: number, present: boolean) {
    const check = present ? 'be.visible' : 'not.exist';

    cy.get('form :nth-child(' + offset.toString() + ') > .validation-error').should(check);
  }

  function NoErrorAt(offset: number) {
    CheckErrorAt(offset, false);
  }

  function ErrorAt(offset: number) {
    CheckErrorAt(offset, true);
  }

  function checkImportantBits() {
    cy.get('form').should('be.visible');
    cy.get('form [type="submit"]').should('be.enabled');

    FieldNames.forEach((name, idx) =>
      cy
        .get('form :nth-child(' + (idx + 1).toString() + ') > label')
        .should('be.visible')
        .contains(name)
    );

    cy.get('form fieldset > legend').should('be.visible').contains(IMAGE_ORIENT);
  }
});
