const {test, expect} = require('@playwright/test')
const {HomePage}= require('../pages/HomePage')
const {RegisterPage}= require('../pages/RegisterPage')
const registrationData = require('../testdata/registrationData.json')

test.describe("Registration Test Suit",()=>{
      for(const data of registrationData){
        test(`${data.testCaseId} - ${data.title}`, async({page})=>{
          const home= new HomePage(page)
          const register = new RegisterPage(page)
         await home.open()
         await test.step("1.Click on the 'Register' link in the top navigation header.",async()=>{
                   await home.goToRegister()
                   await expect(register.firstName).toBeVisible()
                   await expect(register.registerButton).toBeVisible()
         })

        })
      }
})