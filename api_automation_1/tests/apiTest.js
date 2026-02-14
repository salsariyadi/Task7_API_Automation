const { expect } = require("chai");

const baseURL = "https://belajar-bareng.onrender.com/api";

describe("API Automation Belajar Bareng", function () {

    this.timeout(10000); // 10 detik

    let token; // simpan token global

    // ==========================
    // LOGIN FIRST
    // ==========================
    before(async function () {

        const response = await fetch(`${baseURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: "admin",
                password: "admin"
            })
        });

        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.have.property("token");

        token = data.token; // simpan token
    });


    // ==========================
    // GET USERS (AUTHORIZED)
    // ==========================
    describe("GET Users", function () {

    it("Should get users list", async function () {

        const response = await fetch(`${baseURL}/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.have.property("status", 200);
        expect(data).to.have.property("users");
        expect(data.users).to.be.an("array");

    });

});

    // ==========================
    // POST POSITIVE
    // ==========================
    describe("POST Create User - Positive", function () {

    it("Should create new user successfully", async function () {

        const response = await fetch(`${baseURL}/add-user`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: "duabelas2",
                age: 25
            })
        });

        const data = await response.json();

        expect(response.status).to.equal(201);
        expect(data).to.have.property("status", 201);
        expect(data).to.have.property("userId");
        expect(data).to.have.property("username", "duabelas2");

    });

});

    // ==========================
    // POST NEGATIVE
    // ==========================
    describe("POST Create User - Negative", function () {

    it("Should fail when username is missing", async function () {

        const response = await fetch(`${baseURL}/add-user`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                age: 25
            })
        });

        const data = await response.json();

        expect(response.status).to.not.equal(201);

    });

});

});
