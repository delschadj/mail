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

  }


}


function compose_email_reply(recipient, subject, body) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Fill in the reply values
  document.querySelector('#compose-recipients').value = recipient;
  document.querySelector('#compose-subject').value = subject;
  document.querySelector('#compose-body').value = body;


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
          const emails_view_all = document.createElement ("div");
          emails_view_all.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
          emails_view_all.setAttribute("class", "emails-view-all");

          // If the email is unread, it should appear with a white background
          if (element.read === false) {
            emails_view_all.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px ; background-color: white; ");
          }

          // else, it should appear with a gray background
          else {
            emails_view_all.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px; background-color: Gainsboro;");
          }

          // Create a li for each variable
          const sender_li = document.createElement ("li");
          sender_li.innerHTML = sender;
          sender_li.setAttribute("style", "font-weight: bold");

          const subject_li = document.createElement ("li");
          subject_li.innerHTML = subject;

          const timestamp_li = document.createElement ("li");
          timestamp_li.innerHTML = timestamp;
          timestamp_li.setAttribute("style", "color: gray");

          emails_view_all.appendChild(sender_li);
          emails_view_all.appendChild(subject_li);
          emails_view_all.appendChild(timestamp_li);

          document.getElementById("emails-view").appendChild(emails_view_all);


          
            //////////////////////////////////
            // OnClick -> Redirect to email id
            emails_view_all.onclick = function () {

              // Mark email as read
              fetch(`/emails/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    read: true
                })
              })

              fetch(`/emails/${id}`)
              .then(response => response.json())
              .then(email => {
                  // Print email
                  console.log(email);
                  

                  // Variables
                  const id = email.id;
                  const email_sender = email.sender;
                  const email_recipients = email.recipients;
                  const email_subject = email.subject;
                  const email_timestamp = email.timestamp;

                  const email_body = email.body;

                  // Hide the emails-view div (all emails)
                  var divsToHide = document.getElementsByClassName("emails-view-all"); //divsToHide is an array
                    for(var i = 0; i < divsToHide.length; i++)
                        {
                          divsToHide[i].style.display = "none";
                        }

                  // Create übergeordnetes div (ul)
                  const single_email_head = document.createElement ("div");
                  const single_email_body = document.createElement ("div");

                  single_email_head.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_head.setAttribute("id", "single_email_head");

                  single_email_body.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_body.setAttribute("id", "single_email_body");

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

                    // Create a li for each variable
                    const email_sender_li = document.createElement ("li");
                    email_sender_li.innerHTML = `FROM: ${email_sender}`;

                    const email_recipients_li = document.createElement ("li");
                    email_recipients_li.innerHTML = `TO: ${email_recipients}`;

                    const email_subject_li = document.createElement ("li");
                    email_subject_li.innerHTML = `SUBJECT: ${email_subject}`;

                    const email_timestamp_li = document.createElement ("li");
                    email_timestamp_li.innerHTML = `TIMESTAMP: ${email_timestamp}`;

                    const email_body_li = document.createElement ("li");
                    email_body_li.innerHTML = email_body

                    const reply_button = document.createElement ("button");
                    reply_button.innerHTML = "Reply"
                    reply_button.onclick = function() { compose_email_reply(sender,`RE: ${subject}`,`On ${timestamp} ${sender} wrote: ${email_body}
                    
`) };

                    const archive_button = document.createElement ("button");
                    archive_button.innerHTML = "Archive"
                    archive_button.onclick = function() {

                        // Mark email as archived
                        fetch(`/emails/${id}`, {
                          method: 'PUT',
                          body: JSON.stringify({
                              archived: true
                          })
                        })

                        alert ("Email is now archived")
                      }
               


                  single_email_head.appendChild(email_sender_li);
                  single_email_head.appendChild(email_recipients_li);
                  single_email_head.appendChild(email_subject_li);
                  single_email_head.appendChild(email_timestamp_li);
                  single_email_head.appendChild(reply_button);
                  single_email_head.appendChild(archive_button);
                  single_email_body.appendChild(email_body_li);

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

              });
              
          };

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
          const emails_view_all = document.createElement ("div");
          emails_view_all.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
          emails_view_all.setAttribute("class", "emails-view-all");
        

          // Create a li for each variable
          const recipients_li = document.createElement ("li");
          recipients_li.innerHTML = recipients;
          recipients_li.setAttribute("style", "font-weight: bold");

          const subject_li = document.createElement ("li");
          subject_li.innerHTML = subject;

          const timestamp_li = document.createElement ("li");
          timestamp_li.innerHTML = timestamp;
          timestamp_li.setAttribute("style", "color: gray");

          emails_view_all.appendChild(recipients_li);
          emails_view_all.appendChild(subject_li);
          emails_view_all.appendChild(timestamp_li);

          document.getElementById("emails-view").appendChild(emails_view_all);



          //////////////////////////////////
            // OnClick -> Redirect to email id
            emails_view_all.onclick = function () {

              fetch(`/emails/${id}`)
              .then(response => response.json())
              .then(email => {
                  // Print email
                  console.log(email);
                  

                  // Variables
                  const id = email.id;
                  const email_sender = email.sender;
                  const email_recipients = email.recipients;
                  const email_subject = email.subject;
                  const email_timestamp = email.timestamp;

                  const email_body = email.body;

                  // Hide the emails-view div (all emails)
                  var divsToHide = document.getElementsByClassName("emails-view-all");
                    for(var i = 0; i < divsToHide.length; i++)
                        {
                          divsToHide[i].style.display = "none";
                        }

                  // Create übergeordnetes div (ul)
                  const single_email_head = document.createElement ("div");
                  const single_email_body = document.createElement ("div");

                  single_email_head.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_head.setAttribute("id", "single_email_head");

                  single_email_body.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_body.setAttribute("id", "single_email_body");

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

                    // Create a li for each variable
                    const email_sender_li = document.createElement ("li");
                    email_sender_li.innerHTML = `FROM: ${email_sender}`;

                    const email_recipients_li = document.createElement ("li");
                    email_recipients_li.innerHTML = `TO: ${email_recipients}`;

                    const email_subject_li = document.createElement ("li");
                    email_subject_li.innerHTML = `SUBJECT: ${email_subject}`;

                    const email_timestamp_li = document.createElement ("li");
                    email_timestamp_li.innerHTML = `TIMESTAMP: ${email_timestamp}`;

                    const email_body_li = document.createElement ("li");
                    email_body_li.innerHTML = email_body

                  single_email_head.appendChild(email_sender_li);
                  single_email_head.appendChild(email_recipients_li);
                  single_email_head.appendChild(email_subject_li);
                  single_email_head.appendChild(email_timestamp_li);
                  single_email_body.appendChild(email_body_li);

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

              });
              
          };

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
        emails.forEach(element => {

          // Variables for later
          const id = element.id
          const recipients = element.recipients
          const subject = element.subject
          const timestamp = element.timestamp

          // Create übergeordnetes div (ul)
          const emails_view_all = document.createElement ("div");
          emails_view_all.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
          emails_view_all.setAttribute("class", "emails-view-all");
        

          // Create a li for each variable
          const recipients_li = document.createElement ("li");
          recipients_li.innerHTML = recipients;
          recipients_li.setAttribute("style", "font-weight: bold");

          const subject_li = document.createElement ("li");
          subject_li.innerHTML = subject;

          const timestamp_li = document.createElement ("li");
          timestamp_li.innerHTML = timestamp;
          timestamp_li.setAttribute("style", "color: gray");

          emails_view_all.appendChild(recipients_li);
          emails_view_all.appendChild(subject_li);
          emails_view_all.appendChild(timestamp_li);

          document.getElementById("emails-view").appendChild(emails_view_all);



          //////////////////////////////////
            // OnClick -> Redirect to email id
            emails_view_all.onclick = function () {

              fetch(`/emails/${id}`)
              .then(response => response.json())
              .then(email => {
                  // Print email
                  console.log(email);
                  

                  // Variables
                  const id = email.id;
                  const email_sender = email.sender;
                  const email_recipients = email.recipients;
                  const email_subject = email.subject;
                  const email_timestamp = email.timestamp;

                  const email_body = email.body;

                  // Hide the emails-view div (all emails)
                  var divsToHide = document.getElementsByClassName("emails-view-all");
                    for(var i = 0; i < divsToHide.length; i++)
                        {
                          divsToHide[i].style.display = "none";
                        }

                  // Create übergeordnetes div (ul)
                  const single_email_head = document.createElement ("div");
                  const single_email_body = document.createElement ("div");

                  single_email_head.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_head.setAttribute("id", "single_email_head");

                  single_email_body.setAttribute("style", "border: 5px solid black;  padding: 20px; margin: 10px");
                  single_email_body.setAttribute("id", "single_email_body");

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

                    // Create a li for each variable
                    const email_sender_li = document.createElement ("li");
                    email_sender_li.innerHTML = `FROM: ${email_sender}`;

                    const email_recipients_li = document.createElement ("li");
                    email_recipients_li.innerHTML = `TO: ${email_recipients}`;

                    const email_subject_li = document.createElement ("li");
                    email_subject_li.innerHTML = `SUBJECT: ${email_subject}`;

                    const email_timestamp_li = document.createElement ("li");
                    email_timestamp_li.innerHTML = `TIMESTAMP: ${email_timestamp}`;

                    const email_body_li = document.createElement ("li");
                    email_body_li.innerHTML = email_body

                    const reply_button = document.createElement ("button");
                    reply_button.innerHTML = "Reply"
                    reply_button.onclick = function() { compose_email_reply(sender,`RE: ${subject}`,`On ${timestamp} ${sender} wrote: ${email_body}
                    
`) };

                    const unarchive_button = document.createElement ("button");
                    unarchive_button.innerHTML = "Unarchive"
                    unarchive_button.onclick = function() {

                        // Mark email as unarchived
                        fetch(`/emails/${id}`, {
                          method: 'PUT',
                          body: JSON.stringify({
                              archived: false
                          })
                        })

                        alert ("Email is now unarchived")
                      }
               


                  single_email_head.appendChild(email_sender_li);
                  single_email_head.appendChild(email_recipients_li);
                  single_email_head.appendChild(email_subject_li);
                  single_email_head.appendChild(email_timestamp_li);
                  single_email_head.appendChild(reply_button);
                  single_email_head.appendChild(unarchive_button);
                  single_email_body.appendChild(email_body_li);

                  document.getElementById("emails-view").appendChild(single_email_head);
                  document.getElementById("emails-view").appendChild(single_email_body);

              });
              
          };

          

        });
    })
  }

  
  

}