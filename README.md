# Playwright UI Framework

This project uses Playwright Test to run UI tests against the demo shop. Test cases are in `tests/`, page objects are in `pages/`, and registration inputs are in `testdata/registrationData.json`.

## GitHub repository

- Repository: [Iaarun/playwrightDemowebjul26framework](https://github.com/Iaarun/playwrightDemowebjul26framework)
- Default branch: `master`
- Remote name: `origin`

### Clone the repository

Run these commands in PowerShell from the directory where you want the project folder created:

```powershell
git clone https://github.com/Iaarun/playwrightDemowebjul26framework.git
cd playwrightDemowebjul26framework
npm install
```

### Pull the latest changes

From the project directory, update your local `master` branch:

```powershell
git switch master
git pull --rebase origin master
```

If you have uncommitted changes, commit or stash them before pulling.

### Push your changes

Create a working branch, make and test your changes, then commit and push it:

```powershell
git switch -c my-change
git status
git add .
git commit -m "Describe your change"
git push -u origin my-change
```

Replace `my-change` with a short branch name and use a commit message describing your changes. After the first push, open a pull request on GitHub to merge your branch into `master`. GitHub authentication must be configured for push access.

## Install and run

From the project directory:

```powershell
npm install
npx playwright install chromium
npm test -- --env qa
```

The Playwright configuration runs Chromium in headed mode by default. Set `BASE_URL` to test a different environment.

Choose the environment for each run with `--env`:

```powershell
npm test -- --env qa
npm test -- --env stg
```

The accepted values are `qa` and `stg`. The environment is included in test titles and report annotations. Both currently use the same configured `BASE_URL`; selecting an environment labels the run and does not change the URL. You can pass regular Playwright options after the environment, for example:

```powershell
npm test -- --env stg tests/registration.spec.js
```

## Logging

Test execution logs are printed to the terminal and appended to `logs/automation.log`. The logger records test start/end status and registration steps, without logging passwords or email addresses. Set `LOG_LEVEL` to `debug`, `info` (default), `warn`, or `error` to control the minimum level. Set `LOG_FILE` to write logs to a different file.

```powershell
$env:LOG_LEVEL = "debug"
npm test -- --env qa
```

## Allure reports

The test run creates Allure result files in `allure-results/` and continues to create the Playwright HTML report in `playwright-report/`. To render and open the Allure report, install a Java runtime (Java 17 or newer) and run:

```powershell
npm run allure:generate
npm run allure:open
```

The generated report is in `allure-report/`. You can also view the Playwright HTML report with:

```powershell
npx playwright show-report
```

Allure result and report directories are generated output and are excluded from version control. The GitHub Actions workflow uploads both report types as workflow artifacts.