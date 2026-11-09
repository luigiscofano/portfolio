from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re
root=Path(__file__).resolve().parents[1]/'out'
class Links(HTMLParser):
 def __init__(self): super().__init__(); self.urls=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for key in ['src','href']:
   if a.get(key):self.urls.append(a[key])
  if a.get('style'): self.urls+=re.findall(r'url\([\'"]?([^\)\'\"]+)',a['style'])
checked=set()
for file in list(root.rglob('*.html'))+list(root.rglob('*.css')):
 text=file.read_text()
 if file.suffix=='.html':
  parser=Links();parser.feed(text);urls=parser.urls
 else:urls=re.findall(r'url\([\'"]?([^\)\'\"]+)',text)
 for url in urls:
  if not url.startswith('/') or url.startswith('//'):continue
  path=unquote(urlsplit(url).path)
  assert path.startswith('/portfolio/'),(file,path)
  local=root/path.removeprefix('/portfolio/')
  assert local.exists(),(file,path)
  if local.is_dir():assert (local/'index.html').exists(),local
  checked.add(path)
for route in ['index.html','atualizar/index.html','creditos/index.html','.nojekyll']:
 assert (root/route).is_file(),route
print(f'PASS: three static pages, .nojekyll, and {len(checked)} distinct linked resources/routes exist under /portfolio/.')
