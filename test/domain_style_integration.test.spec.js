const path = require("path");
const fs = require("fs");
const spawn = require("spawn-command");
const pify = require("pify");
const glob = require("glob");
const dirTree = require("directory-tree");
const yargsParser = require("yargs-parser");
const stripAnsi = require("strip-ansi");
// const { getErrorLogger } = require("../utils");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // eslint-disable-line no-undef
const PATH = require.resolve("../../cli.js");

function getErrorLogger(title) {
  return err => {
    console.error(`There was an error: ${title}`, err);
    return Promise.reject(err);
  };
}

function getThenLogger(title) {
  return res => {
    console.error(title, res);
    return res;
  };
}

function relativeizePath(stringWithAbsolutePaths) {
  return stringWithAbsolutePaths.replace(
    new RegExp(path.resolve(__dirname, "../../../"), "g"),
    "<projectRootDir>"
  );
}

function relativeizePathInTree(tree) {
  tree.path = relativeizePath(tree.path);
  if (tree.children) {
    tree.children.forEach(relativeizePathInTree);
  }
}

test("genie generate command, command itself", () => {
  return runCLI("generate").then(stdout => {
    expect(stdout).toMatchSnapshot();
  });
});

test("genie generate command, output tested", () => {
  return runCLIAndAssertFileOutput(
    "generate",
    path.resolve(__dirname, "../../")
  );
});

function runCLI(arg = "", cwd = process.cwd()) {
  const isRelative = cwd[0] !== "/";
  if (isRelative) {
    cwd = path.resolve(__dirname, cwd);
  }

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const command = `node cli.js ${PATH}`; //change this after deployment!
    const child = spawn(command, { cwd });

    child.on("error", error => {
      reject(error);
    });

    child.stdout.on("data", data => {
      stdout += stripAnsi(data.toString());
    });

    child.stderr.on("data", data => {
      stderr += stripAnsi(data.toString());
    });

    child.on("close", () => {
      if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function runCLIAndAssertFileOutput(args, cwd) {
<<<<<<< HEAD
  const { outputDir = "./" } = yargsParser(args);
=======
  const { outputDir = "./lamp.config.yml" } = yargsParser(args);
>>>>>>> master
  const stdout = await runCLI(args, cwd).catch(getErrorLogger("runCLI"));
  const snapshotTitleBase = `${args} in ${relativeizePath(cwd)}`;
  expect(relativeizePath(stdout)).toMatchSnapshot(
    `${snapshotTitleBase} stdout`
  );
  const tree = dirTree(cwd);
  relativeizePathInTree(tree);
<<<<<<< HEAD
  console.log("Tree: ", tree);
  console.log("Title Base: ", snapshotTitleBase);
=======
>>>>>>> master

  expect(tree).toMatchSnapshot(`${snapshotTitleBase} file tree`);
  await expectDirectoryToMatchSnapshot(
    path.resolve(cwd, outputDir),
    `${snapshotTitleBase} output`
  );
}

function expectDirectoryToMatchSnapshot(directory, snapshotTitle) {
<<<<<<< HEAD
  console.log("Directory: ", directory);
=======
>>>>>>> master
  return pify(glob)(path.resolve(directory, "**/*"), { nodir: true })
    .then(readAllFilesAsPromise)
    .then(expectFilesToMatchSnapshot)
    .catch(getErrorLogger(`expectDirectoryToMatchSnapshot(${directory})`));

  function readAllFilesAsPromise(files) {
    const allPromises = files.map(readFileAsPromise);
    return Promise.all(allPromises);
  }

  function readFileAsPromise(file) {
    return pify(fs.readFile)(file, "utf8")
      .then(contents => ({ file: relativeizePath(file), contents }))
      .catch(getErrorLogger(`readFileAsPromise(${file})`));
  }

  function expectFilesToMatchSnapshot(files) {
    expect(files).toMatchSnapshot(snapshotTitle);
  }
}
