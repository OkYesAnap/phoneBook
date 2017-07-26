/*


Создайте функцию конструктор.
У данной функции должны быть методы:
Преобразование телефонного номера из формата 0993378130 в (099) 33-78-130
Проверка, что телефонный номер содержит только числа
Добавление пользователей в объект
Удаление пользователя по имени, фамилии
Поиск пользователей по имени - отображает всех пользователей с одинаковым именем
Изменение имени, фамилии, телефонного номера у выбраного пользователя ( здесь должно быть реализовано через this )
Сортировка пользователей по номеру телефона, фамилии, имени и тд, по любому из свойств пользователя
Фильтр по указанному свойству*/
// upDownSort = true;
// users = [] /// closure array for users
// id = 0;
class CreatePhoneBook {
  constructor() {
    this.upDownSort = true;
    this.users = [];
    this.id = 0;
  }
  // users = [] /// closure array for users
  // id = 0;
  // upDownSort = true;
  byId(localId) {
    return this.users.filter((val) => {
      return localId == val.id;
    });
  }
  /// format from xxxxxxxxxx to (xxx) xx-xx-xxx
  addChars(telNum, chars, ...args) {
    //(phone, string of chars to add, array of places to add)
    let numArr = telNum.split("");
    for (let i = 0; i < args.length; i++) {
      numArr.splice(args[i], 0, chars[i]);
    }
    return numArr.join("");
  }
  /// check for only numbers
  numberOnly(telNum) {
    if (isNaN(telNum)) {
      return "Есть недопустимые знаки!";
    } else {
      return true;
    }
  }
  /// add new user to the closure
  addUser(telNum, fName, sName, localId = this.id) {
    if (localId == this.id) {
      this.id++;
    }
    this.users[localId] = { id: localId, telNum, fName, sName };
  }
  /// delete user by fName/sName
  delUser(dellStr) {
    this.users = this.users.filter(function (val) {
      return !(val.fName == dellStr || val.sName == dellStr);
    });
  }
  /// search user by fName/sName
  searchUser(dellStr) {
    return users.filter(function (val) {
      return val.fName == dellStr || val.sName == dellStr;
    });
  }
  /// change content
  changeContent(userToChange, newTelNum, newFName, newSName) {
    this.addUser(newTelNum, newFName, newSName, userToChange);
  }
  /// sort by column
  sortBy(sortVal) {
    this.upDownSort = this.upDownSort ? false : true;
    return this.users.sort((a, b) => {
      return this.upDownSort ? a[sortVal] > b[sortVal] : a[sortVal] < b[sortVal];
    });
  }
}

PhoneBook = new CreatePhoneBook();
console.log(PhoneBook);
PhoneBook.addUser(`0993378135`, `Andrew `, `Panaseyko `);
// console.log(PhoneBook.addChars("0993378130", "() --", 0, 4, 5, 8, 11)); //

// console.log(PhoneBook.numberOnly("0993378130"));
// console.log(PhoneBook.numberOnly("0993378130"));

PhoneBook.addUser(`0503032120`, `Марина`, `Ляшевич`);
PhoneBook.addUser(`0955088037`, `Анна`, `Панасейко`);
PhoneBook.addUser(`0661833242`, `Яна`, `Мостовая`);
PhoneBook.addUser(`0632580069`, `Света`, `Коломиец`);
PhoneBook.addUser(`0997002568`, `Юля`, `Радько`);
PhoneBook.addUser(`0500841734`, `Андрей`, `Панасейко`);
PhoneBook.addUser(`0503075310`, `Руслан`, `Каркач`);
PhoneBook.addUser(`0673799496`, `Сергей`, `Кияшко`);
PhoneBook.addUser(`0506385051`, `Виталий`, `Евдонов`);
PhoneBook.addUser(`0930251819`, `Богдан`, `Сябрук`);

// console.log(PhoneBook);

// PhoneBook.delUser("Andrew1");

// PhoneBook.delUser("Panaseyko5");

// //console.log(PhoneBook.searchUser("Panaseyko2")[0]);

// PhoneBook.changeContent(5, "123", "312", "123");

