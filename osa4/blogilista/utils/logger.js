const info = (...params) => {
    if (process.env !== 'test') {
        console.log(params)
    }
}

const error = (...params) => {
    console.log(params)
}

module.exports = { info, error }