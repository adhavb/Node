async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.name);
        const p = await getCommits(repos[0]);
    }
    catch (err) {
        console.log(err);
    }
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: id, name: "Bhuvan" })
        }, 2000)
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['commit']);
        }, 2000);
    })
}