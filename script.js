let user =
localStorage.getItem("user");

if(!user){
    window.location.href="login.html";
}

document.getElementById("welcome")
.innerText="Hi, "+user;

document.getElementById("logout")
.onclick=()=>{
    localStorage.removeItem("user");
    window.location.href="login.html";
};

let notes =
JSON.parse(localStorage.getItem("notes"))
|| [];

function save(){
    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}

function showNotes(filter=""){

    let box =
    document.getElementById("notes");

    box.innerHTML="";

    notes.forEach((n,i)=>{

        if(
        n.title.toLowerCase()
        .includes(filter.toLowerCase())
        ){

            let div =
            document.createElement("div");

            div.className="note";

            div.innerHTML=`
            <h3>${n.title}</h3>
            <p>${n.content}</p>

            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            `;

            div.querySelector(".delete")
            .onclick=()=>{

                notes.splice(i,1);
                save();
                showNotes(filter);
            };

            div.querySelector(".edit")
            .onclick=()=>{

                let t=prompt("Title",n.title);
                let c=prompt("Content",n.content);

                if(t!=null){
                    n.title=t;
                    n.content=c;
                    save();
                    showNotes(filter);
                }
            };

            box.appendChild(div);
        }
    });
}

document.getElementById("addBtn")
.onclick=()=>{

    let t=document.getElementById("title").value;
    let c=document.getElementById("content").value;

    if(!t) return;

    notes.push({
        title:t,
        content:c
    });

    save();
    showNotes();

    document.getElementById("title").value="";
    document.getElementById("content").value="";
};

document.getElementById("search")
.addEventListener("input",(e)=>{

    showNotes(e.target.value);
});

showNotes();