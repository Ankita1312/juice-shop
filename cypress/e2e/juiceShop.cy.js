describe('OWASP Juice Shop Test Suite', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Pagination Functionality', () => {
    it('should show different items on different pages', () => {

      //Get the products from first Page
      cy.get('.product').then($products => {
        const firstPageProducts = $products.map((_, el) => el.innerText).get();
        cy.get('.mat-paginator-navigation-next').click();

        //Get the products from second page and comparing it
        cy.get('.product').then($newProducts => {
          const secondPageProducts = $newProducts.map((_, el) => el.innerText).get();
          expect(firstPageProducts).not.to.deep.equal(secondPageProducts);
        });
      });
    });
  });


  context('Change the number of items Per Page', () => {
    it('should list the correct number of items when changing the amount per page', () => {

      // Open the page size select dropdown
      cy.get('.mat-paginator-page-size-select').click();

      // Get all the page size options in dropdown
      cy.get('#mat-select-0-panel').find('.mat-option-text').then(options => {
        const pageSizes = [];

        // Extract the page size numbers
        options.each((index, option) => {
          const number = parseInt(option.innerText.trim(), 10);
          pageSizes.push(number);
        });

        // Test each page size option
        pageSizes.forEach((size) => {
          cy.get('mat-select#mat-select-0').click({ force: true });
          cy.get('div#mat-select-0-panel').contains(size.toString()).click({ force: true });

          // Check the number of products displayed and compare it to page size
          cy.get('.product').then((products) => {
            const maxSize = Math.max(...pageSizes);
            if (size === maxSize) {
              expect(products).to.have.length.of.at.most(size);
            } else {
              expect(products.length).to.equal(size);
            }
          });
        });
      });
    });
  });

  context('Language Change', () => {
    it('should adjust the header and sidebar menu labels when changing the language', () => {
      
      // Click the button to open the menu
      cy.get('button[aria-label="Language selection menu"]').click(); 
      cy.get('#mat-radio-6').click();
      cy.get('.heading').should('contain', 'Alle Produkte');
      cy.get('[aria-label="Open Sidenav"]').click()

      // Check that each expected label appears in the sidebar menu
      const expectedLabels = ['Kontakt', 'Unternehmen', 'Kundenfeedback'];
      expectedLabels.forEach(label => {
        cy.get('.mat-nav-list.mat-list-base').should('include.text', label);
      });
    });
  });

  context('Invalid Login', () => {
    it('should return an error message for invalid user/password combination', () => {
      cy.get('#navbarAccount').click();
      cy.get('#navbarLoginButton').click();
      cy.url().should('include', '/login');

      // Login with invalid credentials
      cy.get('#email').type('invalid@user.com');
      cy.get('#password').type('invalidpassword');
      cy.get('#loginButton').click();

      // Check for error
      cy.get('.error').should('contain', 'Invalid email or password.');
    });
  });

  context('Successful login Functionality', () => {
    it('should login successfully with correct credentials and show the response message', () => {
      cy.get('#navbarAccount').click();
      cy.get('#navbarLoginButton').click();
      cy.get('#email').type('admin@juice-sh.op');
      cy.get('#password').type('admin123');
      cy.get('#loginButton').click();

      // Verify successful login by checking the URL
      cy.url().should('include', '/search');
    });
  });

  context('Security test for vulnerability', () => {
    it('tests for XSS vulnerability in search', () => {
      const xssPayload = "<script>alert('XSS')</script>"
      cy.get('#searchQuery').type(`${xssPayload}{enter}`)

      cy.on('window:alert', (str) => {
        expect(str).to.equal('XSS')
      });
    });
  });


});