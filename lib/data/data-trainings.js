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

let _TYPE = TYPE.TRAINING;
/** 机构数据 */
let datas = [
  {
    id: 1,
    title: "【悦通慧享】婴幼儿早教",
    img: "/assets/news/t-1.jpg",
    tags: [1],
  }, {
    id: 2,
    title: "【悦通慧享】婴幼儿英语班",
    img: "/assets/news/t-2.jpg",
    tags: [1]
  }, {
    id: 3,
    title: "东方爱婴沈河中心",
    img: "/assets/news/t-3.jpg",
    tags: ['启蒙类', '创意类'],
    telphone: '024-31303102'
  }, {
    id: 4,
    title: "UGROWUP优成长中心",
    img: "/assets/news/t-4.jpg",
    tags: ['启蒙类', '托班'],
    telphone: '024-2291399'
  }
];

datas.forEach((item, index) => {
  item.type = _TYPE;
  item.addr = addrs.get(item.id, _TYPE);
  item.evaluate = evaluates.get(item.id, _TYPE);
  // 处理详情数据
  item.desc = describes.get(item.id, _TYPE);

  item.signup = signups.find((p) => {
    return p.owner == item.id && p.type == _TYPE;
  });

  item.tags = tags.transf(item.tags);
});

module.exports = datas;