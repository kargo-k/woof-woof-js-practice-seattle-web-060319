const url = 'http://localhost:3000/pups';


document.addEventListener('DOMContentLoaded', function (e) {
    fetchDogs()

    const filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', function (e) {
        document.getElementById('dog-bar').innerHTML = ""
        let flag = (filterBtn.innerText === "Filter good dogs: ON")
        filterText(!flag)
        if (!flag === true) {
            fetchGoodDogs()
        } else {
            fetchDogs()
        }
    })
})

function fetchDogs() {
    const allDogs = fetch(url)
        .then(resp => resp.json())
        .then(renderDogs)
}

function fetchGoodDogs() {
    const allDogs = fetch(url)
        .then(resp => resp.json())
        .then(allDogs => {
            let goodDogs = allDogs.filter(function (dog) {
                return dog.isGoodDog === true
            })
            renderDogs(goodDogs)
        })
}

function renderDogs(json) {
    const bar = document.getElementById("dog-bar");
    json.forEach(dog => {
        let dogSpan = document.createElement('span')
        dogSpan.id = dog.id
        dogSpan.innerText = dog.name
        bar.appendChild(dogSpan)

        dogSpan.addEventListener('click', function (e) {
            showDog(dog)
        })
    });
};

function showDog(dog) {
    let divDog = document.getElementById('dog-info')
    divDog.innerHTML = ""
    let img = document.createElement('img')
    img.setAttribute('src', dog.image)
    divDog.appendChild(img)

    let h2 = document.createElement('h2')
    h2.innerText = dog.name
    divDog.appendChild(h2)

    let btn = document.createElement("button")
    btn.id = "dogbutton"
    btnText(btn, dog.isGoodDog)
    divDog.appendChild(btn)
    btn.addEventListener('click', function (e) {
        toggleGoodBad(dog)
    })
}

function toggleGoodBad(dog) {
    return fetch(url + `/${dog.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: dog.id,
            name: dog.name,
            isGoodDog: !dog.isGoodDog,
            image: dog.image
        })
    })
        .then(resp => resp.json())
        .then((dogJson) => {
            showDog(dogJson)
        })
}

function btnText(btn, bool) {
    if (bool) {
        btn.innerText = 'Good Dog!'
    } else {
        btn.innerText = 'Bad Dog!'
    }
}

function filterText(bool) {
    const btn = document.getElementById('good-dog-filter')
    if (bool === false) {
        btn.innerText = 'Filter good dogs: OFF'
    } else {
        btn.innerText = 'Filter good dogs: ON'
    }
}