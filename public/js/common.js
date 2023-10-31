function productPopup(product){
  const {name, price,description, reviews, _id} = product 
  var x = document.getElementById("dialog");
  x.classList.toggle('hidden')
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
  x.classList.toggle('hidden')

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
  x.classList.toggle('hidden')
}

function searchToggle(id) {
  var x = document.getElementById(id);
  x.classList.toggle('hidden')
  document.getElementById('userDropdown').classList.add('hidden');
  document.getElementById('default-search').focus();
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

function toggle(id,id1,id2) {
  var x = document.getElementById(id);
  var y = document.getElementById(id1);
  var z = document.getElementById(id2);
  if (x.classList.contains("hidden")) {
    x.classList.remove('hidden');
    z.classList.remove('hidden');
    y.classList.add('hidden');
  } else {
    x.classList.add('hidden');
    y.classList.remove('hidden');
    z.classList.add('hidden');
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

function popup(id){
  var x = document.getElementById(id)
  x.classList.toggle('hidden')
}

async function removeFromCart(id){
  console.log(id);
  const url = `/remove-from-cart/${id}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }; 
  try {
    const response = await fetch(url, options)
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function addToCart(id, id1) {
  const user = document.getElementById('user');
  const url = `/add-to-cart/${id}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id: id,
      quantity: 1
    })
  };

  const addToCartText = document.getElementById('addToCartText');
  const spinnerPlaceholder = document.getElementById('spinnerPlaceholder');

  // Make the spinner div visible
  spinnerPlaceholder.classList.remove('hidden');

  // Hide the text by changing its color to transparent
  addToCartText.style.color = 'transparent';
  if (user.value !== '') {
    try {
      const response = await fetch(url, options);

      // After the request is complete, you can choose to remove the spinner and change the text color back to visible
      // Example: spinnerPlaceholder.style.display = 'none'; addToCartText.style.color = 'white';
      location.reload();
    } catch (error) {
      console.log(error);

      // If there's an error, remove the spinner and change the text color back to visible
      spinnerPlaceholder.classList.add('hidden');
      addToCartText.style.color = 'white';
    }
  } else {
    window.location.href = "/login";
  }
}






