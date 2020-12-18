describe("AppTest", () => {

    it(`BudgetAppTest`, function () {
        cy.visit('http://204.48.20.8:8282');
  
        cy.eyesOpen({
            appName: 'Budget App',
            testName: 'Budget App Demo',
        })

        cy.eyesCheckWindow({
            tag: "Login Window",
            target: 'window',
            fully: true
        });

        cy.get('[name=username]').focus().blur();

        cy.wait(1000);

        cy.get('[name=password]').focus().blur();

        cy.wait(2000);

        cy.get('[name=username]').type('%$&$%^&%^');

        cy.wait(2000);

        cy.get('[name=username]').clear();

        cy.get('[name=username]').type('don');

        cy.wait(1000);

        cy.get('[name=password]').type('test123');

        cy.wait(2000);
  
        cy.get('.btn-primary').click();

        cy.wait(2000);

        cy.get('[name=username]').clear();

        cy.wait(1000);

        cy.get('[name=password]').clear();

        cy.wait(1000);

        cy.get('[name=username]').type('dontest');

        cy.wait(1000);

        cy.get('[name=password]').type('test123');

        cy.wait(1000);

        cy.get('.btn-primary').click()

        cy.wait(1000);

        cy.eyesCheckWindow({
            tag: "Home Window",
            target: 'window',
            fully: true
        });
  
        cy.eyesClose();

    });
  
  });