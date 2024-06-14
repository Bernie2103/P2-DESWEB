console.log("auth.js")
import { hex_sha256 } from "./sha256-min.mjs";


const defaultPassword = hex_sha256("minhaSenha")
localStorage.setItem('defaultPass', defaultPassword)
sessionStorage.setItem("isLogged", 'F')



var buttom = document.getElementById("loginButton");
if(buttom){
    buttom.addEventListener('click', (event) => {
        event.preventDefault()
        const pass = document.getElementById("password").value
        if (hex_sha256(pass) == localStorage.getItem("defaultPass") ) {
            sessionStorage.setItem("isLogged", 'T')
            window.location.href = "jogadores.html"
        } else {
            alert("por favor coloque uma senha valida")
        }
    })
}


