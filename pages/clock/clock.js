// 获取域名信息
const api = require('../../config/config.js');
const {$Toast} = require('../dist/base/index');
const app = getApp(); // 获取app应用实例
let registerStatus; // 用户注册状态 NEED_REGISTER-待注册；HAVING_REGISTER-已注册
Page({
    data: {
        taskIetms:[],
        ismask:""
    },
    getUserTaskList: function(){
        let that = this;
        console.log(api.todayClockTaskUrl);
        wx.request({
            url: api.todayClockTaskUrl+'getTodayTaskList',
            method: "POST",
            data:{
                user_id: app.getWxOpenId()
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                let data = res.data;
                that.setData({
                    taskIetms:data
                })
            },
            error: function(err){
                console.log(err);
            }
        })
    },
    clockCard:function(clockMsg){
        let clockCardMsg = clockMsg.currentTarget.dataset;
        console.log(clockCardMsg);
        console.log(clockMsg);
        wx.request({
            url: api.todayClockTaskUrl+'clockTodayTask',
            method: 'POST',
            data:{
                user_id: app.getWxOpenId(),
                task_id: clockCardMsg.id
            },
            success: function() {
                $Toast({
                    content: '打卡成功',
                    type: 'success'
                });
                setTimeout(() => {
                    $Toast.hide();
                }, 1000);
            },
            error: function(err){
                $Toast({
                    content: '请稍后再试',
                    type: 'error'
                });
                setTimeout(() => {
                    $Toast.hide();
                }, 1000);
            }
        })
    },
    closeHide:function(e){
        this.setData({
          ismask: 'none'
        });
    },
    bindGetUserInfo:function(res){
        let that = this;
        let userInfo = res.detail.userInfo;
        //获取用户信息，绑定用户
        wx.request({
            url: api.baseUrl+'register',
            method: 'POST',
            data:{
                open_id: app.getWxOpenId(),
                wx_nick_name: userInfo.nickName,
                gender: userInfo.gender
            },
            success: function(){
                wx.setStorageSync('registerStatus', "HAVING_REGISTER");
                that.getUserTaskList();
            },
            error: function(err){
                $Toast({
                    content: '授权失败',
                    type: 'error'
                });
                setTimeout(() => {
                    $Toast.hide();
                }, 1000);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        registerStatus = app.getRegisterStatus();
        console.log(registerStatus);
        if(registerStatus === "HAVING_REGISTER"){
            that.closeHide();
            that.getUserTaskList();
        }
    },
    onTabItemTap(item) {
        let that = this;
        that.getUserTaskList();
    }
});
