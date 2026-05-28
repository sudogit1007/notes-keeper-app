document.getElementById("loginForm")
.addEventListener("submit",(e)=>{

    e.preventDefault();

    let user =
    document.getElementById("user").value;

    let pass =
    document.getElementById("pass").value;

    if(user && pass){

        localStorage.setItem(
            "user",
            user
        );

        window.location.href =
        "dashboard.html";
    }
});