import activityTypes from '../lib/data/activity-types';
import schools from '../lib/data/schools';
import trainings from '../lib/data/trainings';
import activities from '../lib/data/activities';
import {
  TYPE
} from '../lib/data/_dictionary';

var hosts = [{
    id: 1,
    img: '/assets/news/6.jpg'
  },
  {
    id: 2,
    img: '/assets/news/4.jpg'
  },
  {
    id: 3,
    img: '/assets/news/3.jpg'
  }
];

module.exports = {
  TYPE: TYPE,
  /**
   * 查询数据
   * @param {string} type 项目类型
   * @param {string} title 检索标题
   * @return {object[]}
   */
  select: (type, title) => {
    var result = [];

    // 处理活动数据
    if (!type || type == TYPE.ACTIVITY) {
      activities.forEach((item, index) => {
        if (title && item.title.indexOf(title) > -1) return;
        result.push(item);
      });
    }

    // 处理机构数据
    if (!type || type == TYPE.TRAINING) {
      trainings.forEach((item, index) => {
        if (title && item.title.indexOf(title) > -1) return;
        result.push(item);
      });
    }

    // 处理学校数据
    if (!type || type == TYPE.SCHOOL) {
      schools.forEach((item, index) => {
        if (title && item.title.indexOf(title) > -1) return;
        result.push(item);
      });
    }
    return result;
  },

  /**
   * 根据编号获取指定数据
   * @param {string} id 项目编号
   * @param {string} type 项目类型
   */
  find: (id, type) => {
    if (type == TYPE.ACTIVITY) {
      return activities.find((p) => p.id == id);
    } else if (type == TYPE.TRAINING) {
      return trainings.find((p) => p.id == id);
    } else if (type == TYPE.SCHOOL) {
      return schools.find((p) => p.id == id);
    }
  },

  /**
   * 获取全部活动类型
   * @return {object[]} 返回全部活动类型
   */
  getTypes: () => {
    return activityTypes;
  },

  /**
   * 获取热门推荐活动
   * @return {object[]} 返回全部活动类型
   */
  getHots: () => {
    return hosts;
  }
}