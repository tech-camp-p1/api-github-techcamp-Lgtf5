let APIURL = 'https://api.github.com/users/'
// ELEMENTOS DOM //
let form = document.getElementById('form');
let resultUsers = document.getElementById('main');
let search = document.getElementById('search'); 

let getData = async (username) => {
    try {
        let response = await axios.get (`${APIURL}${username}`);
        gitCard (response.data);
        await getRepositores(username)
        console.log ('ok connection', response);
    } 
    catch (error) {
        console.log('failed connection', error);
        
        }
};


let gitCard = (user) => {
    let userCard = `
    <div class= "card">
        <img src="${user.avatar_url}" alt="user-avatar" class="avatar"/>
        <div class="user-info">
            <h2>${user.name || user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li><strong>${user.followers}</strong>&nbspFollowers</li>
                <li><strong>${user.following}</strong>&nbspFollowing</li>
                <li><strong>${user.public_repos}</strong>&nbspRepos</li>
            </ul>    
            <div class="repositores" id="repositores"></div>
        </div>
    </div>  
    `;
    resultUsers.innerHTML = userCard;
};


let getRepositores = async (username) => {
    try {
        let response = await axios.get(`${APIURL}${username}/repos`);
        gitRepositores('repositores succesful', response.data);
    } catch (error) {
        gitError('repositores failed', error);
    }
};

let gitRepositores = () => {
    let repositoresCard = document.getElementById('repositores');
    repositoresCard.innerHTML = '';
    repos.slice(0, 5).forEach((repositores) => {
        let repositoresElement = document.createElement('a');
        repositoresElement.classList.add('repositores');
        repositoresElement.href = repositores.html_url;
        repositoresElement.target = '_blank';
        repositoresElement.innerText = repo.name;
        repositoresCard.appendChild(repositoresElement);
    });
};


//busqueda sin boton
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = search.value.trim();
    if (user) {
    getData(user);
    search.value = '';
    }
});
let gitError = (error, message) => {
    let searchError = (error.response && error.response.status === 404)
    ? message
    : 'Error 404: not found';
    let cardError =`
    <div class="card">
    <h1>${searchError}</h1>
    </div>
    `;
    resultUsers.innerHTML = cardError;
};
