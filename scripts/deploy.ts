#!/usr/bin/env node
import {config} from "dotenv";

config();

const apigeetool = require('apigeetool');
const sdk = apigeetool.getPromiseSDK();

const commonOpts = {
    organization: process.env.ORGANIZATION as string,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    environments: process.env.ENVIRONMENT as string,
    verbose: true
};

const proxyOpts = {
    ...commonOpts,
    api: 'apigee-errorhandling'
};

export const sharedFlowOpts = {
    ...commonOpts,
    name: 'error-conversion'
};

deploy().then((success) => console.log("Deployment was successful: " + success));

async function deploy(): Promise<boolean> {
    let result: boolean = await deploySharedFlow();
    if (result) {
        result = await deployApiProxy();
    }

    return result;
}

async function deploySharedFlow(): Promise<boolean> {
    try {
        console.log("Starting deployment of shared flow");
        await sdk.deploySharedflow(sharedFlowOpts);
        console.log("Deployment of shared flow succeeded");
        return true;
    } catch (err) {
        console.log("Deployment of shared flow failed: " + err);
        return false;
    }
}

async function deployApiProxy(): Promise<boolean> {
    try {
        console.log("Starting deployment of proxy");
        await sdk.deployProxy(proxyOpts);
        console.log("Deployment of proxy succeeded");
        return true;
    } catch (err) {
        console.log("Deployment of proxy failed: " + err);
        return false;
    }
}