var u_name = document.querySelector("#name");
var email = document.querySelector("#email");
var pass = document.querySelector("#pass");
var s_id = document.querySelector("#s_id");
var table = document.querySelector("#table_data");

var add_user = document.querySelector("#add");
var delete_users = document.querySelector("#delete_all");
var search=document.querySelector("#search");
var progress1 = document.querySelector("#progress");


var email_btn=document.querySelector("#email_btn");
var users;

if(JSON.parse(localStorage.getItem('users'))==null){
    users=[];
}
else{
    users=JSON.parse(localStorage.getItem('users'));
    display();
}

var currentIndex;

var fName=0,fEmail=0,fPass=0,fID=0;


//change email extension

var emailext=document.querySelector("#emailEXT");
var gmailext=document.querySelector("#gmailEXT");
var outlookext=document.querySelector("#outlookEXT");
function changeValueOfEmailEXT(data){
   email_btn.innerHTML=data;
}
function emailEXT(){
    var data=emailext.innerHTML;
    changeValueOfEmailEXT(data);
}
function gmailEXT(){
    var data=gmailext.innerHTML;
    changeValueOfEmailEXT(data);
}
function outlookEXT(){
    var data=outlookext.innerHTML;
    changeValueOfEmailEXT(data);
}
 

//Add User

var click = add_user.addEventListener("click",add);

function add(event){
    event.preventDefault();

    var user ={
        Name: u_name,
        Email: email,
        Password: pass,
        Student_ID: s_id,
        };
    user.Name=u_name.value;
    user.Email=email.value+email_btn.innerHTML;
    user.Password=pass.value;
    user.Student_ID=s_id.value;


    if(add_user.innerHTML=="Update"){
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {  
                  users[currentIndex]=user;
                  localStorage.setItem('users',JSON.stringify(users));
                  add_user.innerHTML="Add";
                  add_user.setAttribute("style","background-color: var(--bs-btn-border-color) !important;");
                  display();
                  clear();
                  Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })
    }
    else if(fName&&fID&&fPass&&fEmail){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
            })
            users.push(user);
            localStorage.setItem('users',JSON.stringify(users));
            display();
            clear();
        
    }
    else{
        if(user.Name=='' || user.Email=='' || user.Password=='' || user.Student_ID==''){
            Swal.fire({
                title: 'Fill up your information please !',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                }
                })
        }
    }
    
};


//Display

function display(){
    var data='';

    for(var i=0; i<users.length;i++){
        data+=`
        <tr class="bg-light">
            <th scope="row">${i+1}</th>
            <td>${users[i].Name}</td>
            <td>${users[i].Email}</td>
            <td>${users[i].Password}</td>
            <td>${users[i].Student_ID}</td>
            <td><button type="button" id="update" class="btn btn-primary" onclick="update_user(${i})">Update</button></td>
            <td><button type="button" id="delete" class="btn btn-danger" onclick="delete_user(${i})">Delete</button></td>
        </tr>
        `;
    }
    table.innerHTML=data;
};

//DeleteAll

delete_users.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete all !'
      }).then((result) => {
        if (result.isConfirmed) {
          users=[];
          localStorage.setItem("users",JSON.stringify(users));
          display();
          Swal.fire(
            'Deleted!',
            'All users have been deleted.',
            'success'
          )
        }
    })
}

//Delete One User

function delete_user(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          users.splice(index,1);
          localStorage.setItem("users",JSON.stringify(users));
          display(users);
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          )
        }
      })
    
}

//Update
function update_user(index){
    var i=users[index].Email.indexOf('@');
    if(i>0){
        users[index].Email=users[index].Email.slice(0,i);
    }
    u_name.value=users[index].Name;
    email.value=users[index].Email;
    pass.value=users[index].Password;
    s_id.value=users[index].Student_ID;

    add_user.innerHTML="Update";
    add_user.setAttribute("style","background-color: orange !important;");

    progress1.setAttribute("style", "background-color: orange !important; width: 100%;");

    currentIndex=index;
}


