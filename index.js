const fs = require('fs');
const sa = require('superagent');

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Error! ⚠️');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Error! ⚠️');
            resolve('success');
        });
    });
};


// Async function with await
const getDogPic = async () => {
    try {

        const data = await readFilePro('dogg.txt');
        console.log(`Breed: ${data}`);

        const res = await sa.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message)

        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random image saved');
    } catch (err) {
        console.log(err)
        throw (err);
    }
    return '2: Ready 🐕'
}
console.log('1: Will get dog pic')
getDogPic().then(x => {
    console.log(x)
    console.log('3: Done')
}).catch(err => {
    console.log('Operation Failed')
})

//Using promises and then

/* readFilePro('dog.txt')
    .then((data) => {
        console.log(`Breed: ${data}`);

        return sa.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then((res) => {
        console.log(res.body.message);

        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random image saved');
    })
    .catch((err) => {
        console.log(err.message);
    });
 */