class HomePage {
    constructor(page){
        this.page = page
        this.registerLink = page.locator("a.ico-register")
        this.loginLink = page.locator("a.ico-login")
        this.searchBox=page.locator("#small-searchterms")
        this.searchButton = page.locator("input.search-box-button")
    }

    async open(){
        await this.page.goto('/')
    }
    async goToRegister(){
        await this.registerLink.click()
    }
    async goToLogin(){
        await this.loginLink.click()
    }
    async search(keyword){
        await this.searchBox.click()
        await this.searchBox.fill(keyword)
        const [response]= await Promise.all([
            this.page.waitForResponse((res)=> res.url().include('/search?')),
            this.searchButton.click()
         ])
         return response

    }
}

module.exports={HomePage}