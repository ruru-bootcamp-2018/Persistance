// A diagnostic console log that can be switched on and off, either individually or globally. 

function diag(inputString, local = true, globalForTest) {
    const global = (globalForTest == undefined) ? true : globalForTest
    
    const errorLine = new Error().stack.split("\n")[2];
    const splitted = errorLine.split(":")
    
    const file = splitted[1]
    const line = `${splitted[2]}:${splitted[3].slice(0,-1)}`

    if (local && global) {
        console.log(`
        -----------
        File:   ${file}
        Line:   ${line}
        Time:   ${new Date}
        Msg:    ${inputString}
        ----------\n`)
    }
}

module.exports = diag