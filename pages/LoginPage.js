class LoginPage{
    constructor(page){
        this.page=page
        this.email = page.locator("#Email")
        this.password = page.locator("#Password")
        this.loginButton = page.locator("input.login-button")
    }

    async login(email, password){
       await  this.email.fill(email)
       await this.password.fill(password)
       await this.loginButton.click()
    }

}