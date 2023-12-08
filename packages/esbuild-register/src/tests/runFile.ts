import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { pathToFileURL } from "node:url";

const registerMJS = new URL("../../dist/index.mjs", pathToFileURL(__filename));
const registerCJS = path.join(__dirname, "../../dist/index.cjs");
const hook = new URL("../../dist/hook.mjs", pathToFileURL(__filename));
const nodeVersion = process.versions.node.split(".").map((x) => Number(x)) as [
  number,
  number,
  number
];
const nodeSupportsModuleRegisterAPI =
  nodeVersion[0] > 20 ||
  (nodeVersion[0] === 20 && nodeVersion[1] >= 6) ||
  (nodeVersion[0] === 18 && nodeVersion[1] >= 19);

export async function runNode(path: string): Promise<string> {
  if (nodeSupportsModuleRegisterAPI) {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      ["--import", registerMJS.toString(), path],
      {}
    );
    return stdout;
  } else {
    const { stdout } = await promisify(execFile)(
      process.execPath,
      [
        "--require",
        registerCJS.toString(),
        "--experimental-loader",
        hook.toString(),
        path,
      ],
      {}
    );
    return stdout;
  }
}
