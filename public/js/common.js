function productPopup(product){
  const {name, price,description, reviews, _id} = product 
  var x = document.getElementById("dialog");
  x.style.display = "block";
  const productName= document.getElementById("dialog_name")
  productName.innerHTML = name
  const productPrice= document.getElementById("price")
  productPrice.innerHTML =`₹ ${price}`
  const productDescription= document.getElementById("description")
  productDescription.innerHTML =`${description}`
  const productId= document.getElementById("_id")
  productId.value =`${_id}`
}

let id = ''
let nameb = ""
let descriptionb = ""
let priceb = ""
let stockb = ""
let categoryb = ""
let typeb = ""
let compare_priceb = ""

function productPopups(product){
  console.log(product)
  const {name,description, price, reviews, _id, compare_price,stock,category,type} = product 
  id =  _id
  console.log(compare_price,type,name, price,description, reviews, _id);
  var x = document.getElementById("dialogs");
  x.style.display = "block";

  const titles= document.getElementById("names")
  titles.value = name
  nameb=name
  const descriptions= document.getElementById("descriptions")
  descriptions.value = description
  descriptionb = description

  const prices= document.getElementById("prices")
  prices.value = price
  priceb = price

  const compare_prices= document.getElementById("compare_prices")
  compare_prices.value = compare_price
  
  compare_priceb = compare_price

  const stocks= document.getElementById("stocks")
  stocks.value = stock
  stockb =  stock

  const categorys= document.getElementById("categorys")
  categorys.value = category
  categoryb =  category
  const types= document.getElementById("types")
  types.value = type
  typeb = type
}

function closeButton(id) {
  var x = document.getElementById(id);
  console.log(id);
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none"
  }
}

async function deleteProduct() {
  var x = document.getElementById("dialog");
  try {
    const id = document.getElementById('_id').value
    const url = `/admin/products/${id}`
    const response  =   await fetch(url,{
       method:"DELETE",
      
      })
    if (response.ok == true) {
      x.style.display = "none";
      $('#overlay').show();
      location.replace('/admin/products/delete')
    } 
  } catch (error) {
    console.log(error);
  }
}

function editProduct(id) {
if(id==="names"){
  nameb = event.target.value
}
if(id==="descriptions"){
  descriptionb = event.target.value
}
if(id==="prices"){
  priceb = event.target.value
}
if(id==="stocks"){
  stockb = event.target.value
}
if(id==="categorys"){
  categoryb = event.target.value
}
if(id==="types"){
  typeb = event.target.value
}
if(id==="compare_prices"){
  compare_priceb = event.target.value
}
}

async function updateProduct() {
  try {
    data = {
      name: nameb,
      description :descriptionb,
      price:priceb,
      stock:stockb,
      compare_price:compare_priceb,
      type:typeb,
      category:categoryb
    }
    const url = `/admin/products/${id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };  
    const response  =   await fetch(url,options)
    if (response.ok == true) {
      var y = document.getElementById("dialogs");
      y.style.display = "none";
      $('#overlay').show();
      location.replace('/admin/products/delete')
    } 
  } catch (error) {
    console.log(error);
  }
}

function adminPannel() {
  var x = document.getElementById("mobile-menu");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none"
  }
}

function womenFlyout(){
  var x = document.getElementById("womenFlyout");
  var y = document.getElementById("menFlyout");
  var z = document.getElementById("womenFlyoutTab");
  var a = document.getElementById("menFlyoutTab");
  if (x.style.display == "none") {
    x.style.display = "block";
    y.style.display = "none"
    z.classList.add('border-indigo-600','text-indigo-600');
    z.classList.remove('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.remove('border-indigo-600','text-indigo-600');
  } else {
    x.style.display = "none"
    y.style.display = "none"
    z.classList.remove('border-indigo-600','text-indigo-600');
    z.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.remove('border-indigo-600','text-indigo-600');
  }
}

function menFlyout(){
  var y = document.getElementById("womenFlyout");
  var x = document.getElementById("menFlyout");
  var a = document.getElementById("womenFlyoutTab");
  var z = document.getElementById("menFlyoutTab");
  if (x.style.display == "none") {
    x.style.display = "block";
    y.style.display = "none"
    z.classList.add('border-indigo-600','text-indigo-600');
    z.classList.remove('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.remove('border-indigo-600','text-indigo-600');
  } else {
    x.style.display = "none"
    y.style.display = "none"
    z.classList.remove('border-indigo-600','text-indigo-600');
    z.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.add('border-transparent' ,'text-gray-700' ,'hover:text-gray-800');
    a.classList.remove('border-indigo-600','text-indigo-600');
  }
}

function mobWomenFlyout(){
  var x = document.getElementById("tabs-1-panel-1");
  var y = document.getElementById("tabs-1-panel-2");
  var z = document.getElementById("tabs-1-tab-1");
  var a = document.getElementById("tabs-1-tab-2");
  z.classList.add('border-indigo-600','text-indigo-600', 'border-b-2');
  z.classList.remove('border-transparent');
  a.classList.remove('border-indigo-600','text-indigo-600', 'border-b-2');
  x.style.display = "block";
  y.style.display = "none"
}

function mobMenFlyout(){
  var y = document.getElementById("tabs-1-panel-1");
  var x = document.getElementById("tabs-1-panel-2");
  var a = document.getElementById("tabs-1-tab-1");
  var z = document.getElementById("tabs-1-tab-2");
  z.classList.add('border-indigo-600','text-indigo-600', 'border-b-2');
  z.classList.remove('border-transparent');
  a.classList.remove('border-indigo-600','text-indigo-600', 'border-b-2');
  x.style.display = "block";
  y.style.display = "none"
}

function openPopup(id){
  var x = document.getElementById(id)
  x.classList.remove('hidden')
  x.style.display = "block";
  document.getElementById('default-search').focus();
}

async function search(id) {
  var input = document.getElementById(id)
  const url = '/search?keyword=' + input.value
  location.replace(url)
}

function searchKeyPress(e){
    e = e || window.event;
    if (e.keyCode == 13)
    {
      var input = document.getElementById('default-search')
      const url = '/search?keyword=' + input.value
      location.replace(url)
    }
    return true;
}

function filter(id){

}
