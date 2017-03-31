const request = require('superagent')

const categories = ['future','culture']
const page = 1
const itemNumber = 5

exports.reqBBCArticle = function (req, res, next) {
    request.get('http://www.bbc.com/' + categories[0] + '/data/v1/search/story-by-tag/ww' + categories[0] + '/britain?page='+ page + '&itemsPerPage=' + itemNumber)
        .set('Host', 'www.bbc.com')
        .set('Cookie', 'ckpf_sscid=70af7019-2d09-4ca9-a5ae-5225fd474016; BBC-UID=0788b81c865fc46c634b528bfaf31df76b6b78a63bcfb536a3e33f07517641b40Mozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_11_6%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chr; test_group=b; _vwo_uuid_v2=2ABA4E98C70CBE6BAC3C9C485EF545A0|58cd4cedcf9dc72311ce1b3a323d690a; ckns_orb_cachedfig={"uk":0,"ck":0,"ad":1,"ap":0,"tb":0,"mb":0,"eu":0,"df":0}; mmcore.tst=0.198; mm_random=41; ecos.dt=1490857170366')
        .set('User-Agent','Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1')
        .end(function (err, sres) {
            if (err) {
                next(err)
            }
            res.locals.resJson = JSON.parse(sres.text)
            next()
        })
}

