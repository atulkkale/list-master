var result_list_div = document.getElementById('result_list_div'); // Store result div element first because we have to display data that already in local storage.

var err_msg_list = document.createElement('P'); // Create element to display error massage.
err_msg_list.textContent = "No items stored in storage. To store item please first save item.";
err_msg_list.classList.add('err_msg_list');
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
  validate_input_status: 0, // If input successfully validated then variable is set to 1 and if item is already added into list then it set to 2 or otherwise 0.
  clickable_btn: document.querySelectorAll('.clickable_btn'), // Here we store all clickable buttons and update it everytime with updateclickable_btn fucntion.
  input_items: document.querySelectorAll('.input_items'), // Here we store input_items enter by user.
  updatekeynamearr: function () {
    // This function resets keynamearr with all local storage new values.
    this.keynamearr = [];
    storage_keys = Object.keys(localStorage); // Here we store all key in the local storage in variable called storage_keys.
    for (this.keyname of storage_keys) {
      this.keynamearr.push(this.keyname);
    }
  },
  callsave: function (save_items) {
    // This saves an user input in local storage as well as show all new element on page.
    saveitems(save_items);
    this.validate_input_status = 0;
    this.callshowsave();
  },
  callshowsave: function () {
    // This function display data that was stored in local storage.
    this.updatekeynamearr();
    this.clearpagelistarea();

    if (this.keynamearr.length === 0) {
      showerror();
    } else {
      for (this.keyname of this.keynamearr) {
        show_save_items(this.keyname);
      }
    }
    this.updateclickable_btn();
    this.updateclickaction_onbtn();
    this.upadteinputfields();
    this.updateinputfieldsclick_action();
  },
  clearpagelistarea: function () {
    // This function clears the page list div for new items to show.
    result_list_div.textContent = '';
  },
  updateclickable_btn: function () {
    // Store all clickable buttons.
    this.clickable_btn = document.querySelectorAll('.clickable_btn');
  },
  updateclickaction_onbtn: function () {
    // Set functions on updated clickable buttons everytime it updates.
    entiredataobj.clickable_btn.forEach(function (item, index) {
      item.addEventListener('click', click_action); // Set function click_action on all buttons.
    });
  },
  upadteinputfields: function () {
    this.input_items = document.querySelectorAll('.input_items'); // This function update input items every time it called.
  },
  updateinputfieldsclick_action: function () {
    this.input_items.forEach(function (item, index) {
      item.addEventListener('keyup', validate_input_items); // This function validates input fields.
    });
  }
};

entiredataobj.callshowsave();

var input_error_msg = document.getElementById('input_error_msg'); // Store error massage p tag to show error.


function validate_input_items(e) {
  entiredataobj.validate_input_status = 0;

  // input_items = document.querySelectorAll('.input_items');
  var item_name = entiredataobj.input_items[0];
  var item_quantity = entiredataobj.input_items[1];

  for (var key of entiredataobj.keynamearr) {
    var check_storage = JSON.parse(localStorage.getItem(key));
    if (check_storage[0].toLowerCase() === item_name.value.toLowerCase()) {
      console.log("match found")
      console.log(check_storage[0], item_name.value)
      entiredataobj.validate_input_status = 2;
    }
  }

  var regexforitem_name = /^[a-zA-Z ]*$/;
  var regexforitem_quantity = /[\D]+/g;
  if (!(regexforitem_name.test(item_name.value))) {
    input_error_msg.textContent = "Item name can not include numbers or any spcial characters!"
  } else if (regexforitem_quantity.test(item_quantity.value)) {
    console.log(regexforitem_quantity.exec(item_quantity.value))
    input_error_msg.textContent = "Quantity cannot contain any characters or blank spaces!"
  } else if (item_name.value.length < 3 || item_name.value.length > 15) {
    input_error_msg.textContent = "Item name must be 2 to 15 characters long!";
  } else if (item_quantity.value.length < 1 || item_quantity.value.length > 3) {
    input_error_msg.textContent = "Quantity must be 1 to 3 digits!"
  } else if (entiredataobj.validate_input_status == 2) {
    input_error_msg.textContent = "Item was already added into list.";
  } else {
    input_error_msg.textContent = "Everything is ok. You can add item.";
    entiredataobj.validate_input_status = 1;
  }
}

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
      console.log(entiredataobj.input_items[0].value, entiredataobj.input_items[1].value)
      if (entiredataobj.input_items[0].value.length == 0) {
        input_error_msg.textContent = "Item name can not be empty!";
        return false;
      } else if (entiredataobj.input_items[1].value.length == 0) {
        input_error_msg.textContent = "Quantity can not be empty!";
        return false;
      } else if (entiredataobj.validate_input_status === 2) {
        input_error_msg.textContent = "Item was already added into the list."
        return false;
      } else if (entiredataobj.validate_input_status === 0) {
        input_error_msg.textContent = "Please solve all errors!"
      } else {
        date = new Date();
        var save_items = [
          entiredataobj.input_items[0].value,
          entiredataobj.input_items[1].value,
          monthnames[date.getMonth()],
          date.getDate(),
          date.getFullYear(),
        ];
        entiredataobj.callsave(save_items);
        entiredataobj.input_items[0].textContent = "";
        entiredataobj.input_items[1].textContent = "";
      }
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

function showerror() { // This function shows error massage when local storage is empty.
  result_list_div.appendChild(err_msg_list);
}