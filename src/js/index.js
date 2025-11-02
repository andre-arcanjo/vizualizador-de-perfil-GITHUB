import { fetchGithubUser, fetchGithubUserRepos } from "./githubAPI.js";
import { renderProfile } from "./profileview.js";

const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

async function getUserProfile() {
    const userName = inputSearch.value;
    if (!userName) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        profileResults.innerHTML = "";
        return;
    }
    profileResults.innerHTML = `<p class ="loading">Carregando...</p>`;
    try {
        const userData = await fetchGithubUser(userName);
        const userRepos = await fetchGithubUserRepos(userName);
        renderProfile(userData, userRepos, profileResults);
    } catch (error) {
        console.error('Erro ao buscar perfil de usuário:', error);
        alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente.');
        profileResults.innerHTML = "";
    }
};

btnSearch.addEventListener('click', getUserProfile);

inputSearch.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getUserProfile();
    }
});