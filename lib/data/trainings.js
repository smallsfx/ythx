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

/** 机构数据 */
let datas = [{
  id: 1,
  title: "【悦通慧享】婴幼儿早教",
  img: "/assets/news/2.jpg",
  tags: [1],
  evaluates: [{
      id: 1,
      name: '汇通麻麻',
      img: '/assets/head-icon/avatar1.jpg',
      time: '4月1日 10:30',
      rate: 4,
      addr: {
        desc: '上海市 - 普陀区 - 长风海洋世界'
      },
      text: '这里应该写一些关于本项活动的评价，内容多少不做限制。',
      thumbup: 10,
      thumbupOn: true
    },
    {
      id: 2,
      name: '汇通巴巴',
      img: '/assets/head-icon/avatar2.jpg',
      time: '4月1日 10:30',
      rate: 5,
      addr: {
        desc: '上海市 - 普陀区 - 长风海洋世界'
      },
      text: '这里应该写一些关于本项活动的评价，内容多少不做限制。',
      imgs: [{
          id: 1,
          img: '/assets/news/1-1.jpg'
        },
        {
          id: 2,
          img: '/assets/news/1-2.jpg'
        },
        {
          id: 3,
          img: '/assets/news/1-3.jpg'
        }
      ],
      thumbup: 109,
      thumbupOn: false
    }
  ],
}, {
  id: 2,
  title: "【悦通慧享】婴幼儿英语班",
  img: "/assets/news/5.jpg",
  tags: [1]
}];

let _TYPE = TYPE.TRAINING;

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

  item.signup = signups.find((p) => {
    return p.owner == item.id && p.type == _TYPE;
  });

  var taglist = [];
  item.tags.forEach((tagid) => {
    taglist.push(tags.find((p) => {
      return p.id == tagid
    }));
  });
  item.tags = taglist;
});

module.exports = datas;