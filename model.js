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
        clone.querySelector('#questionAnswer').textContent = answer
        extensionFragment.append(clone)
    })
    sectionQuestion.append(extensionFragment)
}


/**
 * 
 * @param {Element} currentNode 
 * @param {String} match
 * @returns {Element} node
 */
const parentNode = (currentNode, match) => {
    if(currentNode == document.body) {
        return null
    }else {
        if(currentNode.matches(match)) {
            return currentNode
        }else {
            return parentNode(currentNode.parentElement, match)
        }
    }
}


/**
 * 
 * @param {Element} currentNode 
 * @param {Boolean} isActive
 */
const toggleClassListQuestion = (currentNode, isActive) => {
    if(isActive) {
        currentNode.classList.add('open')
        currentNode.querySelector('figure > img').classList.add('rotate-180')
        currentNode.querySelector('figure > figcaption:last-child').classList.remove('hidden')
    }else {
        currentNode.classList.remove('open')
        currentNode.querySelector('figure > img').classList.remove('rotate-180')
        currentNode.querySelector('figure > figcaption:last-child').classList.add('hidden')   
    }
}

fetch(URL_ROOTER)
    .then(response => response.json())
    .then(json => json.extensions)
    .then(supplier)

fetch(URL_QUESTION)
    .then(response => response.json())
    .then(json => json.questions)
    .then(supplierQuestion)


document.addEventListener('click', event => {
    if(event.target.matches('#listFeatures > li')) {
        const listItem = document.querySelector('#listFeatures > li.features-line')
        listItem.classList.remove('features-line')
        event.target.append(listItem.children.item(0))
        event.target.classList.toggle('features-line')
    }else if(event.target.matches('#questionSection > article :is(figure, img, figcaption)')) {
        const previousActive = document.querySelector('#questionSection > article.open')
        const parentElement = parentNode(event.target, '#questionSection > article.cursor-pointer')
        if(!previousActive) {
            toggleClassListQuestion(parentElement, true)
        }else {
            toggleClassListQuestion(previousActive, false)
            if(previousActive !== parentElement) {
                toggleClassListQuestion(parentElement, true)
            }
        }
    }else if(event.target.matches('form.flex > input:last-child')) {
        const regex = new RegExp('[A-z0-9_\"\#\$\%\&\/\.\-]+@(gmail|hotmail|outlook)[.](com|co)([.](com|co))?')
        const input = document.querySelector('form.flex > label > input.indent-1.border-transparent')
        if(!regex.test(input.value)) {
            input.classList.add('border-red')
            document.querySelector('form.flex label span').classList.remove('hidden')
            document.querySelector('form.flex label img').classList.remove('hidden')
            event.target.classList.add('translate-y-8')
        }else {
            const form = document.querySelector('form.flex.flex-col')
            const formData = new FormData(form)
            for(const entry of formData.values()) {
                console.log(entry)
            }
            input.value = ''
        }
    }else if(event.target.matches('form.flex > label > input.border-red')) {
        event.target.classList.remove('border-red')
        document.querySelector('form.flex label span').classList.add('hidden')
        document.querySelector('form.flex label img').classList.add('hidden')
        document.querySelector('form.flex > input:last-child').classList.remove('translate-y-8')
    }
})


document.addEventListener('submit', event => {
    event.preventDefault()
})
