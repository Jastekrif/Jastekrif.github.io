$(function(){ 
  var store = new Store('data', { remote: 'https://6b7fb1b3-7d74-4bdb-a4ec-f400eaf84b26-bluemix:1701ff7d6451dc4a31b0a33a3c57c4e406cd0676244e5f4d78e630e17c2ab54c@6b7fb1b3-7d74-4bdb-a4ec-f400eaf84b26-bluemix.cloudant.com/data', PouchDB: PouchDB });
  
	$('#contactForm').submit(function(event) {
    event.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val();

    // Save the contact to the database
    store.add({
      name: name,
      mobile: mobile,
      email: email
    });

    $('#contactForm')[0].reset();
  });

  //add new contact to the page
  function addNewContactToList(contact) {
    var newContact = '<tr><td>' + contact.name + '</td><td>' + contact.mobile + '</td><td>' + contact.email + '</td></tr>'
    $("#contactList tbody").append(newContact);
  }

  //when a new entry is added to the database, run the corresponding function
  store.on('add', addNewContactToList);

  function loadContacts() {
    store.findAll().then(function(contacts) {
      var tbody = '';
      $.each(contacts, function (i, contact) {
        var row = '<tr><td>' + contact.name + '</td><td>' + contact.mobile + '</td><td>' + contact.email + '</td></tr>';
        tbody += row;
      });

      $("#contactList tbody").html('').html(tbody);
    });
  }

  // when the site loads in the browser,
  // we load all previously saved contacts from hoodie
  loadContacts();

  store.connect();
});
