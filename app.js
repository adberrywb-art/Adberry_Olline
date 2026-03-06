
function users(){
return JSON.parse(localStorage.getItem("users")||"[]")
}

function saveUsers(u){
localStorage.setItem("users",JSON.stringify(u))
}

function register(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

let list=users()

if(list.find(x=>x.u===u)){
msg("Usuario ya existe")
return
}

list.push({u,p})

saveUsers(list)

msg("Usuario creado")
}

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

let list=users()

let ok=list.find(x=>x.u===u && x.p===p)

if(ok){
localStorage.setItem("session",u)
location="dashboard.html"
}else{
msg("Login incorrecto")
}

}

function msg(t){
document.getElementById("msg").innerText=t
}

function saveTelegram(){

let token=document.getElementById("token").value
let chat=document.getElementById("chatid").value

localStorage.setItem("telegram",JSON.stringify({token,chat}))

alert("Telegram guardado")
}

function saveTrading(){

let pair=document.getElementById("pair").value
let lot=document.getElementById("lot").value
let capital=document.getElementById("capital").value

localStorage.setItem("trading",JSON.stringify({pair,lot,capital}))

alert("Configuración guardada")
}

function parseSignal(){

let text=document.getElementById("signal").value

let action=null
let pair=null
let sl=null
let tp=null

if(text.includes("BUY")) action="BUY"
if(text.includes("SELL")) action="SELL"

if(text.includes("EURUSD")) pair="EURUSD"
if(text.includes("XAUUSD")) pair="XAUUSD"
if(text.includes("USDJPY")) pair="USDJPY"

let slMatch=text.match(/SL\s*(\d+\.?\d*)/)
let tpMatch=text.match(/TP\s*(\d+\.?\d*)/)

if(slMatch) sl=slMatch[1]
if(tpMatch) tp=tpMatch[1]

document.getElementById("result").innerText=JSON.stringify({
pair,
action,
sl,
tp
},null,2)

}
