const checkboxList = document.querySelectorAll(".custom-checkbox")
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')

const allQoutes = [
    'Raise the bar by completing your goals!' ,
    'Well begun is half done!' ,
    'Just a step away, keep going',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedCount / inputFields.length * 100}%`
progressValue.firstElementChild.innerText = `${completedCount}/${inputFields.length} completed`
progressLabel.innerText=allQoutes[completedCount]

checkboxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allFieldsFilled = [...inputFields].every(function (input) {
            return input.value
        })
        if (allFieldsFilled) {
            checkbox.parentElement.classList.toggle("completed")
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedCount / inputFields.length * 100}%`
            progressValue.firstElementChild.innerText = `${completedCount}/${inputFields.length} completed`
            progressLabel.innerText = allQoutes[completedCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            progressBar.classList.add('show-error')
        }

    })
})

inputFields.forEach((input) => {

    // Ensure allGoals[input.id] exists or initialize it
    if (!allGoals[input.id]) {
        allGoals[input.id] = {
            name: "",
            completed: false,
        };
    }
    // Safely set input value and class based on allGoals
    input.value = allGoals[input.id].name || ""

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        allGoals[e.target.id] = {
            name: e.target.value,
            completed: false,
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})