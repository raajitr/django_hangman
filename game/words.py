from bs4 import BeautifulSoup
import requests
import pickle

r = requests.get('http://www.graduateshotline.com/gre-word-list.html')
data = r.text
soup = BeautifulSoup(data, "html.parser")
table = soup.find('table', class_='tablex border1')
words = [i.get_text() for i in table.find_all('td')]
i = 0
count = 1
dictionary = {}
while (i<len(words)):
	word, meaning = words[i:i+2]
	print "{}:{}".format(word, meaning)
	i+=2
	dictionary[str(count)] = {}
	dictionary[str(count)]['word'] = word
	dictionary[str(count)]['meaning'] = meaning
	count +=1

with open('data.pkl', 'wb') as f:
	pickle.dump(dictionary, f)
print "DONE"

#>>> table = soup.find('table', class_='tablex border1')
# >>> for link in table.find_all('td'):
# ...  print link.get_text()