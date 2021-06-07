import EmailService from '../../../src/services/Email/EmailService';
import * as dotenv from 'dotenv';
import * as chai from 'chai';

dotenv.config();
chai.should();

describe('Email service', () => {
    it('test method set email with development', async function () {
        await EmailService.set({
            environment: 'development',
            etherealEmail: {
                etherealPwd: process.env.ETHEREAL_PWD || '',
                etherealUser: process.env.ETHEREAL_USER || '',
                etherealPort: process.env.ETHEREAL_PORT || '',
                etherealHost: process.env.ETHEREAL_HOST || ''
            }
        })
    });

    it('test method set email with test', async function () {
        await EmailService.set({
            environment: 'test',
            etherealEmail: {
                etherealPwd: process.env.ETHEREAL_PWD || '',
                etherealUser: process.env.ETHEREAL_USER || '',
                etherealPort: process.env.ETHEREAL_PORT || '',
                etherealHost: process.env.ETHEREAL_HOST || ''
            }
        })
    });

    it('test method send email', async function () {
        await EmailService.send({
            to: 'correoprueba@hotmail.com',
            from: 'yourclocknoreply@gmail.com',
            subject: 'prueba'
        })
    });

    it('test failed method set email', async function () {
        await EmailService.set({
            environment: 'development'
        }).catch(err => {
            console.log(err.message)
        })
    });

    it('test failed method set email', async function () {
        await EmailService.set({
            environment: 'production'
        }).catch(err => {
            console.log(err.message)
        })
    });

    it('test failed method send email', async function () {
        await EmailService.send({
            to: 'correoprueba@hotmail.com',
            from: 'yourclocknoreply@gmail.com',
            subject: 'prueba'
        }).catch(err => {
            console.log(err.message)
        })
    });
})
