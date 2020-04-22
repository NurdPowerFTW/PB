/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();
var user =
{
    id: '',
    fName: chance.first(),
    lName: chance.last(),
    email: chance.email(),
    pwd: '123456',
    bio: chance.paragraph({ sentences: 1 }),
    linkedin: chance.url()

};

context('Front UI testing', () => {
    beforeEach(() => {
        // cy.visit('http://52.14.128.79/')
        cy.visit('http://localhost:3000')
    })

    describe('Welcome page', () => {
        it('welcome user in the correct page', () => {
            cy.location('pathname').should('eq', '/')
        })
    })

    describe('Complete sign-up & sign-in test', () => {

        it('it should take the user to sign up page', () => {

            cy.get('.MuiGrid-root > a > .MuiButtonBase-root').click();
            cy.location('pathname').should('eq', '/signUp');

            const gName = 'Codify-CS4000';
            cy.get('#gitHubUsername').type(gName);
            cy.get(':nth-child(11) > .MuiButtonBase-root').click();
            cy.get('#firstName').type(user.fName);
            cy.get('#lastName').type(user.lName);
            cy.get('#email').type(user.email);
            cy.get('#password').type(user.pwd);
            cy.get('#outlined-basic').type(user.bio);
            cy.get('#linkedInURL').type(user.linkedin);
            cy.get('.MuiFormGroup-root > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-341').click();
            cy.fixture('images/koptaPic.jpg').then(fileContent => {
                cy.get(':nth-child(9) > input').upload({ fileContent, fileName: 'images/koptaPic.jpg', mimeType: 'image/jpeg' });
            })


            cy.fixture('documents/resume.pdf').then(fileContent => {
                cy.get(':nth-child(8) > input').upload({ fileContent, fileName: 'documents/resume.pdf', mimeType: 'application/pdf' });

            })

            cy.get(':nth-child(12) > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-341').click();            // Submit formdata and complete sign up
            cy.get('.SignUp-submit-237').click();
            cy.location('pathname').should('eq', '/selectionPage');
            cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-480').click();
            // cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-480').click();
            // cy.get(':nth-child(5) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-480').click();
            cy.get('.SelectionPage-wrapper-371 > .MuiButtonBase-root').click();
            cy.wait(10000);
            cy.location('pathname').should('eq', '/uploadPage');
            cy.get('.UploadPage-wrapper-555 > .MuiButtonBase-root').click();



        })
    })

    // describe('click on sign in', () => {
    //     it('it should take the user to sign in page', () => {
    //         cy.get('.Welcome-signIn-5 > .MuiButtonBase-root').click();
    //         cy.location('pathname').should('eq', '/signIn')
    //         cy.get('#email').type(user.email);
    //         cy.get('#password').type(user.pwd);
    //         cy.get('.MuiButton-root').click();

    //     })
    // })
})

