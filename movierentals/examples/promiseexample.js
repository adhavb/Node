const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve(1);
        reject('Error message');
    }, 2000)
});

p.then(result => console.log(result)).catch(err => console.log('Error : ', err));

//Replace promise instead of callback
getUser(1)
    .then(user => getRepositories(user.name))//if there are multiple statements after the => operator, subsequent .then is not working
    .then(repos => getCommits(repos[0]))
    .then(commit => console.log('Commit ', commit))
    .catch(err => console.log('Error', err.message))


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


const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        //resolve(1);
        reject(new Error('Async operation 1 failed'))
    }, 2000)
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000)
});

//Running Promises in parallel
//if anyone promise is rejected then only the catch block will be called then block will be ignored
//in short if any one promise is rejected then all the promises are considered as rejected
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message))

//The promise is considered as completed as soon as one of the promise is returned with either resolve or reject
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message));