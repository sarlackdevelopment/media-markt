import { ENDPOINT } from '../support/config';
import { aliasQuery, hasOperationName } from "../utils/graphql-test-utils";

describe('e2e issues tests', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
            aliasQuery(req, 'Issues');
            aliasQuery(req, 'Issue');
        });
    });
    it('route issues', () => {
        cy.visit(ENDPOINT);
        cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
            if (hasOperationName(req, 'Issues')) {
                req.alias = 'getIssues'
                req.reply({ fixture: 'issues.json' });
            } else if (hasOperationName(req, 'Issue')) {
                req.alias = 'getIssue'
                req.reply({ fixture: 'issue.json' });
            }
        })
        cy.wait('@getIssues').then(() => {
            cy.get('[data-testid=issue-list-number-10]').should('be.exist');
            cy.get('[data-testid=issue-list-number-10]').contains('Can\'t require() react-tools module');
            cy.get('[data-testid=issue-list-number-10]').click(() => {
                cy.wait('@getIssue').then(() => {
                    cy.get('[data-testid=issue-list-id-MDU6SXNzdWUxNDkyMzk2OA==]').should('be.exist');
                    cy.get('[data-testid=issue-list-id-MDU6SXNzdWUxNDkyMzk2OA==]').contains('Can\'t require() react-tools module');
                });
            })
        });
    });
});
