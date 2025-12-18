let aliveList =  [];
let nameList = [];
let attrList = [];
let attrNum = {};

function generateRyosei() {
  const ryoseiNum = attrList.length;
  for (let i = 0; i < ryoseiNum; i++) {
    aliveList.push(true);
  }
}

function winCheck() {
  if (attrNum["フリーライダー"] == 0) playGroundWrite(`<h1>SC勝利！！！</h1>`);
  if (attrNum["SC長"]+attrNum["デスドラ"]+attrNum["JK部長"]+attrNum["部長委員長"]+attrNum["B3"]+attrNum["議長団"] == 0) playGroundWrite(`<h1>熊野寮滅亡！！！</h1>`);
}

function chooseClaimer() {
  const ryoseiNum = attrList.length;
  while (true) {
    const candidate = Math.floor(Math.random() * (ryoseiNum + 1));
    if (aliveList[candidate]) return candidate;
  }
}

function goodbye(tairyo) {
  aliveList[tairyo] = false;
  attrNum[attrList[tairyo]]--;
  winCheck();
}