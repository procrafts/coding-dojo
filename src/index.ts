import { writeFileSync } from 'fs';
import { join } from 'path';

let output = '';
run().then(() => {
  writeOutput(output);
});

async function run() {
  for (let i = 1; i <= 25; i++) {
    await runKata(i, 1);
  }
}

function runKata(i: number, j: number) {
  return import(`./kata-${i}/main`).then((res: { default: () => string }) => {
    const header = `Kata ${i}-${j}`;
    const content = res.default();
    const footer = '------\n';

    output += `${header}\n${content}\n${footer}\n\n`;
    console.log(output);
  }, () => {
  });
}

function writeOutput(content: string) {

  try {
    writeFileSync(join(__dirname, '..', 'OUTPUT.txt'), content);
  } catch (err) {
    console.error(err);
  }
}
