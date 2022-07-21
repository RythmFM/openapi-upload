# OpenAPI Upload Action

This action validates and if configured uploads the final
json API schema to our OpenAPI hub.

If you want to use this action outside the Rythm
organization, please make sure to set `validate-only` 
to `true` as uploads without proper authorization will
be rejected.

# Configuration

## validate-only

Whether to only validate (and not upload) the API schema file.

Accepted values here are 'true' or 'false'. Default: false

## publish-pr-prereleases

Whether to upload PR runs as pre-releases or ignore PRs.

Accepted values here are 'true' or 'false'. Default: true

If this is turned on, a version 0.0.1 in workflow run 9 will
get the pre-release version `0.0.1-pre9`.

## file

The path to the file to check.

## authorization

The token used for uploading the api to the OpenAPI hub. 
This is a mandatory variable if `validate-only` is `false`!

# Contributing / Building

Before pushing a change, please make sure to run `npm run build`
as the action relies on ncc to compile the `dist/index.js`.