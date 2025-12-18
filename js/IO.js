let playGround = document.getElementById("playGround");

function playGroundWrite(str) {
  //console.log(str);
  playGround.innerHTML = str; 
}

function gameStart() {
  const str = `<h2>人数入力</h2>
      <h3>フリーライダー陣営（FR）</h3>
      <p>フリーライダー……人狼。提起者にはなれない</p><input type="number" id="fr" value="0">
      <p>SN……狂人。採決拒否を提起されると死ぬ</p><input type="number" id="sn" value="0">
      <br>

      <h3>FRアンチ陣営（SC）</h3>
      <p>SC長……占い師</p><input type="number" id="scboss" value="0">
      <p>デスドラ……霊媒師。夜をひとつ消せる</p><input type="number" id="death" value="0">
      <p>JK部長……騎士</p><input type="number" id="jk" value="0">
      <p>部長委員長……市民。役職の重複はない</p><input type="number" id="bucho" value="0">
      <p>B3……お香を焚いて誰かのはたらきを2日止められる</p><input type="number" id="b3" value="0">
      <p>議長団……採決拒否を提起できる</p><input type="number" id="chair" value="0">
      <br>
      <button onclick="getAttr();nameInput()">入力</button>
  `;
  playGroundWrite(str);
}

function getAttr() {
  attrNum["フリーライダー"] = document.getElementById("fr").value;
  attrNum["SN"] = document.getElementById("sn").value;

  attrNum["SC長"] = document.getElementById("scboss").value;
  attrNum["デスドラ"] = document.getElementById("death").value;
  attrNum["JK部長"] = document.getElementById("jk").value;
  attrNum["部長委員長"] = document.getElementById("bucho").value;
  attrNum["B3"] = document.getElementById("b3").value;
  attrNum["議長団"] = document.getElementById("chair").value;

  for (let i = 0; i < attrNum["フリーライダー"]; i++) attrList.push("フリーライダー");
  for (let i = 0; i < attrNum["SN"]; i++) attrList.push("SN");
  
  for (let i = 0; i < attrNum["SC長"]; i++) attrList.push("SC長");
  for (let i = 0; i < attrNum["デスドラ"]; i++) attrList.push("デスドラ");
  for (let i = 0; i < attrNum["JK部長"]; i++) attrList.push("JK部長");
  for (let i = 0; i < attrNum["部長委員長"]; i++) attrList.push("部長委員長");
  for (let i = 0; i < attrNum["B3"]; i++) attrList.push("B3");
  for (let i = 0; i < attrNum["議長団"]; i++) attrList.push("議長団");

  shuffle(attrList);
}

function nameInput() {
  const ryoseiNum = attrList.length;
  let str = "<h2>名前を入力</h2>";
  for (let i = 0; i < ryoseiNum; i++) {
    str += `<input type="text" id="name${i}"><br>`;
  }
  str += `<button onclick=getName();discussion()>第1議題へ</button>`
  playGroundWrite(str);
}

function getName() {
  const ryoseiNum = attrList.length;
  for (let i = 0; i < ryoseiNum; i++) {
    const name = document.getElementById(`name${i}`).value;
    nameList.push(name);
  }
  generateRyosei();
}

function discussion() {
  const claimer = chooseClaimer();
  const claimerName = nameList[claimer];
  let str = `<h2>提起者は${claimerName}です！</h2>
  <button onclick="vote()">投票にすすむ</button>
  `;
  playGroundWrite(str);
}

let voteRec = [];
function vote() {
  const ryoseiNum = attrList.length;
  for (let i = 0; i < ryoseiNum; i++) voteRec[i] = 0;
  ryoseiVote(0,false);
}

function ryoseiVote(who,identified) {
  const ryoseiNum = attrList.length;
  if (who >= ryoseiNum) {
    voteOpen();
    return;
  }
  else if (aliveList[who] && identified) {
    str = `<h2>誰を強制退寮にしますか？</h2>`;
    for (let i = 0; i < ryoseiNum; i++) {
      if (aliveList[i]) str += `<button onclick=voteTo(${who},${i})>${nameList[i]}</button><br>`;
    }
  } else if (aliveList[who]) {
    str = `<h2>あなたは${nameList[who]}ですか？</h2>
    <button onclick="ryoseiVote(${who},true)">はい</button>`;
  }
  else {
    ryoseiVote(who+1,false);
  }
  playGroundWrite(str);
}

function voteTo(who,ryosei) {
  voteRec[ryosei]++;
  ryoseiVote(who+1,false);
}

function voteOpen() {
  let tairyo = 0;
  for (let i = 0; i < voteRec.length; i++) if (voteRec[i] > voteRec[tairyo]) tairyo = i;
  goodbye(tairyo);
  const str = `<h2>${nameList[tairyo]}さんは、強制退寮になりました！</h2>
  <button onclick="rest()">休憩する</button>`;
  playGroundWrite(str);
  return;
}

function rest() {

}