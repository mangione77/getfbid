#!/usr/bin/env node --harmony
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const request = require('request')

function fbCall(fbUser) {
        request({
            method:'GET',
            uri: `http://facebook.com/${fbUser}`,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            }
        }, function(err,res,body) {
            if (err) console.log(chalk.red(`>>> Something went wrong...`, err))  

            let source = body.match(/entity_id":"\d*/i)
            if (source !== null) {
                const id = source[0].split('"').pop()
                console.log(chalk.green(`>>> ID for user '${fbUser}': `), id)
                return
            }
            else {
                console.log(chalk.red(`>>> No ID was found for user ${fbUser}.`), `Error status: ${res.statusCode}`)
                return
            }
            
        })
}

co(function *(){
    let username = yield prompt('FB Username: ')
    fbCall(username)
    return
})
