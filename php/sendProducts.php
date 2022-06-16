  <?    
      $to = "tomochko2006@gmail.com";  // mail that will got form
      $from = "companyOrHostNameMail"; // cPanel mail of hosting

      $name = json_decode($_POST["yourName"]);
      $phone = json_decode($_POST["yourPhone"]);
      $address = json_decode($_POST["yourAddress"]);

      $phone = preg_replace("/\s+/", "", $phone);

      $phone_validation = mb_strlen($phone);
      
      $orderArray = json_decode($_POST['orderArray']);

      $orderText = implode("\n", $orderArray);

      $subject1 = "Нова заявка від сайту";
        
      $headers = "From:".$from;
      
      $message1 = "Name: ".$name."\nPhone: ".$phone."\nAddress: ".$address."\nOrder: \n".$orderText; 
      
//      if($name == "" || $phone == "" || $address == ""){
//          echo "You didn't fil all fields";
//      }
//      else if($phone_validation < 10 || $phone_validation > 12 || $phone_validation == 11){
//          echo "You wrote wrong number (097 111 11 11)";
//      }
//      else{
        if(mail($to, $subject1, $message1, $headers)){

            echo "Thank you, we will call you for accept an order";
        }
        else{
            echo "Ops, something went wrong";
        }
//      }



    
  ?>
