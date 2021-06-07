import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import SetEmailModel from '../../models/Email/SetEmailModel';
import debugLib from 'debug';
import {
    Transporter,
    SendMailOptions,
    createTransport
} from "nodemailer";

const logger = debugLib('yck:emailService');

export default class EmailService {

    private static transporter: Transporter;

    public static async set (options: SetEmailModel): Promise<any> {
        return new Promise ((resolve, reject) => {
            let mailConfig: any;
            if(options.environment === "production"){
                const myOAuth2Client = new OAuth2(
                    options.googleEmail?.idEmail,
                    options.googleEmail?.secretEmail
                )
                myOAuth2Client.setCredentials ({
                    refresh_token: options.googleEmail?.tokenEmail
                });
                const myAccessToken = myOAuth2Client.getAccessToken();
                mailConfig = {
                    service: "gmail",
                    secure: true,
                    requireTLS: true,
                    secured: true,
                    auth: {
                        type: "OAuth2",
                        user: options.googleEmail?.userEmail,
                        clientId: options.googleEmail?.idEmail,
                        clientSecret: options.googleEmail?.secretEmail,
                        refreshToken: options.googleEmail?.tokenEmail,
                        accessToken: myAccessToken
                    }
                };
            }else if(options.environment === "development" || "test"){
                mailConfig = {
                    host: options.etherealEmail?.etherealHost,
                    port: options.etherealEmail?.etherealPort,
                    requireTLS: true,
                    secured: true,
                    auth: {
                        user: options.etherealEmail?.etherealUser,
                        pass: options.etherealEmail?.etherealPwd
                    }
                };
            }
            this.transporter = createTransport(mailConfig);
            this.transporter.verify((err, success) => {
                if(err){
                    logger('Error connecting to server email, ERROR - %o', err);
                    reject(err);
                }else{
                    logger('Server is ready to take our messages: %o', success);
                    resolve(this.transporter);
                }
            })
        })
    }

    public static async send (options: SendMailOptions): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.transporter.sendMail(options, (err, info) => {
                this.transporter.close();
                if(err){
                    logger('Error to send email, ERROR - %o', err);
                    reject(err);
                }else{
                    logger('Email sent successfully, INFO - %o', info);
                    resolve(info);
                }
            })
        })
    }
}
