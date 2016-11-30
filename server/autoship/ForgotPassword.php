<?php
header('Access-Control-Allow-Origin: *');   
date_default_timezone_set('Asia/Karachi');
session_start();




$mailto = $_POST['email'];
echo $mailto;
echo "<br>";
$subject = "My php test email";
$txt = "Hello world!";



if(isset($_POST['forgotpassword-submit'])){
    $to = "ruhaibh@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    
    $subject = "Form submission";
    $message = " wrote the following:";
   
    $headers = "From:" . $mailto;
     mail($mailto,$subject,$message,$headers);
     echo "Mail Sent. Thank you , we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
    }
    else
    {
    	echo "else if exec";
    }

?>