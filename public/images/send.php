<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "luckyockyr@gmail.com";
    $subject = "New Appointment Booking from Website";

    $name = strip_tags($_POST["name"]);
    $email = strip_tags($_POST["email"]);
    $phone = strip_tags($_POST["phone"]);
    $message = strip_tags($_POST["message"]);

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message";

    $headers = "From: website@nestora.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Failed to send. Please try again.";
    }
}
?>
