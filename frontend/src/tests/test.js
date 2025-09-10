const { Builder, By, until } = require("selenium-webdriver");
const { describe, it, before, after } = require("mocha");
require("chromedriver");

describe("Trip Ticket Reservation System - Auth Tests", function () {
  this.timeout(30000);

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("should register a new user and redirect to login page", async () => {
    await driver.get("http://localhost:3000/register");
    await driver.findElement(By.name("fullname")).sendKeys("Test User");
    await driver.findElement(By.name("email")).sendKeys("testuser@example.com");
    await driver.findElement(By.name("username")).sendKeys("testuser123");
    await driver.findElement(By.name("password")).sendKeys("Password123!");
    await driver
      .findElement(By.name("repeatPassword"))
      .sendKeys("Password123!");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains("/login"), 5000);
  });

  it("should log in and redirect to homepage", async () => {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("email")).sendKeys("testuser@example.com");
    await driver.findElement(By.name("password")).sendKeys("Password123!");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains("/homepage"), 5000);
  });

  it("should search for tickets and show results page", async () => {
    await driver.get("http://localhost:3000/homepage");
    await driver.findElement(By.name("departure")).sendKeys("Sarajevo");
    await driver.findElement(By.name("arrival")).sendKeys("Mostar");
    await driver.findElement(By.name("date")).sendKeys("2025-09-20");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains("/search"), 5000);
  });

  it("should open trip details modal from search results", async () => {
    await driver.get(
      "http://localhost:3000/search?departure=Sarajevo&arrival=Mostar&date=2025-09-20"
    );
    await driver.findElement(By.css("button.view-details")).click();
    await driver.wait(
      until.elementLocated(By.css(".trip-details-modal")),
      5000
    );
  });

  it("should reserve a ticket and receive confirmation", async () => {
    await driver.findElement(By.css("button.reserve-ticket")).click();
    await driver.wait(until.elementLocated(By.css(".toast-success")), 5000);
  });

  it("should navigate to profile and view reserved tickets", async () => {
    await driver.get("http://localhost:3000/profile");
    await driver.wait(until.elementLocated(By.css(".ticket-card")), 5000);
  });

  it("should cancel a reserved ticket", async () => {
    await driver.get("http://localhost:3000/profile");
    await driver.findElement(By.css("button.cancel-ticket")).click();
    await driver.findElement(By.css("button.confirm-cancel")).click();
    await driver.wait(until.elementLocated(By.css(".toast-success")), 5000);
  });

  it("should log out successfully and redirect to login page", async () => {
    await driver.findElement(By.css("button.logout")).click();
    await driver.wait(until.urlContains("/login"), 5000);
  });
});
