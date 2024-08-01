import utilsApi from '../assets/js/utils'
import ajax from '../assets/js/axios.config';

const ipUrl = ajax.itemStatistics;
export default utilsApi.creatApi({
    // 月数据曲线图
    diagramData: ['post', '/analysis/diagram/data'],

    headlinesDiagramData: ['post', '/analysis/diagram/headlines'],

    // 游戏订单统计数据
    orderStaticsData: ['get', '/admin-order/statisticsData'],

    // 幻灯推荐折线图
    slideDiagramData: ['get',`${ipUrl}/statistics/event/slideRecommendData`],
});