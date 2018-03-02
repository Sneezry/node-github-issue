const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const argv = process.argv;

if (argv.length < 3) {
    console.error('Require repo name: node index.js <repo-name>, i.e. node index.js Microsoft/vscode-arduino');
    process.exit(1);
}

async function getIssues(repoName, state, page) {
    try {
        const apiUrl = `https://api.github.com/repos/${repoName}/issues?state=${state}&page=${page}`;
        const res = await request({
            uri: apiUrl,
            headers: {
                'User-Agent': 'node-github-issue,https://github.com/Sneezry/node-github-issue'
            },
            json: true
        });
        return res;
    } catch(error) {
        throw error;
    }
}

async function exportCSV(repoName) {
    try {
        let state = 'open';
        if (process.argv[3]) {
            const _state = process.argv[3].toLowerCase();
            if (['open', 'closed', 'all'].indexOf(_state) !== -1) {
                state = _state;
            }
        }

        const lines = ['id,title,body'];
        let page = 1;
        let issues = [];
        do {
            console.log(`fetching page ${page}...`);
            issues = await getIssues(repoName, state, page);
            issues.forEach(issue => {
                lines.push(`${issue.number},${issue.title.replace(/"/g, '""')},"${issue.body.replace(/"/g, '""')}"`);
            });
            if (issues.length) {
                console.log(`${issues.length} issue(s) found.`);
            }
            page++;
        } while(issues.length);

        fs.writeFileSync(path.join(__dirname, 'issues.csv'), lines.join('\r\n'));
        console.log('Done.');
    } catch(error) {
        console.error(error.message);
    }
}

exportCSV(process.argv[2]);