
var deferredPrompt;
var enablenotificationsbutton = document.querySelectorAll('.enable-notifications');
if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});
function displayConfirmNotification(){
  if('serviceWorker' in navigator){
    var options = {
      body: "Your Successfully subscribe to our notification service",
      icon:'/src/images/icons/app-icon-96x96.png',
      image:'/src/images/sf-boat.jpg',
      dir:'ltr',
      lang:'en-US',
      vibrate:[100, 20, 200],
      badge:""
    }
    navigator.serviceWorker.ready
      .then(function(swreg){
        swreg.showNotification('Succful subscribe in service work', options);
      })
  }
}
function configurepushsub(){
  if(!("serviceWorker" in navigator)){
    return;
  }
  navigator.serviceWorker.ready
    .then(function(swreg){
      return swreg.pushManager.getSubscription();
    })
    .then(function(sub){
      if(sub === null){
        // create a new subsciption
      }else{
        //we have subscription
      }
    })
}
function askforNotificationpermission(){
  Notification.requestPermission(function(result){
    console.log("user Choice", result);
    if(result !==  'granted'){
      console.log('No notification permission granted!');
    }else{
      displayConfirmNotification();
    }
  });
}
if('Notification' in window){
  for(var i=0; i<enablenotificationsbutton.length; i++ ){
    enablenotificationsbutton[i].style.display = 'inline-block';
    enablenotificationsbutton[i].addEventListener('click', askforNotificationpermission)
  }
}