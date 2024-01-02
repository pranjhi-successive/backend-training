const scanner = require('sonarqube-scanner');
require('dotenv').config();
const userToken ='squ_a3dd8d54ec6de1db672e18b80778fd7bd80d4289'
scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: userToken,
        options: {
            'sonar.sources': './src',
        },
    },
    () => process.exit(),
);
