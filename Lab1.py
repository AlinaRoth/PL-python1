import requests
import re
Urls = 'http://www.csd.tsu.ru/'
LimitDeep = 10
html = requests.get(Urls)
Emails = []
VisUrl = []
def Pages(html):
	Output = re.findall(r'\b[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+(?<![.])', html.text)
	Flag = 0
	for i in range(len(Output)):
		for j in range(len(Emails)):
			if Output[i] == Emails[j]:
					Flag = 1
		if Flag == 0:
			Emails.append(Output[i])
		Flag = 0
	Output = []
def Survey(html, deep):
	VisUrl.append(html.url)
	deep += 1
	d = deep
	Pages(html)
	New = Urls + '([A-z0-9-/+=&?_$]+)'
	Reference = re.findall(r'<a href=[\'\"]'+ New + '[\'\"]>', html.text)
	if deep < LimitDeep:
		Check = 0
		for i in range(len(Reference)):
			for j in range(len(VisUrl)):
				if Urls + Reference[i] == VisUrl[j]:
					Check = 1
			if Check == 0:
				rg = requests.get(Urls + Reference[i])
				Survey(rg, deep)
			Check = 0
		deep = d
Survey(html,0)	
print(Emails)
