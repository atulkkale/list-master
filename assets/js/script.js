var result_list_div = document.getElementById('result_list_div'); // Store result div element first because we have to display data that already in local storage.

// var l_storage = window.localStorage;
// var storage_keys = Object.keys(localStorage);
// var keyname;
// var keynamesarr = [];
// for (keyname of storage_keys) {
//   show_save_items(keyname);
//   keynamesarr.push(keyname);
// }

var entiredataobj = {
  keyname: null,
  keynamearr: [], // Here we store all keys for later use of function call.
  clickable_btn: document.querySelectorAll('.clickable_btn'), // Here we store all clickable buttons and update it everytime with updateclickable_btn fucntion.
  updatekeynamearr: function () {
    // This function resets keynamearr with all local storage new values.
    this.keynamearr = [];
    storage_keys = Object.keys(localStorage); // Here we store all key in the local storage in variable called storage_keys.
    for (this.keyname of storage_keys) {
      this.keynamearr.push(this.keyname);
    }
    console.log(this.keynamearr)
  },
  callsave: function (save_items) {
    // This saves an user input in local storage as well as show all new element on page.
    saveitems(save_items);
    this.callshowsave();
  },
  callshowsave: function () {
    // This function display data that was stored in local storage.
    this.updatekeynamearr();
    this.clearpagelistarea();
    for (this.keyname of this.keynamearr) {
      show_save_items(this.keyname);
    }
    this.updateclickable_btn();
    this.updateclickaction_onbtn();
  },
  clearpagelistarea: function () {
    // This function clears the page list div for new items to show.
    result_list_div.textContent = '';
  },
  refreshentirelist: function (keynamearr) {
    for (this.keyname of keynamearr) {
      show_save_items(this.keyname);
    }
  },
  updateclickable_btn: function () {
    // Store all clickable buttons.
    this.clickable_btn = document.querySelectorAll('.clickable_btn');
  },
  updateclickaction_onbtn: function () {
    // Set functions on updated clickable buttons everytime it updates.
    entiredataobj.clickable_btn.forEach(function (item, index) {
      console.log(item);
      item.addEventListener('click', click_action); // Set function click_action on all buttons.
    });
  },
};

entiredataobj.callshowsave();

// entiredataobj.getallkeys(storage_keys); Display old keys when page open for first time.
// console.log(entiredataobj.objkeyname, entiredataobj.objkeynamearr);

var input_items = document.querySelectorAll('.input_items'); // Store input items.
var key; // Store local storage key for later use.
var date; // Store date of storage creation.
var monthnames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]; // Store all months in array to use with date object.


function click_action(e) {
  var click_element = e.target;
  console.log(click_element);
  var click_name = e.target.textContent; // Identify button.

  var stored_name = click_element.parentNode.parentNode.firstElementChild;
  var stored_quantity =
    click_element.parentNode.parentNode.parentNode.firstElementChild;
  var stored_key = click_element.parentNode.parentNode.parentNode.getAttribute(
    'data-item-key'
  );

  switch (
    click_name // Depends upon button perform actions.
  ) {
    case 'save':
      e.preventDefault();
      date = new Date();
      var save_items = [
        input_items[0].value,
        input_items[1].value,
        monthnames[date.getMonth()],
        date.getDate(),
        date.getFullYear(),
      ];
      // saveitems(save_items);
      entiredataobj.callsave(save_items);
      // entiredataobj.updatekeynamearr();
      // entiredataobj.refreshentirelist(entiredataobj.keynamearr);

      break;

    case 'r':
      localStorage.clear();
      entiredataobj.callshowsave();
      break;

    case 'update':
      click_element.classList.add('update');
      click_element.textContent = 'save changes';
      stored_name.contentEditable = true;
      stored_quantity.contentEditable = true;
      stored_name.classList.add('update_element');
      stored_quantity.classList.add('update_element');
      break;

    case 'save changes':
      click_element.classList.remove('update');
      click_element.innerHTML = 'update';
      stored_name.contentEditable = false;
      stored_quantity.contentEditable = false;
      stored_name.classList.remove('update_element');
      stored_quantity.classList.remove('update_element');

      date = new Date();
      var updated_month = monthnames[date.getMonth()];
      var updated_date = date.getDate();
      var updated_year = date.getFullYear();
      var edited_item_arr = [
        stored_name.textContent,
        stored_quantity.textContent,
        updated_month,
        updated_date,
        updated_year,
      ];
      localStorage.setItem(stored_key, JSON.stringify(edited_item_arr));
      break;

    case 'remove':
      localStorage.removeItem(stored_key);
      entiredataobj.callshowsave();
      break;

    default:
      break;
  }
}

function saveitems(save_items) {
  if (typeof Storage !== 'undefined') {
    date = new Date();
    key =
      save_items[0] +
      date.getMinutes() +
      date.getSeconds() +
      date.getMilliseconds();
    localStorage.setItem(key, JSON.stringify(save_items));
    // for (var i = 0; i <= keynamesarr.length - 1; i++) {
    //   show_save_items(keynamesarr[i]);
    // }
  } else {
    console.log('Sorry, your browser does not support Web Storage...');
  }
}

function show_save_items(key_name) {
  var stored_items = JSON.parse(localStorage.getItem(key_name));

  var stored_item_name = stored_items[0];
  var stored_quantity_name = stored_items[1];
  var stored_month = stored_items[2];
  var stored_date = stored_items[3];
  var stored_year = stored_items[4];

  var each_item = document.createElement('div');
  each_item.classList.add('each_item');
  each_item.setAttribute('data-item-key', key_name);

  var quantity = document.createElement('span');
  quantity.textContent = stored_quantity_name;
  quantity.classList.add('quantity');
  quantity.setAttribute('data-after-content', ' QUANTITY');
  var item_details = document.createElement('div');
  item_details.classList.add('item_details');

  var h3 = document.createElement('H3');
  h3.textContent = stored_item_name;
  var span = document.createElement('span');
  span.textContent =
    'updated ' + stored_month + ' ' + stored_date + ', ' + stored_year;
  var ul = document.createElement('UL');

  var li1 = document.createElement('li');
  li1.textContent = 'update';
  li1.classList.add('clickable_btn');
  li1.setAttribute('title', 'Update');
  var li2 = document.createElement('li');
  li2.textContent = 'remove';
  li2.classList.add('clickable_btn');
  li2.setAttribute('title', 'Remove');

  ul.innerHTML = li1.outerHTML + li2.outerHTML;
  item_details.innerHTML = h3.outerHTML + span.outerHTML + ul.outerHTML;
  each_item.innerHTML = quantity.outerHTML + item_details.outerHTML;
  result_list_div.appendChild(each_item);
}
