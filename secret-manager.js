'use strict';

const AWS = require('aws-sdk');
const client = new AWS.SecretsManager({});

const SECRET_MANAGER_ARN = 'arn:aws:secretsmanager:us-east-1:376804820732:secret:Lex-To-Jira-SUdYP5';

// Call the AWS API and return a Promise
function getAwsSecret(secretName) {
    return client.getSecretValue({ SecretId: secretName }).promise();
};

// Create a async function to use the Promise
// Top level await is a proposal
async function getAwsSecretAsync() {
    var response = await this.getAwsSecret(SECRET_MANAGER_ARN).catch(err => {
        console.log(err);
        console.log("Values couldn't be retrieved from the Secret Manager");
    });
    return JSON.parse(response.SecretString);
};

module.exports = { getAwsSecret, getAwsSecretAsync };