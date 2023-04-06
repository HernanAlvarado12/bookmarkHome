const URL_ROOTER = './data.json'
const URL_QUESTION = './question.json'
const questionFragment = document.createDocumentFragment()
const extensionFragment = document.createDocumentFragment()
const sectionQuestion = document.getElementById('questionSection')
const sectionExtension = document.getElementById('extensionSection')
const questionTemplate = document.getElementById('questionTemplate').content
const extensionTemplate = document.getElementById('extensionTemplate').content


/**
 * @typedef {Object} extension
 * @property {String} icon
 * @property {String} title
 * @property {String} version
 * @param {Array<extension>} arrayJson 
 */
const supplier = (arrayJson) => {
    arrayJson.forEach(json => {
        const { icon, title, version } = json
        const clone = extensionTemplate.cloneNode(true)
        clone.querySelector('img').setAttribute('src', icon)
        clone.querySelector('h4').textContent = title
        clone.querySelector('p').textContent = version  
        extensionFragment.append(clone)
    })
    sectionExtension.append(extensionFragment)
}


/**
 * @typedef {Object} question
 * @property {String} title
 * @property {String} answer
 * @param {Array<question>} arrayJson 
 */
const supplierQuestion = (arrayJson) => {
    arrayJson.forEach(json => {
        const { title, answer } = json
        const clone = questionTemplate.cloneNode(true)
        clone.querySelector('#questionTitle').textContent = title
        extensionFragment.append(clone)
    })
    sectionQuestion.append(extensionFragment)
}

fetch(URL_ROOTER)
    .then(response => response.json())
    .then(json => json.extensions)
    .then(supplier)

fetch(URL_QUESTION)
    .then(response => response.json())
    .then(json => json.questions)
    .then(supplierQuestion)
