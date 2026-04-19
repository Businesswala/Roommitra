const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;

      // Import replacements
      if (content.includes('@/utils/supabase/server') || content.includes('@supabase/ssr')) {
        content = content.replace(/import\s*\{\s*createClient\s*(?:as[^}]*)?\}\s*from\s*['"](?:@\/utils\/supabase\/server|@supabase\/ssr)['"];?/gi, '');
        content = content.replace(/import\s*\{\s*createServerClient\s*\}\s*from\s*['"]@supabase\/ssr['"];?/gi, '');
        content = `import { getServerSession } from "next-auth/next";\nimport { authOptions } from "@/app/api/auth/[...nextauth]/route";\n` + content;
        modified = true;
      }

      if (content.includes('@/utils/supabase/client')) {
        content = content.replace(/import\s*\{\s*createClient\s*\}\s*from\s*['"]@\/utils\/supabase\/client['"];?/gi, '');
        modified = true;
      }

      // NextAuth logic conversions
      if (content.includes('supabase.auth.getUser()')) {
        content = content.replace(/const\s+supabase\s*=\s*(?:await\s+)?createClient\(\);?/g, 'const session = await getServerSession(authOptions);');
        content = content.replace(/const\s+\{\s*data\s*:\s*\{\s*user\s*\}\s*\}\s*=\s*await\s+supabase\.auth\.getUser\(\);?/g, 'const user = session?.user;');
        modified = true;
      }

      // Supabase ID query replacements
      if (content.includes('supabaseId: user.id')) {
        content = content.replace(/supabaseId:\s*user\.id/g, 'id: user.id');
        modified = true;
      }

      // GetProfileBySupabaseId removal/replacements
      if (content.includes('GetProfileBySupabaseId')) {
         content = content.replace(/GetProfileBySupabaseId/g, 'GetProfileById');
         modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Patched: ${fullPath}`);
      }
    }
  }
}

// Start in actions and components
processDir(path.join(process.cwd(), 'src', 'app'));
processDir(path.join(process.cwd(), 'src', 'components'));
processDir(path.join(process.cwd(), 'src', 'hooks'));
