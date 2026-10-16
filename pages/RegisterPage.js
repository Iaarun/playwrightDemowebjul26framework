class RegisterPage{
    constructor(page){
        this.page = page
        this.genderMale = page.locator("#gender-male")
        this.genderFemale = page.locator("#gender-female")
        this.firstName
        this.lastName
        this.email
        this.password
        this.confirmPassword
        this.registerButton
    }

    async selectGender(gender){
     const radio= gender.toLowerCase()=== 'female'? this.genderFemale:this.genderMale
     await radio.click()
     return radio
    }

    async fillDetails(firstName, lastName, email){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)

    }

    async fillPassword(password, confirmpassword){
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmpassword)

    }

    async submit(){
        await this.registerButton.click()
    }

    async register(gender, firstName, lastName, email, password, confirmpassword){
        await this.selectGender(gender)
        await this.fillDetails(firstName, lastName, email)
        await this.fillPassword(password, confirmpassword)
        await this.submit()

    }
}

module.exports={RegisterPage}