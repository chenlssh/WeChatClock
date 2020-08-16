// 获取域名信息
const api = require('./config/config.js');
App({
  onLaunch: function () { //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    let that = this;
    that.checkUserStatus();
  },
  checkUserStatus: function () {
    let that = this;
    /* 检查用户注册状态 */
    if(that.getRegisterStatus() === "NEED_REGISTER" || that.getRegisterStatus() === "" ||
       that.getWxOpenId() === ""){
      that.doLogin();
    }
  },

  doLogin: function () {
    let that = this;
        // 登录，获取微信登录code
        wx.login({
          success: function(loginRes) {
            console.log(loginRes);
            if(loginRes.code){
              wx.request({
                url: api.baseUrl+"checkRegisterStatus",
                data: {
                  code:loginRes.code
                },
                header: {'content-type':'application/json'},
                method: 'POST',
                success: (res)=>{
                  wx.setStorageSync('registerStatus', res.data.registerStatus); // 用户是否已经注册，若无则需获取用户信息注册
                  wx.setStorageSync('wxOpenId', res.data.wxOpenId); // 缓存用户openId
                },
                fail: ()=>{
                  console.log("connect with seriver had some error");
                }
              });
            }else{
              console.log("fail to get loginCode!!!");
            }
          }
        })
  },
  // 获取用户注册标识 供全局调用
  getRegisterStatus: function () {
    return wx.getStorageSync('registerStatus');
  },
  // 获取微信openId 供全局调用
  getWxOpenId: function () {
    return wx.getStorageSync('wxOpenId');
  }
})