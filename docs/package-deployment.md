#Instructions for Deploying Public Unscoped Packages to NPM

The following will walk you through uploading a project onto NPM. This is provided to save time and allow any member of the team to deploy a project at any time. You can only publish publicly, unless you have a paid account.

##A Note on Scoped Packages
You can publish a package as a scoped package. This allows you to group related packages together, and changes the way NPM treats it in a number of ways. This is primarily used by an individual or organization to designate official packages of an organization. Unscoped packages can have dependecies for scoped packages. A scoped packages has the following format:

```
@scope/packagename
```

To install a package with a scope, run `npm init --scope=<organization_name>`.

You can [read more about the scope here](https://docs.npmjs.com/scope).

##Creating an Account

To begin, ensure that you have a [created an account with NPM](https://www.npmjs.com/signup). For safety, also enable two-factor authorization (2FA). You will need an account to publish.

While in your terminal or editor of choice, use the `npm login` command to log in to your account ahead of publishing.

##Getting Started

To begin, run the initialization by running the `npm init` command.

Avoid using the `-y` argument, as you will want specific information in each field for when the packge is published.

While you do not have to enter every field at initialization, you should double check all fields in the **package.json** before publishing package to ensure they were input correctly.

The following fields are of note, and should be reviewed before deployment.

###Name Field

It is important that the package name be unique, as this is how it will appear on NPM and what the user will enter in the CLI to install the package. *Remember - choose something unique and succint.*

###Version Field

The second most important field is the version number. This should correspond to the recommended version numbering system for deployment and remain consistent throughout development. Whichever system is implemented can vary accoring to organization or team.

For simplicity, a basic version numbering system traditionally works as follows:

* The version number, e.g. **1.3.5**, is divided into three categories representing major/development (0.x.x) changes, minor/technical(x.3.x) changes, and patch/revision (x.x.5) changes to the package. Updates that are published should increment the version accordingly.

* The numbers in the devlepment category designate the stage of release as follows:
  * 0 = Alpha
  * 1 = Beta
  * 2 = Release Candidate
  * 3 = Final Release

* When the devlepment stage increments, the technical and revision numbers reset to 1; e.g., when **0.11.9** alpha is moved into the beta release, the new version number would be **1.0.0**.

* The first draft of a package would be entered as **0.0.1**.

* Version **1.0.0** is considered the first important milestone of a package, and should be considered the first point at which a piece of software is considered appropriate for release.

To see how you would increment the version numbering on a package, [see this section below](ENTER).

###Keywords Field

The importance of this field is that it represents the keywords that a user could use to find your package on the NPM repository. *Do not overlook the importance of this field for deployment.*

###Description Field

This field is also important, as it too is parsed when a user searched for a package. Ensure it is succinct enough to get the point across, while also including important keywords or phrases that will allow a user to easily discover the package in a search. *A good description improves the package's discoverability.*

###Homepage Field

Ideally, this will direct the user to a homepage for the package. However, if a homepage is not yet available, it is acceptable for it to point to the README.md on Github.

###Bug Field

Rather than listing bugs here, you should link to the package's documentation or a page that lists known issues, preferrably in an FAQ format. Ideally, you will also provide a contact e-mail.

The recommdended format would be as follows:

```
{
  "url" : "https://github.com/owner/project/issues",
  "email": "project@hostnam.com"
}
```
###License Field

Specify a license for the package so that people are aware what they are permitted to use the package for and what restrictions may apply. You can check [the full list of SPDX license IDs that are available here](https://spdx.org/licenses).

Ideally, you should choose one that is OSI approved. A package can fall under multiple common licenses, and should be entered as a string as follows:

```
{
  "licenses" : "(ISC OR GPL-3.0)"
}
```

If you do not wish to grant others the right ot use a private or unpublished package under any terms, enter the following:

```
{
  "license" : "UNLICENSED"
}
```
Setting `"private" : true` is also acceptable in order to prevent accidental publication.

###People Fields: Author vs. Contributors

The **author** is considered one person, and in the case of multiple people, should be the name of their organization or team.

The **contributors** exist as an array of people. Each person in the array is an object with a required *name* field, and optional *url* and *email* fields.

A person can be input as follows:

```
{
  "name" : "Plissken MacReady",
  "email" : "plissken.macready@gmail.com",
  "url" : "https://plisskenmacready.tumblr.com/"
}
```

###Repository Field

Refers to the package's location on Github (publicly available, though it could be set to read-only). It should have the following format:

```
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}
```

##Package Ownership

Before publishing a package, you should other developers have been granted ownership of it. This would ensure they can make changes to the metadata and publish new versions of the package. Users are identified by their NPM account name.

The following commands will change the ownership of a package:

* `npm owner add <user> <@scope>]<pkg>`: Adds a user as an owner.
* `npm owner rm <user> <@scope>]<pkg>`: Removes a user as an owner.
* `npm owner ls <@scope>/<pkg>`: Lists all of a package's owners.


##Publishing the Package to NPM

When the package is ready for publishing, start by running the `npm publish` command. No other arguments are necessary for a public unscoped package.

You will be required to enter you one time password (OTP) from your 2FA application before you can continue. *Remember that you must be logged in through your terminal before running the publish command.*

At this point, the package will be live. You can test its availablity by running `npm install package-name`.

##Updating a Package and its Version Number

To update the package for publishing, you must first increment the version number.

To do so, you must run the `npm version [<version-category> | major | minor | patch]` command, passing the version category you wish to update.

You can view the current package's version by running `npm view <package-name> version`.

Running `npm ls <package-name>` will list the package's version along with its dependicies and their versions.

Lastly, you can add a commit message with publication by adding the `-m` argument.

Once you update the version number, you can then run `npm publish` to republish the package.

###Closing

For more information on publishing NPM packages, [please refer to the documentation on NPM](https://docs.npmjs.com/).
