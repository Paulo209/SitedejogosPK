let btnDados = document.getElementById('btnDADOS')
let btnCloseDados = document.getElementById('btnCloseDds')

btnDados.addEventListener('click', () => {
    console.log("on");
    document.getElementById('dadosNav').style.display = "block";
});

btnCloseDados.addEventListener('click', () => {
    console.log("off");
    document.getElementById('dadosNav').style.display = "none";
});








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