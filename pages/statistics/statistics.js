// 获取域名信息
const api = require('../../config/config.js');
// 获取app应用实例
const app = getApp();
Page({
    data: {
        cards:[]
    },
    getStatistic: function(){
        let that = this;
        wx.request({
            url: api.statisticCard,
            method: "POST",
            data: {
                user_id: app.getWxOpenId()
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                let data = res.data;
                that.setData({
                    cards:data
                })
            },
            error: function(err){
                console.log(err);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        that.getStatistic();
    },
    onTabItemTap(item) {
        let that = this;
        that.getStatistic();
    }
});
