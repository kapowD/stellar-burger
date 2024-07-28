beforeEach(function () {
  cy.fixture('ingredients.json').as('ingredients');
  cy.fixture('feed.json').as('feed');
  cy.fixture('user.json').as('user');
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  cy.intercept('POST', 'api/orders/all', { fixture: 'feed.json' }).as('feed');
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('user');
  cy.setCookie('accessToken', 'mockAccessToken');
  localStorage.setItem('refreshToken', 'mockRefreshToken');
  cy.visit('/');
  cy.wait(['@ingredients', '@user']);
  cy.get('#modals').should('be.empty');
});

describe('Конструктор бургеров', function () {
  it('проверка добавления булки', function () {
    cy.get('[data-cy=burger-constructor]').should('exist');
    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Краторная булка N-200i (верх)'
    );
    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Краторная булка N-200i (низ)'
    );
    cy.get('[data-cy="burger-constructor"]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.contains('Добавить').should('exist').click();
    cy.get('[data-cy=bun-top]').should('exist');
    cy.get('[data-cy=bun-bottom]').should('exist');
    cy.get('[data-cy=bun-top]').contains('Краторная булка N-200i (верх)');
    cy.get('[data-cy=bun-bottom]').contains('Краторная булка N-200i (низ)');
  });

  it('проверка добавления начинки', function () {
    cy.get('[data-cy=burger-constructor]').should('exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('проверка добавления соуса', function () {
    cy.get('[data-cy="burger-constructor"]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.contains('Соус Spicy-X')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('Модальные окна ингредиентов', function () {
  beforeEach(function () {
    cy.get('ul').find('[href^="/ingredients"]').first().click();
    cy.get('[data-cy=modal]').children().first().should('be.visible');
  });

  it('проверка открытия модального окна', function () {
    cy.get('[data-cy=modal]').should('be.visible');
  });

  it('проверка закрытия модального окна кликом на крестик', function () {
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('проверка закрытия модального окна нажатием на esc', function () {
    cy.get('body').type('{esc}');
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('проверка закрытия модального окна кликом по оверлею', function () {
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Оформление заказа', function () {
  beforeEach(function () {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.get('#modals').should('be.empty');
    cy.get('p').contains('Жак-ив Кусто').should('exist');
  });

  it('проверка процесса добавление ингредиентов для заказа и его оформление', function () {
    cy.get('[data-cy="burger-constructor"]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.contains('Соус Spicy-X')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('not.exist');
    cy.contains('Филе Люминесцентного тетраодонтимформа')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get('[data-cy="burger-constructor"]')
      .contains('Выберите булки')
      .should('not.exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Выберите начинку')
      .should('not.exist');
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@order');
    cy.get('#modals').should('not.be.empty');
    cy.get('#modals').find('h2').contains('1984').should('exist');
    cy.get('#modals').find('[data-cy="modal-close-button"]').click();
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');
  });
});
