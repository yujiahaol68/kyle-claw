# kyle-claw

> kyle为蝙蝠侠中Catwoman的真名，中文译为猫女之爪

### 这是node.js的爬虫聚合

其中功能有:

### 爬取大嘴巴巴的妹子美图并批量下载到本地pics文件夹

```bash
$ cd request
$ node getImgSet.js 
```

![](/preview/meizi.png)


文件中`baseUrl`即为每个详细图集的地址，要去除后缀`.html`

### BBC部分API调用爬取特定类别文章

### 51VOA的英语新闻爬取并发送邮箱

`storage/email/emailConfig.js`

配置好发件服务器和邮件相关信息

```bash
$ cd request
$ node get_voa_send.js
```