//Search User
function search_user(){
    var data='';
    var search_key=search.value;

    for(var i=0; i<users.length;i++){
        if(users[i].Name.toLocaleLowerCase().includes(search_key.toLocaleLowerCase())){
            data+=`
            <tr class="bg-light">
                <th scope="row">${i+1}</th>
                <td>${users[i].Name}</td>
                <td>${users[i].Email}</td>
                <td>${users[i].Password}</td>
                <td>${users[i].Student_ID}</td>
                <td><button type="button" id="update" class="btn btn-primary" onclick="update_user(${i})">Update</button></td>
                <td><button type="button" id="delete" class="btn btn-danger" onclick="delete_user(${i})">Delete</button></td>
            </tr>
            `;
        }
    }
    table.innerHTML=data;
    
}


//Clear Inputs

function clear(){
    u_name.value='';
    email.value='';
    pass.value='';
    s_id.value='';

    pass.classList.remove("is-invalid");
    s_id.classList.remove("is-invalid");
    u_name.classList.remove("is-invalid");
    email.classList.remove("is-invalid");

    pass.classList.remove("is-valid");
    s_id.classList.remove("is-valid");
    u_name.classList.remove("is-valid");
    email.classList.remove("is-valid");

    progress(-1);

}

//checking Validity

var patternName=/^[A-Z][a-z]{2,20}$/;

u_name.onchange = function(){
    if(patternName.test(u_name.value)){
        u_name.classList.add("is-valid");
        u_name.classList.remove("is-invalid");
        
        progress(0);
    }
    else{
        u_name.classList.add("is-invalid");
        u_name.classList.remove("is-valid");
        
        progress(0);
    }
}

var patternEmail=/^[a-z]{5,20}[0-9]/;

email.onchange = function(){
    if(patternEmail.test(email.value)){
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
        progress(1);
    }
    else{
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        progress(1);
    }
}

var patternPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

pass.onchange = function(){
    if(patternPass.test(pass.value)){
        pass.classList.add("is-valid");
        pass.classList.remove("is-invalid");
        progress(2);
    }
    else{
        pass.classList.add("is-invalid");
        pass.classList.remove("is-valid");
        progress(2);
    }
}

var patternID=/^1[0-9]{7,7}$/

s_id.onchange = function(){
    if(patternID.test(s_id.value)){
        s_id.classList.add("is-valid");
        s_id.classList.remove("is-invalid");
        progress(3);
    }
    else{
        s_id.classList.add("is-invalid");
        s_id.classList.remove("is-valid");
        progress(3);
    }
}


//progress bar


var value=0;

function progress(index){
    
    switch(index){
        case 0:
            if(u_name.classList.contains("is-valid") && !fName){
                value+=25; fName=1;
            }
            else if(!(u_name.classList.contains("is-valid")) && fName){
                value-=25; fName=0; 
            } 
            break;
        case 1:
            if(email.classList.contains("is-valid") && !fEmail){
                value+=25; fEmail=1;
            }
            else if(!(email.classList.contains("is-valid")) && fEmail){
                value-=25; fEmail=0; 
            } 
        break;
        case 2:
            if(pass.classList.contains("is-valid") && !fPass){
                value+=25; fPass=1;
            }
            else if(!(pass.classList.contains("is-valid")) && fPass){
                value-=25; fPass=0; 
            }  
        break;
        case 3:
            if(s_id.classList.contains("is-valid") && !fID){
                value+=25; fID=1;
            }
            else if(!(s_id.classList.contains("is-valid")) && fID){
                value-=25; fID=0; 
            }  
            break;
        default:
            value=0;
            fName=0;
            fEmail=0;
            fPass=0;
            fID=0;
    }

    progress1.setAttribute("style", `width:${value}%;`);
    
}
