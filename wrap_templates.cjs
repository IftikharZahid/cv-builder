const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/USER/Desktop/Mobile App Dev/cv-builder/src/components/preview/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'ModernTemplate.tsx');

files.forEach(f => {
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Match <SectionWrapper id="profile" ... </SectionWrapper>
  content = content.replace(/(<SectionWrapper id="profile"[^>]*>[\s\S]*?<\/SectionWrapper>)/g, "{(!data.activeTabs || data.activeTabs.includes('profile')) && (\n$1\n)}");
  fs.writeFileSync(path.join(dir, f), content);
});
console.log('Wrapped profile sections in other templates');
