/** 消息数据数据 */

import contacts from './contacts';
let datas = [
  {
    content:[
      'Mac 微信已登录'
    ]
  }, {
    group:{
      id:'xxxxklsjdlskf',
      name:'悦通慧享：官方客服'
    },
    new:1,
    contacts:[1,2,3,4],
    contents:[
      {contact:1,content:'Hello World!',date:'2017年1月1日'},
      {contact:2,content:'Hello World!',date:'昨天'},
      {contact:3,content:'Hello World!',date:'刚刚'}
    ]
  }, {
    new:2,
    contacts:[1],
    contents:[
      {contact:1,content:'Hello World!',date:'2017年1月1日'},
      {contact:2,content:'Hello World!',date:'昨天'},
      {contact:2,content:'Hello World!',date:'昨天'},
      {contact:2,content:'Hello World!',date:'昨天'},
      {contact:2,img:'/assets/news/7.jpg',date:'刚刚'}
    ]
  }, {
    contacts:[3],
    contents:[
      {contact:2,content:'Hello World!',date:'2017年1月1日'},
      {contact:3,content:'Hello World!',date:'昨天'},
      {contact:3,content:'最后一条消息。',date:'刚刚'}
    ]
  }
];

datas.forEach((item, index) => {

  if( item.contacts){
    var contactList = [];
    item.contacts.forEach((contactID) => {
      contactList.push(contacts.list.find((p) => {
        return p.id == contactID
      }));
    });
    item.contacts = contactList;
  }

  if( item.contents){
    item.contents.forEach((content)=>{
      content.contact = contacts.list.find((p) => {
        return p.id == content.contact;
      });
    });
  }

});
module.exports = datas;