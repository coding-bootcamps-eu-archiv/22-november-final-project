describe("Quiz App", () => {
  it("passes", () => {
    cy.visit("https://quiz-app-cbe.netlify.app/");
  });
  beforeEach(() => {
    cy.visit("https://quiz-app-cbe.netlify.app/");
  });
  it.only("completes one entire quiz round, checks results and starts over", () => {
    //EntryPage
    cy.contains("5").click();
    cy.contains("HTML and CSS").click();
    cy.get(".play-btn").click();

    //GamePage
    //Question 1
    cy.get("label[for='1']").click();
    cy.get(".next-btn").click();
    //Question 2
    cy.get("label[for='1']").click();
    cy.get(".next-btn").click();
    //Question 3
    cy.get("label[for='1']").click();
    cy.get(".next-btn").click();
    //Question 4
    cy.get("label[for='1']").click();
    cy.get(".next-btn").click();
    //Question 5
    cy.get("label[for='1']").click();
    cy.get(".next-btn").click();

    //Result Page
    //Check result
    cy.contains("right").click();
    cy.get(".result-answer-info_right").should("be.visible");
    cy.contains("wrong").click();
    cy.get(".result-answer-info_wrong").should("be.visible");

    //Start new game
    cy.get(".new-btn").click();
    cy.url().should("eq", "https://quiz-app-cbe.netlify.app/");
  });
  it("checks for a disbaled button when no answer is selected", () => {
    //EntryPage
    cy.contains("5").click();
    cy.contains("HTML and CSS").click();
    cy.get(".play-btn").click();
    cy.get(".next-btn").should("be.disabled");

    //check and uncheck answer
    cy.get("label[for='1']").click();
    cy.get("label[for='1']").click();
    cy.get(".next-btn").should("be.disabled");
  });
});
