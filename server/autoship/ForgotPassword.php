<?php
header('Access-Control-Allow-Origin: *');   
date_default_timezone_set('Asia/Karachi');
session_start();
include("servermodal.php");



$mailto = $_POST['email'];

echo "email found";
return;


if(isset($_POST['forgotpassword-submit'])){
    
    //$subject = "Form submission";
    //$message = " wrote the following:";
   
    //$headers = "From:" . $mailto;
     //mail($mailto,$subject,$message,$headers);
    Autoship::model_getPassword($mailto);
     echo "Mail Sent. Thank you , we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
    }
    else
    {
    	echo "else if exec";
    }

?>