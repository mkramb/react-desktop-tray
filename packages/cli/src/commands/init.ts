import { lstatSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { renderFile } from 'ejs';
import glob from 'glob';

function getTemplateFiles(templatePath, callback) {
  glob(
    templatePath + '/**/*',
    {
      dot: true,
    },
    (err, paths) => {
      if (err) {
        throw err;
      }

      const filePaths = paths.filter((filePath) => {
        return lstatSync(filePath).isFile();
      });

      callback(filePaths);
    }
  );
}

function init(name: string) {
  const templatePath = join(__dirname, '..', 'templates');
  const templateVars = {
    projectName: name,
  };

  getTemplateFiles(templatePath, async (filePaths) => {
    const targetPath = process.cwd();

    for (const filePath of filePaths) {
      const newFileContent = await renderFile(filePath, templateVars);
      const newFilePath = join(
        targetPath,
        relative(templatePath, dirname(filePath)),
        basename(filePath, '.ejs')
      );

      if (!existsSync(dirname(newFilePath))) {
        mkdirSync(dirname(newFilePath));
      }

      writeFileSync(newFilePath, newFileContent, {
        encoding: 'utf-8',
      });
    }
  });

  console.log(`
    Completed generating project skeleton 🎉
    Continue by installing Node packages.
  `);
}

export { init };
