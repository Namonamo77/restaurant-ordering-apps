import { menuArray } from './data.js'


const menu = document.getElementById("menu")
const dishOrder = document.getElementById("dish-order")
const submitForm = document.getElementById("modal-form")
const modal = document.getElementById("modal")
const modalCloseBtn = document.getElementById("modal-close-btn")
const messageEl = document.getElementById("message")

let totalPriceEl = document.getElementById("total-price")
let order = []
let totalPrice = 0
let modalVisible = false
let userName = document.getElementById("username")

modalCloseBtn.addEventListener("click", ()=>{
    modal.style.display = "none"
})


document.addEventListener("click", (e)=>{
    if (!modalVisible){
        if (e.target.dataset.add) {
            getYourOrder(e.target.dataset.add)
        }
        else if (e.target.dataset.remove){
            removeOrder(e.target.dataset.remove)
        }
        else if (e.target.id === "complete-btn"){
            completeOrder()
        }
       
    } 
    else if (e.target.id === "pay-btn"){
        pay()
    }
   
})


function getYourOrder(addMenu){
    
    const targetDishObj = menuArray.filter(function(menu){
        return menu.id === addMenu
    })[0]

    if (!order.includes(targetDishObj)){
        order.push(targetDishObj)
        targetDishObj.quantity++

    }else {
        targetDishObj.quantity++
    }
    
    totalPrice += targetDishObj.price
    totalPriceEl.textContent = `$${totalPrice}`
    
    if (order.length > 0) {
        document.getElementById("order-ticket").classList.remove("hidden")
    }
        
    
    document.getElementsByClassName("dish-quantity").textContent = `X${targetDishObj.quantity}`
    renderOrderList()
    
    
}

function getMenu(){
    let menuHTML = ''
    menuArray.forEach(function(dish){
        menuHTML += 
        `
        <div class="dish">
            <div class="dish-info">
                <div class="dish-icon">
                    <p> ${dish.emoji} </p>
                </div>
                <div class="dish-text">
                    <p class="ff-bold" id="dish-name"> ${dish.name} </p>
                    <p class="ff-rg"> ${dish.ingredients} </p>
                    <p class="ff-price"> $${dish.price} </p>
                </div>
            </div>

            <div class="dish-add" >
                <p class="dish-name" data-add="${dish.id}"> + </p>
            </div>

    
        </div>
        `

    })
    return menuHTML
    
}

function renderMenu(){
    menu.innerHTML = getMenu()
}

renderMenu()

function addListOrder(){
        let orderHTML = ''

        order.forEach(function(item){
            //console.log(item.isOrdered)
            orderHTML +=
                    `
                    <div class="order-item" >
                        <div class="order-item-col1">
                            <p class="dish-title">${item.name}</p>
                            <button class="remove-btn" id="remove-btn" data-remove="${item.id}">remove</button>
                            <p class="dish-quantity">X${item.quantity}</p>
                        </div>
                        <div class="order-item-col2">
                            <p class="dish-price">$${item.price*item.quantity}</p>
                        </div>
                    </div>
                    
                    ` 
        })
        return orderHTML    

}

function renderOrderList(){
    dishOrder.innerHTML = addListOrder()
}
renderOrderList()


function removeOrder(removeItem){
    
    const targetDishObj = order.filter(function(menu){
        return menu.id === removeItem 
    })[0]

    let itemIndex = order.indexOf(targetDishObj)

    
    if(targetDishObj.quantity  > 1){
        targetDishObj.quantity--
        renderOrderList()

    } else {
        order.splice(itemIndex, 1)
            
    }
    
    totalPrice -= targetDishObj.price
    totalPriceEl.textContent = `$${totalPrice}`
    
    renderOrderList()
    if (order.length < 1){
        document.getElementById("order-ticket").classList.add("hidden")
    }
    
   
}

submitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("form submitted")
    e.target.reset()
})

function completeOrder(){
    modalVisible = true
    modal.style.display = "block"
}

function pay(){
    document.getElementById("order-ticket").classList.add("hidden")
    modal.style.display = "none"
    reset()
    message()
    
    
}

function message(){
    messageEl.classList.remove("hidden")
    messageEl.textContent = `
    Thanks, ${userName.value}! Your order is on its way!
    `
    order = []
}

function reset(){
    order.pop()
    totalPrice = 0
    modalVisible = false
    setTimeout(()=>{
        messageEl.classList.add("hidden")
    }, 5000)
    order.forEach(item =>{
        item.quantity = 0
    })
    menuArray.forEach(menu =>{
        menu.quantity = 0
    })
    renderOrderList()
    
}











