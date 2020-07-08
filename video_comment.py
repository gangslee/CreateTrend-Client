#!/usr/bin/env python

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import Chrome
from bs4 import BeautifulSoup
import time
import re
import datetime as dt
import pandas as pd
video_savedata = pd.DataFrame({'name':[],
                     'thumbnail':[],
                     'view':[],
                     'video_url':[],
                     'start_date': []})
comment_savedata = pd.DataFrame({'comment_content':[],
                                'goods':[],
                                'write_date':[]})

topComment_savedata=pd.DataFrame({''})
driver=None
def getCrawlingLink():
    return input("링크를 입력해주세요.")

def getDriver():
    global driver 
    driver= Chrome(executable_path="/Users/jun/juny/swm/crawler/practice/chromedriver")
    

def openWindow(link):
    driver.implicitly_wait(2)
    driver.maximize_window()
    driver.get(link)

def scrollDownVideo():
    driver.find_elements_by_xpath('//*[@id="tabsContent"]/paper-tab[2]')[0].click()
    body=driver.find_element_by_tag_name('body')
    time.sleep(1)

    #동영상 모두 스크롤 다운
    SCROLL_PAUSE_TIME = 0.3
    body.send_keys(Keys.PAGE_DOWN)
    time.sleep(1.5)
    last_height = driver.execute_script("return window.onload=function(){document.querySelector('#page-manager > ytd-browse:nth-child(4)').scrollHeight;}")

    while True:
        # Scroll down to bottom
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(SCROLL_PAUSE_TIME)
        body.send_keys(Keys.PAGE_DOWN)

        # Wait to load page
        time.sleep(1.5)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return window.onload=function(){document.querySelector('#page-manager > ytd-browse:nth-child(4)').scrollHeight;}")
        if new_height == last_height:
            break
        last_height = new_height

def scrollDownComment():
    body=driver.find_element_by_tag_name('body')
    SCROLL_PAUSE_TIME = 0.3
    # Get scroll height
    #댓글을 나오게 하기위에 임의적으로 키다운 한번.
    time.sleep(2)
    body.send_keys(Keys.PAGE_DOWN)
    time.sleep(1.5)
    try:
        driver.find_elements_by_xpath('/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/div[6]/div[3]/ytd-video-secondary-info-renderer/div/ytd-expander/paper-button[2]')[0].send_keys(Keys.ENTER)
    except:
        print("간략히")
    last_height = driver.execute_script("return document.querySelector('#primary').scrollHeight;")
    while True:
        # Scroll down to bottom
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(SCROLL_PAUSE_TIME)
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(SCROLL_PAUSE_TIME)
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(SCROLL_PAUSE_TIME)
        body.send_keys(Keys.PAGE_DOWN)
        # Wait to load page
        time.sleep(1.5)
        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.querySelector('#primary').scrollHeight;")
        if new_height == last_height:
            break
        last_height = new_height
    # 참조 : https://stackoverflow.com/a/28928684/1316860
    time.sleep(1.5)

def showReply():
    #답글보기 클릭하기
    scroll_down_btns=driver.find_elements_by_xpath('//ytd-button-renderer[@id="more-replies"]/a/paper-button')
    for i in scroll_down_btns:
        i.send_keys(Keys.ENTER)
    #답글 더보기 클릭하기
    while 1:
        continuations=driver.find_elements_by_xpath('//*[@id="continuation"]/yt-next-continuation/paper-button')
        if not len(continuations):
            break
        for i in continuations:
            try:
                i.send_keys(Keys.ENTER)
            except:
                continue
        time.sleep(1)

def getVideoLinks():
    html0=driver.page_source
    html=BeautifulSoup(html0,'html.parser')
    video_list0 = html.find('div',{'class':'style-scope ytd-grid-renderer'})
    video_list2 = video_list0.find_all('a',{'id':'video-title'})
    base_url = 'http://www.youtube.com' #영상별url이 유튜브 기본 url을 포함하지 않기 때문에 꼭 확인해줘야 함
    main_url = []
    for i in range(len(video_list2)):
        url = base_url+video_list2[i]['href']
        main_url.append(url)
    return main_url

def saveData(start_url):
    global comment_savedata
    global video_savedata
    html_s0 = driver.page_source
    html_s = BeautifulSoup(html_s0,'html.parser')
    #모든 댓글 수집하기
    comment0 = html_s.find_all('div',{'id':"body",'class':'style-scope ytd-comment-renderer'})
    for i in range(len(comment0)):
        #댓글
        try:
            comment_content = comment0[i].find('yt-formatted-string',{'id':'content-text','class':'style-scope ytd-comment-renderer'}).text
        except:
            continue
        try:
            write_date=comment0[i].find('a',{'class':'yt-simple-endpoint style-scope yt-formatted-string'}).text
        except:
            write_date="null"
        try:
            likenum_text = comment0[i].find('span',{'id':'vote-count-left'}).text
            goods = "".join(re.findall('[0-9]',likenum_text))
        except:
            goods = 0
        insert_data =  pd.DataFrame({'comment_content':[comment_content],
                                                'goods':[goods],
                                                'write_date':[write_date]})
        comment_savedata = comment_savedata.append(insert_data)
    
    name=driver.find_elements_by_xpath('//*[@id="container"]/h1/yt-formatted-string')[0].text
    view=driver.find_elements_by_xpath('//*[@id="count"]/yt-view-count-renderer/span[1]')[0].text
    start_date=driver.find_elements_by_xpath('//*[@id="date"]/yt-formatted-string')[0].text
    try:
        thumbnail=driver.find_elements_by_xpath('//*[@id="description"]/yt-formatted-string/span[3]')[0].text
    except:
        thumbnail="null"
    
    video_url=start_url
    insert_data=pd.DataFrame({'name':[name], 'view':[view],'start_date':[start_date],'thumbnail':[thumbnail],'video_url':[video_url]})
    video_savedata=video_savedata.append(insert_data)


def startCrawling(links):
    global comment_savedata
    global video_savedata
    for number_of_url in range(len(links)): #리스트로 만들어져 있는 url중 한개의 url을 이용 range(len(links))
        start_url=links[number_of_url]
        driver.get(start_url)
        scrollDownComment()
        time.sleep(1.5)
        showReply()
        saveData(start_url)
    comment_savedata.to_csv("comment_log.csv",index=True)
    video_savedata.to_csv("video_log.csv",index=True)


def main():
    link = getCrawlingLink()
    getDriver()
    openWindow(link)
    time.sleep(1)
    scrollDownVideo()
    links = getVideoLinks()
    startCrawling(links)
    
    

if __name__ == "__main__":
    main()
