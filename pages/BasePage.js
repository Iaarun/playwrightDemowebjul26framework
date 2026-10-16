class BasePage{
    constructor(page){
        this.page=page
        this.notification= page.locator("#bar-notification")
    }

    async dismissNotification(){
       const closebutton=  this.notification.locator(".close")
       if(await closebutton.isVisible()){
        await closebutton.click()
       }
    }
}
module.exports = {BasePage}