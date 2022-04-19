document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';


  // ACTION
  // Select the submit button and inputs to be used later
  const body_compose_sender = document.querySelector ("#compose-sender");
  const body_compose_recipients = document.querySelector ("#compose-recipients");
  const body_compose_subject = document.querySelector ("#compose-subject");
  const body_compose_body = document.querySelector ("#compose-body");
  const body_compose_submit = document.querySelector ("#compose-submit");

  // Listen for submission of form
  document.querySelector ("#compose-form").onsubmit = () => {
    // Get the actual values
    const compose_sender = body_compose_sender.value;
    const compose_recipients = body_compose_recipients.value;
    const compose_subject = body_compose_subject.value;
    const compose_body = body_compose_body.value;

    // Console.log out
    console.log (`Sender: ${compose_sender}`);
    console.log (`Recipients: ${compose_recipients}`)
    console.log (`Subject: ${compose_subject}`)
    console.log (`Body: ${compose_body}`)

    // Send to API via POST
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: compose_recipients,
          subject: compose_subject,
          body: compose_body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });

    // Clear out input fields
    body_compose_recipients.value = "";
    body_compose_subject.value = "";
    body_compose_body.value = "";

    // Go to sent

  }


}








function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;



  // IF INBOX
  if (mailbox === "inbox")
  {
    fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
        emails.forEach(element => {

          // Variables for later
          const id = element.id
          const sender = element.sender
          const subject = element.subject
          const timestamp = element.timestamp

          // Create übergeordnetes div (ul)
          const div = document.createElement ("div")
          div.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");

          // OnClick -> Redirect to email id
          div.onclick = function () {
            alert (`Redirect to email no. ${id}`);
        };
        

          // Create a li for each variable
          const sender_li = document.createElement ("li");
          sender_li.innerHTML = sender;
          sender_li.setAttribute("style", "font-weight: bold");

          const subject_li = document.createElement ("li");
          subject_li.innerHTML = subject;

          const timestamp_li = document.createElement ("li");
          timestamp_li.innerHTML = timestamp;
          timestamp_li.setAttribute("style", "color: gray");

          div.appendChild(sender_li);
          div.appendChild(subject_li);
          div.appendChild(timestamp_li);

          document.getElementById("emails-view").appendChild(div);

        });
    })
  }
  



  // IF SENT
  else if (mailbox === "sent")
  {
    fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
        emails.forEach(element => {

          

          // Variables for later
          const id = element.id
          const recipients = element.recipients
          const subject = element.subject
          const timestamp = element.timestamp

          // Create übergeordnetes div (ul)
          const div = document.createElement ("div")
          div.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");

          // OnClick -> Redirect to email id
          div.onclick = function () {
            alert (`Redirect to email no. ${id}`);
        };
        

          // Create a li for each variable
          const recipients_li = document.createElement ("li");
          recipients_li.innerHTML = recipients;
          recipients_li.setAttribute("style", "font-weight: bold");

          const subject_li = document.createElement ("li");
          subject_li.innerHTML = subject;

          const timestamp_li = document.createElement ("li");
          timestamp_li.innerHTML = timestamp;
          timestamp_li.setAttribute("style", "color: gray");

          div.appendChild(recipients_li);
          div.appendChild(subject_li);
          div.appendChild(timestamp_li);

          document.getElementById("emails-view").appendChild(div);

        });
    })
  }



  // IF ARCHIVED - JPY
  else if (mailbox === "archive")
  {
    fetch('/emails/archive')
    .then(response => response.json())
    .then(emails => {
        // Print emails
        console.log(emails);

        // ... do something else with emails ...
    })
  }

  
  

}