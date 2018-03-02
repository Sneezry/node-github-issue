# node-github-issue

```
git clone https://github.com/Sneezry/node-github-issue.git
cd node-github-issue
npm install
```

## Require

```
node index.js <repo-name>
```

or

```
node index.js <repo-name> <issue-state>
```

## Examples

### Export all open issues to issues.csv

```
node index.js Microsoft/vscode-arduino
```

### Export all closed issues to issues.csv

```
node index.js Microsoft/vscode-arduino closed
```

### Export all issues to issues.csv

```
node index.js Microsoft/vscode-arduino all
```

## License

MIT License.