const fs = require('fs');
const path = require('path');

const templatesDir = 'c:/Users/USER/Desktop/Mobile App Dev/cv-builder/src/components/preview/templates';
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('Template.tsx'));

files.forEach(f => {
  const fp = path.join(templatesDir, f);
  let content = fs.readFileSync(fp, 'utf-8');
  
  // Replace simple patterns like: {data.skills?.length > 0 && (
  content = content.replace(/\{data\.(\w+)\?\.length > 0 && \(/g, "{(data.activeTabs?.includes('$1') && data.$1?.length > 0) && (");
  
  // Replace compound like: {(data.certifications?.length > 0 || data.awards?.length > 0) && (
  content = content.replace(/data\.(\w+)\?\.length > 0/g, "(data.activeTabs?.includes('$1') && data.$1?.length > 0)");
  
  fs.writeFileSync(fp, content);
  console.log('Updated', f);
});
