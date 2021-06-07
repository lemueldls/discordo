/* eslint-disable no-console */

import fs from "fs";
import path from "path";

import glob from "glob";

import { build } from "esbuild";

import chalk from "chalk";

const source = "./src";

async function compile(name: string) {
  const time = Date.now();

  const [entry] = glob.sync(path.join(source, name, `{index,main,${name}}.*`));

  const { version, description } = await import(
    path.resolve(source, name, "package.json")
  );

  await build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    platform: "node",
    outfile: `./dist/${name}.plugin.js`,
    banner: {
      js: `/**
 * @name ${name}
 * @version ${version}
 * @description ${description}
 * @author Potato King
 * @authorId 265400036509220866
 * @donate https://paypal.me/lemueldls
 * @website https://github.com/lemueldls
 */`,
    },
  });

  console.info(
    chalk`{bold.cyan ${name}} v${version} {dim ${Date.now() - time}ms}`
  );
}

console.info(chalk.bold`{blue ℹ} Building Plugins`);

for (const file of fs.readdirSync(source)) compile(file);
