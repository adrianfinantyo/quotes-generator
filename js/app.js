// Variabel Global
const url = "https://api.quotable.io/random";
var tweet = "";

// Fungsi untuk menghasilkan Quotes
function generateQuote(){
   var x = [];
   var tweetTags = [];

   fetch(url)
   .then(function(data) {
      return data.json();
   })
   .then(function(data){    
      document.getElementById("quote").innerHTML = "<q>" + data.content + "</q>";
      document.getElementById("author").innerHTML = "- " + data.author;
      // Untuk menampilkan tags ke html
      for(let i=0; i<data.tags.length; i++){
         x.push("<code>" + data.tags[i] + "</code> ");
      }
      document.getElementById("tags").innerHTML = x.join("");
      // Untuk menambahkan "," kedalam array tweetTags
      tweetTags = data.tags.join(); // Untuk menggabungkan array kedalam string
      tweetTags = tweetTags.replaceAll("-","_"); // Untuk mengganti "-" menjadi "_" pada Quotes
      tweet = "%22" + data.content + "%22" + "%20-" + data.author + "&hashtags=" + tweetTags;
      // Mengecek panjang huruf pada Quotes
      if(data.length > 100){
         document.querySelector("#quote").style.fontSize = "32px";
         if(data.length > 200){
            document.querySelector("#quote").style.fontSize = "24px";
            if(data.length > 300){
               document.querySelector("#quote").style.fontSize = "16px";
            }
         }
      }
   })
   .catch(function(err) {
      console.log(err); 
   });
}

// Fungsi untuk men-tweet Quotes
function tweetQuotes(){
   // Mengganti karakter spesial pada Quotes ke newUrl
   var newUrl = "";

   newUrl = tweet.replaceAll(" ", "%20");
   newUrl = newUrl.replaceAll(",", "%2C");
   newUrl = newUrl.replaceAll(";", "%3B");
   newUrl = newUrl.replaceAll(":", "%3A");
   newUrl = newUrl.replaceAll("'", "%27");
   newUrl = newUrl.replaceAll("!", "%21");
   newUrl = newUrl.replaceAll("?", "%3F");
   newUrl = "https://twitter.com/intent/tweet?text=" + newUrl;
   
   // Membuka window baru twitter
   if(newUrl.length < 280){
      window.open(newUrl);
   }
   else{
      alert("Sorry, your characters is more than 280.");
   }
}

window.onload = generateQuote();