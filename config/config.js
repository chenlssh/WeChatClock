//服务器域名
const baseUrl = 'https://www.pandog.xyz:443/';
//const baseUrl = 'https://120.55.113.44:443/';
//const baseUrl = 'https://127.0.0.1:443/';
const userTaskUrl = baseUrl+'task/';
const todayClockTaskUrl = baseUrl+'clockTask/';
const statisticCard = baseUrl+'statisticCard/';

module.exports = {
    baseUrl: baseUrl,
    userTaskUrl: userTaskUrl,
    todayClockTaskUrl: todayClockTaskUrl,
    statisticCard: statisticCard
}