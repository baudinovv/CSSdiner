let list = document.getElementById('ol-list__first');
let list2 = document.getElementById('ol-list__second');
const makelist = (listNode, count) => listNode.innerHTML = new Array(count).fill('<li></li>').join('');
makelist(list, 20);
makelist(list2, 20);

