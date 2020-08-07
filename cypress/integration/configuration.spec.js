describe("Slide battle configuration's page", () => {

    beforeEach(() => {
        cy.reload();
    });

    it('is working', () => {
        expect(true).to.equal(true);
    });

    it('visits the side-battle app', () => {
        cy.visit('/');
    });

    it(".click() - click on configuration's link", () => {
        cy.get('[href="/config"]').click();
    });

    it("Check if 2 lists are loaded", () => {
        cy.get('.row > div.col-md-6').should('have.length', 2);
    });

    describe('Topics', () => {
        it("Check if <h1> constain 'thèmes'", () => {
            cy.get('.row > div.col-md-6 h1').contains('thèmes');
        });

        it("Check if 'thèmes''s list have 4 elements", () => {
            cy.get('.topics-container > .container li').should('to.have', 4);
        });

        it("Add button e2e tests", () => {
            const container = '.topics-container > .container';
            cy
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 1)
                .get(container + ' > input[type="text"]')
                .type('New série')
                .should('have.value', 'New série')
                .type('{enter}')
                .window().its('store').then((store) => {
                    expect(store.topics).to.be.a('array').and.be.length(5);
                })
                .get(container + ' li').should('be.length', 5)
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 1)
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('have.class', 'error')

                .get(container + ' > [aria-label="remove"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 0);
        });

        it("Delete button", () => {
            const container = '.topics-container > .container';
            cy
                .get(container + ' button[aria-label="delete"]').eq(1).click()
                .get(container + ' li').should('be.length', 3)
                .get(container + ' li').find('Cinéma').should('be.length', 0);

        });

        it("Check items", () => {
            cy
                .get('.topics-container > .container input[type="checkbox"]').eq(1).check().should('be.checked')
                .window().its('store').then((store) => {
                    expect(store.selectedTopics).to.be.a('array').and.be.length(1).and.contain('Cinéma');
                })
                .get('.topics-container > .container input[type="checkbox"]').eq(3).check().should('be.checked')
                .window().its('store').then((store) => {
                    expect(store.selectedTopics).to.be.a('array').and.be.length(2).and.contains('Cinéma', 'Series US');
                });
        });
    });

    describe('Players', () => {
        it("Check if <h1> constain 'joueurs'", () => {
            cy.get('.row > div.col-md-6 h1').contains('joueurs');
        });

        it("Check if 'joueurs''s list have 4 elements", () => {
            cy.get('.players-container > .container li').should('to.have', 4);
        });

        it("Add button e2e tests", () => {
            const container = '.players-container > .container';
            cy
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 1)
                .get(container + ' > input[type="text"]')
                .type('New série')
                .should('have.value', 'New série')
                .type('{enter}')
                .get(container + ' li').should('be.length', 5)
                .window().its('store').then((store) => {
                    expect(store.players).to.be.a('array').and.be.length(5);
                })
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 1)
                .get(container + ' > [aria-label="add"]').click()
                .get(container + ' > input[type="text"]').should('have.class', 'error')

                .get(container + ' > [aria-label="remove"]').click()
                .get(container + ' > input[type="text"]').should('be.length', 0);
        });

        it("Delete button", () => {
            const container = '.players-container > .container';
            cy
                .get(container + ' button[aria-label="delete"]').eq(1).click()
                .get(container + ' li').should('be.length', 3)
                .get(container + ' li').find('Cinéma').should('be.length', 0);
        });
    });

    describe('Back to home', () => {
        it(".click() - back to home", () => {
            cy.get('.Header a[href="/"]').click();
        });
    });
});