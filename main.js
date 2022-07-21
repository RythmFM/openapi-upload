const core = require('@actions/core');
const github = require('@actions/github');
const SwaggerParser = require('@apidevtools/swagger-parser');

try {
    const file = core.getInput("file");
    const validateOnly = core.getInput("validate-only") === "true";

    console.log(`Validating ${file}...`);
    const api = await SwaggerParser.validate(file);
    console.log("Success!");

    if (validateOnly) {
        return;
    }

    const authorization = core.getInput("authorization");
    const isPr = github.context.eventName === "pull_request";
    const version = api.info.version + (isPr ? `-pre${github.context.runNumber}` : "");

    console.log(`Uploading ${api.info.title} version ${version} to OpenAPI hub.`)

    const result = await fetch(`https://openapi-hub.rythm.dev/upload/${api.info.title}/${version}`, {
        method: "POST",
        headers: {
            'Authorization': authorization,
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify(api),
    });

    if (result.status <200 || result.status > 299) {
        core.setFailed(await result.text());
        return;
    }
    console.log("Success!");

    core.setOutput("name", api.info.title);
    core.setOutput("version", version);
} catch (e) {
    core.setFailed(e.message);
}