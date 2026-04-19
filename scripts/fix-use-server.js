const fs = require('fs');
const path = require('path');

const actionsDir = path.join(process.cwd(), 'src', 'app', 'actions');
const files = fs.readdirSync(actionsDir);

for (const file of files) {
  if (file.endsWith('.ts')) {
    const fullPath = path.join(actionsDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove any existing 'use server' loosely
    content = content.replace(/['"]use server['"];?/g, '');
    
    // Prepend 'use server' cleanly
    content = "'use server'\n\n" + content.trim();

    fs.writeFileSync(fullPath, content);
    console.log(`Fixed use server in ${file}`);
  }
}
