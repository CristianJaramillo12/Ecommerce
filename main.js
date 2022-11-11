let tarjets = [
  {
    id: 0,
    precio: 14,
    stock: 10,
    categoria: "Hoodies",
    urlImage: "./img/featured1.png",
    icono: "+",
  },
  {
    id: 1,
    precio: 24,
    stock: 14,
    categoria: "Shirts",
    urlImage: "./img/featured2.png",
    icono: "+",
  },
  {
    id: 2,
    precio: 24,
    stock: 20,
    categoria: "Sweatshirts",
    urlImage: "./img/featured3.png",
    icono: "+",
  },
];




const box_cards = document.querySelector(".box_cards");
const contentCartShop = document.querySelector(".contentCartShop");
const iconCart = document.querySelector(".bxs-shopping-bag");
const contentCartShop__items = document.querySelector(".contentCartShop__items");
const contentCartShop__total = document.querySelector(".contentCartShop__total");
const count_clothes = document.querySelector(".count_clothes");

let objCartShop = {};


function addClothes (idShoop) {
  const currentShop = tarjets.find((tarjet) => tarjet.id === idShoop);

  if (currentShop.stock === objCartShop[idShoop].amount)
    return alert("no hay mas productos disponibles");

  objCartShop[currentShop.id].amount++;
}

function deleteClothes (idShoop) {
  const opcion = confirm("Seguro que quieres eliminar");

  if(opcion) {
    delete objCartShop[idShoop];
  }
}

function countProduct () {
  const arrayCartShop = Object.values(objCartShop);

  let suma = arrayCartShop.reduce((acum, curr) => {
    acum += curr.amount
    return acum;
  }, 0);

  count_clothes.textContent = suma;
}

function prinTotal () {
  const arrayCartShop = Object.values(objCartShop);

  if(!arrayCartShop.length)
    return (contentCartShop__total.innerHTML = `<h3 class="Letter_vacio">Carrito Vacio</h3>`);

  let total = arrayCartShop.reduce((acum, curr) => {
    acum += curr.precio * curr.amount;
    console.log(acum);
    return acum;
  }, 0)

  contentCartShop__total.innerHTML = `
    <h3 class="amount_total">Total: $${total}.00</h3>
    <button class="button_total">Comprar</button>
  `;
}

function printCards (){
  let html = "";

  tarjets.forEach (({id, precio, stock, categoria, urlImage, icono}) => {

    const btnBuy = stock
      ? `<button class="card_button" id="${id}">${icono}</button>`
      : `<button class="card_button btn_nodrop">No stock</button>`;

    html += `
      <article class="box_cards_unite">
        <div class="card_img">
          <img src="${urlImage}" alt="${categoria}" class="card_img_img">
        </div>
        <div class="card_letter">
          <h2 class="card_price">$${precio}.00<span class="card_stock">Stock:${stock}</span></h2>
          <h3>${categoria}</h3>
          ${btnBuy}
        </div>
      </article>
    `;
  })

  box_cards.innerHTML = html;
}

function printShopInCart () {
  let html = "";

  const arrayCartShop = Object.values(objCartShop);
  arrayCartShop.forEach(({id, precio, stock, amount, categoria, urlImage}) => {
    html += `
   
      <div class="conteiner_item_box_card">
        <div  class="img_product">
          <img src="${urlImage}" alt="" class="img_product_img">
        </div>
        <div  class="conteiner_item_letters">
          <h4>${categoria}</h4>
          <p>stock:${stock} <span>${precio}</span></p>
          <p>Subtotal: ${precio}</p>
          <div  class="conteiner_items_button">
            <button class="button_sum_res btn_rest" id="${id}">-</button>
            <p>${amount} units</p>
            <button class="button_sum_res btn_sum" id="${id}">+</button>
            <button class="button_sum_res btn_delate" id="${id}">
              <i class='bx bx-trash-alt'></i>
            </button>
          </div>
        </div>
      </div>
    `;
  })

  contentCartShop__items.innerHTML = html;

  prinTotal();
  countProduct();
}

window.addEventListener("load", function () {
  const loading = this.document.querySelector(".loading");

  setTimeout(() => {
    loading.style.display = "none";
  }, 3000)
})

box_cards.addEventListener("click", (e) => {
  if (e.target.classList.contains("card_button")) {
    const idShoop = Number(e.target.id);

    const currentShop = tarjets.find((tarjet) => tarjet.id === idShoop);

    if(objCartShop[currentShop.id]) {
      addClothes(idShoop);
    } else {
      objCartShop[currentShop.id] = {...currentShop};
      objCartShop[currentShop.id].amount = 1;
    }
    console.log(objCartShop);
  }

  printShopInCart();
})

contentCartShop__items.addEventListener("click", (e) => { 
  if(e.target.classList.contains("btn_delate")){
    const idClothes = Number(e.target.id);
    deleteClothes(idClothes);
  }

  if(e.target.classList.contains("btn_rest")){
    const idClothes = Number(e.target.id);

    if(objCartShop[idClothes].amount === 1){
      deleteClothes(idClothes);
    } else {
      objCartShop[idClothes].amount--;
    }
    
  }

  if(e.target.classList.contains("btn_sum")){
    const idClothes = Number(e.target.id);

    addClothes(idClothes);
  }

  printShopInCart();

})

iconCart.addEventListener("click", () => {
  contentCartShop.classList.toggle("contentCartShop_show");
})

contentCartShop__total.addEventListener("click", (e) => {
  if (e.target.classList.contains("button_total")) {
    const opcion = confirm('Desea confirmar la compra?')

    if (opcion) {
      tarjets = tarjets.map(tarjet => {
        if(objCartShop[tarjet.id]?.id === tarjet.id) {
          return {
            ...tarjet,
            stock: tarjet.stock - objCartShop[tarjet.id].amount,
          };
        }else {
          return tarjet;
        }
      });

      objCartShop = {};
      printCards();
      printShopInCart();

    }
  }
})

printCards();
prinTotal();