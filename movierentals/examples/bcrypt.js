const bcrypt = require('bcrypt');

async function generateSalt() {
    const salt = await bcrypt.genSalt(10);
    console.log(' Salt : ', salt);
    const hashedPassword = await bcrypt.hash('1234', salt);
    console.log('Hashed Password ', hashedPassword);
}

generateSalt();

