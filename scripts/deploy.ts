#!/usr/bin/env node
import {config} from "dotenv";

config();

const apigeetool = require('apigeetool');
const sdk = apigeetool.getPromiseSDK();

export const proxyOpts = {
    organization: process.env.ORGANIZATION as string,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    environments: process.env.ENVIRONMENT as string,
    api: 'apigee-errorhandling'
};

deploy().then((success) => console.log("Deployment was successful: " + success));

async function deploy(): Promise<boolean> {
    try {
        console.log("Starting deployment of proxy");
        await sdk.deployProxy(proxyOpts);
        console.log("Deployment of proxy suceeded");
        return true;
    } catch (err) {
        console.log("Deployment of proxy failed: " + err);
        return false;
    }
}