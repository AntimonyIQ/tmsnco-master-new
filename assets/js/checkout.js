var url = '../assets/json/all.json';
var UploadInfoURL = 'https://management.tmsncolifestyle.store/api/payments.php';

var checkoutTable = document.getElementById("table-data");
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

// console.log(window.location.href);
// console.log(params);
let ProductID = params.id;
let PriceID = params.price;

var tbl = document.getElementById('tbl');
var AllName = document.getElementById('AllName');
var AllDescription = document.getElementById('AllDescription');
var AllPrice = document.getElementById('AllPrice');


fetch(url)
   .then(function(response) { 
       return response.json();
   })
  .then(function(data) {
        
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == ProductID) {
                console.table(data[i].product_size);
                tbl.innerHTML = '<div class="all-img" style="height: 50vh; background-image: url(' + data[i].product_image + '); background-repeat: no-repeat; background-size: cover;">'
                                
                                +'</div>';
                                
                AllName.innerHTML = data[i].product_name;
                AllDescription.innerHTML = data[i].product_des;
                                    
                AllPrice.innerHTML = '$' + data[i].product_price.CAD + '<span style="font-size: 14px; color: #808080;">CAD</span>';
            }
        }
});




document.getElementById('table-data').style.display = 'block';
checkoutTable.style.display = 'flex';
checkoutTable.style.justifyContent = 'center';


let IntergerValuePrice = parseFloat(PriceID);
var GetQuantity = document.getElementById('quantityx');
var GetSize = document.getElementById('sizex');
var PayAmount = document.getElementById('amount');

function evaluatePrice(arg) {
    // body...
    let IntGetQuantity = parseInt(GetQuantity.value);
    let IntGetSize = parseInt(GetSize.value);
    
    console.log('quantity is: ' + IntGetQuantity);
    console.log('size is: ' + IntGetSize);
    
    if (GetQuantity.value == NaN || GetSize.value == NaN) {
        console.log('error getting value');
    }
    if (GetQuantity.value == "") {
        PayAmount.value = parseInt(1 * IntergerValuePrice) + '.00';
    } else {
        PayAmount.value = parseInt(IntGetQuantity * IntergerValuePrice) + '.00';
    }
}

function RequestAccount(params) {
    

    const PayBtn = document.getElementById('Pay');
    const showaccount = document.getElementById('showaccount');

    const AccountName = document.getElementById('name');
    const AccountEmail = document.getElementById('email-address');
    const GetCountry = document.getElementById('country');
    const AccountAddress = document.getElementById('address');
    const AccountPhone = document.getElementById('phone');
    const AccountAmount = document.getElementById('amount');


    PayBtn.innerHTML = 'Loading...';


    // ProductID, GetQuantity, GetSize, 

    let UploadURL = UploadInfoURL 
                    + '?product_id=' + ProductID 
                    + '&quantity=' + GetQuantity.value
                    + '&size=' + GetSize.value
                    + '&name=' + AccountName.value
                    + '&email=' + AccountEmail.value
                    + '&country=' + GetCountry.value
                    + '&address=' + AccountAddress.value
                    + '&phone=' + AccountPhone.value
                    + '&amount=' + AccountAmount.value;

    console.log(UploadURL);

    fetch(UploadURL)
        .then(function(response) { 
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            try {
                if (data.result == 'success') {
                    console.log(data.message);
                    const PaymentView = '<div class="payment-view">'
                                            +'<div class="payment-verification">'
                                                +'<h3>Your Payment Verification Code</h3>'
                                                +'<p class="verify-id">' + data.payment_id + '</p>'
                                                +'<p> Copy this code and keep safe as it would be used to track your order and validate your payment' + '</p>'
                                            +'</div>'
                                            +'<div class="form-submit"><br>'
                                                +'<button type="button" onclick="return checkout();" class="paymntx" ><img width="20" height="20" src="../assets/img/paypal.jpg" alt="paypal"> Paypal</button>'
                                            +'</div><br></br>'
                                        +'</div>';
                    showaccount.innerHTML = PaymentView;
                    PayBtn.innerHTML = 'Continue';
                } else {
                    console.error(data.result);
                    PayBtn.innerHTML = 'Pay';
                }
            } catch (error) {
                console.error('Unable to process request, Please Try Again \n' + error.message);
                PayBtn.innerHTML = 'Pay';
            }
        });
}

function MakePayment(params) {
    window.location.href = '../../payments/';
}

function checkout() {
    paysafe.checkout.setup("dGVzdF92bmllenNhaTpCLXFhMi0wLTU5NTY0ZGZhLTAtMzAyYzAyMTQyNmE1NWRkZTk4ZGMyYTA1MmNjY2MxZGRjOGRhYTc3NmE3YTRmZTJlMDIxNDA4MDM4OGZkZWQ5ODY3NjdhYmM0NDVlNThhZjEyM2MwMTAwM2NiOGI=", {
        amount: 5000,
        currency: "USD",
        environment: "TEST",
        companyName: "Example Inc.",
        paymentToken: "CaBP0abDKgROjYU",
        displayPaymentMethods: ["directdebit", "interac"]
     }, function(instance, error, result) {

         if (result.token) {
           console.log(result.token);
           console.log(result.paymentMethod);

             if (result.paymentMethod=="Cards") {

                 // use AJAX to send result.token to your merchant server to take CC payment
             }

             if (result.paymentMethod=="DirectDebit") {

                 // use AJAX to send result.token to your merchant server to take DD payment
             }

             if (result.paymentMethod=="Interac") {

                 // use AJAX to send result.token to your merchant server to take Interac payment
             }

             if (result.paymentMethod=="PayPal") {

                // use AJAX to send result.token to your merchant server to take PayPal payment
             }

                                      
         } else {

             // error handling
         }        
     });
}


