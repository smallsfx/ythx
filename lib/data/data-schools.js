import tags from './attr-tags';
import addrs from './attr-addrs';
import videos from './attr-videos';
import signups from './attr-signups';
import evaluates from './attr-evaluates';
import describes from './attr-describes';
import publishers from './attr-publishers';
import {
  TYPE
} from './_dictionary';

/** 学校数据 */
let datas = [{
  id: 1,
  title: "南京一小",
  img: "/assets/news/s-1.jpg",
  time: '10分钟前',
  tags: [1],
}, {
  id: 2,
  title: "浑南一小",
  img: "/assets/news/s-2.jpg",
  time: '昨天',
  tags: [1],
}, {
  id: 3,
  title: "二经二小",
  img: "/assets/news/s-3.jpg",
  time: '昨天',
  tags: [1],
}];


let _TYPE = TYPE.SCHOOL;

datas.forEach((item, index) => {
  item.type = _TYPE;
  item.addr = addrs.get(item.id, _TYPE);
  item.evaluate = evaluates.get(item.id, _TYPE);
  // 处理详情数据
  item.desc = describes.get(item.id, _TYPE);

  item.tags = tags.transf(item.tags);
});

module.exports = datas;