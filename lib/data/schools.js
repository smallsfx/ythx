import tags from './tags';
import addrs from './addrs';
import videos from './videos';
import signups from './signups';
import evaluates from './evaluates';
import describes from './describes';
import publishers from './publishers';
import {
  TYPE
} from './_dictionary';

/** 学校数据 */
let datas = [{
  id: 1,
  title: "南京一小",
  img: "/assets/news/6.jpg",
  time: '10分钟前',
  tags: [1],
}, {
  id: 2,
  title: "浑南一小",
  img: "/assets/news/7.jpg",
  time: '昨天',
  tags: [1],
}, {
  id: 3,
  title: "二经二小",
  img: "/assets/news/7.jpg",
  time: '昨天',
  tags: [1],
}];


let _TYPE = TYPE.SCHOOL;

datas.forEach((item, index) => {
  item.type = _TYPE;

  var addr = addrs.find((p) => {
    return p.owner == item.id && p.type == _TYPE;
  });
  if (addr) {
    item.addr = addr;
  } else {
    item.addr = {
      desc: '尚未选择地点...'
    }
  }

  item.evaluate = evaluates.find((p) => {
    return p.owner == item.id && p.type == _TYPE;
  });
  // 处理详情数据
  var describe = describes.find((p) => {
    return p.owner == item.id && p.type == _TYPE;
  });
  if (describe) {
    item.desc = describe.content;
  } else {
    item.desc = '没有详细描述';
  }

  var taglist = [];
  item.tags.forEach((tagid) => {
    taglist.push(tags.find((p) => {
      return p.id == tagid
    }));
  });
  item.tags = taglist;
});

module.exports = datas;