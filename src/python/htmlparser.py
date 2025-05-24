import json
import requests
from bs4 import BeautifulSoup
import re
import os

request_urls = {"naughtydog":"https://www.naughtydog.com/research"}
r = requests.get(request_urls["naughtydog"])

soup = BeautifulSoup(r.text,'html')


def extract_n_dog(soup):
  articles = soup.find_all("article",class_='news-item row not-first')     # find all article tag
  json_data = []
  for article in articles:
      a_tag = article.find('a', class_='media d-block cover w-100')
      blog_url = a_tag['href']

      style = a_tag['style']
      match = re.search(r"url\(['\"]?(.*?)['\"]?\)", style)
      if match:
        image_url = match.group(1)
        
      title = a_tag['title']

      author_tag = article.find('a', class_='author')
      author_name = author_tag.get_text(strip=True)

      date_tag = article.find('div',class_='date') 
      date = date_tag.get_text(strip=True)

      data = {
          "blog_url":blog_url,
          "image_url":image_url,
          "title":title,
          "author_name":author_name,
          "date":date
      }
      json_data.append(data)

  if os.path.exists('article_info.json'):
    os.remove('article_info.json')

  with open('article_info.json', 'w', encoding='utf-8') as f:
      json.dump(json_data, f, ensure_ascii=False, indent=2)


extract_n_dog(soup)