// console.log(PhoneBook.sortBy("telNum"));

var table = document.getElementById("phonesTable");
sortByTbl(PhoneBook.sortBy("telNum"));
function byPhone() {
  sortByTbl(PhoneBook.sortBy("telNum"));
}
function byFName() {
  sortByTbl(PhoneBook.sortBy("fName"));
}
function bySName() {
  sortByTbl(PhoneBook.sortBy("sName"));
}
function sortByTbl(tblArr) {
  let tblContent = '';
  let col = 0;
  tblArr.forEach(function (elem) {
    tblContent += `
				<tr onclick="showHide(${col})" id="col_${col}">
					<td colspan = "2">${elem.fName} ${elem.sName}<br>${PhoneBook.addChars(elem.telNum, "() --", 0, 4, 5, 8, 11)}</td>
				</tr>
				<tr id="col_${col}_func">
				<td><div onclick="PhoneBook.delUser('${elem.fName}'); sortByTbl(PhoneBook.sortBy('telNum'))">Удалить</div></td>
				<td><div onclick="editUser(${elem.id})">Редактировать</div></td>
				</tr>`;
    col++;
  });
  table.innerHTML = tblContent
}
function showHide(trId) {
  document.getElementById(`col_${trId}_func`).style.display = 'inline';
}
function editUser(UserId) {
  let user = PhoneBook.byId(UserId);
  console.log(user);
  let tblContent = `
			<tr><td>Имя    </td><td><input id = "fName" value='${user[0].fName}'></input></td></tr><tr></tr>
			<tr><td>Фамилия</td><td><input id = "sName" value='${user[0].sName}'></input></td></tr><tr></tr>
			<tr><td>Телефон</td><td><input id = "Tel" value='${user[0].telNum}'></input></td></tr><tr></tr>
			<tr><td onclick ="saveFunc(${UserId}); sortByTbl(PhoneBook.sortBy('sNam'))">Сохранить</td>
			<td onclick ="sortByTbl(PhoneBook.sortBy('sNam'))">Отмена</td></tr>`
  table.innerHTML = tblContent;
}
function saveFunc(UserId) {
  let fNam = document.getElementById("fName");
  let sNam = document.getElementById("sName");
  let tel = document.getElementById("Tel");
  PhoneBook.changeContent(UserId, tel.value, fNam.value, sNam.value);
}
function addUser() {
  let tblContent = `
			<tr><td>Имя    </td><td><input id = "fName" value=''></input></td></tr><tr></tr>
			<tr><td>Фамилия</td><td><input id = "sName" value=''></input></td></tr><tr></tr>
			<tr><td>Телефон</td><td><input id = "Tel" value=''></input></td></tr><tr></tr>
			<tr><td onclick ="saveFunc1(); sortByTbl(PhoneBook.sortBy('sNam'))">Сохранить</td>
			<td onclick ="sortByTbl(PhoneBook.sortBy('sNam'))">Отмена</td></tr>`
  table.innerHTML = tblContent;
}
function saveFunc1(UserId) {
  let fNam = document.getElementById("fName");
  let sNam = document.getElementById("sName");
  let tel = document.getElementById("Tel");
  PhoneBook.changeContent(UserId, tel.value, fNam.value, sNam.value);
}
const numPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
let inputNumbers = num => {
  let numPadder = document.getElementById("numPadder");
  if (!isNaN (num)) {
    numPadder.value += numPad[num]
  }
  else {
    console.log();
    numPadder.value = numPadder.value.substring(0, numPadder.value.length - 1);
  } 
}

let phoneNumber = () => {
  let html = '<tr><td colspan = "3"><input style = "width: 80%; float: left; font-size:60px" id = "numPadder"><button style = "float: left;font-size:60px; margin:0" onclick = "inputNumbers()"><</button></td></tr><tr></tr>';
  let numPadInd = 0;
  for (let i = 0; i < 4; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      html += `<td style = "font-size: 25px" id = "btn_${numPadInd}" onclick = "inputNumbers(${numPadInd})">${numPad[numPadInd++]}</td>`;
    }
    html += "</tr><tr></tr>"
  }
  table.innerHTML = html;
}