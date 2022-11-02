import { diff } from 'json-diff';
import { argv } from 'node:process';
import { execSync } from 'node:child_process';
import * as fs from 'fs';

async function processFile(file) {
    const stdout = execSync('git show HEAD~1:'+file);
    const oldDB = JSON.parse(stdout);
    const newDB = JSON.parse(fs.readFileSync(file, 'utf8'));
    const updated = diff(oldDB, newDB, {outputNewOnly: true});
    return updated;
}

async function saveList() {
    const files = fs.readdirSync('./db/');
    const bulks = await Promise.all(
        files
        .filter(file => (file.split('.').pop() === 'json'))
        .map(async file => processFile("./db/" + file)));
    let lists = [];
    bulks.forEach(bulk => {
        for (var key in bulk) {
            lists.push({"key": key, "value": JSON.stringify(bulk[key])});
        }
    });
    fs.writeFile('./updateLists.json', JSON.stringify(lists), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

saveList();