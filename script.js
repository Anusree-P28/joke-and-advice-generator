dividerImg = document.querySelector('.divider-img img');
adviceDiceBtn = document.querySelector('#advice-dice');
jokeDiceBtn = document.querySelector('#joke-dice')
getJokeBtn = document.querySelector('#joke-generator');
getAdviceBtn = document.querySelector('#advice-generator');
adviceContainer = document.querySelector('#advice-container');
jokeContainer = document.querySelector('#joke-container');
exitBtn = document.querySelector('#exit-btn');
headerSection = document.querySelector('header');

jokeId = document.querySelector('.joke-id');
jokePara = document.querySelector('.joke-container p');
adviceId = document.querySelector('.advice-id');
advicePara = document.querySelector('.advice-container p');

// Event listener for get advice button
getAdviceBtn.addEventListener('click', () => {
    adviceContainer.classList.remove('hidden');
    exitBtn.classList.remove('hidden');
    jokeContainer.classList.add('hidden');
    headerSection.classList.add('hidden');
    adviceGenerator()
})

// Event listener for crack joke button
getJokeBtn.addEventListener('click', () => {
    adviceContainer.classList.add('hidden');
    exitBtn.classList.remove('hidden');
    jokeContainer.classList.remove('hidden');
    headerSection.classList.add('hidden');
    jokeGenerator()
})

// Event listener for back to choices button
exitBtn.addEventListener('click', () => {
    headerSection.classList.remove('hidden');
    adviceContainer.classList.add('hidden');
    jokeContainer.classList.add('hidden');
    exitBtn.classList.add('hidden');
    adviceId.innerText = '';
    advicePara.innerText = '';
    jokeId.innerText = '';
    jokePara.innerText = '';
})

// Function to change divider image
function changeImage() {
    if (window.innerWidth > 768) {
        dividerImg.src = './images/pattern-divider-desktop.svg';
    }
}

changeImage()

window.addEventListener('resize', changeImage)

// Event listener for dice button in advice container
adviceDiceBtn.addEventListener('click', () => {
    adviceGenerator();
});

// Event listener for dice button in joke container
jokeDiceBtn.addEventListener('click', () => {
    jokeGenerator()
})


// Function for advice generation
async function adviceGenerator() {
    adviceId.innerText = '';
    advicePara.innerText = 'Loading...';
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const { id, advice } = data.slip;

        adviceId.textContent = `Advice #${id}`;
        advicePara.innerText = `"${advice}"`;

    } catch (error) {
        console.error('Error fetching joke:', error);
        adviceId.textContent = 'Joke #???';
        advicePara.textContent = 'Unable to fetch joke. Please try again later.';
    }

}


// Function for joke generation
async function jokeGenerator() {

    jokeId.innerText = '';
    jokePara.innerText = 'Loading...';
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        const data = await response.json();
        const { joke, id, type, setup, delivery } = data;

        if (type === 'twopart') {
            jokeId.innerText = `Joke #${id}`;
            jokePara.innerText = `"${setup}${delivery}"`
        } else {
            jokeId.innerText = `Joke #${id}`;
            jokePara.innerText = `"${joke}"`
        }

    } catch {
        console.error('Error fetching joke:', error);
        jokeId.textContent = 'Joke #???';
        jokePara.textContent = 'Unable to fetch joke. Please try again later.';
    }
}
