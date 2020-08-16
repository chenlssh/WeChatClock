// 获取域名信息
const api = require('../../config/config.js');
const { $Message } = require('../dist/base/index');
// 获取app应用实例
const app = getApp();

Page({
    data : {
        taskIetms:[],
        taskContent:'',
        addTaskVisible:false,
        actions : [
            {
                name : '删除',
                color : '#fff',
                fontsize : '20',
                width : 100,
                icon : 'delete',
                background : '#ed3f14'
            }
        ]
    },
    getUserTaskList: function(){
        let that = this;
        wx.request({
            url: api.userTaskUrl+'getTaskList',
            method: 'POST',
            data: {
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
    deleteUserTask:function(msg){
        let that = this;
        let delInfo = msg.currentTarget.dataset;
        console.log(delInfo);
        wx.request({
            url: api.userTaskUrl+'deleteUserTask',
            method: 'POST',
            data:{
                user_id: app.getWxOpenId(),
                task_id: delInfo.task_id
            },
            success:function(){
                //重新刷新列表
                that.getUserTaskList();
            },
            error:function(){
                console.log("delete failed")
            }
            
        });
    },
    addUserTask:function(){
        this.setData({
            addTaskVisible:true
        });
        
    },
    submitTask:function(ev){
        let that = this;
        let taskContentTemp = that.data.taskContent;
        if(taskContentTemp === ""){
            $Message({
                content: '请输入你的任务！！！',
                type: 'error'
            });
            return;
        }
        wx.request({
            url: api.userTaskUrl+'saveUserTask',
            method: 'POST',
            data:{
                user_id: app.getWxOpenId(),
                task_name: taskContentTemp
            },
            success:function(){
                // 清空并关闭输入框，刷新列表
                that.setData({
                    addTaskVisible:false,
                    taskContent:""
                });
                that.getUserTaskList();
            },
            error:function(){
                console.log("add user's task fail")
            }
        });
    },
    closeTaskModal:function(){
        this.setData({
            addTaskVisible:false
        });
    },
    inputTaskContent:function(ev){
        this.setData({
            taskContent:ev.detail.detail.value
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        that.getUserTaskList();
    }
});