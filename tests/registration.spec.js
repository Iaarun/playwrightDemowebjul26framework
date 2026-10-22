const {test, expect} = require('@playwright/test')
const {HomePage}= require('../pages/HomePage')
const {RegisterPage}= require('../pages/RegisterPage')
const registrationData = require('../testdata/registrationData.json')
const { uniqueEmail } = require('../utility/datahelper')
const logger = require('../utility/logger')
const testEnvironment = process.env.TEST_ENV.toUpperCase()

test.describe("Registration Test Suit",()=>{
      test.beforeEach(async ({}, testInfo)=>{
        logger.info(`Starting test: ${testInfo.title}`, testEnvironment)
      })

      test.afterEach(async ({}, testInfo)=>{
        if (testInfo.status === 'passed') {
          logger.info(`Test passed: ${testInfo.title}`, testEnvironment)
        } else {
          logger.error(
            `Test ${testInfo.status}: ${testInfo.title}${testInfo.error ? ` - ${testInfo.error.message}` : ''}`,
            testEnvironment
          )
        }
      })

      for(const data of registrationData){
        test(`[${testEnvironment}] ${data.testCaseId} - ${data.title}`, async({page})=>{
          test.info().annotations.push({
            type: 'environment',
            description: testEnvironment
          })
          const home= new HomePage(page)
          const register = new RegisterPage(page)
          const email = uniqueEmail(data.email)
         logger.info('Opening the application home page')
         await home.open()
         await test.step("1.Click on the 'Register' link in the top navigation header.",async()=>{
                   logger.info('Opening the registration page')
                   await home.goToRegister()
                   await expect(register.firstName).toBeVisible()
                   await expect(register.registerButton).toBeVisible()
         })

         await test.step("2. Slect Gender radio button (Male)",async()=>{
           logger.info(`Selecting gender: ${data.gender}`)
           const radio =  await register.selectGender(data.gender)
           await expect(radio).toBeChecked()
         })

         await test.step("3.Enter 'First Name', 'Last Name', and a unique 'Email' address.",async()=>{
          logger.info('Entering registration details')
          await register.fillDetails(data.firstName, data.lastName, email)
          await expect(register.firstName).toHaveValue(data.firstName)
          await expect(register.lastName).toHaveValue(data.lastName)
          await expect(register.email).toHaveValue(data.email)
         })

         await test.step("4.Enter 'Password' and re-enter in 'Confirm Password'.",async()=>{
          logger.info('Entering password fields')
          await register.fillPassword(data.password, data.confirmPasssword )
         })

         await test.step("5.Click on the 'Register' button.",async()=>{
           logger.info('Submitting the registration form')
           await register.submit()
           expect(register.registerMessage).toHaveText(data.expectedMessage)
           expect(home.accountLink).toHaveText(email)
         })

        })
      }
})