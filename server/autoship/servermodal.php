<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Asia/Karachi');
class Autoship {

    private static function establishConnection() {
        $conn = null;
        $conn =  new mysqli('localhost', 'root', '', 'autoship');
        return $conn;
    }

    // need to change query
    public static function model_login($email,$password){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT user_id, type FROM user WHERE email = ? AND password =  ? ");
        $sql->bind_param("ss",$email,$password);

        $sql->execute();    // execute the query
        $sql->bind_result($id, $type);
        if($sql->fetch())
        {
            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "Login Successful";
            $json["user_type"] = $type;
            $json["uid"] = $id;

            @session_start();
            $_SESSION['session']="ValueAssigned";
        }
        else
        {
            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Login Failed";
            $json["user_type"] = "";
            $json["uid"] = "";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }


    public static function model_getPassword($email){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT password FROM user WHERE email = ? ");
        $sql->bind_param("s",$email);

        $sql->execute();    // execute the query
        $sql->bind_result($password);
        if($sql->fetch())
        {
            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "Login Successful";
           


            $mailto = $email;
            
            


            
            $subject = "Forgot Password";
            $message = "your password is: ".$password;

            $headers = "From:" . $mailto;
            mail($mailto,$subject,$message,$headers);
            
            

        }
        else
        {
            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Login Failed";
            $json["user_type"] = "";
            $json["uid"] = "";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }

    public static function model_addEmployee($name,$cnic,$email,$password,$contact,$dob,$role){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("INSERT INTO user(name,email,password,cnic,contact,DOB,type) VALUES(?,?,?,?,?,?,?)");
        $sql->bind_param("sssssss",$name,$email,$password,$cnic,$contact,$dob,$role);

        if ($sql->execute())
        {
            $json["STATUS"] = "SUCCESS";
            $json["MESSEGE"] = "Employee added Successfully";
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to add new employee";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }

    public static function model_allEmployee($uid){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT user_id, name, email, cnic, contact, DOB, type  from user where user_id != ?");
        $sql->bind_param("i",$uid);

        if ($sql->execute())
        {

            $sql->bind_result($uid,$name,$email,$cnic,$contact,$dob,$role);

            $counter = 0;
            while($sql->fetch())
            {
                $temp["user_id"] = $uid;
                $temp["name"] = $name;
                $temp["email"] = $email;

                $temp["cnic"] = $cnic;
                $temp["contact"] = $contact;

                $temp["dob"] = $dob;
                $temp["role"] = $role;

            $json["DATA"][] = $temp;
            unset($temp);

            $counter++;
            //@session_start();
            //$_SESSION['session']="ValueAssigned";
            }
            $json["TotalRecords"] = $counter;
            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "get profile Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to add new employee";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }

    public static function model_deleteEmployee($uid){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("delete from user where user_id = ?");
        $sql->bind_param("i",$uid);

        if ($sql->execute() && mysqli_affected_rows($conn)>0 )
        {

            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "employee deleted Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to delete employee";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);   
    }

    public static function model_getProfile($uid){
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT name, email, cnic, contact, DOB, type  from user where user_id = ?");
        $sql->bind_param("i",$uid);

        if ($sql->execute())
        {

            $sql->bind_result($name,$email,$cnic,$contact,$dob,$role);
            
            if($sql->fetch())
            {

                $json["name"] = $name;
                $json["email"] = $email;

                $json["cnic"] = $cnic;
                $json["contact"] = $contact;

                $json["dob"] = $dob;
                $json["role"] = $role;

            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "get profile Successfully";
            //@session_start();
            //$_SESSION['session']="ValueAssigned";
            }

        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to add new employee";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }

    
    public static function model_editProfile($uid,$name,$cnic,$email,$contact,$dob,$role){

        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("update user set name=?, email=?, cnic=?, user.contact=?, user.DOB=?, user.type=? WHERE user_id=? ");
        $sql->bind_param("ssssssi",$name,$email,$cnic,$contact,$dob,$role,$uid);

        if ($sql->execute()&& mysqli_affected_rows($conn)>0)
        {
            $json["STATUS"] = "SUCCESS";
            $json["MESSEGE"] = "Profile info changed Successfully";
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to update profile info";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);
    }
    public static function model_changePassword($uid,$old_password,$new_password){
        if($old_password == "" || $new_password == "")
        {
            $json["STATUS"] = "FAIL";                   
            $json["MESSEGE"] = "password value is invalid";
            return json_encode($json);            
        }
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("UPDATE user SET user.password = ? WHERE user.password=? and user_id=? ");
        $sql->bind_param("ssi",$new_password,$old_password,$uid);

        if ($sql->execute() && mysqli_affected_rows($conn)>0)       // corrected
        {

            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "password updated Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to update password";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);   
    }


    public static function model_get_allOrders(){

        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT order_id, order_name, price, region,address, receive_date,due_date, status FROM autoship_order");
        //$sql->bind_param("ssi",$new_password,$old_password,$uid);
        if ($sql->execute())
        {

            $sql->bind_result($order_id,$order_name,$price,$region,$address,$receive_date,$due_date,$status);

            $counter = 0;
            while($sql->fetch())
            {
                $temp["order_id"] = $order_id;
                $temp["order_name"] = $order_name;
                $temp["price"] = $price;

                $temp["region"] = $region;
                $temp["address"] = $address;

                $temp["receive_date"] = $receive_date;
                $temp["due_date"] = $due_date;
                $temp["status"] = $status;

            $json["DATA"][] = $temp;
            unset($temp);

            $counter++;
            //@session_start();
            //$_SESSION['session']="ValueAssigned";
            }
            $json["TotalRecords"] = $counter;
            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "get orders Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to get orders";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);   
    }


    public static function model_get_allOrders_tags(){

        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("SELECT order_id, order_name, price, region,address, receive_date,due_date, status FROM autoship_order where Tag=''");
        //$sql->bind_param("ssi",$new_password,$old_password,$uid);
        if ($sql->execute())
        {

            $sql->bind_result($order_id,$order_name,$price,$region,$address,$receive_date,$due_date,$status);

            $counter = 0;
            while($sql->fetch())
            {
                $temp["order_id"] = $order_id;
                $temp["order_name"] = $order_name;
                $temp["price"] = $price;

                $temp["region"] = $region;
                $temp["address"] = $address;

                $temp["receive_date"] = $receive_date;
                $temp["due_date"] = $due_date;
                $temp["status"] = $status;

                $json["DATA"][] = $temp;
                unset($temp);

                $counter++;
                //@session_start();
                //$_SESSION['session']="ValueAssigned";


            }
            $json["TotalRecords"] = $counter;
            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "get orders Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to get orders";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);   
    }

    public static function model_update_status($oid, $status){
        if($oid == "" || $status == ""){
            $json["STATUS"] = "FAIL";
            return json_encode($json);
        }
        $conn = Autoship::establishConnection();
        $sql = $conn->prepare("UPDATE autoship_order SET status = ? WHERE order_id=?");
        $sql->bind_param("si",$oid,$status);

        if ($sql->execute())       // corrected
        {

            $json["STATUS"] = "SUCCESS";                   
            $json["MESSEGE"] = "order status updated Successfully";

            
        }
        else
        {

            $json["STATUS"] = "FAIL";
            $json["MESSEGE"] = "Failed to update order status";
        }
        $sql->close();
        mysqli_close($conn);
        return json_encode($json);   
    }


    public static function model_set_Tag($id){
       
        $conn = Autoship::establishConnection();
        $conn2 = Autoship::establishConnection();
       
            $sql2= $conn->prepare("SELECT region,due_date,order_id from autoship_order where status = 'Not Delivered' and order_id=".$id);
                $sql2->execute();
                //if($sql2->execute()){
                    $sql2->bind_result($region,$due_date,$order_id);
                    if($sql2->fetch())
                    {
                        
                        //str_replace(" ", "", $region);
                        $region1 = explode(' ', $region);
                        $region = $region1[0].$region1[1];
                        $parts = explode('-', $due_date);
                        $newdate = $parts[0].$parts[1].$parts[2];
                        $region = strtoupper($region);

                        $newtag= $region.$newdate.$order_id; 
                        //echo $newtag;
                        //$json["tag"] = $newtag;
                        $sql = $conn2->prepare("UPDATE autoship_order set Tag=? WHERE order_id=?");
                        $sql->bind_param("si",$newtag,$id);

                        if ($sql->execute())
                        {
                            $json["STATUS"] = "SUCCESS";
                            $json["MESSEGE"] = "Profile info changed Successfully";
                        }
                        else
                        {

                            $json["STATUS"] = "FAIL";
                            $json["MESSEGE"] = "Failed to update profile info";
                        }
                        
                    }
        //}
            else{
                $json["STATUS"] = "FAIL";
                $json["MESSEGE"] = "Failed to generate order tag";
            }
        
        
        $sql->close();
        $sql2->close();
        mysqli_close($conn);
        mysqli_close($conn2);
        return json_encode($json);   
    }
}

?>