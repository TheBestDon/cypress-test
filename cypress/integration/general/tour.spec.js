/* eslint-disable no-undef */

describe('Make sure site loads', () => {
  beforeEach(() => {
    const API_KEY = Cypress.env('REACT_APP_MOVIE_API')
      const moviesApiURL = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=${API_KEY}`
      const configURL = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
      cy.intercept( moviesApiURL, {
        fixture: "moviesList"
      } )
      cy.intercept( configURL, {
        fixture: "config"
      } )
    cy.visit('http://localhost:3000');
    // cy.login()
})

  it('should load', () => {
    cy.contains('Filter');
    cy.findAllByTestId('movies-list-movie')
      .first()
      .then(($movie) => {
        const movieUrl = $movie.attr('href');
        cy.get('[data-testid=movies-list-movie]').first().click();
        cy.url().should('include', movieUrl);
      });

    expect(true).to.equal(true);
  });
  it('correct number of movies', () => {
    cy.findAllByTestId('movies-list-movie').should('have.length', 20);
    cy.fixture('moviesList').then((jsonData) => {
      expect(jsonData.results[0].title).to.eq('Raya and the Last Dragon')
    })
  });
});
