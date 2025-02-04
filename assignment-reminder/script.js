document.getElementById('assignmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title=document.getElementById('title').value;
    const description=document.getElementById('description').value;
    const deadline=document.getElementById('deadline').value;
    //access the first file in the file list object
    const pdfFile=document.getElementById('pdfUpload').files[0];

    if (!title||!description||!deadline||!pdfFile) {
        alert('Please fill in all fields and upload a PDF.');
        return;
    }
//split iso date and time 
//[0]->access first part of split string which is date.
    const today=new Date().toISOString().split('T')[0];

    // Create a URL for the PDF file
    const pdfUrl=URL.createObjectURL(pdfFile);

    // Create a list item for the assignment
    const li=document.createElement('li');

    li.innerHTML= `
        <div>
            <strong>${title}</strong>
            <p>${description}</p>
            <small>Deadline: ${deadline}</small>
        </div>

        <div class="pdf-btns">
            
          
            <a href="${pdfUrl}" target="_blank" class="btn">View PDF</a>
        </div>
        <button class="delete-btn">Remove</button>
    `;

    // Highlight overdue or upcoming assignments
    const daysLeft=Math.ceil(
        (new Date(deadline)-new Date(today))/(1000*60*60*24)
    );

    if (daysLeft<0) {
        li.classList.add('overdue');
    } else if (daysLeft===1) {
        alert(`Reminder: Your assignment "${title}" is due tomorrow!`);
        li.classList.add('upcoming');
    } else {
        li.classList.add('upcoming');
    }

    // Set a reminder notification
    //-(24*60*60*1000) means reminder set one day before the deadline.
    const Notification=new Date(deadline)-new Date()-(24*60*60*1000);
    //notification is greater than 0 means deadline has not passed.
    if (Notification>0){
        setTimeout(()=>{
            alert(`Reminder: Your assignment "${title}" is due tomorrow!`);
        },Notification);
    }

    // Append the list item to the assignment list
    document.getElementById('assignmentList').appendChild(li);

    // Clear the form
    //The .reset() method is called on the form element. It resets the form back to its initial state.
    document.getElementById('assignmentForm').reset();

    // Allow deletion of assignments
    //.remove method removes the entire list item
    li.querySelector('.delete-btn').addEventListener('click',()=>{
        li.remove();
    });
});
