var user = document.getElementById("User")
var password = document.getElementById("Psswd")

var userS = ""
var passwordS = ""

function Login() {
    if (user.value == localStorage.getItem("User")) {
        if(password.value = localStorage.getItem("Password")) {
            document.getElementById("span").style.display = "none"
        }
        else {
            password.value = "Erro"
        }
    }
    else {
        user.value = "Erro"
    }
}

function Register() {
    if(localStorage.getItem("User") == null){
        localStorage.setItem("User", user.value)
        localStorage.setItem("Password", password.value)
        setTimeout(() => {
            Login();
        }, 1000);
    }
    else{
        document.getElementById("btnRgtr").innerHTML = "X"
    }
}





/* 
.
.                     __
.                    /  \
.                    \__/
.                     ||
.                     ||
.                     ||
.                 ||||||||||
.                |||||PK|||||    
.               ///        \\\
.              ///          \\\
.             ///            \\\
.            ///    _    _    \\\
.           ///    |_|  |_|    \\\
.      _   |||                  |||    _
.     |_|   \\\     ______      ///   |_|
.      \\    \\\   |______|    ///    //
.       \\    |||             |||    //
.       /_\   |||||||||||||||||||   /_\
.      // \\  |||             |||  // \\
.     //   \\ |||     /\      ||| //   \\
.    //     \\|||    /  \     |||//     \\
.    ||      \|||\   \  /    /|||/       ||
.    /\       |||\\   \/    //|||        /\
.    \/       |||\\\       ///|||        \/
.             |||\\\\     ////|||
.             |||\\\\\   /////|||
.             ||| \\\\\_///// |||
.            ///   \\\\|////   \\\
.           ///     |||||||     \\\
.          |||||||||||||||||||||||||
.          |||||||||||||||||||||||||   
.
 */