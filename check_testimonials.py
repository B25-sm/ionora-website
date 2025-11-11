import os,re,sys,urllib.parse,urllib.request
ECHO is on.
deploy = os.environ.get('DEPLOY_URL', 'https://ionora.in')
print()
print('1) Fetching production HTML and extracting <source src=...> values...')
print()
def fetch(url, method='GET'):
    req = urllib.request.Request(url, method=method, headers={'User-Agent': 'curl/8.4'})
    return urllib.request.urlopen(req)
ECHO is on.
def normalize_url(base, path):
    if path.startswith('http://') or path.startswith('https://'):
        return path
    if path.startswith('//'):
        return 'https:' + path
    return urllib.parse.urljoin(base if base.endswith('/') else base + '/', path)
ECHO is on.
def main():
    print()
    print('1) Fetching production HTML and extracting <source src=...> values...')
    print()
    try:
        with fetch(deploy) as resp:
            html = resp.read().decode('utf-8', 'ignore')
    except Exception as exc:
        print(f'Failed to fetch {deploy}: {exc}')
        sys.exit(1)
