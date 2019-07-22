const url = 'http://localhost:3000/pups';


document.addEventListener('DOMContentLoaded', function (e) {
    const filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', function (e) {
        let flag = (filterBtn.innerText === "Filter good dogs: ON")
        filterText(!flag)
        if (flag === true) {

        } else {

        }
    })
})

function fetchDogs(ev) {
    const allDogs = fetch(url)
        .then(resp => resp.json())
        .then(renderDogs)
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
    let img = document.getElementById('dog-img')
    img.setAttribute('src', dog.image)

    let h2 = document.getElementById('dog-name')
    h2.innerText = dog.name

    let btn = document.getElementById("isGoodDog")
    btn.style.display = "block"
    btnText(btn, dog.isGoodDog)

    btn.addEventListener('click', function (e) {
        toggleGoodBad(dog)
    })
}

function toggleGoodBad(dog) {
    console.log('before click')
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
        .then((json) => {
            showDog(json)
            console.log('after click')
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