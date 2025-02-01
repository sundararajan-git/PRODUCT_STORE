import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import the all tempaltes
import { forgotPasswordTemplate, resetSuccessTemplate, sendWelcomeTemplate, verificationTemplate } from "../emailtemplates/template.js";

//  config the env values
dotenv.config();


// create class for all email send option
class MailService {

    constructor() {
        // common traansport for sender auth
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_SENDER_KEY
            }
        }),
            this.from = process.env.EMAIL_SENDER
    }


    // email verifiaction template
    async sendVerificationMail(to, subject, verificationToken) {

        // mail info
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: verificationTemplate(verificationToken)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }
    }

    // verify the token 
    async sendWelcomeCall(to, subject, name) {

        // mail info
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: sendWelcomeTemplate(name)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

    // forgot password email 
    async forgotPassword(to, subject, link) {

        // mail info
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: forgotPasswordTemplate(link)
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

    // update password successfull 
    async passwordRestSuccess(to, subject) {

        // mail info
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: resetSuccessTemplate()
        }

        try {
            await this.transporter.sendMail(mailOptions)
        } catch (err) {
            throw new Error(err)
        }

    }

}

//  export the created object
export default new MailService()


