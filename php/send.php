  <?    
      $to = "tomochko2006@gmail.com";  // mail that will got form
      $from = "companyOrHostNameMail"; // cPanel mail of hosting
      
      $name = $_POST["name"];
      $phone = $_POST["phone"];

      $email = $_POST["email"];
      $theme = $_POST["theme"];
      $messageArea = $_POST["message"];


      $phone = preg_replace("/\s+/", "", $phone);

      $phone_validation = mb_strlen($phone);
      
      $subject1 = "Нова заявка від сайту";
        
      $headers = "From:".$from;
      
      $message1 = "Від: ".$name."\nНомер: ".$phone."\nПошта: ".
      $email."\nТема: ".$theme."\nПовідомлення: ".$messageArea; 
      
      if($name == "" || $phone == ""){
          echo "* You didn't fil all fields";
          
      }
      else if($phone_validation < 10 || $phone_validation > 12 || $phone_validation == 11){
          echo "* You wrote wrong number (097 111 11 11)";
      }
      else{
        if(mail($to, $subject1, $message1, $headers)){
            echo "* Thank you, the application has been sent";
        }
        else{
            echo "* Ops, something went wrong";
        }
      }


    
  ?>
