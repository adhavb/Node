console.log('Before');
getUser(1, function (user) {
    console.log('User ', user);
})
console.log('End');

function getUser(id, callback) {
    setTimeout(() => {
        console.log();
        callback({ id: id, name: "Bhuvan" })
    }, 2000)
}