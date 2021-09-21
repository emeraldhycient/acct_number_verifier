<?php
header('Access-Control-Allow-Origin: *');


$acct = $_POST["acct"];
$code = $_POST["code"];

$token = "paystack private key here";

$cURLConnection = curl_init('https://api.paystack.co/bank/resolve?account_number=' . $acct . '&bank_code=' . $code);
curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $token
));
curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

$apiResponse = curl_exec($cURLConnection);
curl_close($cURLConnection);

$jsonArrayResponse = json_decode($apiResponse);

echo json_encode($jsonArrayResponse);